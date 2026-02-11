import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../../context/GameContext.tsx'
import { CHAPTERS, ALL_DOCUMENTS, DOCUMENTS_BY_CHAPTER } from '../../data/index.ts'
import { CategoryIcon } from '../visual/CategoryIcon.tsx'
import type { DocumentCategory, DocumentDef, ChapterDef } from '../../types/index.ts'

// ===== Category labels =====

const CATEGORY_LABELS: Record<DocumentCategory, string> = {
  INT: '偵訊紀錄',
  SUR: '監控檔案',
  FOR: '法醫鑑識',
  WIT: '證人筆錄',
  OFF: '官方文書',
  EXT: '外部資料',
  NEWS: '新聞剪報',
  NSA: '國安局',
  TJC: '促轉會',
}

type CategoryFilter = DocumentCategory | 'ALL'

// ===== Helper functions =====

function getChapterDocuments(chapter: ChapterDef): DocumentDef[] {
  const fromChapter = DOCUMENTS_BY_CHAPTER[chapter.id] ?? []

  // Also include any documents listed in chapter.documentIds but not in
  // DOCUMENTS_BY_CHAPTER (e.g. hidden documents that were unlocked)
  const fromChapterIds = new Set(fromChapter.map((d) => d.id))
  const extra: DocumentDef[] = []
  for (const docId of chapter.documentIds) {
    if (!fromChapterIds.has(docId)) {
      const doc = ALL_DOCUMENTS[docId]
      if (doc) extra.push(doc)
    }
  }

  return [...fromChapter, ...extra]
}

function getCategoriesInChapter(docs: DocumentDef[]): DocumentCategory[] {
  const seen = new Set<DocumentCategory>()
  for (const doc of docs) {
    seen.add(doc.category)
  }
  // Return in a stable order based on the CATEGORY_LABELS key order
  const allCategories = Object.keys(CATEGORY_LABELS) as DocumentCategory[]
  return allCategories.filter((cat) => seen.has(cat))
}

// ===== Sub-components =====

interface ChapterTabsProps {
  chapters: ChapterDef[]
  selectedChapterId: number
  unreadCounts: Map<number, number>
  onSelect: (chapterId: number) => void
}

