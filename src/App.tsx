import { useState, useCallback } from 'react'
import { ContentWarning } from '@/components/ui/ContentWarning'
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
  return (
    <div className="h-[20vh] flex items-center justify-center" aria-hidden="true">
      <div className="w-16 h-px bg-ink-700" />
    </div>
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
          <header className="flex flex-col items-center justify-center h-screen text-center px-4">
            <h1 className="text-4xl md:text-6xl font-display text-ink-50 mb-4">
              陳文成事件
            </h1>
            <p className="text-ink-400 font-mono text-sm tracking-wider">
              互動式歷史紀錄 · 1981
            </p>
          </header>

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

          <footer className="py-16 text-center text-ink-600 text-sm font-mono">
            <p>基於歷史文獻的紀錄呈現</p>
          </footer>
        </main>
      )}
    </div>
  )
}

export default App
