import { useEffect, useState, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useGame } from '../../context/GameContext.tsx'
import { useContradiction } from '../../hooks/useContradiction.ts'
import { ALL_DOCUMENTS } from '../../data/index.ts'
import { StampOverlay } from '../visual/StampOverlay.tsx'
import { PaperTexture } from '../visual/PaperTexture.tsx'
import { TypewriterReader } from '../visual/TypewriterReader.tsx'
import type {
  DocumentCategory,
  DocumentId,
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

// ===== Component =====

export default function DocumentReader() {
  const { id } = useParams<{ id: string }>()
  const { state, markDocumentAsRead, addHighlight, removeHighlight } = useGame()
  const { checkAndTrigger } = useContradiction()

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

    const result = checkAndTrigger(newHighlight)
    if (result) {
      setTriggeredToast(result.contradictionName)
      setTimeout(() => setTriggeredToast(null), 4000)
    }
  }

  const hasContent = doc.content.length > 0
  const isTypewriterDoc = docId === 'DOC-INT-02'
  const [typewriterComplete, setTypewriterComplete] = useState(false)

  const handleTypewriterComplete = useCallback(() => {
    setTypewriterComplete(true)
  }, [])

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      {/* Back link */}
      <Link
        to="/browse"
        className="inline-block text-stamp-500 text-sm hover:underline mb-6"
      >
        &larr; 返回檔案列表
      </Link>

      <PaperTexture category={doc.category} chapter={doc.chapter}>
        {/* Document header (relative for stamp positioning) */}
        <header className="relative mb-6 p-4">
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

          {/* Pixel stamp overlay */}
          <StampOverlay docId={docId} />
        </header>

        <hr className="border-paper-300 mb-6 mx-4" />

        {/* Highlight instruction (show when player has few highlights) */}
        {hasContent && state.highlights.length < 3 && (
          <p className="mx-4 mb-4 px-3 py-2 text-xs text-ink-400 bg-paper-200/50 border border-dashed border-paper-300 rounded font-serif">
            <span className="text-ink-300 mr-1">&#9654;</span>
            點擊可疑段落進行標記。標記不同文件中的矛盾之處，調查就會推進。
          </p>
        )}

        {/* Document content */}
        {hasContent ? (
          <section className="px-4 pb-4">
            {isTypewriterDoc && !typewriterComplete ? (
              <TypewriterReader
                paragraphs={doc.content}
                onComplete={handleTypewriterComplete}
                isHighlighted={(idx) => highlightedIndices.has(idx)}
                onParagraphClick={handleParagraphClick}
              />
            ) : (
              <div className="space-y-4">
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
              </div>
            )}
          </section>
        ) : (
          <div className="py-12 text-center">
            <p className="text-ink-300 text-sm">此文件內容尚未解密。</p>
            <p className="text-ink-200 text-xs mt-2">
              （文件內容開發中，敬請期待）
            </p>
          </div>
        )}
      </PaperTexture>

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