function ChapterTabs({ chapters, selectedChapterId, unreadCounts, onSelect }: ChapterTabsProps) {
  return (
    <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-none">
      {chapters.map((ch) => {
        const isActive = ch.id === selectedChapterId
        const unread = unreadCounts.get(ch.id) ?? 0

        return (
          <button
            key={ch.id}
            onClick={() => onSelect(ch.id)}
            className={`relative shrink-0 px-3 py-2 text-sm font-serif rounded-t border-b-2 transition-colors ${
              isActive
                ? 'border-stamp-500 bg-paper-50 text-ink-800 font-semibold'
                : 'border-transparent text-ink-400 hover:text-ink-600 hover:bg-paper-200'
            }`}
          >
            <span>{ch.title}</span>
            <span className="ml-1 text-xs text-ink-300">{ch.subtitle}</span>
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-stamp-500 text-paper-50 text-[10px] font-semibold leading-none px-1">
                {unread}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

interface CategoryFilterBarProps {
  categories: DocumentCategory[]
  selected: CategoryFilter
  onSelect: (filter: CategoryFilter) => void
}

function CategoryFilterBar({ categories, selected, onSelect }: CategoryFilterBarProps) {
  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
      <FilterButton
        label="全部"
        isActive={selected === 'ALL'}
        onClick={() => onSelect('ALL')}
      />
      {categories.map((cat) => (
        <FilterButton
          key={cat}
          label={CATEGORY_LABELS[cat]}
          isActive={selected === cat}
          onClick={() => onSelect(cat)}
        />
      ))}
    </div>
  )
}

interface FilterButtonProps {
  label: string
  isActive: boolean
  onClick: () => void
}

function FilterButton({ label, isActive, onClick }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 px-2.5 py-1 text-xs font-serif rounded transition-colors ${
        isActive
          ? 'bg-ink-700 text-paper-100'
          : 'bg-paper-200 text-ink-500 hover:bg-paper-300'
      }`}
    >
      {label}
    </button>
  )
}

interface DocumentListItemProps {
  doc: DocumentDef
  isRead: boolean
  onClick: () => void
}

function DocumentListItem({ doc, isRead, onClick }: DocumentListItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-3 flex items-center gap-3 border-b border-paper-200 hover:bg-paper-200/60 transition-colors group"
    >
      {/* Category pixel icon + unread indicator */}
      <span className="shrink-0 relative flex items-center justify-center w-6 h-6">
        <CategoryIcon category={doc.category} size={20} />
        {!isRead && (
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-stamp-400" />
        )}
      </span>

      {/* Document info */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-serif truncate ${isRead ? 'text-ink-400' : 'text-ink-800 font-semibold'}`}>
          {doc.title}
        </p>
        <p className="text-xs text-ink-300 mt-0.5">
          <span className="font-mono">{doc.id}</span>
          <span className="mx-1.5">|</span>
          <span>{CATEGORY_LABELS[doc.category]}</span>
        </p>
      </div>

      {/* Arrow */}
      <span className="shrink-0 text-ink-300 group-hover:text-ink-500 transition-colors text-sm">
        &rsaquo;
      </span>
    </button>
  )
}

// ===== Main component =====

export default function FileBrowser() {
  const { state } = useGame()
  const navigate = useNavigate()

  // Only show unlocked chapters
  const unlockedChapters = useMemo(
    () => CHAPTERS.filter((ch) => state.chapter.unlocked.includes(ch.id)),
    [state.chapter.unlocked],
  )

  const [selectedChapterId, setSelectedChapterId] = useState(state.chapter.current)
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('ALL')

  // Get documents for the selected chapter, filtered to only unlocked ones
  const { visibleDocs, unreadCounts } = useMemo(() => {
    const counts = new Map<number, number>()

    for (const ch of unlockedChapters) {
      const chapterDocs = getChapterDocuments(ch)
      let unread = 0
      for (const doc of chapterDocs) {
        const docState = state.documents[doc.id]
        if (docState?.unlocked && !docState.read) {
          unread++
        }
      }
      counts.set(ch.id, unread)
    }

    const selectedChapter = CHAPTERS.find((ch) => ch.id === selectedChapterId)
    if (!selectedChapter) {
      return { visibleDocs: [], unreadCounts: counts }
    }

    const allChapterDocs = getChapterDocuments(selectedChapter)
    const unlocked = allChapterDocs.filter((doc) => {
      const docState = state.documents[doc.id]
      return docState?.unlocked === true
    })

    return { visibleDocs: unlocked, unreadCounts: counts }
  }, [unlockedChapters, selectedChapterId, state.documents])

  // Filter by category
  const filteredDocs = useMemo(() => {
    if (categoryFilter === 'ALL') return visibleDocs
    return visibleDocs.filter((doc) => doc.category === categoryFilter)
  }, [visibleDocs, categoryFilter])

  // Categories present in the current chapter's visible docs
  const availableCategories = useMemo(
    () => getCategoriesInChapter(visibleDocs),
    [visibleDocs],
  )

  // Reset category filter when switching chapters if the selected category is not available
  function handleChapterSelect(chapterId: number) {
    setSelectedChapterId(chapterId)
    setCategoryFilter('ALL')
  }

  function handleDocumentClick(docId: string) {
    navigate(`/doc/${docId}`)
  }

  if (unlockedChapters.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-ink-400 text-sm font-serif">尚無已解鎖的檔案。</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chapter tabs */}
      <div className="px-4 pt-4 bg-paper-100 border-b border-paper-300">
        <ChapterTabs
          chapters={unlockedChapters}
          selectedChapterId={selectedChapterId}
          unreadCounts={unreadCounts}
          onSelect={handleChapterSelect}
        />
      </div>

      {/* Category filter */}
      {availableCategories.length > 1 && (
        <div className="px-4 py-2 bg-paper-50 border-b border-paper-200">
          <CategoryFilterBar
            categories={availableCategories}
            selected={categoryFilter}
            onSelect={setCategoryFilter}
          />
        </div>
      )}

      {/* Document list */}
      <div className="flex-1 overflow-y-auto bg-paper-50">
        {filteredDocs.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-ink-300 text-sm font-serif">
              {categoryFilter === 'ALL'
                ? '本章尚無已解鎖的文件。'
                : `本章無「${CATEGORY_LABELS[categoryFilter]}」類文件。`}
            </p>
          </div>
        ) : (
          <div>
            {filteredDocs.map((doc) => (
              <DocumentListItem
                key={doc.id}
                doc={doc}
                isRead={state.documents[doc.id]?.read ?? false}
                onClick={() => handleDocumentClick(doc.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
