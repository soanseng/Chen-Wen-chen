import { useState, useEffect, useRef, useCallback } from 'react'

interface ScrollProgressOptions {
  /** Threshold for IntersectionObserver (default: 0) */
  threshold?: number
  /** Root margin for IntersectionObserver (default: "0px") */
  rootMargin?: string
}

interface ScrollProgressResult<T extends HTMLElement> {
  ref: React.RefObject<T | null>
  /** 0–1 representing scroll progress through the element */
  progress: number
  /** Whether the element is currently visible in the viewport */
  isInView: boolean
}

export function useScrollProgress<T extends HTMLElement = HTMLDivElement>(
  options: ScrollProgressOptions = {},
): ScrollProgressResult<T> {
  const { rootMargin = '0px' } = options
  const ref = useRef<T | null>(null)
  const [progress, setProgress] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const rafRef = useRef<number>(0)

  const calculateProgress = useCallback(() => {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const elementHeight = rect.height

    // progress = 0 when element top enters viewport bottom
    // progress = 1 when element bottom exits viewport top
    const totalTravel = windowHeight + elementHeight
    const traveled = windowHeight - rect.top
    const p = Math.max(0, Math.min(1, traveled / totalTravel))

    setProgress(p)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0, rootMargin },
    )

    observer.observe(el)

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(calculateProgress)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    calculateProgress()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [rootMargin, calculateProgress])

  return { ref, progress, isInView }
}
