import { useCallback, useRef } from 'react'
import { Application, Container, Graphics } from 'pixi.js'
import { PixelScene, type PixelSceneProps, BASE_WIDTH, BASE_HEIGHT } from '../PixelScene'

// Colors
const SKY_DARK = 0x1a2030
const OCEAN = 0x1a2a3a
const PITTSBURGH_WARM = 0xd4a855
const TAIPEI_COLD = 0x3a5a7a
const PHONE_LINE = 0x4a8aaa
const INTERCEPT_RED = 0xc23b22
const FILE_COLOR = 0x5a6a4a
const BUILDING_DARK = 0x2a2a3a
const BUILDING_LIGHT = 0x6a5a4a

/**
 * Scene 2: surveillance-web — Cross-Pacific Surveillance Network
 * Chapter 2: Voices from Overseas
 * Mood: Unease, undercurrents, warm-to-cold shift
 * Progress-driven reveal: 0-0.3 base, 0.3-0.6 phone lines, 0.6-1.0 full network
 */
export function SurveillanceWebScene({ progress, isInView }: PixelSceneProps) {
  const frameRef = useRef(0)
  const elementsRef = useRef<{
    phoneLines: Graphics
    interceptMarks: Graphics
    fileIcons: Graphics
    cameraIcons: Graphics
    pulseDots: Graphics
  } | null>(null)

  const onSetup = useCallback((app: Application, scene: Container) => {
    // Sky
    const sky = new Graphics()
    sky.rect(0, 0, BASE_WIDTH, BASE_HEIGHT * 0.4)
    sky.fill(SKY_DARK)
    scene.addChild(sky)

    // Ocean
    const ocean = new Graphics()
    ocean.rect(0, BASE_HEIGHT * 0.4, BASE_WIDTH, BASE_HEIGHT * 0.3)
    ocean.fill(OCEAN)
    scene.addChild(ocean)

    // Ground
    const ground = new Graphics()
    ground.rect(0, BASE_HEIGHT * 0.7, BASE_WIDTH, BASE_HEIGHT * 0.3)
    ground.fill(0x1c1814)
    scene.addChild(ground)

    // Pittsburgh skyline (left, warm)
    const pittsburgh = new Graphics()
    // Bridge silhouette
    pittsburgh.rect(10, 90, 60, 3).fill(BUILDING_LIGHT)
    pittsburgh.rect(15, 70, 4, 20).fill(BUILDING_LIGHT)
    pittsburgh.rect(55, 70, 4, 20).fill(BUILDING_LIGHT)
    // Buildings
    pittsburgh.rect(20, 50, 12, 50).fill(BUILDING_LIGHT)
    pittsburgh.rect(35, 40, 10, 60).fill(0x7a6a5a)
    pittsburgh.rect(48, 55, 14, 45).fill(BUILDING_LIGHT)
    pittsburgh.rect(65, 60, 8, 40).fill(0x7a6a5a)
    // Warm window lights
    pittsburgh.rect(22, 55, 2, 2).fill(PITTSBURGH_WARM)
    pittsburgh.rect(26, 60, 2, 2).fill(PITTSBURGH_WARM)
    pittsburgh.rect(37, 45, 2, 2).fill(PITTSBURGH_WARM)
    pittsburgh.rect(37, 52, 2, 2).fill(PITTSBURGH_WARM)
    pittsburgh.rect(50, 60, 2, 2).fill(PITTSBURGH_WARM)
    pittsburgh.rect(50, 68, 2, 2).fill(PITTSBURGH_WARM)
    pittsburgh.rect(58, 65, 2, 2).fill(PITTSBURGH_WARM)
    scene.addChild(pittsburgh)

    // Taipei skyline (right, cold)
    const taipei = new Graphics()
    // Buildings
    taipei.rect(230, 45, 14, 55).fill(BUILDING_DARK)
    taipei.rect(248, 35, 10, 65).fill(0x3a3a4a)
    taipei.rect(262, 50, 16, 50).fill(BUILDING_DARK)
    taipei.rect(282, 55, 12, 45).fill(0x3a3a4a)
    taipei.rect(298, 60, 14, 40).fill(BUILDING_DARK)
    // Cold window lights
    taipei.rect(232, 50, 2, 2).fill(TAIPEI_COLD)
    taipei.rect(236, 58, 2, 2).fill(TAIPEI_COLD)
    taipei.rect(250, 40, 2, 2).fill(TAIPEI_COLD)
    taipei.rect(250, 50, 2, 2).fill(TAIPEI_COLD)
    taipei.rect(265, 55, 2, 2).fill(TAIPEI_COLD)
    taipei.rect(270, 65, 2, 2).fill(TAIPEI_COLD)
    taipei.rect(284, 60, 2, 2).fill(TAIPEI_COLD)
    // Garrison Command HQ signifier (antenna)
    taipei.rect(252, 28, 2, 8).fill(0x5a5a6a)
    taipei.rect(248, 28, 10, 2).fill(0x5a5a6a)
    scene.addChild(taipei)

    // Book/study room indicator on Pittsburgh side
    const studyRoom = new Graphics()
    studyRoom.rect(30, 80, 12, 10).fill(0x5c4a3a)
    studyRoom.rect(32, 78, 8, 4).fill(PITTSBURGH_WARM)
    scene.addChild(studyRoom)

    // Phone lines (5 lines for Rainbow Data 5 records) - hidden initially
    const phoneLines = new Graphics()
    phoneLines.alpha = 0
    scene.addChild(phoneLines)

    // Intercept marks on mail - hidden initially
    const interceptMarks = new Graphics()
    interceptMarks.alpha = 0
    scene.addChild(interceptMarks)

    // File/document icons - hidden initially
    const fileIcons = new Graphics()
    fileIcons.alpha = 0
    scene.addChild(fileIcons)

    // Camera/surveillance icons - hidden initially
    const cameraIcons = new Graphics()
    cameraIcons.alpha = 0
    scene.addChild(cameraIcons)

    // Pulse dots on phone lines
    const pulseDots = new Graphics()
    pulseDots.alpha = 0
    scene.addChild(pulseDots)

    elementsRef.current = { phoneLines, interceptMarks, fileIcons, cameraIcons, pulseDots }

    // Draw static content for progressive reveal
    // Phone lines across ocean
    const lineYs = [72, 80, 88, 96, 104]
    phoneLines.setStrokeStyle({ width: 1, color: PHONE_LINE, alpha: 0.6 })
    for (const y of lineYs) {
      phoneLines.moveTo(75, y)
      phoneLines.lineTo(230, y - 10)
      phoneLines.stroke()
    }

    // Intercept marks (letters with red X)
    const mailPositions = [
      { x: 120, y: 68 },
      { x: 150, y: 82 },
      { x: 170, y: 74 },
    ]
    for (const pos of mailPositions) {
      // Envelope
      interceptMarks.rect(pos.x, pos.y, 10, 7).fill(0xe8e4db)
      interceptMarks.moveTo(pos.x, pos.y)
      interceptMarks.lineTo(pos.x + 5, pos.y + 4)
      interceptMarks.lineTo(pos.x + 10, pos.y)
      interceptMarks.stroke({ width: 1, color: 0x9a8f7d })
      // Red intercept stamp
      interceptMarks.rect(pos.x + 2, pos.y + 1, 6, 5).fill({ color: INTERCEPT_RED, alpha: 0.7 })
    }

    // File icons (surveillance files)
    const filePositions = [
      { x: 240, y: 80 },
      { x: 255, y: 88 },
      { x: 270, y: 76 },
      { x: 285, y: 84 },
    ]
    for (const pos of filePositions) {
      fileIcons.rect(pos.x, pos.y, 8, 10).fill(FILE_COLOR)
      fileIcons.rect(pos.x, pos.y, 8, 2).fill(0x7a8a6a)
      // "Classified" line
      fileIcons.rect(pos.x + 1, pos.y + 4, 6, 1).fill(0x3a4a2a)
      fileIcons.rect(pos.x + 1, pos.y + 6, 4, 1).fill(0x3a4a2a)
    }

    // Camera icons
    const camPositions = [
      { x: 220, y: 42 },
      { x: 295, y: 50 },
    ]
    for (const pos of camPositions) {
      cameraIcons.rect(pos.x, pos.y, 8, 6).fill(0x5a5a6a)
      cameraIcons.rect(pos.x + 8, pos.y + 1, 4, 4).fill(0x4a4a5a)
      // Lens
      cameraIcons.circle(pos.x + 4, pos.y + 3, 2).fill(INTERCEPT_RED)
    }

    // Animation
    const tickerFn = () => {
      frameRef.current += 1

      if (!elementsRef.current) return
      const { pulseDots: pd } = elementsRef.current

      // Pulse animation on phone lines
      pd.clear()
      if (pd.alpha > 0) {
        const t = frameRef.current * 0.02
        for (let i = 0; i < 5; i++) {
          const lineProgress = (t + i * 0.2) % 1
          const x = 75 + lineProgress * 155
          const y = lineYs[i] + (lineProgress * -10)
          pd.circle(x, y, 2).fill({ color: PHONE_LINE, alpha: 0.8 })
        }
      }
    }
    app.ticker.add(tickerFn)

    return () => {
      app.ticker.remove(tickerFn)
      elementsRef.current = null
    }
  }, [])

  const onProgress = useCallback((_progress: number, scene: Container) => {
    if (!elementsRef.current) return
    const { phoneLines, interceptMarks, fileIcons, cameraIcons, pulseDots } = elementsRef.current

    // Overall scene fade in
    scene.alpha = Math.min(1, _progress * 3)

    // Phase 1: 0–0.3 base scene (buildings visible, everything else hidden)
    // Phase 2: 0.3–0.6 phone lines + mail intercepts
    if (_progress < 0.3) {
      phoneLines.alpha = 0
      interceptMarks.alpha = 0
      pulseDots.alpha = 0
      fileIcons.alpha = 0
      cameraIcons.alpha = 0
    } else if (_progress < 0.6) {
      const phase2 = (_progress - 0.3) / 0.3
      phoneLines.alpha = phase2
      interceptMarks.alpha = Math.max(0, (phase2 - 0.3) / 0.7)
      pulseDots.alpha = phase2
      fileIcons.alpha = 0
      cameraIcons.alpha = 0
    } else {
      // Phase 3: 0.6–1.0 full surveillance network
      const phase3 = (_progress - 0.6) / 0.4
      phoneLines.alpha = 1
      interceptMarks.alpha = 1
      pulseDots.alpha = 1
      fileIcons.alpha = phase3
      cameraIcons.alpha = Math.max(0, (phase3 - 0.3) / 0.7)
    }
  }, [])

  return (
    <PixelScene
      progress={progress}
      isInView={isInView}
      ariaLabel="跨太平洋監控網：左側匹茲堡城市與右側台北之間，電話線、被攔截的郵件、監控檔案逐一浮現"
      onSetup={onSetup}
      onProgress={onProgress}
      fallbackText="[ 場景：跨太平洋監控網——匹茲堡與台北之間的情報線路 ]"
    />
  )
}
