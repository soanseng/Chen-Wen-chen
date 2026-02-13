import { useCallback, useRef } from 'react'
import { Application, Container, Graphics } from 'pixi.js'
import { PixelScene, type PixelSceneProps, BASE_WIDTH, BASE_HEIGHT } from '../PixelScene'

// Colors
const CEILING = 0x3a3a3a
const WALL_TOP = 0x4a4a4a
const WALL_BOTTOM = 0x333333
const FLOOR_TILE = 0x2a2520
const FLUORESCENT = 0xe8e8e8
const SIGN_BG = 0x2a4a6a
const SIGN_TEXT = 0xe8e4db
const COUNTER_COLOR = 0x5a5a5a
const SKIN = 0xc9a882
const SHIRT = 0xd4cfc3
const PANTS_DARK = 0x3a3530
const HAIR = 0x1c1814
const SHADOW_COLOR = 0x1a1a2a

/**
 * Scene 3: airport-return — Songshan Airport Arrival
 * Chapter 3: The Return
 * Mood: Outwardly calm, increasingly oppressive
 */
export function AirportReturnScene({ progress, isInView }: PixelSceneProps) {
  const frameRef = useRef(0)
  const shadowsRef = useRef<Graphics[]>([])

  const onSetup = useCallback((app: Application, scene: Container) => {
    // Ceiling
    const ceiling = new Graphics()
    ceiling.rect(0, 0, BASE_WIDTH, 30)
    ceiling.fill(CEILING)
    scene.addChild(ceiling)

    // Fluorescent lights
    const lights = new Graphics()
    lights.rect(40, 10, 60, 4).fill(FLUORESCENT)
    lights.rect(140, 10, 60, 4).fill(FLUORESCENT)
    lights.rect(240, 10, 60, 4).fill(FLUORESCENT)
    scene.addChild(lights)

    // Light glow
    const lightGlow = new Graphics()
    lightGlow.alpha = 0.08
    lightGlow.rect(30, 14, 80, 60).fill(FLUORESCENT)
    lightGlow.rect(130, 14, 80, 60).fill(FLUORESCENT)
    lightGlow.rect(230, 14, 80, 60).fill(FLUORESCENT)
    scene.addChild(lightGlow)

    // Walls gradient effect
    const walls = new Graphics()
    walls.rect(0, 30, BASE_WIDTH, 50).fill(WALL_TOP)
    walls.rect(0, 80, BASE_WIDTH, 30).fill(WALL_BOTTOM)
    scene.addChild(walls)

    // "入境" sign
    const sign = new Graphics()
    sign.rect(130, 35, 60, 16).fill(SIGN_BG)
    // Text placeholder (pixel blocks)
    sign.rect(140, 39, 6, 8).fill(SIGN_TEXT)
    sign.rect(148, 39, 6, 8).fill(SIGN_TEXT)
    sign.rect(158, 39, 6, 8).fill(SIGN_TEXT)
    sign.rect(166, 39, 6, 8).fill(SIGN_TEXT)
    scene.addChild(sign)

    // Floor
    const floor = new Graphics()
    floor.rect(0, 110, BASE_WIDTH, BASE_HEIGHT - 110).fill(FLOOR_TILE)
    // Tile lines
    for (let x = 0; x < BASE_WIDTH; x += 30) {
      floor.rect(x, 110, 1, BASE_HEIGHT - 110).fill({ color: 0x3a3530, alpha: 0.3 })
    }
    floor.rect(0, 140, BASE_WIDTH, 1).fill({ color: 0x3a3530, alpha: 0.3 })
    scene.addChild(floor)

    // Immigration counter
    const counter = new Graphics()
    counter.rect(180, 80, 50, 30).fill(COUNTER_COLOR)
    counter.rect(178, 78, 54, 4).fill(0x6a6a6a)
    // Window partition
    counter.rect(195, 60, 20, 20).fill({ color: 0x8a9aaa, alpha: 0.4 })
    counter.rect(195, 60, 20, 2).fill(0x5a5a5a)
    counter.rect(195, 78, 20, 2).fill(0x5a5a5a)
    scene.addChild(counter)

    // Immigration officer behind counter
    const officer = new Graphics()
    officer.rect(200, 64, 10, 6).fill(SKIN) // head
    officer.rect(200, 62, 10, 3).fill(0x2a3a2a) // cap
    officer.rect(198, 70, 14, 10).fill(0x3a4a3a) // uniform
    scene.addChild(officer)

    // Chen Wen-chen walking figure
    const chen = new Container()
    chen.x = 120
    chen.y = 100

    const chenBody = new Graphics()
    // Head
    chenBody.rect(4, 0, 8, 6).fill(SKIN)
    chenBody.rect(4, 0, 8, 2).fill(HAIR)
    chenBody.rect(4, 0, 2, 4).fill(HAIR)
    // Glasses
    chenBody.rect(5, 2, 3, 2).fill(0x332b25)
    chenBody.rect(9, 2, 3, 2).fill(0x332b25)
    // Body (shirt)
    chenBody.rect(2, 6, 12, 12).fill(SHIRT)
    // Pants
    chenBody.rect(3, 18, 4, 8).fill(PANTS_DARK)
    chenBody.rect(9, 18, 4, 8).fill(PANTS_DARK)
    // Shoes
    chenBody.rect(2, 26, 5, 2).fill(HAIR)
    chenBody.rect(9, 26, 5, 2).fill(HAIR)
    chen.addChild(chenBody)

    // Suitcase
    const suitcase = new Graphics()
    suitcase.rect(14, 16, 8, 10).fill(0x6a4a3a)
    suitcase.rect(16, 14, 4, 2).fill(0x5a3a2a)
    chen.addChild(suitcase)

    scene.addChild(chen)

    // Plainclothes shadows (2-3 lurking figures in background)
    const shadows: Graphics[] = []
    const shadowPositions = [
      { x: 280, y: 85 },
      { x: 30, y: 90 },
      { x: 300, y: 95 },
    ]

    for (const pos of shadowPositions) {
      const shadow = new Graphics()
      // Silhouette figure
      shadow.rect(pos.x, pos.y, 10, 6).fill(SHADOW_COLOR)
      shadow.rect(pos.x - 1, pos.y + 6, 12, 14).fill(SHADOW_COLOR)
      shadow.rect(pos.x, pos.y + 20, 4, 8).fill(SHADOW_COLOR)
      shadow.rect(pos.x + 6, pos.y + 20, 4, 8).fill(SHADOW_COLOR)
      shadow.alpha = 0.25
      scene.addChild(shadow)
      shadows.push(shadow)
    }
    shadowsRef.current = shadows

    // Passport / document with red stamp (subtle)
    const doc = new Graphics()
    doc.rect(195, 84, 12, 8).fill(0xe8e4db)
    doc.rect(197, 85, 8, 1).fill(0x9a8f7d)
    doc.rect(197, 87, 6, 1).fill(0x9a8f7d)
    doc.rect(200, 83, 6, 4).fill({ color: 0xc23b22, alpha: 0.6 })
    scene.addChild(doc)

    // Animation
    const tickerFn = () => {
      frameRef.current += 1

      // Shadow pulse animation
      for (let i = 0; i < shadows.length; i++) {
        const pulse = Math.sin(frameRef.current * 0.02 + i * 1.5) * 0.1
        shadows[i].alpha = 0.2 + pulse
      }
    }
    app.ticker.add(tickerFn)

    return () => {
      app.ticker.remove(tickerFn)
      shadowsRef.current = []
    }
  }, [])

  const onProgress = useCallback((_progress: number, scene: Container) => {
    // Fade in
    scene.alpha = Math.min(1, _progress * 3)

    // Darken scene as progress increases (growing oppression)
    const darken = _progress * 0.15
    const children = scene.children
    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      if (shadowsRef.current.includes(child as Graphics)) continue
      // Don't darken shadows further
    }

    // Shadows become more visible as progress increases
    for (const shadow of shadowsRef.current) {
      const baseAlpha = 0.2 + _progress * 0.3
      const pulse = Math.sin(frameRef.current * 0.02) * 0.1
      shadow.alpha = Math.min(0.6, baseAlpha + pulse - darken)
    }
  }, [])

  return (
    <PixelScene
      progress={progress}
      isInView={isInView}
      ariaLabel="1981年松山機場入境大廳：陳文成提著行李通過海關，暗處隱約可見便衣人員的身影"
      onSetup={onSetup}
      onProgress={onProgress}
      fallbackText="[ 場景：松山機場入境——便衣人員在暗處監視 ]"
    />
  )
}
