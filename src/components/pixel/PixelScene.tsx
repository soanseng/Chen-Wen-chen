import { useRef, useEffect, useState, useCallback } from 'react'
import { Application, Container } from 'pixi.js'

/** Standard pixel art base resolution */
export const BASE_WIDTH = 320
export const BASE_HEIGHT = 180

export interface PixelSceneProps {
  progress: number
  isInView: boolean
}

interface PixelSceneWrapperProps extends PixelSceneProps {
  /** Accessible label describing the scene content */
  ariaLabel: string
  /** Called when PixiJS app is ready; return cleanup function */
  onSetup: (app: Application, container: Container) => (() => void) | void
  /** Called each frame when progress changes */
  onProgress?: (progress: number, container: Container) => void
  /** Fallback description for mobile / reduced-motion */
  fallbackText?: string
}

/**
 * Shared wrapper for all pixel art scenes.
 * Handles: responsive scaling, mobile degradation, reduced-motion,
 * lazy init/destroy, and aria-label.
 */
export function PixelScene({
  progress,
  isInView,
  ariaLabel,
  onSetup,
  onProgress,
  fallbackText,
}: PixelSceneWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const appRef = useRef<Application | null>(null)
  const sceneRef = useRef<Container | null>(null)
  const cleanupRef = useRef<(() => void) | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const initializedRef = useRef(false)

  // Detect mobile and reduced motion
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })

    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mql.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mql.addEventListener('change', handler)

    return () => {
      window.removeEventListener('resize', checkMobile)
      mql.removeEventListener('change', handler)
    }
  }, [])

  // Stable callback refs
  const onSetupRef = useRef(onSetup)
  onSetupRef.current = onSetup
  const onProgressRef = useRef(onProgress)
  onProgressRef.current = onProgress

  // Init/destroy PixiJS app based on viewport visibility
  const initApp = useCallback(async () => {
    const el = containerRef.current
    if (!el || appRef.current || isMobile || reducedMotion) return

    const app = new Application()
    let cancelled = false

    await app.init({
      width: BASE_WIDTH,
      height: BASE_HEIGHT,
      backgroundAlpha: 0,
      resolution: 1,
      antialias: false,
    })

    if (cancelled) {
      app.destroy(true)
      return
    }

    const canvas = app.canvas as HTMLCanvasElement
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.imageRendering = 'pixelated'
    el.appendChild(canvas)

    appRef.current = app

    const scene = new Container()
    app.stage.addChild(scene)
    sceneRef.current = scene

    const cleanup = onSetupRef.current(app, scene)
    if (cleanup) cleanupRef.current = cleanup

    initializedRef.current = true

    return () => {
      cancelled = true
    }
  }, [isMobile, reducedMotion])

  const destroyApp = useCallback(() => {
    if (cleanupRef.current) {
      cleanupRef.current()
      cleanupRef.current = null
    }
    if (appRef.current) {
      appRef.current.destroy(true)
      appRef.current = null
      sceneRef.current = null
    }
    initializedRef.current = false
  }, [])

  useEffect(() => {
    if (isInView && !initializedRef.current) {
      initApp()
    } else if (!isInView && initializedRef.current) {
      destroyApp()
    }

    return () => {
      destroyApp()
    }
  }, [isInView, initApp, destroyApp])

  // Update scene on progress change
  useEffect(() => {
    if (sceneRef.current && onProgressRef.current && initializedRef.current) {
      onProgressRef.current(progress, sceneRef.current)
    }
  }, [progress])

  // Mobile / reduced-motion fallback
  if (isMobile || reducedMotion) {
    return (
      <div
        className="w-full flex items-center justify-center bg-ink-950 border border-ink-800 rounded"
        style={{ aspectRatio: `${BASE_WIDTH}/${BASE_HEIGHT}` }}
        role="img"
        aria-label={ariaLabel}
      >
        <p className="text-ink-400 text-sm font-mono px-4 text-center">
          {fallbackText ?? ariaLabel}
        </p>
      </div>
    )
  }

  return (
    <div
      className="w-full max-w-4xl mx-auto"
      style={{ aspectRatio: `${BASE_WIDTH}/${BASE_HEIGHT}` }}
    >
      <div
        ref={containerRef}
        className="w-full h-full"
        role="img"
        aria-label={ariaLabel}
      />
    </div>
  )
}
