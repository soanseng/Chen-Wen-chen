import { useCallback, useRef } from 'react'
import { Application, Container, Graphics } from 'pixi.js'
import { PixelScene, type PixelSceneProps, BASE_WIDTH, BASE_HEIGHT } from '../PixelScene'

// Colors
// Phase 1: Mortuary (cold)
const MORTUARY_WALL = 0x3a4a4a
const MORTUARY_FLOOR = 0x2a3a3a
const TABLE_STEEL = 0x6a7a7a
const COLD_LIGHT = 0xd0e0e0

// Phase 2: Campus (gray)
const CAMPUS_SKY = 0x4a5a6a
const BUILDING_GRAY = 0x7a7a7a
const GROUND_GRAY = 0x3a3a35

// Phase 3: Press conference (slightly warm)
const PRESS_WALL = 0x4a4a3a
const MIC_COLOR = 0x5a5a5a
const FLASH_WHITE = 0xffffff
const WARM_LIGHT = 0xd4a855

// Shared
const WECHT_SUIT = 0x2a2a3a
const WECHT_SHIRT = 0xe8e4db
const WECHT_SKIN = 0xd4b090
const WECHT_HAIR = 0x8a7a6a
const SHADOW_AGENT = 0x1a1a2a

/**
 * Scene 7: wecht-arrival — Wecht's Investigation in Taiwan
 * Chapter 6: Pursuit of Truth
 * Mood: Gloom with occasional light — hope for truth
 * Three-phase scene switched by progress:
 * 0-0.33: Mortuary examination (cold)
 * 0.33-0.66: NTU campus inspection (gray)
 * 0.66-1.0: Airport press conference (slightly warm)
 */
