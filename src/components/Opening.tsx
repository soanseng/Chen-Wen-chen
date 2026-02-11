import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const SAVE_KEY = 'cwc_game_save_v1'

const LINES = [
  '民國70年7月2日，一位旅美學人被帶離家門。',
  '隔日，他的屍體出現在大學校園裡。',
  '四十年來，真相始終未明。',
  '這些是剛解密的檔案。請開始閱讀。',
] as const

const CHAR_DELAY_MS = 60
const LINE_PAUSE_MS = 600

interface TypewriterState {
  lineIndex: number
  charIndex: number
  finished: boolean
}

function useTypewriter(): {
  displayLines: string[]
  finished: boolean
  skip: () => void
} {
  const [tw, setTw] = useState<TypewriterState>({
    lineIndex: 0,
    charIndex: 0,
    finished: false,
  })

  const skip = useCallback(() => {
    setTw({ lineIndex: LINES.length, charIndex: 0, finished: true })
  }, [])

  useEffect(() => {
    if (tw.finished) return

    const currentLine = LINES[tw.lineIndex]
    if (!currentLine) {
      setTw((prev) => ({ ...prev, finished: true }))
      return
    }

    if (tw.charIndex < currentLine.length) {
      const timer = setTimeout(() => {
        setTw((prev) => ({ ...prev, charIndex: prev.charIndex + 1 }))
      }, CHAR_DELAY_MS)
      return () => clearTimeout(timer)
    }

    // Current line done -- pause then advance to next line
    const timer = setTimeout(() => {
      setTw((prev) => ({
        lineIndex: prev.lineIndex + 1,
        charIndex: 0,
        finished: prev.lineIndex + 1 >= LINES.length,
      }))
    }, LINE_PAUSE_MS)
    return () => clearTimeout(timer)
  }, [tw])

  const displayLines: string[] = []
  for (let i = 0; i <= Math.min(tw.lineIndex, LINES.length - 1); i++) {
    if (i < tw.lineIndex) {
      displayLines.push(LINES[i])
    } else {
      displayLines.push(LINES[i].slice(0, tw.charIndex))
    }
  }

  return { displayLines, finished: tw.finished, skip }
}

function hasSaveData(): boolean {
  return localStorage.getItem(SAVE_KEY) !== null
}

export default function Opening() {
  const navigate = useNavigate()
  const { displayLines, finished, skip } = useTypewriter()
  const [showButtons, setShowButtons] = useState(false)
  const savedExists = hasSaveData()

  // Fade in buttons after typewriter finishes
  useEffect(() => {
    if (!finished) return
    const timer = setTimeout(() => setShowButtons(true), 300)
    return () => clearTimeout(timer)
  }, [finished])

  function handleSkip() {
    if (finished) return
    skip()
  }

  function handleNewGame() {
    localStorage.removeItem(SAVE_KEY)
    navigate('/browse')
  }

  function handleContinue() {
    navigate('/browse')
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-ink-900 px-6 select-none"
      onClick={handleSkip}
    >
      {/* Typewriter text */}
      <div className="max-w-md w-full space-y-4 mb-16">
        {displayLines.map((text, i) => (
          <p
            key={i}
            className="font-serif text-paper-200 text-base leading-relaxed tracking-wide sm:text-lg"
          >
            {text}
            {/* Blinking cursor on the currently typing line */}
            {!finished && i === displayLines.length - 1 && (
              <span className="inline-block w-[2px] h-[1em] bg-paper-300 ml-0.5 align-text-bottom animate-pulse" />
            )}
          </p>
        ))}
      </div>

      {/* Action buttons */}
      <div
        className={`flex flex-col gap-3 w-full max-w-xs transition-opacity duration-500 ${
          showButtons ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleNewGame}
          className="w-full py-3 border border-paper-400 text-paper-200 hover:bg-paper-400/10 transition-colors text-sm tracking-wider font-serif"
        >
          開始調查
        </button>
        {savedExists && (
          <button
            onClick={handleContinue}
            className="w-full py-3 text-paper-500 hover:text-paper-300 transition-colors text-sm font-serif"
          >
            繼續調查
          </button>
        )}
      </div>

      {/* Skip hint */}
      {!finished && (
        <p className="absolute bottom-8 text-paper-500/60 text-xs font-serif animate-pulse">
          點擊畫面跳過
        </p>
      )}
    </div>
  )
}
