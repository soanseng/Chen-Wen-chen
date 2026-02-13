import { useCallback, useRef } from 'react'
import { Application, Container, Graphics } from 'pixi.js'
import { PixelScene, type PixelSceneProps, BASE_WIDTH, BASE_HEIGHT } from '../PixelScene'

// Colors — oppressive cold morning
const SKY_COLD = 0x2a3040
const SKY_WASH = 0x3a4555
const HOUSE_WALL = 0x6a6a70
const HOUSE_SHADOW = 0x4a4a52
const DOOR_FRAME = 0x3a3a42
const DOOR_WOOD = 0x4a4038
const GROUND_COLOR = 0x3a3a3a
const SIDEWALK = 0x5a5a5e
const SEDAN_BLACK = 0x1a1a22
const SEDAN_WINDOW = 0x2a3040
const CHEN_SHIRT = 0xc8c0b8
const CHEN_PANTS = 0x4a4540
const SKIN = 0xc9a882
const HAIR = 0x1c1814
const AGENT_DARK = 0x1a1a24
const AGENT_MID = 0x22222e
const PAPER_COLOR = 0xd8d0c4
const MORNING_LIGHT = 0x8090a0
const TREE_TRUNK = 0x3a3228
const TREE_GREEN = 0x3a4a3a

/**
 * Scene 5: being-taken — Chen Being Taken From Home
 * Chapter 4: 08:30 — Three men arrive at Chen's home with a subpoena
 * Mood: Oppressive, sudden, cold — the moment everything changes
 */
