import { useCallback } from 'react'
import { useGame } from '../context/GameContext.tsx'
import { CONTRADICTIONS } from '../data/index.ts'
import type {
  ContradictionDef,
  ContradictionId,
  DocumentId,
  Highlight,
  NotebookFieldId,
} from '../types/index.ts'

// ===== Result type =====

export interface ContradictionResult {
  contradictionId: ContradictionId
  contradictionName: string
  highlightPair: [string, string]
  unlocks: {
    documents: DocumentId[]
    notebookFields: NotebookFieldId[]
    chapter: number | null
  }
}

// ===== Pure matching functions =====

function triggerMatchesHighlight(
  trigger: ContradictionDef['triggers'][number],
  highlight: Highlight,
): boolean {
  if (highlight.docId !== trigger.docId) return false
  if (highlight.paragraphIndex !== trigger.paragraphIndex) return false
  return trigger.keywords.every((kw) => highlight.text.includes(kw))
}

function findMatchingHighlight(
  trigger: ContradictionDef['triggers'][number],
  highlights: Highlight[],
): Highlight | undefined {
  return highlights.find((h) => triggerMatchesHighlight(trigger, h))
}

export function checkContradictions(
  allHighlights: Highlight[],
  alreadyTriggeredIds: Set<string>,
): ContradictionResult | null {
  for (const contradiction of Object.values(CONTRADICTIONS)) {
    if (alreadyTriggeredIds.has(contradiction.id)) continue

    const [triggerA, triggerB] = contradiction.triggers
    const matchA = findMatchingHighlight(triggerA, allHighlights)
    const matchB = findMatchingHighlight(triggerB, allHighlights)

    if (matchA && matchB) {
      return {
        contradictionId: contradiction.id,
        contradictionName: contradiction.name,
        highlightPair: [matchA.id, matchB.id],
        unlocks: contradiction.unlocks,
      }
    }
  }
  return null
}

// ===== Hook =====

export function useContradiction() {
  const { state, triggerContradiction } = useGame()

  const checkAndTrigger = useCallback(
    (newHighlight: Highlight): ContradictionResult | null => {
      const alreadyTriggeredIds = new Set(state.connections.map((c) => c.id))
      const allHighlights = [...state.highlights, newHighlight]
      const result = checkContradictions(allHighlights, alreadyTriggeredIds)

      if (result) {
        triggerContradiction(
          result.contradictionId,
          result.highlightPair,
          result.unlocks.documents,
          result.unlocks.notebookFields,
        )
      }

      return result
    },
    [state.connections, state.highlights, triggerContradiction],
  )

  return { checkAndTrigger }
}
