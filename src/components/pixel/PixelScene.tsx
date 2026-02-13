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
  const [reducedMotion, setReducedMotion] = useState(false)
  const initializedRef = useRef(false)

  // Detect reduced motion preference
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mql.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mql.addEventListener('change', handler)

    return () => {
      mql.removeEventListener('change', handler)
    }
  }, [])

  // Stable callback refs
  const onSetupRef = useRef(onSetup)
  onSetupRef.current = onSetup
  const onProgressRef = useRef(onProgress)
  onProgressRef.current = onProgress

  // Track whether the current init should be cancelled
  const cancelledRef = useRef(false)

  // Init/destroy PixiJS app based on viewport visibility
  const initApp = useCallback(async () => {
    const el = containerRef.current
    if (!el || appRef.current || reducedMotion) return

    cancelledRef.current = false
    const app = new Application()

    try {
      await app.init({
        width: BASE_WIDTH,
        height: BASE_HEIGHT,
        backgroundAlpha: 0,
        resolution: 1,
        antialias: false,
      })
    } catch {
      // WebGL context creation failed — silently degrade
      return
    }

    if (cancelledRef.current) {
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
  }, [reducedMotion])

  const destroyApp = useCallback(() => {
    cancelledRef.current = true
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

  // Reduced-motion fallback
  if (reducedMotion) {
    return (
      <div
        className="w-full max-w-2xl mx-auto bg-ink-900/40 border border-ink-800/60 rounded-sm overflow-hidden"
        style={{ aspectRatio: `${BASE_WIDTH}/${BASE_HEIGHT}` }}
        role="img"
        aria-label={ariaLabel}
      >
        <div className="w-full h-full flex flex-col items-center justify-center px-6 py-4 text-center">
          <div className="w-8 h-px bg-ink-700 mb-3" />
          <p className="text-ink-300 text-sm leading-relaxed">
            {fallbackText ?? ariaLabel}
          </p>
          <div className="w-8 h-px bg-ink-700 mt-3" />
        </div>
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
