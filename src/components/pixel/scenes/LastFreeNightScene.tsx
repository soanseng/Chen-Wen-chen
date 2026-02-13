/**
 * Scene: Last Free Night (最後的自由之夜)
 * Chapter 3 Ending — July 1, 1981, Taipei residence
 * Mood: Heavy, suspenseful, Kentucky Route Zero style
 */

import { useCallback, useRef } from 'react'
import { Application, Container, Graphics } from 'pixi.js'
import { PixelScene, type PixelSceneProps, BASE_WIDTH, BASE_HEIGHT } from '../PixelScene'

// Color palette — extremely dark, moody, near-silhouette
const PURE_BLACK = 0x000000
const ROOM_DARK = 0x0A0A0C
const ROOM_SHADOW = 0x060608
const WALL_DARK = 0x0E0E12
const WINDOW_FRAME = 0x1A1A20
const NIGHT_SKY = 0x0C1220
const NIGHT_SKY_GLOW = 0x121828
const CITY_GLOW = 0x1A2030
const CITY_LIGHT_DIM = 0x3A4A5A
const CITY_LIGHT_WARM = 0x5A4A2A
const CITY_LIGHT_BLUE = 0x3A4A6A
const CITY_LIGHT_BRIGHT = 0x8A8A6A
const FIGURE_SILHOUETTE = 0x080810
const FIGURE_EDGE = 0x1A1A25
const WINDOW_GLOW = 0x202838
const CURTAIN_DARK = 0x0C0C14