export function BeingTakenScene({ progress, isInView }: PixelSceneProps) {
  const frameRef = useRef(0)
  const agent1Ref = useRef<Graphics | null>(null)
  const agent2Ref = useRef<Graphics | null>(null)
  const agent3Ref = useRef<Graphics | null>(null)
  const chenRef = useRef<Graphics | null>(null)
  const doorRef = useRef<Graphics | null>(null)
  const darkenRef = useRef<Graphics | null>(null)

  const onSetup = useCallback((app: Application, scene: Container) => {
    // Cold washed-out sky
    const sky = new Graphics()
    sky.rect(0, 0, BASE_WIDTH, 70).fill(SKY_COLD)
    sky.rect(0, 70, BASE_WIDTH, 20).fill(SKY_WASH)
    scene.addChild(sky)

    // Muted morning light (washed out horizontal band)
    const morningHaze = new Graphics()
    morningHaze.rect(0, 55, BASE_WIDTH, 20).fill({ color: MORNING_LIGHT, alpha: 0.08 })
    scene.addChild(morningHaze)

    // House structure (left-center)
    const house = new Graphics()
    // Main wall
    house.rect(20, 40, 140, 90).fill(HOUSE_WALL)
    // Roof
    house.moveTo(15, 40)
    house.lineTo(90, 15)
    house.lineTo(165, 40)
    house.closePath()
    house.fill(HOUSE_SHADOW)
    // Shadow on right wall
    house.rect(120, 40, 40, 90).fill(HOUSE_SHADOW)
    // Windows (dark, curtains drawn)
    house.rect(30, 55, 22, 18).fill(DOOR_FRAME)
    house.rect(32, 57, 18, 14).fill({ color: 0x2a2a30, alpha: 0.9 })
    house.rect(110, 55, 22, 18).fill(DOOR_FRAME)
    house.rect(112, 57, 18, 14).fill({ color: 0x2a2a30, alpha: 0.9 })
    scene.addChild(house)

    // Door frame
    const doorFrame = new Graphics()
    doorFrame.rect(65, 58, 30, 72).fill(DOOR_FRAME)
    scene.addChild(doorFrame)

    // Door (animated - opens with progress)
    const door = new Graphics()
    doorRef.current = door
    scene.addChild(door)

    // Ground / sidewalk
    const ground = new Graphics()
    ground.rect(0, 130, BASE_WIDTH, 50).fill(GROUND_COLOR)
    // Sidewalk path from door to street
    ground.rect(60, 130, 40, 50).fill(SIDEWALK)
    ground.rect(0, 145, BASE_WIDTH, 35).fill({ color: SIDEWALK, alpha: 0.3 })
    scene.addChild(ground)

    // Small tree near house
    const tree = new Graphics()
    tree.rect(170, 85, 4, 45).fill(TREE_TRUNK)
    tree.rect(158, 68, 28, 22).fill(TREE_GREEN)
    tree.rect(162, 60, 20, 14).fill({ color: TREE_GREEN, alpha: 0.8 })
    scene.addChild(tree)

    // Black sedan at curb (right side)
    const sedan = new Graphics()
    // Body
    sedan.rect(210, 128, 80, 22).fill(SEDAN_BLACK)
    // Roof
    sedan.rect(220, 118, 50, 14).fill(SEDAN_BLACK)
    // Windshield
    sedan.rect(222, 120, 14, 10).fill(SEDAN_WINDOW)
    // Rear window
    sedan.rect(256, 120, 12, 10).fill(SEDAN_WINDOW)
    // Wheels
    sedan.circle(228, 151, 5).fill(0x111118)
    sedan.circle(228, 151, 2).fill(0x2a2a30)
    sedan.circle(272, 151, 5).fill(0x111118)
    sedan.circle(272, 151, 2).fill(0x2a2a30)
    // Chrome trim line
    sedan.rect(210, 138, 80, 1).fill({ color: 0x6a6a7a, alpha: 0.4 })
    scene.addChild(sedan)

    // Agent 1 — at door, holding paper/subpoena
    const agent1 = new Graphics()
    agent1Ref.current = agent1
    scene.addChild(agent1)

    // Agent 2 — flanking
    const agent2 = new Graphics()
    agent2Ref.current = agent2
    scene.addChild(agent2)

    // Agent 3 — near car
    const agent3 = new Graphics()
    agent3Ref.current = agent3
    scene.addChild(agent3)

    // Chen Wen-chen
    const chen = new Graphics()
    chenRef.current = chen
    scene.addChild(chen)

    // Darkening overlay (for end of scene)
    const darken = new Graphics()
    darkenRef.current = darken
    scene.addChild(darken)

    // Draw static agent silhouette helper
    const drawAgent = (g: Graphics, x: number, y: number, color: number) => {
      g.clear()
      // Head
      g.rect(x, y, 8, 6).fill(color)
      // Body
      g.rect(x - 2, y + 6, 12, 16).fill(color)
      // Legs
      g.rect(x - 1, y + 22, 5, 10).fill(color)
      g.rect(x + 5, y + 22, 5, 10).fill(color)
    }

    const drawAgentWithPaper = (g: Graphics, x: number, y: number, color: number) => {
      drawAgent(g, x, y, color)
      // Arm extended with paper
      g.rect(x + 10, y + 10, 8, 3).fill(color)
      g.rect(x + 16, y + 8, 6, 8).fill(PAPER_COLOR)
    }

    const drawChen = (g: Graphics, x: number, y: number) => {
      g.clear()
      // Head
      g.rect(x, y, 8, 6).fill(SKIN)
      g.rect(x, y, 8, 2).fill(HAIR)
      g.rect(x, y, 2, 4).fill(HAIR)
      // Glasses
      g.rect(x + 1, y + 2, 3, 2).fill(0x332b25)
      g.rect(x + 5, y + 2, 3, 2).fill(0x332b25)
      // Body
      g.rect(x - 1, y + 6, 10, 14).fill(CHEN_SHIRT)
      // Pants
      g.rect(x, y + 20, 4, 10).fill(CHEN_PANTS)
      g.rect(x + 4, y + 20, 4, 10).fill(CHEN_PANTS)
    }

    // Animation - subtle weight shifting
    const tickerFn = () => {
      frameRef.current += 1
      const t = frameRef.current

      // Agent weight shifting (very subtle 0.5px oscillation)
      if (agent1Ref.current) {
        agent1Ref.current.y = Math.sin(t * 0.02) * 0.5
      }
      if (agent2Ref.current) {
        agent2Ref.current.y = Math.sin(t * 0.025 + 1) * 0.5
      }
      if (agent3Ref.current) {
        agent3Ref.current.y = Math.sin(t * 0.018 + 2) * 0.5
      }
    }
    app.ticker.add(tickerFn)

    // Initial draw — positions will be updated by onProgress
    drawAgentWithPaper(agent1, 58, 96, AGENT_DARK)
    drawAgent(agent2, 42, 98, AGENT_MID)
    drawAgent(agent3, 180, 96, AGENT_DARK)
    drawChen(chen, 78, 96)

    return () => {
      app.ticker.remove(tickerFn)
      agent1Ref.current = null
      agent2Ref.current = null
      agent3Ref.current = null
      chenRef.current = null
      doorRef.current = null
      darkenRef.current = null
    }
  }, [])

  const onProgress = useCallback((_progress: number, scene: Container) => {
    const drawAgent = (g: Graphics, x: number, y: number, color: number) => {
      g.clear()
      // Head
      g.rect(x, y, 8, 6).fill(color)
      // Body
      g.rect(x - 2, y + 6, 12, 16).fill(color)
      // Legs
      g.rect(x - 1, y + 22, 5, 10).fill(color)
      g.rect(x + 5, y + 22, 5, 10).fill(color)
    }

    const drawAgentWithPaper = (g: Graphics, x: number, y: number, color: number) => {
      drawAgent(g, x, y, color)
      // Arm extended with paper
      g.rect(x + 10, y + 10, 8, 3).fill(color)
      g.rect(x + 16, y + 8, 6, 8).fill(PAPER_COLOR)
    }

    const drawChen = (g: Graphics, x: number, y: number) => {
      g.clear()
      // Head
      g.rect(x, y, 8, 6).fill(SKIN)
      g.rect(x, y, 8, 2).fill(HAIR)
      g.rect(x, y, 2, 4).fill(HAIR)
      // Glasses
      g.rect(x + 1, y + 2, 3, 2).fill(0x332b25)
      g.rect(x + 5, y + 2, 3, 2).fill(0x332b25)
      // Body
      g.rect(x - 1, y + 6, 10, 14).fill(CHEN_SHIRT)
      // Pants
      g.rect(x, y + 20, 4, 10).fill(CHEN_PANTS)
      g.rect(x + 4, y + 20, 4, 10).fill(CHEN_PANTS)
    }

    // Phase 1 (0-0.3): Door opens, agents visible at doorstep
    if (_progress < 0.3) {
      const p = _progress / 0.3
      // Door opening — shrinks width to simulate swing
      if (doorRef.current) {
        doorRef.current.clear()
        const doorWidth = 26 * (1 - p)
        doorRef.current.rect(67, 60, doorWidth, 68).fill(DOOR_WOOD)
      }
      // Agents at door
      drawAgentWithPaper(agent1Ref.current!, 58, 96, AGENT_DARK)
      drawAgent(agent2Ref.current!, 42, 98, AGENT_MID)
      drawAgent(agent3Ref.current!, 100, 98, AGENT_DARK)
      // Chen inside door
      const chenX = 78
      drawChen(chenRef.current!, chenX, 96)
      // Agents fade in
      if (agent1Ref.current) agent1Ref.current.alpha = Math.min(1, p * 2)
      if (agent2Ref.current) agent2Ref.current.alpha = Math.min(1, p * 2)
      if (agent3Ref.current) agent3Ref.current.alpha = Math.min(1, p * 1.5)
    }

    // Phase 2 (0.3-0.7): Chen walks toward car with men flanking
    if (_progress >= 0.3 && _progress < 0.7) {
      const p = (_progress - 0.3) / 0.4
      // Door fully open
      if (doorRef.current) {
        doorRef.current.clear()
      }
      // Everyone moves toward car
      const startX = 78
      const endX = 190
      const chenX = startX + (endX - startX) * p
      drawChen(chenRef.current!, chenX, 96)

      // Agent 1 slightly ahead
      const a1x = 58 + (195 - 58) * p
      drawAgentWithPaper(agent1Ref.current!, a1x, 96, AGENT_DARK)

      // Agent 2 flanking left
      const a2x = 42 + (chenX - 12 - 42) * p
      drawAgent(agent2Ref.current!, a2x, 98, AGENT_MID)

      // Agent 3 flanking right
      const a3x = 100 + (chenX + 14 - 100) * p
      drawAgent(agent3Ref.current!, a3x, 98, AGENT_DARK)

      if (agent1Ref.current) agent1Ref.current.alpha = 1
      if (agent2Ref.current) agent2Ref.current.alpha = 1
      if (agent3Ref.current) agent3Ref.current.alpha = 1
    }

    // Phase 3 (0.7-1.0): Scene darkens as they enter the car
    if (_progress >= 0.7) {
      const p = (_progress - 0.7) / 0.3

      // Everyone near the car
      drawChen(chenRef.current!, 190 + p * 10, 96)
      drawAgentWithPaper(agent1Ref.current!, 195 + p * 8, 96, AGENT_DARK)
      drawAgent(agent2Ref.current!, 178 + p * 8, 98, AGENT_MID)
      drawAgent(agent3Ref.current!, 204 + p * 8, 98, AGENT_DARK)

      // Figures fade into car
      const fadeOut = Math.max(0, 1 - p * 1.5)
      if (chenRef.current) chenRef.current.alpha = fadeOut
      if (agent1Ref.current) agent1Ref.current.alpha = fadeOut
      if (agent2Ref.current) agent2Ref.current.alpha = fadeOut
      if (agent3Ref.current) agent3Ref.current.alpha = fadeOut

      // Scene darkens
      if (darkenRef.current) {
        darkenRef.current.clear()
        darkenRef.current.rect(0, 0, BASE_WIDTH, BASE_HEIGHT).fill({ color: 0x000008, alpha: p * 0.6 })
      }
    } else {
      if (darkenRef.current) {
        darkenRef.current.clear()
      }
    }

    // Overall fade in
    scene.alpha = Math.min(1, _progress * 4)
  }, [])

  return (
    <PixelScene
      progress={progress}
      isInView={isInView}
      ariaLabel="清晨八點半，三名便衣人員出現在陳文成家門口，其中一人手持約談通知書，陳文成被帶往停在路邊的黑色轎車"
      onSetup={onSetup}
      onProgress={onProgress}
      fallbackText="[ 場景：清晨被帶走——三名便衣出現在家門口 ]"
    />
  )
}
