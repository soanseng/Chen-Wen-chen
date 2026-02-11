import { createContext, useContext, useReducer, type ReactNode } from 'react'
import type {
  GameState,
  DocumentId,
  ContradictionId,
  NotebookFieldId,
  Highlight,
} from '../types'
import { gameReducer, INITIAL_GAME_STATE, type GameAction } from './gameState'

// ===== Context 型別 =====

interface GameContextValue {
  state: GameState
  dispatch: React.Dispatch<GameAction>

  // 便捷方法
  markDocumentAsRead: (docId: DocumentId) => void
  unlockDocument: (docId: DocumentId) => void
  addHighlight: (highlight: Highlight) => void
  removeHighlight: (highlightId: string) => void
  triggerContradiction: (
    contradictionId: ContradictionId,
    highlightPair: [string, string],
    unlockedDocs: DocumentId[],
    unlockedNotebookFields: NotebookFieldId[],
  ) => void
  setNotebookField: (fieldId: NotebookFieldId, value: string) => void
  unlockChapter: (chapter: number) => void
  setCurrentChapter: (chapter: number) => void
  resetGame: () => void
}

const GameContext = createContext<GameContextValue | null>(null)

// ===== Provider =====

export function GameProvider({
  children,
  initialState,
}: {
  children: ReactNode
  initialState?: GameState
}) {
  const [state, dispatch] = useReducer(
    gameReducer,
    initialState ?? INITIAL_GAME_STATE,
  )

  const value: GameContextValue = {
    state,
    dispatch,

    markDocumentAsRead: (docId) =>
      dispatch({ type: 'MARK_DOCUMENT_READ', docId }),

    unlockDocument: (docId) =>
      dispatch({ type: 'UNLOCK_DOCUMENT', docId }),

    addHighlight: (highlight) =>
      dispatch({ type: 'ADD_HIGHLIGHT', highlight }),

    removeHighlight: (highlightId) =>
      dispatch({ type: 'REMOVE_HIGHLIGHT', highlightId }),

    triggerContradiction: (contradictionId, highlightPair, unlockedDocs, unlockedNotebookFields) =>
      dispatch({
        type: 'TRIGGER_CONTRADICTION',
        contradictionId,
        highlightPair,
        unlockedDocs,
        unlockedNotebookFields,
      }),

    setNotebookField: (fieldId, value) =>
      dispatch({ type: 'SET_NOTEBOOK_FIELD', fieldId, value }),

    unlockChapter: (chapter) =>
      dispatch({ type: 'UNLOCK_CHAPTER', chapter }),

    setCurrentChapter: (chapter) =>
      dispatch({ type: 'SET_CURRENT_CHAPTER', chapter }),

    resetGame: () =>
      dispatch({ type: 'RESET_GAME' }),
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

// ===== Hook =====

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext)
  if (!ctx) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return ctx
}