export function WechtArrivalScene({ progress, isInView }: PixelSceneProps) {
  const frameRef = useRef(0)
  const phasesRef = useRef<{
    mortuary: Container
    campus: Container
    press: Container
    flashEffect: Graphics
    agents: Graphics[]
  } | null>(null)

  const onSetup = useCallback((app: Application, scene: Container) => {
    // === Phase 1: Mortuary ===
    const mortuary = new Container()

    const mortWall = new Graphics()
    mortWall.rect(0, 0, BASE_WIDTH, BASE_HEIGHT * 0.6).fill(MORTUARY_WALL)
    mortuary.addChild(mortWall)

    const mortFloor = new Graphics()
    mortFloor.rect(0, BASE_HEIGHT * 0.6, BASE_WIDTH, BASE_HEIGHT * 0.4).fill(MORTUARY_FLOOR)
    mortuary.addChild(mortFloor)

    // Overhead light
    const mortLight = new Graphics()
    mortLight.rect(140, 5, 40, 4).fill(COLD_LIGHT)
    mortLight.rect(100, 14, BASE_WIDTH - 200, BASE_HEIGHT - 14).fill({ color: COLD_LIGHT, alpha: 0.04 })
    mortuary.addChild(mortLight)

    // Examination table
    const examTable = new Graphics()
    examTable.rect(80, 95, 100, 6).fill(TABLE_STEEL)
    examTable.rect(90, 101, 4, 25).fill(TABLE_STEEL)
    examTable.rect(166, 101, 4, 25).fill(TABLE_STEEL)
    mortuary.addChild(examTable)

    // Wecht figure (standing, examining)
    const wechtM = new Graphics()
    wechtM.rect(196, 56, 8, 6).fill(WECHT_SKIN) // head
    wechtM.rect(196, 54, 8, 3).fill(WECHT_HAIR)
    wechtM.rect(192, 62, 16, 18).fill(WECHT_SUIT) // body
    wechtM.rect(192, 64, 16, 4).fill(WECHT_SHIRT) // collar
    // Arm reaching to table
    wechtM.rect(184, 68, 10, 3).fill(WECHT_SUIT)
    wechtM.rect(182, 68, 3, 3).fill(WECHT_SKIN) // hand
    wechtM.rect(194, 80, 5, 10).fill(WECHT_SUIT) // legs
    wechtM.rect(201, 80, 5, 10).fill(WECHT_SUIT)
    mortuary.addChild(wechtM)

    // Assistant figure
    const assistant = new Graphics()
    assistant.rect(60, 60, 6, 5).fill(WECHT_SKIN)
    assistant.rect(58, 65, 10, 14).fill(0xe8e4db) // white coat
    assistant.rect(59, 79, 4, 8).fill(0x3a3530)
    assistant.rect(65, 79, 4, 8).fill(0x3a3530)
    mortuary.addChild(assistant)

    scene.addChild(mortuary)

    // === Phase 2: Campus ===
    const campus = new Container()
    campus.alpha = 0

    const campSky = new Graphics()
    campSky.rect(0, 0, BASE_WIDTH, 60).fill(CAMPUS_SKY)
    campus.addChild(campSky)

    // Reuse library building design
    const building = new Graphics()
    const bx = 80
    building.rect(bx, 20, 120, 80).fill(BUILDING_GRAY)
    // Windows
    for (let f = 0; f < 5; f++) {
      for (let w = 0; w < 6; w++) {
        building.rect(bx + 8 + w * 18, 24 + f * 16, 10, 10).fill(0x4a4a5a)
      }
    }
    // Fire escape
    building.rect(bx + 122, 20, 12, 80).fill(0x5a5a5a)
    campus.addChild(building)

    // Ground
    const campGround = new Graphics()
    campGround.rect(0, 100, BASE_WIDTH, 80).fill(GROUND_GRAY)
    campus.addChild(campGround)

    // Wecht figure (measuring/inspecting)
    const wechtC = new Graphics()
    wechtC.rect(140, 84, 8, 6).fill(WECHT_SKIN)
    wechtC.rect(140, 82, 8, 3).fill(WECHT_HAIR)
    wechtC.rect(136, 90, 16, 16).fill(WECHT_SUIT)
    wechtC.rect(138, 106, 5, 8).fill(WECHT_SUIT)
    wechtC.rect(145, 106, 5, 8).fill(WECHT_SUIT)
    // Measuring tool in hand
    wechtC.rect(152, 95, 12, 1).fill(0xd4a855)
    campus.addChild(wechtC)

    scene.addChild(campus)

    // === Phase 3: Press Conference ===
    const press = new Container()
    press.alpha = 0

    const pressWall = new Graphics()
    pressWall.rect(0, 0, BASE_WIDTH, BASE_HEIGHT).fill(PRESS_WALL)
    press.addChild(pressWall)

    // Podium
    const podium = new Graphics()
    podium.rect(120, 90, 80, 40).fill(0x5a4a3a)
    podium.rect(118, 88, 84, 4).fill(0x6a5a4a)
    press.addChild(podium)

    // Microphones
    const mics = new Graphics()
    mics.rect(145, 80, 2, 10).fill(MIC_COLOR)
    mics.rect(143, 78, 6, 4).fill(MIC_COLOR)
    mics.rect(165, 82, 2, 8).fill(MIC_COLOR)
    mics.rect(163, 80, 6, 4).fill(MIC_COLOR)
    mics.rect(155, 81, 2, 9).fill(MIC_COLOR)
    mics.rect(153, 79, 6, 4).fill(MIC_COLOR)
    press.addChild(mics)

    // Wecht at podium
    const wechtP = new Graphics()
    wechtP.rect(152, 50, 10, 8).fill(WECHT_SKIN)
    wechtP.rect(152, 48, 10, 3).fill(WECHT_HAIR)
    wechtP.rect(148, 58, 18, 20).fill(WECHT_SUIT)
    wechtP.rect(148, 60, 18, 4).fill(WECHT_SHIRT)
    // Arms at podium sides
    wechtP.rect(142, 62, 6, 3).fill(WECHT_SUIT)
    wechtP.rect(166, 62, 6, 3).fill(WECHT_SUIT)
    press.addChild(wechtP)

    // Reporters (seated, backs to viewer)
    const reporters = new Graphics()
    for (let i = 0; i < 5; i++) {
      const rx = 30 + i * 50
      reporters.rect(rx, 130, 8, 5).fill(0x3a3a3a)
      reporters.rect(rx - 2, 135, 12, 10).fill(0x4a4a4a)
      // Camera/notebook
      if (i % 2 === 0) {
        reporters.rect(rx + 10, 134, 6, 4).fill(0x3a3a3a)
      }
    }
    press.addChild(reporters)

    // Flash effect
    const flashEffect = new Graphics()
    flashEffect.alpha = 0
    flashEffect.rect(0, 0, BASE_WIDTH, BASE_HEIGHT).fill({ color: FLASH_WHITE, alpha: 0.3 })
    press.addChild(flashEffect)

    // Warm light accent
    const warmLight = new Graphics()
    warmLight.rect(100, 30, 120, 100).fill({ color: WARM_LIGHT, alpha: 0.03 })
    press.addChild(warmLight)

    scene.addChild(press)

    // === Surveillance agents (persistent across all phases) ===
    const agents: Graphics[] = []
    const agentPositions = [
      { x: 10, y: 110 },
      { x: 290, y: 105 },
    ]

    for (const pos of agentPositions) {
      const agent = new Graphics()
      agent.rect(pos.x, pos.y, 8, 5).fill(SHADOW_AGENT)
      agent.rect(pos.x - 1, pos.y + 5, 10, 12).fill(SHADOW_AGENT)
      agent.rect(pos.x, pos.y + 17, 3, 6).fill(SHADOW_AGENT)
      agent.rect(pos.x + 5, pos.y + 17, 3, 6).fill(SHADOW_AGENT)
      agent.alpha = 0.3
      scene.addChild(agent)
      agents.push(agent)
    }

    phasesRef.current = { mortuary, campus, press, flashEffect, agents }

    // Animation
    const tickerFn = () => {
      frameRef.current += 1

      if (!phasesRef.current) return

      // Camera flash in press conference phase
      if (phasesRef.current.press.alpha > 0.5) {
        const flashCycle = frameRef.current % 90
        if (flashCycle === 0) {
          phasesRef.current.flashEffect.alpha = 0.4
        } else if (flashCycle < 5) {
          phasesRef.current.flashEffect.alpha *= 0.5
        } else {
          phasesRef.current.flashEffect.alpha = 0
        }
      }

      // Agent shadows subtle pulse
      for (let i = 0; i < agents.length; i++) {
        const pulse = Math.sin(frameRef.current * 0.015 + i * 2) * 0.08
        agents[i].alpha = 0.25 + pulse
      }
    }
    app.ticker.add(tickerFn)

    return () => {
      app.ticker.remove(tickerFn)
      phasesRef.current = null
    }
  }, [])

  const onProgress = useCallback((_progress: number, scene: Container) => {
    if (!phasesRef.current) return
    const { mortuary, campus, press } = phasesRef.current

    // Overall fade in
    scene.alpha = Math.min(1, _progress * 3)

    // Phase transitions with crossfade
    if (_progress < 0.33) {
      // Phase 1: Mortuary
      mortuary.alpha = 1
      campus.alpha = 0
      press.alpha = 0
    } else if (_progress < 0.4) {
      // Crossfade 1→2
      const t = (_progress - 0.33) / 0.07
      mortuary.alpha = 1 - t
      campus.alpha = t
      press.alpha = 0
    } else if (_progress < 0.66) {
      // Phase 2: Campus
      mortuary.alpha = 0
      campus.alpha = 1
      press.alpha = 0
    } else if (_progress < 0.73) {
      // Crossfade 2→3
      const t = (_progress - 0.66) / 0.07
      mortuary.alpha = 0
      campus.alpha = 1 - t
      press.alpha = t
    } else {
      // Phase 3: Press conference
      mortuary.alpha = 0
      campus.alpha = 0
      press.alpha = 1
    }
  }, [])

  return (
    <PixelScene
      progress={progress}
      isInView={isInView}
      ariaLabel="Wecht 抵台調查：殯儀館驗屍、台大現場勘查、松山機場記者會三段場景，暗處持續可見國安局監控人員"
      onSetup={onSetup}
      onProgress={onProgress}
      fallbackText="[ 場景：Wecht 法醫抵台——殯儀館、台大現場、記者會 ]"
    />
  )
}
