import { useRef, useEffect, useCallback } from 'react'
import { Application } from 'pixi.js'

interface PixiCanvasProps {
  width: number
  height: number
  onAppReady: (app: Application) => void
  className?: string
}

export function PixiCanvas({ width, height, onAppReady, className }: PixiCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const appRef = useRef<Application | null>(null)

  const stableOnAppReady = useCallback(onAppReady, [onAppReady])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const app = new Application()
    appRef.current = app

    let cancelled = false

    const initApp = async () => {
      await app.init({
        width,
        height,
        backgroundAlpha: 0,
        resolution: 1,
        antialias: false,
      })

      if (cancelled) {
        app.destroy(true)
        return
      }

      container.appendChild(app.canvas as HTMLCanvasElement)
      stableOnAppReady(app)
    }

    initApp()

    return () => {
      cancelled = true
      if (appRef.current) {
        appRef.current.destroy(true)
        appRef.current = null
      }
    }
  }, [width, height, stableOnAppReady])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ imageRendering: 'pixelated' }}
      aria-hidden="true"
    />
  )
}
