import { useState, useCallback } from 'react'
import { ContentWarning } from '@/components/ui/ContentWarning'
import { CharacterMap } from '@/components/infographic/CharacterMap'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { fadeIn, lineDrawProgress } from '@/utils/animation'
import {
  Chapter01,
  Chapter02,
  Chapter03,
  Chapter04,
  Chapter05,
  Chapter06,
  Chapter07,
} from '@/chapters'

function ChapterDivider() {
  const { ref, progress } = useScrollProgress()
  const widthPct = lineDrawProgress(progress)

  return (
    <div
      ref={ref}
      className="h-[20vh] flex items-center justify-center scroll-animated"
      aria-hidden="true"
    >
      <div
        className="h-px bg-ink-700"
        style={{ width: `${widthPct * 0.64}px`, maxWidth: '4rem' }}
      />
    </div>
  )
}

function HeroHeader() {
  const { ref, progress } = useScrollProgress()
  const style = fadeIn(progress, 0.0, 0.25)

  return (
    <header
      ref={ref}
      className="flex flex-col items-center justify-center h-[80vh] sm:h-screen text-center px-4 sm:px-6 scroll-animated"
      style={style}
    >
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-display text-ink-50 mb-3 sm:mb-4">
        陳文成事件
      </h1>
      <p className="text-ink-400 font-mono text-xs sm:text-sm tracking-wider">
        互動式歷史紀錄 · 1981
      </p>
    </header>
  )
}

function App() {
  const [ready, setReady] = useState(false)

  const handleWarningDismiss = useCallback(() => {
    setReady(true)
  }, [])

  return (
    <div className="min-h-screen bg-ink-950 text-ink-100 font-serif">
      <ContentWarning onDismiss={handleWarningDismiss} />

      {ready && (
        <main>
          <HeroHeader />

          <Chapter01 />
          <ChapterDivider />
          <Chapter02 />
          <ChapterDivider />
          <Chapter03 />
          <ChapterDivider />
          <Chapter04 />
          <ChapterDivider />
          <Chapter05 />
          <ChapterDivider />
          <Chapter06 />
          <ChapterDivider />
          <Chapter07 />

          <ChapterDivider />

          {/* INFOGRAPHIC: character-map (global) */}
          <section aria-label="人物關係圖" className="py-10 sm:py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <CharacterMap />
            </div>
          </section>

          <footer className="py-10 sm:py-16 text-center text-ink-600 text-xs sm:text-sm font-mono px-4">
            <p>基於歷史文獻的紀錄呈現</p>
          </footer>
        </main>
      )}
    </div>
  )
}

export default App
