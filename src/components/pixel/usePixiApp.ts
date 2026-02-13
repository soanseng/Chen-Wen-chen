import { useState, useCallback } from 'react'
import { Application } from 'pixi.js'

export function usePixiApp() {
  const [app, setApp] = useState<Application | null>(null)

  const onAppReady = useCallback((newApp: Application) => {
    setApp(newApp)
  }, [])

  return { app, onAppReady }
}