export function LastFreeNightScene({ progress, isInView }: PixelSceneProps) {
  const frameRef = useRef(0)
  const sceneRef = useRef<Container | null>(null)
  const darknessRef = useRef<Graphics | null>(null)
  const cityLightsRef = useRef<Graphics | null>(null)

  const lightPositions = useRef([
    { x: 145, y: 48, c: CITY_LIGHT_DIM, speed: 0.03, phase: 0 },
    { x: 152, y: 52, c: CITY_LIGHT_WARM, speed: 0.05, phase: 1.2 },
    { x: 160, y: 46, c: CITY_LIGHT_BLUE, speed: 0.04, phase: 2.4 },
    { x: 168, y: 55, c: CITY_LIGHT_DIM, speed: 0.06, phase: 0.8 },
    { x: 175, y: 50, c: CITY_LIGHT_WARM, speed: 0.03, phase: 3.1 },
    { x: 140, y: 54, c: CITY_LIGHT_BLUE, speed: 0.05, phase: 1.9 },
    { x: 158, y: 58, c: CITY_LIGHT_BRIGHT, speed: 0.07, phase: 0.5 },
    { x: 180, y: 48, c: CITY_LIGHT_DIM, speed: 0.04, phase: 2.7 },
    { x: 148, y: 56, c: CITY_LIGHT_WARM, speed: 0.06, phase: 1.5 },
    { x: 170, y: 44, c: CITY_LIGHT_BLUE, speed: 0.03, phase: 3.8 },
    { x: 155, y: 42, c: CITY_LIGHT_DIM, speed: 0.05, phase: 0.3 },
    { x: 163, y: 50, c: CITY_LIGHT_WARM, speed: 0.04, phase: 2.1 },
  ])

  const onSetup = useCallback((app: Application, scene: Container) => {
    sceneRef.current = scene
    scene.alpha = 0

    // === ROOM (almost entirely dark) ===
    const room = new Graphics()
    room.rect(0, 0, BASE_WIDTH, BASE_HEIGHT).fill(ROOM_DARK)
    scene.addChild(room)

    // Subtle wall texture
    const wallTexture = new Graphics()
    wallTexture.rect(0, 0, BASE_WIDTH, 120).fill(WALL_DARK)
    wallTexture.alpha = 0.3
    scene.addChild(wallTexture)

    // === WINDOW (center, the ONLY light source) ===
    // Window frame
    const windowFrame = new Graphics()
    windowFrame.rect(130, 25, 60, 55).fill(WINDOW_FRAME)
    scene.addChild(windowFrame)

    // Window glass — night sky
    const windowGlass = new Graphics()
    windowGlass.rect(133, 28, 54, 49).fill(NIGHT_SKY)
    // Slight glow at horizon
    windowGlass.rect(133, 55, 54, 22).fill(NIGHT_SKY_GLOW)
    windowGlass.rect(133, 65, 54, 12).fill(CITY_GLOW)
    scene.addChild(windowGlass)

    // Window cross frame
    const windowCross = new Graphics()
    windowCross.rect(159, 28, 2, 49).fill(WINDOW_FRAME)
    windowCross.rect(133, 51, 54, 2).fill(WINDOW_FRAME)
    scene.addChild(windowCross)

    // Taipei cityscape silhouette (minimal, abstract)
    const cityscape = new Graphics()
    cityscape.rect(135, 60, 6, 17).fill(ROOM_SHADOW)
    cityscape.rect(143, 56, 4, 21).fill(ROOM_SHADOW)
    cityscape.rect(149, 62, 8, 15).fill(ROOM_SHADOW)
    cityscape.rect(161, 58, 3, 19).fill(ROOM_SHADOW)
    cityscape.rect(166, 63, 7, 14).fill(ROOM_SHADOW)
    cityscape.rect(175, 60, 4, 17).fill(ROOM_SHADOW)
    cityscape.rect(181, 65, 4, 12).fill(ROOM_SHADOW)
    scene.addChild(cityscape)

    // City lights (tiny twinkling dots)
    const cityLights = new Graphics()
    cityLightsRef.current = cityLights
    scene.addChild(cityLights)

    // Curtain edges (dark fabric at window edges)
    const curtains = new Graphics()
    curtains.rect(128, 22, 6, 60).fill(CURTAIN_DARK)
    curtains.rect(186, 22, 6, 60).fill(CURTAIN_DARK)
    scene.addChild(curtains)

    // Window light spill on floor (very subtle)
    const lightSpill = new Graphics()
    lightSpill.moveTo(133, 80).lineTo(120, 130).lineTo(200, 130).lineTo(187, 80).closePath().fill(WINDOW_GLOW)
    lightSpill.alpha = 0.08
    scene.addChild(lightSpill)

    // === CHEN WEN-CHEN SILHOUETTE (sitting at window, back view) ===
    const figure = new Graphics()
    // Head (nearly black silhouette)
    figure.circle(160, 72, 5).fill(FIGURE_SILHOUETTE)
    // Edge light on head (rim light from window)
    figure.rect(163, 69, 1, 5).fill(FIGURE_EDGE)
    // Shoulders and torso
    figure.rect(150, 78, 20, 16).fill(FIGURE_SILHOUETTE)
    // Slight shoulder definition
    figure.rect(148, 78, 2, 4).fill(FIGURE_SILHOUETTE)
    figure.rect(170, 78, 2, 4).fill(FIGURE_SILHOUETTE)
    // Edge light on shoulder
    figure.rect(170, 79, 1, 10).fill(FIGURE_EDGE)
    // Lower body merging into darkness
    figure.rect(148, 94, 24, 20).fill(FIGURE_SILHOUETTE)
    scene.addChild(figure)

    // === ROOM FURNITURE (barely visible shapes) ===
    const furniture = new Graphics()
    // Chair suggestion
    furniture.rect(142, 95, 36, 3).fill(ROOM_SHADOW)
    furniture.rect(143, 98, 2, 15).fill(ROOM_SHADOW)
    furniture.rect(176, 98, 2, 15).fill(ROOM_SHADOW)
    // Table edge in darkness
    furniture.rect(40, 90, 60, 3).fill(ROOM_SHADOW)
    furniture.alpha = 0.4
    scene.addChild(furniture)

    // === DARKNESS OVERLAY (for fade-to-black) ===
    const darkness = new Graphics()
    darkness.rect(0, 0, BASE_WIDTH, BASE_HEIGHT).fill(PURE_BLACK)
    darkness.alpha = 0
    darknessRef.current = darkness
    scene.addChild(darkness)

    // === ANIMATION TICKER ===
    const tickerCb = () => {
      frameRef.current++
      const frame = frameRef.current

      // City light twinkle
      const lights = cityLightsRef.current
      if (lights) {
        lights.clear()
        for (const lp of lightPositions.current) {
          const brightness = Math.sin(frame * lp.speed + lp.phase)
          if (brightness > -0.2) {
            lights.rect(lp.x, lp.y, 1, 1).fill(lp.c)
          }
        }
        // Keep existing alpha from darkness interaction
        lights.alpha = Math.max(0.3, 1 - (darknessRef.current?.alpha ?? 0) * 1.5)
      }
    }

    app.ticker.add(tickerCb)

    return () => {
      app.ticker.remove(tickerCb)
    }
  }, [])

  const onProgress = useCallback((p: number) => {
    const scene = sceneRef.current
    if (!scene) return

    // Fade in at start
    if (p < 0.3) {
      scene.alpha = Math.min(1, p * 4)
    } else {
      scene.alpha = 1
    }

    // CRITICAL: Fade to black from progress 0.5 → 1.0
    // At p=0, scene is dim but visible
    // At p=1, scene is nearly pure black
    const darkness = darknessRef.current
    if (darkness) {
      if (p <= 0.5) {
        darkness.alpha = p * 0.2 // subtle darkening from 0 to 0.1
      } else {
        // Accelerating fade to black
        const fadeT = (p - 0.5) * 2 // 0 to 1
        darkness.alpha = 0.1 + fadeT * fadeT * 0.85 // quadratic ease to ~0.95
      }
    }
  }, [])

  return (
    <PixelScene
      progress={progress}
      isInView={isInView}
      ariaLabel="1981年7月1日深夜，陳文成獨坐台北住所窗前，凝望城市夜景，這是他最後的自由之夜"
      onSetup={onSetup}
      onProgress={onProgress}
      fallbackText="七月一日深夜，陳文成獨自坐在窗前，台北的微弱燈火是唯一的光源。畫面逐漸沉入黑暗。"
    />
  )
}
