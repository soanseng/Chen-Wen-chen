import { useState } from 'react'

interface CitationProps {
  /** Short display text, e.g. "促轉會調查報告，第 42 頁" */
  source: string
  /** Optional longer description shown on expand */
  detail?: string
  className?: string
}

export function Citation({ source, detail, className = '' }: CitationProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <span className={`inline-block ${className}`}>
      <button
        type="button"
        onClick={() => detail && setExpanded(!expanded)}
        onMouseEnter={() => detail && setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        className="text-ink-400 text-xs sm:text-sm border-b border-ink-700 border-dashed cursor-help
                   hover:text-accent-gold hover:border-accent-gold transition-colors"
      >
        （來源：{source}）
      </button>
      {expanded && detail && (
        <span
          className="block mt-1 text-xs text-ink-300 bg-ink-900 border border-ink-700
                     rounded px-2 py-1 max-w-sm"
          role="tooltip"
        >
          {detail}
        </span>
      )}
    </span>
  )
}
