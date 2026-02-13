import { useState, useEffect, useRef } from 'react'

interface TypewriterTextProps {
  /** The full text to display */
  text: string
  /** Milliseconds per character (default: 40) */
  speed?: number
  /** Whether to start the animation (default: true) */
  active?: boolean
  /** Callback when typing completes */
  onComplete?: () => void
  className?: string
}

export function TypewriterText({
  text,
  speed = 40,
  active = true,
  onComplete,
  className = '',
}: TypewriterTextProps) {
  const [displayedCount, setDisplayedCount] = useState(0)
  const prefersReducedMotion = useRef(false)

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
  }, [])

  useEffect(() => {
    if (!active) return

    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion.current) {
      setDisplayedCount(text.length)
      onComplete?.()
      return
    }

    if (displayedCount >= text.length) {
      onComplete?.()
      return
    }

    const timer = setTimeout(() => {
      setDisplayedCount((prev) => prev + 1)
    }, speed)

    return () => clearTimeout(timer)
  }, [active, displayedCount, text.length, speed, onComplete])

  // Reset when text changes
  useEffect(() => {
    setDisplayedCount(0)
  }, [text])

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, displayedCount)}</span>
      {displayedCount < text.length && (
        <span
          className="inline-block w-[2px] h-[1em] bg-ink-100 animate-pulse align-text-bottom ml-px"
          aria-hidden="true"
        />
      )}
    </span>
  )
}
