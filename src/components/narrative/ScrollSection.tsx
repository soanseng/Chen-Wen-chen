import { type ReactNode } from 'react'
import { useScrollProgress } from '@/hooks/useScrollProgress'

interface ScrollSectionProps {
  children: (progress: number, isInView: boolean) => ReactNode
  /** Minimum height of the scroll section (default: "100vh") */
  minHeight?: string
  className?: string
  /** aria-label for accessibility */
  'aria-label'?: string
}

export function ScrollSection({
  children,
  minHeight = '100vh',
  className = '',
  'aria-label': ariaLabel,
}: ScrollSectionProps) {
  const { ref, progress, isInView } = useScrollProgress()

  return (
    <section
      ref={ref}
      className={`relative ${className}`}
      style={{ minHeight }}
      aria-label={ariaLabel}
    >
      {children(progress, isInView)}
    </section>
  )
}
