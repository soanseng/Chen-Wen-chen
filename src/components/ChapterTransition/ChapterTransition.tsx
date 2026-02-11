import { useState, useEffect } from 'react'

import { CHAPTERS, CHAPTER_TRANSITIONS } from '../../data/index.ts'

// ===== Animation timing =====

const FADE_IN_MS = 800
const HOLD_MS = 2800
const FADE_OUT_MS = 800

// ===== Types =====

/**
 * Animation phases:
 *   mounting  -- rendered at opacity 0, no transition (one frame)
 *   fadeIn    -- opacity transitions to 1 over FADE_IN_MS
 *   hold     -- fully visible, text settles for HOLD_MS
 *   fadeOut   -- opacity transitions to 0 over FADE_OUT_MS, then calls onComplete
 *   done     -- unmounted
 */
type Phase = 'mounting' | 'fadeIn' | 'hold' | 'fadeOut' | 'done'

interface ChapterTransitionProps {
  chapterNumber: number
  onComplete: () => void
}

// ===== Component =====

export default function ChapterTransition({
  chapterNumber,
  onComplete,
}: ChapterTransitionProps): React.JSX.Element | null {
  const [phase, setPhase] = useState<Phase>('mounting')

  const chapter = CHAPTERS[chapterNumber]

  // Phase: mounting -> fadeIn (after one frame so the browser paints opacity 0 first)
  useEffect(() => {
    if (phase !== 'mounting') return
    const frame = requestAnimationFrame(() => {
      setPhase('fadeIn')
    })
    return () => cancelAnimationFrame(frame)
  }, [phase])

  // Phase: fadeIn -> hold (after the CSS fade-in transition completes)
  useEffect(() => {
    if (phase !== 'fadeIn') return
    const timer = setTimeout(() => setPhase('hold'), FADE_IN_MS)
    return () => clearTimeout(timer)
  }, [phase])

  // Phase: hold -> fadeOut (after the text has settled)
  useEffect(() => {
    if (phase !== 'hold') return
    const timer = setTimeout(() => setPhase('fadeOut'), HOLD_MS)
    return () => clearTimeout(timer)
  }, [phase])

  // Phase: fadeOut -> done (after the CSS fade-out transition completes)
  useEffect(() => {
    if (phase !== 'fadeOut') return
    const timer = setTimeout(() => {
      setPhase('done')
      onComplete()
    }, FADE_OUT_MS)
    return () => clearTimeout(timer)
  }, [phase, onComplete])

  if (phase === 'done' || !chapter) return null

  // Compute opacity and CSS transition based on current phase
  const isVisible = phase === 'fadeIn' || phase === 'hold'
  const opacity = isVisible ? 1 : 0

  let transition: string
  if (phase === 'mounting') {
    // No transition on first paint so the element appears at opacity 0 instantly
    transition = 'none'
  } else if (phase === 'fadeIn') {
    transition = `opacity ${FADE_IN_MS}ms ease-in-out`
  } else {
    transition = `opacity ${FADE_OUT_MS}ms ease-in-out`
  }

  // Format chapter label: 序章 for prologue, 第N章 otherwise
  const chapterLabel = chapterNumber === 0 ? '序章' : `第${chapterNumber}章`
  const transitionData = CHAPTER_TRANSITIONS[chapterNumber]
  const mood = transitionData?.mood
  const narrative = transitionData?.narrative ?? []

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink-900 px-6 select-none"
      style={{ opacity, transition }}
    >
      {/* Chapter number label */}
      <p className="font-serif text-xs tracking-[0.25em] text-paper-400 uppercase mb-6">
        {chapterLabel}
      </p>

      {/* Chapter title */}
      <h1 className="font-serif text-3xl font-semibold text-paper-200 tracking-wide sm:text-4xl">
        {chapter.subtitle}
      </h1>

      {/* Mood text */}
      {mood && (
        <p className="font-serif text-sm text-paper-400/80 mt-4 tracking-wider">
          {mood}
        </p>
      )}

      {/* Transition narrative text */}
      {narrative.length > 0 && (
        <div className="mt-8 max-w-sm text-center space-y-2">
          {narrative.map((line, i) => (
            <p key={i} className="font-serif text-sm text-paper-300/70 leading-relaxed italic">
              {line}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
