import { useCallback, useRef } from 'react'
import { Application, Container, Graphics } from 'pixi.js'
import { PixelScene, type PixelSceneProps, BASE_WIDTH, BASE_HEIGHT } from '../PixelScene'

// Colors — the darkest scene
const DARK_BG = 0x0a0a0e
const LAMP_WHITE = 0xf0f0e8
const LAMP_BODY = 0x5a5a5a
const TABLE_COLOR = 0x3a3a3a
const SKIN = 0xc9a882
const SHIRT = 0xd4cfc3
const HAIR = 0x1c1814
const SILHOUETTE = 0x12121a
const TAPE_BODY = 0x4a4a4a
const TAPE_REEL = 0x2a2a2a
const PAPER = 0xe8e4db

/**
 * Scene 4: interrogation-room — Garrison Command Interrogation Room
 * Chapter 4: The Interrogation
 * Mood: Darkness, oppression, fear — the darkest tone of the entire piece
 */
export function InterrogationRoomScene({ progress, isInView }: PixelSceneProps) {
  const frameRef = useRef(0)
  const lampRef = useRef<Graphics | null>(null)
  const lightConeRef = useRef<Graphics | null>(null)
  const tapeReelRef = useRef<Graphics | null>(null)

  const onSetup = useCallback((app: Application, scene: Container) => {
    // Pure dark background
    const bg = new Graphics()
    bg.rect(0, 0, BASE_WIDTH, BASE_HEIGHT)
    bg.fill(DARK_BG)
    scene.addChild(bg)

    // Light cone from ceiling lamp (cone shape)
    const lightCone = new Graphics()
    lightConeRef.current = lightCone
    scene.addChild(lightCone)

    // Table
    const table = new Graphics()
    table.rect(100, 105, 120, 6).fill(TABLE_COLOR)
    table.rect(110, 111, 4, 30).fill(TABLE_COLOR)
    table.rect(210, 111, 4, 30).fill(TABLE_COLOR)
    scene.addChild(table)

    // Papers on table
    const papers = new Graphics()
    papers.rect(140, 100, 14, 8).fill(PAPER)
    papers.rect(142, 101, 10, 1).fill(0x9a8f7d)
    papers.rect(142, 103, 8, 1).fill(0x9a8f7d)
    papers.rect(142, 105, 6, 1).fill(0x9a8f7d)
    // Exit permit document
    papers.rect(160, 99, 12, 8).fill(PAPER)
    papers.rect(162, 100, 8, 1).fill(0x9a8f7d)
    papers.rect(162, 103, 4, 3).fill({ color: 0xc23b22, alpha: 0.5 })
    scene.addChild(papers)

    // Tape recorder
    const tapeRecorder = new Graphics()
    tapeRecorder.rect(185, 96, 24, 12).fill(TAPE_BODY)
    tapeRecorder.rect(185, 95, 24, 2).fill(0x5a5a5a)
    scene.addChild(tapeRecorder)

    // Tape reels (will rotate)
    const tapeReels = new Graphics()
    tapeReelRef.current = tapeReels
    scene.addChild(tapeReels)

    // Chen Wen-chen (right side of table, facing left)
    const chen = new Container()
    chen.x = 215
    chen.y = 75

    const chenGfx = new Graphics()
    // Head
    chenGfx.rect(4, 0, 8, 6).fill(SKIN)
    chenGfx.rect(4, 0, 8, 2).fill(HAIR)
    chenGfx.rect(4, 0, 2, 4).fill(HAIR)
    // Glasses
    chenGfx.rect(5, 2, 3, 2).fill(0x332b25)
    chenGfx.rect(9, 2, 3, 2).fill(0x332b25)
    // Body (slightly hunched, fatigued)
    chenGfx.rect(2, 6, 12, 14).fill(SHIRT)
    // Arms on table
    chenGfx.rect(-2, 16, 6, 3).fill(SKIN)
    chenGfx.rect(12, 16, 6, 3).fill(SKIN)
    // Seated legs
    chenGfx.rect(3, 20, 5, 8).fill(0x3a3530)
    chenGfx.rect(8, 20, 5, 8).fill(0x3a3530)
    chen.addChild(chenGfx)
    scene.addChild(chen)

    // Interrogator silhouettes (left side, facing right)
    const interrogator1 = new Graphics()
    // Larger, more menacing silhouette
    interrogator1.rect(90, 68, 10, 8).fill(SILHOUETTE)
    interrogator1.rect(86, 76, 18, 18).fill(SILHOUETTE)
    interrogator1.rect(88, 94, 6, 10).fill(SILHOUETTE)
    interrogator1.rect(96, 94, 6, 10).fill(SILHOUETTE)
    // Arm reaching toward table
    interrogator1.rect(102, 82, 10, 3).fill(SILHOUETTE)
    scene.addChild(interrogator1)

    const interrogator2 = new Graphics()
    // Second figure, slightly behind
    interrogator2.rect(60, 72, 8, 6).fill(SILHOUETTE)
    interrogator2.rect(58, 78, 12, 14).fill(SILHOUETTE)
    interrogator2.rect(59, 92, 4, 8).fill(SILHOUETTE)
    interrogator2.rect(65, 92, 4, 8).fill(SILHOUETTE)
    interrogator2.alpha = 0.7
    scene.addChild(interrogator2)

    // Chair for Chen
    const chair = new Graphics()
    chair.rect(218, 95, 12, 3).fill(0x3a3a3a)
    chair.rect(219, 98, 2, 8).fill(0x3a3a3a)
    chair.rect(228, 98, 2, 8).fill(0x3a3a3a)
    chair.rect(228, 76, 2, 20).fill(0x3a3a3a)
    scene.addChild(chair)

    // Lamp fixture
    const lamp = new Graphics()
    lampRef.current = lamp
    scene.addChild(lamp)

    // Animation
    const tickerFn = () => {
      frameRef.current += 1

      const t = frameRef.current
      // Lamp sway: 1-2px horizontal offset
      const lampSway = Math.sin(t * 0.015) * 1.5
      const lampX = 160 + lampSway

      // Draw lamp
      if (lampRef.current) {
        lampRef.current.clear()
        // Wire
        lampRef.current.rect(lampX, 0, 1, 20).fill(0x5a5a5a)
        // Lamp shade
        lampRef.current.moveTo(lampX - 8, 20)
        lampRef.current.lineTo(lampX + 9, 20)
        lampRef.current.lineTo(lampX + 6, 26)
        lampRef.current.lineTo(lampX - 5, 26)
        lampRef.current.closePath()
        lampRef.current.fill(LAMP_BODY)
        // Bulb
        lampRef.current.rect(lampX - 1, 26, 3, 3).fill(LAMP_WHITE)
      }

      // Draw light cone (follows lamp sway)
      if (lightConeRef.current) {
        lightConeRef.current.clear()
        lightConeRef.current.moveTo(lampX - 6, 29)
        lightConeRef.current.lineTo(lampX + 7, 29)
        lightConeRef.current.lineTo(lampX + 50, BASE_HEIGHT)
        lightConeRef.current.lineTo(lampX - 49, BASE_HEIGHT)
        lightConeRef.current.closePath()
        lightConeRef.current.fill({ color: LAMP_WHITE, alpha: 0.06 })
        // Brighter core
        lightConeRef.current.moveTo(lampX - 3, 29)
        lightConeRef.current.lineTo(lampX + 4, 29)
        lightConeRef.current.lineTo(lampX + 30, BASE_HEIGHT)
        lightConeRef.current.lineTo(lampX - 29, BASE_HEIGHT)
        lightConeRef.current.closePath()
        lightConeRef.current.fill({ color: LAMP_WHITE, alpha: 0.04 })
      }

      // Tape reel rotation
      if (tapeReelRef.current) {
        tapeReelRef.current.clear()
        const reelAngle = t * 0.05
        // Left reel
        tapeReelRef.current.circle(191, 101, 3).fill(TAPE_REEL)
        const lx = Math.cos(reelAngle) * 1.5
        const ly = Math.sin(reelAngle) * 1.5
        tapeReelRef.current.rect(191 + lx - 0.5, 101 + ly - 0.5, 1, 1).fill(0x5a5a5a)
        // Right reel
        tapeReelRef.current.circle(203, 101, 3).fill(TAPE_REEL)
        const rx = Math.cos(reelAngle + Math.PI) * 1.5
        const ry = Math.sin(reelAngle + Math.PI) * 1.5
        tapeReelRef.current.rect(203 + rx - 0.5, 101 + ry - 0.5, 1, 1).fill(0x5a5a5a)
      }
    }
    app.ticker.add(tickerFn)

    return () => {
      app.ticker.remove(tickerFn)
      lampRef.current = null
      lightConeRef.current = null
      tapeReelRef.current = null
    }
  }, [])

  const onProgress = useCallback((_progress: number, scene: Container) => {
    // Slow fade in from pure black
    scene.alpha = Math.min(1, _progress * 2.5)
  }, [])

  return (
    <PixelScene
      progress={progress}
      isInView={isInView}
      ariaLabel="警備總部保安處審訊室：冷白吊燈照亮金屬桌面，陳文成坐在桌子一側，對面是審訊者的剪影"
      onSetup={onSetup}
      onProgress={onProgress}
      fallbackText="[ 場景：審訊室——吊燈冷白光下的壓迫空間 ]"
    />
  )
}
