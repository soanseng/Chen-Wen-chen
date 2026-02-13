interface ChapterTitleProps {
  /** Chapter number (1-7) */
  chapter: number
  /** Chapter title in Chinese */
  title: string
  /** Time range string, e.g. "1950–1978" */
  timeRange: string
  /** Emotional tone description */
  mood?: string
  className?: string
}

export function ChapterTitle({
  chapter,
  title,
  timeRange,
  mood,
  className = '',
}: ChapterTitleProps) {
  return (
    <header
      className={`flex flex-col items-center justify-center min-h-[60vh] text-center px-4 ${className}`}
    >
      <span className="text-ink-500 font-mono text-sm tracking-[0.3em] uppercase mb-4">
        第 {numberToChinese(chapter)} 章
      </span>
      <h2 className="text-4xl md:text-6xl font-display text-ink-50 mb-4">
        {title}
      </h2>
      <span className="text-ink-400 font-mono text-sm tracking-wider">
        {timeRange}
      </span>
      {mood && (
        <span className="text-ink-600 text-xs mt-2 italic">
          {mood}
        </span>
      )}
    </header>
  )
}

function numberToChinese(n: number): string {
  const map = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  return map[n] ?? String(n)
}
