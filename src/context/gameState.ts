import type {
  GameState,
  DocumentId,
  ContradictionId,
  NotebookFieldId,
  Highlight,
} from '../types'

// ===== 初始狀態 =====

export const INITIAL_GAME_STATE: GameState = {
  version: '1.0.0',
  created: new Date().toISOString(),
  lastSaved: new Date().toISOString(),
  playTime: 0,
  chapter: {
    current: 0,
    unlocked: [0],
    completed: [],
  },
  documents: {
    'DOC-EXT-04': { unlocked: true, read: false, readAt: null },
    'DOC-OFF-01': { unlocked: true, read: false, readAt: null },
    'DOC-NEWS-01': { unlocked: true, read: false, readAt: null },
  },
  highlights: [],
  connections: [],
  notebook: {
    fields: {},
    order: [
      'arrest_method',
      'interrogation_purpose',
      'july2_evening',
      'clothing_anomaly',
      'crime_scene',
      'death_manner',
      'witness_role',
      'full_recording',
      'investigation_lead',
      'coverup_chain',
      'who_ordered',
      'true_death_location',
    ],
  },
  endings: {
    reached: false,
    reachedAt: null,
    totalContradictions: 16,
    triggeredContradictions: 0,
    notebookCompletion: {
      total: 12,
      filled: 0,
      autoFilled: 0,
      permanentlyLocked: 4,
      maxPossible: 8,
    },
  },
  settings: {
    fontSize: 'medium',
    theme: 'paper',
  },
}

// ===== Actions =====

export type GameAction =
  | { type: 'MARK_DOCUMENT_READ'; docId: DocumentId }
  | { type: 'UNLOCK_DOCUMENT'; docId: DocumentId }
  | { type: 'ADD_HIGHLIGHT'; highlight: Highlight }
  | { type: 'REMOVE_HIGHLIGHT'; highlightId: string }
  | {
      type: 'TRIGGER_CONTRADICTION'
      contradictionId: ContradictionId
      highlightPair: [string, string]
      unlockedDocs: DocumentId[]
      unlockedNotebookFields: NotebookFieldId[]
    }
  | { type: 'SET_NOTEBOOK_FIELD'; fieldId: NotebookFieldId; value: string }
  | { type: 'UNLOCK_NOTEBOOK_FIELD'; fieldId: NotebookFieldId }
  | { type: 'UNLOCK_CHAPTER'; chapter: number }
  | { type: 'SET_CURRENT_CHAPTER'; chapter: number }
  | { type: 'COMPLETE_CHAPTER'; chapter: number }
  | { type: 'REACH_ENDING' }
  | { type: 'UPDATE_SETTINGS'; settings: Partial<GameState['settings']> }
  | { type: 'LOAD_STATE'; state: GameState }
  | { type: 'RESET_GAME' }

// ===== Reducer =====

export function gameReducer(state: GameState, action: GameAction): GameState {
  const now = new Date().toISOString()

  switch (action.type) {
    case 'MARK_DOCUMENT_READ': {
      const existing = state.documents[action.docId]
      if (!existing?.unlocked) return state
      if (existing.read) return state
      return {
        ...state,
        documents: {
          ...state.documents,
          [action.docId]: { ...existing, read: true, readAt: now },
        },
      }
    }

    case 'UNLOCK_DOCUMENT': {
      const existing = state.documents[action.docId]
      if (existing?.unlocked) return state
      return {
        ...state,
        documents: {
          ...state.documents,
          [action.docId]: { unlocked: true, read: false, readAt: null },
        },
      }
    }

    case 'ADD_HIGHLIGHT': {
      if (state.highlights.some((h) => h.id === action.highlight.id)) return state
      return {
        ...state,
        highlights: [...state.highlights, action.highlight],
      }
    }

    case 'REMOVE_HIGHLIGHT': {
      return {
        ...state,
        highlights: state.highlights.filter((h) => h.id !== action.highlightId),
      }
    }

    case 'TRIGGER_CONTRADICTION': {
      if (state.connections.some((c) => c.id === action.contradictionId)) return state

      const newConnection = {
        id: action.contradictionId,
        triggered: true,
        triggeredAt: now,
        highlightPair: action.highlightPair,
        unlockedDocs: action.unlockedDocs,
        unlockedNotebookFields: action.unlockedNotebookFields,
      }

      // Unlock new documents
      const newDocs = { ...state.documents }
      for (const docId of action.unlockedDocs) {
        if (!newDocs[docId]?.unlocked) {
          newDocs[docId] = { unlocked: true, read: false, readAt: null }
        }
      }

      // Unlock notebook fields
      const newNotebookFields = { ...state.notebook.fields }
      for (const fieldId of action.unlockedNotebookFields) {
        if (!newNotebookFields[fieldId]) {
          newNotebookFields[fieldId] = { unlocked: true, value: null }
        } else if (!newNotebookFields[fieldId].unlocked) {
          newNotebookFields[fieldId] = { ...newNotebookFields[fieldId], unlocked: true }
        }
      }

      const triggeredCount = state.endings.triggeredContradictions + 1

      return {
        ...state,
        documents: newDocs,
        connections: [...state.connections, newConnection],
        notebook: { ...state.notebook, fields: newNotebookFields },
        endings: {
          ...state.endings,
          triggeredContradictions: triggeredCount,
        },
      }
    }

    case 'SET_NOTEBOOK_FIELD': {
      const field = state.notebook.fields[action.fieldId]
      if (!field?.unlocked) return state
      return {
        ...state,
        notebook: {
          ...state.notebook,
          fields: {
            ...state.notebook.fields,
            [action.fieldId]: { ...field, value: action.value },
          },
        },
      }
    }

    case 'UNLOCK_NOTEBOOK_FIELD': {
      const field = state.notebook.fields[action.fieldId]
      if (field?.unlocked) return state
      return {
        ...state,
        notebook: {
          ...state.notebook,
          fields: {
            ...state.notebook.fields,
            [action.fieldId]: { unlocked: true, value: null },
          },
        },
      }
    }

    case 'UNLOCK_CHAPTER': {
      if (state.chapter.unlocked.includes(action.chapter)) return state
      return {
        ...state,
        chapter: {
          ...state.chapter,
          unlocked: [...state.chapter.unlocked, action.chapter].sort(),
        },
      }
    }

    case 'SET_CURRENT_CHAPTER': {
      if (!state.chapter.unlocked.includes(action.chapter)) return state
      return {
        ...state,
        chapter: { ...state.chapter, current: action.chapter },
      }
    }

    case 'COMPLETE_CHAPTER': {
      if (state.chapter.completed.includes(action.chapter)) return state
      return {
        ...state,
        chapter: {
          ...state.chapter,
          completed: [...state.chapter.completed, action.chapter].sort(),
        },
      }
    }

    case 'REACH_ENDING': {
      if (state.endings.reached) return state

      const filled = Object.values(state.notebook.fields).filter(
        (f) => f && f.unlocked && f.value !== null
      ).length

      return {
        ...state,
        endings: {
          ...state.endings,
          reached: true,
          reachedAt: now,
          notebookCompletion: {
            ...state.endings.notebookCompletion,
            filled,
          },
        },
      }
    }

    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.settings },
      }

    case 'LOAD_STATE':
      return action.state

    case 'RESET_GAME':
      return { ...INITIAL_GAME_STATE, created: now }
  }
}
