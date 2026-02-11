import { useEffect, useRef } from 'react'
import { Application } from 'pixi.js'

export interface PixiCanvasProps {
  /** Called once the PixiJS Application has been initialised. */
  onAppReady?: (app: Application) => void
}

/**
 * Renders a PixiJS canvas as an absolute overlay.
 *
 * The canvas covers its nearest positioned ancestor with
 * `pointer-events: none` so it never intercepts DOM interactions.
 * It is intended for decorative effects only (stamps, paper textures,
 * chapter transitions).
 *
 * Handles React StrictMode double-mount correctly: the previous
 * Application is fully destroyed before a new one is created.
 */
export function PixiCanvas({ onAppReady }: PixiCanvasProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let destroyed = false
    const app = new Application()

    app
      .init({
        backgroundAlpha: 0,
        resizeTo: container,
        autoDensity: true,
        resolution: window.devicePixelRatio ?? 1,
      })
      .then(() => {
        if (destroyed) {
          app.destroy(true, { children: true })
          return
        }

        container.appendChild(app.canvas)
        onAppReady?.(app)
      })
      .catch((err: unknown) => {
        if (!destroyed) {
          console.error('PixiJS initialisation failed:', err)
        }
      })

    return () => {
      destroyed = true

      // If init() already resolved the app is fully constructed and safe
      // to tear down immediately. If init() is still in-flight, the
      // renderer does not exist yet and destroy() would throw -- the
      // `.then()` guard above handles that case instead.
      try {
        app.destroy(true, { children: true })
      } catch {
        // init() has not resolved yet; cleanup will happen in .then()
      }
    }
  }, [onAppReady])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    />
  )
}
