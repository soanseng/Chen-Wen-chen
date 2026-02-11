import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useGame } from '../../context/GameContext.tsx'
import { ALL_DOCUMENTS, CONTRADICTIONS } from '../../data/index.ts'
import type {
  DocumentCategory,
  DocumentId,
  ContradictionDef,
  Highlight,
} from '../../types/index.ts'

// ===== Category display labels =====

const CATEGORY_LABELS: Record<DocumentCategory, string> = {
  INT: '偵訊紀錄',
  SUR: '監控檔案',
  FOR: '鑑識報告',
  WIT: '證人陳述',
  OFF: '官方文件',
  EXT: '外部資料',
  NEWS: '新聞剪報',
  NSA: '國安局檔案',
  TJC: '促轉會報告',
}

const CATEGORY_COLORS: Record<DocumentCategory, string> = {
  INT: 'bg-stamp-500/20 text-stamp-500',
  SUR: 'bg-ink-500/20 text-ink-600',
  FOR: 'bg-paper-400/40 text-ink-600',
  WIT: 'bg-stamp-300/20 text-stamp-400',
  OFF: 'bg-ink-200/40 text-ink-500',
  EXT: 'bg-paper-300/40 text-ink-500',
  NEWS: 'bg-paper-400/30 text-ink-500',
  NSA: 'bg-stamp-600/20 text-stamp-600',
  TJC: 'bg-stamp-300/15 text-stamp-300',
}

// ===== Contradiction checking =====

function triggerMatchesHighlights(
  trigger: ContradictionDef['triggers'][number],
  highlights: Highlight[],
): Highlight | undefined {
  return highlights.find((h) => {
    if (h.docId !== trigger.docId) return false
    if (h.paragraphIndex !== trigger.paragraphIndex) return false
    return trigger.keywords.every((kw) => h.text.includes(kw))
  })
}

function findNewlyTriggeredContradiction(
  highlights: Highlight[],
  alreadyTriggeredIds: Set<string>,
): { contradiction: ContradictionDef; pair: [string, string] } | null {
  for (const contradiction of Object.values(CONTRADICTIONS)) {
    if (alreadyTriggeredIds.has(contradiction.id)) continue

    const [triggerA, triggerB] = contradiction.triggers
    const matchA = triggerMatchesHighlights(triggerA, highlights)
    const matchB = triggerMatchesHighlights(triggerB, highlights)

    if (matchA && matchB) {
      return { contradiction, pair: [matchA.id, matchB.id] }
    }
  }
  return null
}

// ===== Component =====

export default function DocumentReader() {
  const { id } = useParams<{ id: string }>()
  const {
    state,
    markDocumentAsRead,
    addHighlight,
    removeHighlight,
    triggerContradiction,
  } = useGame()

  const [triggeredToast, setTriggeredToast] = useState<string | null>(null)

  const docId = id as DocumentId
  const doc = ALL_DOCUMENTS[docId]

  // Mark document as read on mount
  useEffect(() => {
    if (doc && state.documents[docId]?.unlocked) {
      markDocumentAsRead(docId)
    }
  }, [doc, docId, markDocumentAsRead, state.documents])

  if (!doc) {
    return (
      <div className="p-4 md:p-8 max-w-2xl mx-auto">
        <Link
          to="/browse"
          className="text-stamp-500 text-sm hover:underline"
        >
          &larr; 返回檔案列表
        </Link>
        <p className="mt-8 text-ink-400 text-sm">找不到此文件。</p>
      </div>
    )
  }

  const highlightsForDoc = state.highlights.filter((h) => h.docId === docId)
  const highlightedIndices = new Set(highlightsForDoc.map((h) => h.paragraphIndex))
  const alreadyTriggeredIds = new Set(state.connections.map((c) => c.id))

  function handleParagraphClick(paragraphIndex: number, text: string): void {
    const existingHighlight = highlightsForDoc.find(
      (h) => h.paragraphIndex === paragraphIndex,
    )

    if (existingHighlight) {
      removeHighlight(existingHighlight.id)
      return
    }

    const newHighlight: Highlight = {
      id: crypto.randomUUID(),
      docId,
      paragraphIndex,
      text,
      createdAt: new Date().toISOString(),
    }

    addHighlight(newHighlight)

    // Check for contradiction triggers with the new highlight included
    const allHighlightsAfterAdd = [...state.highlights, newHighlight]
    const result = findNewlyTriggeredContradiction(
      allHighlightsAfterAdd,
      alreadyTriggeredIds,
    )

    if (result) {
      triggerContradiction(
        result.contradiction.id,
        result.pair,
        result.contradiction.unlocks.documents,
        result.contradiction.unlocks.notebookFields,
      )
      setTriggeredToast(result.contradiction.name)
      setTimeout(() => setTriggeredToast(null), 4000)
    }
  }

  const hasContent = doc.content.length > 0

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      {/* Back link */}
      <Link
        to="/browse"
        className="inline-block text-stamp-500 text-sm hover:underline mb-6"
      >
        &larr; 返回檔案列表
      </Link>

      {/* Document header */}
      <header className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`inline-block px-2 py-0.5 text-xs rounded ${CATEGORY_COLORS[doc.category]}`}
          >
            {CATEGORY_LABELS[doc.category]}
          </span>
          <span className="text-ink-300 text-xs">{doc.id}</span>
        </div>
        <h1 className="text-xl md:text-2xl font-semibold text-ink-800 mb-2">
          {doc.title}
        </h1>
        <p className="text-ink-400 text-sm italic">{doc.presentation}</p>
      </header>

      <hr className="border-paper-300 mb-6" />

      {/* Document content */}
      {hasContent ? (
        <section className="space-y-4">
          {doc.content.map((paragraph) => {
            const isHighlighted = highlightedIndices.has(paragraph.index)
            return (
              <p
                key={paragraph.index}
                onClick={() =>
                  handleParagraphClick(paragraph.index, paragraph.text)
                }
                className={`
                  cursor-pointer leading-relaxed text-sm md:text-base
                  px-3 py-2 rounded transition-colors select-none
                  ${
                    isHighlighted
                      ? 'bg-yellow-200/30 border-l-2 border-yellow-500'
                      : 'hover:bg-paper-200/60'
                  }
                `}
              >
                {paragraph.text}
              </p>
            )
          })}
        </section>
      ) : (
        <div className="py-12 text-center">
          <p className="text-ink-300 text-sm">此文件內容尚未解密。</p>
          <p className="text-ink-200 text-xs mt-2">
            （文件內容開發中，敬請期待）
          </p>
        </div>
      )}

      {/* Contradiction triggered toast */}
      {triggeredToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 bg-ink-800 text-paper-100 rounded shadow-lg text-sm animate-pulse max-w-xs text-center">
          <p className="font-semibold mb-1">發現矛盾</p>
          <p>{triggeredToast}</p>
        </div>
      )}
    </div>
  )
}
