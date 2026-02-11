import { useEffect, useRef, useState, useCallback } from 'react'
import { useGame } from '../context/GameContext.tsx'
import { useChapterUnlock } from './useChapterUnlock.ts'
import { useSaveGame } from './useSaveGame.ts'
import { CHAPTERS, DOCUMENTS_BY_CHAPTER } from '../data/index.ts'
import type { DocumentId, NotebookFieldId } from '../types/index.ts'

// ===== Auto-fill rules for notebook fields =====
// When a specific contradiction is triggered, auto-fill the corresponding field

const AUTO_FILL_RULES: Record<string, { fieldId: NotebookFieldId; value: string }> = {
  'C-08': { fieldId: 'crime_scene', value: '否——陳屍處並非第一現場' },
  'C-09': { fieldId: 'coverup_chain', value: '警總→國安局→總統府' },
}

/**
 * Top-level game orchestrator hook.
 * Place this once in a component near the root (e.g., Layout or App).
 *
 * Responsibilities:
 * - Triggers chapter unlock checks (via useChapterUnlock)
 * - Unlocks chapter documents when a new chapter is unlocked
 * - Auto-fills notebook fields when specific contradictions trigger
 * - Provides chapter transition state for overlay display
 * - Manages save game lifecycle
 */
export function useGameOrchestrator() {
  const { state, dispatch, setCurrentChapter } = useGame()
  useSaveGame()
  useChapterUnlock()

  // Chapter transition overlay state
  const [transitionChapter, setTransitionChapter] = useState<number | null>(null)
  const prevUnlockedRef = useRef<number[]>(state.chapter.unlocked)

  // Detect newly unlocked chapters and trigger transitions + document unlocking
  useEffect(() => {
    const prev = prevUnlockedRef.current
    const current = state.chapter.unlocked

    if (current.length > prev.length) {
      // Find the newly unlocked chapter(s)
      const newChapters = current.filter((ch) => !prev.includes(ch))

      for (const chapterId of newChapters) {
        // Unlock all documents for this chapter
        const chapter = CHAPTERS.find((ch) => ch.id === chapterId)
        if (chapter) {
          for (const docId of chapter.documentIds) {
            if (!state.documents[docId]?.unlocked) {
              dispatch({ type: 'UNLOCK_DOCUMENT', docId })
            }
          }
        }

        // Also unlock any docs from DOCUMENTS_BY_CHAPTER that are non-hidden
        const chapterDocs = DOCUMENTS_BY_CHAPTER[chapterId] ?? []
        for (const doc of chapterDocs) {
          if (!state.documents[doc.id as DocumentId]?.unlocked) {
            dispatch({ type: 'UNLOCK_DOCUMENT', docId: doc.id })
          }
        }
      }

      // Show transition for the highest newly unlocked chapter
      const highestNew = Math.max(...newChapters)
      setTransitionChapter(highestNew)
    }

    prevUnlockedRef.current = current
  }, [state.chapter.unlocked, state.documents, dispatch])

  // Auto-fill notebook fields when contradictions trigger
  const prevConnectionCount = useRef(state.connections.length)

  useEffect(() => {
    if (state.connections.length <= prevConnectionCount.current) {
      prevConnectionCount.current = state.connections.length
      return
    }
    prevConnectionCount.current = state.connections.length

    // Check the latest connection(s)
    for (const connection of state.connections) {
      const rule = AUTO_FILL_RULES[connection.id]
      if (!rule) continue

      const fieldState = state.notebook.fields[rule.fieldId]
      if (fieldState?.unlocked && fieldState.value === null) {
        dispatch({
          type: 'SET_NOTEBOOK_FIELD',
          fieldId: rule.fieldId,
          value: rule.value,
        })
      }
    }
  }, [state.connections, state.notebook.fields, dispatch])

  // Handle chapter transition completion
  const handleTransitionComplete = useCallback(() => {
    if (transitionChapter !== null) {
      setCurrentChapter(transitionChapter)
      setTransitionChapter(null)
    }
  }, [transitionChapter, setCurrentChapter])

  return {
    transitionChapter,
    handleTransitionComplete,
  }
}
