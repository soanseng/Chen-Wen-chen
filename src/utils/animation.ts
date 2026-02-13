import type { CSSProperties } from 'react'

/** Cubic ease-out: fast start, slow finish */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

/**
 * Calculate staggered fade-in + slide-up style for a paragraph.
 *
 * Driven by scroll progress (0-1) through the parent ScrollSection.
 * Each paragraph starts appearing at a staggered offset so they
 * cascade in as the user scrolls.
 *
 * @param progress - Scroll progress through section (0-1)
 * @param index    - Item index (0-based)
 * @param total    - Total number of items
 */
export function staggeredFadeIn(
  progress: number,
  index: number,
  total: number,
): CSSProperties {
  // The progress range where items animate in:
  // ~0.10 (element just entered viewport) to ~0.45 (roughly centered)
  const WINDOW_START = 0.1
  const WINDOW_END = 0.48
  const range = WINDOW_END - WINDOW_START

  // Distribute start points across the window
  const itemCount = Math.max(total, 1)
  const staggerStep = range / (itemCount + 1)
  const itemStart = WINDOW_START + index * staggerStep
  const itemDuration = staggerStep * 2 // overlap for smooth cascading

  const t = clamp((progress - itemStart) / itemDuration, 0, 1)
  const eased = easeOutCubic(t)

  return {
    opacity: eased,
    transform: `translateY(${(1 - eased) * 20}px)`,
    willChange: eased < 1 ? 'opacity, transform' : 'auto',
  }
}

/**
 * Smooth fade-in style for a single element (e.g. ChapterTitle).
 * Fades in as scroll progress passes the threshold.
 *
 * @param progress  - Scroll progress (0-1)
 * @param fadeStart - Progress at which fade begins (default 0.05)
 * @param fadeEnd   - Progress at which element is fully visible (default 0.3)
 */
export function fadeIn(
  progress: number,
  fadeStart = 0.05,
  fadeEnd = 0.3,
): CSSProperties {
  const t = clamp((progress - fadeStart) / (fadeEnd - fadeStart), 0, 1)
  const eased = easeOutCubic(t)

  return {
    opacity: eased,
    transform: `translateY(${(1 - eased) * 12}px)`,
    willChange: eased < 1 ? 'opacity, transform' : 'auto',
  }
}

/**
 * Animated line-draw effect for dividers.
 * Returns a width percentage (0-100) based on progress.
 */
export function lineDrawProgress(
  progress: number,
  drawStart = 0.2,
  drawEnd = 0.5,
): number {
  const t = clamp((progress - drawStart) / (drawEnd - drawStart), 0, 1)
  return easeOutCubic(t) * 100
}
