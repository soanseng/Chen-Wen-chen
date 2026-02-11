interface ChapterTransitionProps {
  chapterNumber: number
  title: string
}

export default function ChapterTransition({
  chapterNumber,
  title,
}: ChapterTransitionProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-ink-900 text-paper-200">
      <p className="text-sm tracking-widest text-paper-400 mb-2">
        {chapterNumber === 0 ? '序章' : `第${chapterNumber}章`}
      </p>
      <h1 className="text-2xl font-semibold">{title}</h1>
    </div>
  )
}
