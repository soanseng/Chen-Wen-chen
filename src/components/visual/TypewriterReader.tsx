import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * Special typewriter-effect renderer for interrogation transcript DOC-INT-02.
 *
 * Text appears line-by-line simulating a recording playback:
 * - Bold text (wrapped in **) for the interrogator
 * - Italic text (wrapped in *) for Chen Wen-chen's responses
 * - 〔略〕 markers create visual pauses (longer delay)
 * - Player can click/tap to accelerate but cannot skip entirely
 * - Screen gradually darkens at the end
 */

interface TypewriterReaderProps {
  paragraphs: { index: number; text: string }[]
  onComplete: () => void
  isHighlighted: (index: number) => boolean
  onParagraphClick: (index: number, text: string) => void
}

// Timing constants
const LINE_DELAY_MS = 1200
const PAUSE_DELAY_MS = 2500 // for 〔略〕
const ACCELERATED_DELAY_MS = 200
const FINAL_DARK_DELAY_MS = 1500

type Phase = 'revealing' | 'complete' | 'darkening' | 'done'

export function TypewriterReader({
  paragraphs,
  onComplete,
  isHighlighted,
  onParagraphClick,
}: TypewriterReaderProps) {
  const [visibleCount, setVisibleCount] = useState(0)
  const [phase, setPhase] = useState<Phase>('revealing')
  const [darkOpacity, setDarkOpacity] = useState(0)
  const [accelerated, setAccelerated] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom as lines appear
  useEffect(() => {
    if (containerRef.current && visibleCount > 0) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [visibleCount])

  // Reveal lines one by one
  useEffect(() => {
    if (phase !== 'revealing') return
    if (visibleCount >= paragraphs.length) {
      setPhase('complete')
      return
    }

    const currentParagraph = paragraphs[visibleCount]
    const isPause = currentParagraph?.text.includes('〔略〕')
    const delay = accelerated
      ? ACCELERATED_DELAY_MS
      : isPause
        ? PAUSE_DELAY_MS
        : LINE_DELAY_MS

    timerRef.current = setTimeout(() => {
      setVisibleCount((c) => c + 1)
    }, delay)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [visibleCount, phase, paragraphs, accelerated])

  // After all lines revealed, darken screen
  useEffect(() => {
    if (phase !== 'complete') return

    const timer = setTimeout(() => {
      setPhase('darkening')
    }, FINAL_DARK_DELAY_MS)

    return () => clearTimeout(timer)
  }, [phase])

  // Darkening animation
  useEffect(() => {
    if (phase !== 'darkening') return

    let frame: number
    let start: number | null = null
    const duration = 3000

    function animate(timestamp: number) {
      if (start === null) start = timestamp
      const elapsed = timestamp - start
      const progress = Math.min(elapsed / duration, 1)
      setDarkOpacity(progress * 0.5) // max 50% darkness

      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      } else {
        setPhase('done')
        onComplete()
      }
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [phase, onComplete])

  const handleClick = useCallback(() => {
    if (phase === 'revealing') {
      setAccelerated(true)
    }
  }, [phase])

  return (
    <div className="relative" onClick={handleClick}>
      <div
        ref={containerRef}
        className="space-y-4 max-h-[70vh] overflow-y-auto"
      >
        {paragraphs.slice(0, visibleCount).map((paragraph) => {
          const highlighted = isHighlighted(paragraph.index)
          const isRevealed = phase === 'done' || phase === 'complete'

          return (
            <p
              key={paragraph.index}
              onClick={(e) => {
                if (isRevealed) {
                  e.stopPropagation()
                  onParagraphClick(paragraph.index, paragraph.text)
                }
              }}
              className={`
                leading-relaxed text-sm md:text-base
                px-3 py-2 rounded transition-all select-none
                ${paragraph.text.includes('〔略〕') ? 'text-ink-300 italic text-center tracking-widest' : ''}
                ${isRevealed ? 'cursor-pointer' : 'cursor-default'}
                ${highlighted ? 'bg-yellow-200/30 border-l-2 border-yellow-500' : isRevealed ? 'hover:bg-paper-200/60' : ''}
              `}
              style={{
                animation: 'fadeIn 0.6s ease-in-out',
              }}
            >
              {renderFormattedText(paragraph.text)}
            </p>
          )
        })}

        {/* Accelerate hint */}
        {phase === 'revealing' && visibleCount > 0 && !accelerated && (
          <p className="text-center text-ink-300 text-xs animate-pulse mt-4">
            點擊畫面可加速播放
          </p>
        )}
      </div>

      {/* Ending darkness overlay */}
      {darkOpacity > 0 && (
        <div
          className="fixed inset-0 bg-ink-900 pointer-events-none z-40 transition-none"
          style={{ opacity: darkOpacity }}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

/**
 * Parse simple markdown-like formatting:
 * **text** → bold (interrogator)
 * *text* → italic (Chen's responses)
 */
function renderFormattedText(text: string): React.ReactNode {
  // Split by bold (**...**) and italic (*...*)
  const parts: React.ReactNode[] = []
  let remaining = text
  let key = 0

  while (remaining.length > 0) {
    // Try bold first
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/)
    const italicMatch = remaining.match(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/)

    if (!boldMatch && !italicMatch) {
      parts.push(remaining)
      break
    }

    // Find whichever comes first
    const boldIdx = boldMatch ? remaining.indexOf(boldMatch[0]) : Infinity
    const italicIdx = italicMatch ? remaining.indexOf(italicMatch[0]) : Infinity

    if (boldIdx <= italicIdx && boldMatch) {
      if (boldIdx > 0) {
        parts.push(remaining.slice(0, boldIdx))
      }
      parts.push(
        <strong key={key++} className="text-ink-800 font-bold">
          {boldMatch[1]}
        </strong>,
      )
      remaining = remaining.slice(boldIdx + boldMatch[0].length)
    } else if (italicMatch) {
      if (italicIdx > 0) {
        parts.push(remaining.slice(0, italicIdx))
      }
      parts.push(
        <em key={key++} className="text-ink-500">
          {italicMatch[1]}
        </em>,
      )
      remaining = remaining.slice(italicIdx + italicMatch[0].length)
    }
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>
}
