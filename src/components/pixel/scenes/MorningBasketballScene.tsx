/**
 * Scene: Morning Basketball (清晨籃球)
 * Chapter 4 Opening — July 2, 1981, 05:00 AM, NTU sports field
 * Mood: Brief calm before the storm, last warm colors
 */

import { useCallback, useRef } from 'react'
import { Application, Container, Graphics } from 'pixi.js'
import { PixelScene, type PixelSceneProps, BASE_WIDTH, BASE_HEIGHT } from '../PixelScene'

// Color palette — dawn pink-orange, the LAST warm colors
const GROUND_COLOR = 0x4A6741
const COURT_COLOR = 0x7A8A6A
const COURT_LINE = 0xD4C8A0
const TRACK_COLOR = 0xB87A5A
const TRACK_INNER = 0xA06A4A
const HOOP_POLE = 0x8A8A8A
const HOOP_BOARD = 0xE0E0E0
const HOOP_RIM = 0xD44A00
const HOOP_NET = 0xC0C0C0
const FIGURE_SKIN = 0xF0C8A0
const FIGURE_HAIR = 0x2C1810
const FIGURE_SHIRT_WHITE = 0xF0F0F0
const FIGURE_SHORTS = 0x2A3A5A
const FIGURE_SHOES = 0xE0E0E0
const BALL_ORANGE = 0xE87830
const BALL_LINE = 0x8A4010
const SEDAN_BODY = 0x1A1A1A
const SEDAN_WINDOW = 0x2A3A4A
const SEDAN_WHEEL = 0x0A0A0A
const TREE_TRUNK = 0x4A3A2A
const TREE_LEAVES = 0x3A5A30
const TREE_LEAVES_LIGHT = 0x4A6A3A
const FENCE_COLOR = 0x6A6A6A

export function MorningBasketballScene({ progress, isInView }: PixelSceneProps) {
  const frameRef = useRef(0)
  const sceneRef = useRef<Container | null>(null)
  const skyRef = useRef<Graphics | null>(null)
  const figureRef = useRef<Container | null>(null)
  const ballRef = useRef<Graphics | null>(null)
  const armRef = useRef<Graphics | null>(null)

  const onSetup = useCallback((app: Application, scene: Container) => {
    sceneRef.current = scene
    scene.alpha = 0

    // === DAWN SKY (gradient from deep purple to pink-orange) ===
    const sky = new Graphics()
    skyRef.current = sky
    scene.addChild(sky)
    // Initial sky draw (will be updated with progress)
    drawSky(sky, 0)

    // === DISTANT TREES (silhouette line along horizon) ===
    const distantTrees = new Graphics()
    for (let x = 0; x < BASE_WIDTH; x += 12) {
      const h = 8 + Math.sin(x * 0.1) * 4
      distantTrees.rect(x, 68 - h, 10, h + 4).fill(TREE_LEAVES)
      distantTrees.rect(x + 2, 68 - h - 3, 6, 4).fill(TREE_LEAVES_LIGHT)
    }
    scene.addChild(distantTrees)

    // === GROUND / FIELD ===
    const ground = new Graphics()
    ground.rect(0, 70, BASE_WIDTH, BASE_HEIGHT - 70).fill(GROUND_COLOR)
    scene.addChild(ground)

    // === RUNNING TRACK (oval around field) ===
    const track = new Graphics()
    track.rect(20, 90, 280, 60).fill(TRACK_COLOR)
    track.rect(25, 95, 270, 50).fill(GROUND_COLOR)
    // Track lanes
    track.rect(20, 90, 280, 2).fill(TRACK_INNER)
    track.rect(20, 148, 280, 2).fill(TRACK_INNER)
    scene.addChild(track)

    // === BASKETBALL COURT ===
    const court = new Graphics()
    // Court surface
    court.rect(80, 95, 100, 50).fill(COURT_COLOR)
    // Court lines
    court.rect(80, 95, 100, 1).fill(COURT_LINE)
    court.rect(80, 144, 100, 1).fill(COURT_LINE)
    court.rect(80, 95, 1, 50).fill(COURT_LINE)
    court.rect(179, 95, 1, 50).fill(COURT_LINE)
    // Center line
    court.rect(129, 95, 1, 50).fill(COURT_LINE)
    // Center circle (simplified)
    court.rect(120, 112, 20, 1).fill(COURT_LINE)
    court.rect(120, 128, 20, 1).fill(COURT_LINE)
    court.rect(119, 115, 1, 11).fill(COURT_LINE)
    court.rect(140, 115, 1, 11).fill(COURT_LINE)
    // Free throw areas
    court.rect(80, 108, 20, 24).fill(COURT_LINE)
    court.rect(160, 108, 20, 24).fill(COURT_LINE)
    scene.addChild(court)

    // === BASKETBALL HOOP (right side) ===
    const hoop = new Graphics()
    // Pole
    hoop.rect(178, 88, 3, 32).fill(HOOP_POLE)
    // Backboard
    hoop.rect(170, 88, 10, 14).fill(HOOP_BOARD)
    hoop.rect(171, 89, 8, 12).fill(0xC0C0C0)
    // Rim
    hoop.rect(164, 100, 6, 2).fill(HOOP_RIM)
    // Net (simple lines)
    hoop.rect(165, 102, 1, 5).fill(HOOP_NET)
    hoop.rect(167, 102, 1, 4).fill(HOOP_NET)
    hoop.rect(169, 102, 1, 5).fill(HOOP_NET)
    scene.addChild(hoop)

    // === LEFT HOOP (simplified, far side) ===
    const hoopLeft = new Graphics()
    hoopLeft.rect(80, 92, 2, 28).fill(HOOP_POLE)
    hoopLeft.rect(78, 92, 8, 10).fill(HOOP_BOARD)
    hoopLeft.rect(86, 100, 5, 2).fill(HOOP_RIM)
    scene.addChild(hoopLeft)

    // === CHEN WEN-CHEN FIGURE (playing basketball) ===
    const figure = new Container()
    figure.x = 140
    figure.y = 118
    figureRef.current = figure

    // Body
    const body = new Graphics()
    // Head
    body.rect(-2, -18, 6, 6).fill(FIGURE_SKIN)
    // Hair
    body.rect(-2, -19, 6, 3).fill(FIGURE_HAIR)
    // Shirt
    body.rect(-3, -12, 8, 8).fill(FIGURE_SHIRT_WHITE)
    // Shorts
    body.rect(-2, -4, 6, 5).fill(FIGURE_SHORTS)
    // Legs
    body.rect(-1, 1, 2, 6).fill(FIGURE_SKIN)
    body.rect(2, 1, 2, 6).fill(FIGURE_SKIN)
    // Shoes
    body.rect(-2, 7, 3, 2).fill(FIGURE_SHOES)
    body.rect(2, 7, 3, 2).fill(FIGURE_SHOES)
    figure.addChild(body)

    // Shooting arm (animated)
    const arm = new Graphics()
    arm.rect(4, -12, 2, 5).fill(FIGURE_SKIN)
    armRef.current = arm
    figure.addChild(arm)

    scene.addChild(figure)

    // === BASKETBALL (animated) ===
    const ball = new Graphics()
    ball.circle(0, 0, 3).fill(BALL_ORANGE)
    ball.rect(-3, 0, 6, 1).fill(BALL_LINE)
    ball.rect(0, -3, 1, 6).fill(BALL_LINE)
    ball.x = 147
    ball.y = 107
    ballRef.current = ball
    scene.addChild(ball)

    // === FENCE (along far edge) ===
    const fence = new Graphics()
    for (let x = 10; x < BASE_WIDTH - 10; x += 8) {
      fence.rect(x, 82, 1, 10).fill(FENCE_COLOR)
    }
    fence.rect(10, 83, BASE_WIDTH - 20, 1).fill(FENCE_COLOR)
    fence.rect(10, 88, BASE_WIDTH - 20, 1).fill(FENCE_COLOR)
    fence.alpha = 0.4
    scene.addChild(fence)

    // === TREES (near field edges) ===
    const trees = new Graphics()
    // Left tree
    trees.rect(30, 80, 4, 30).fill(TREE_TRUNK)
    trees.rect(20, 65, 24, 18).fill(TREE_LEAVES)
    trees.rect(24, 60, 16, 8).fill(TREE_LEAVES_LIGHT)
    // Right tree
    trees.rect(270, 82, 4, 28).fill(TREE_TRUNK)
    trees.rect(260, 68, 24, 16).fill(TREE_LEAVES)
    trees.rect(264, 63, 16, 8).fill(TREE_LEAVES_LIGHT)
    scene.addChild(trees)

    // === BLACK SEDAN (tiny, ominous, far edge) ===
    const sedan = new Graphics()
    // Body
    sedan.rect(18, 148, 18, 8).fill(SEDAN_BODY)
    // Roof
    sedan.rect(22, 143, 10, 6).fill(SEDAN_BODY)
    // Windows
    sedan.rect(23, 144, 4, 4).fill(SEDAN_WINDOW)
    sedan.rect(28, 144, 4, 4).fill(SEDAN_WINDOW)
    // Wheels
    sedan.circle(23, 156, 2).fill(SEDAN_WHEEL)
    sedan.circle(33, 156, 2).fill(SEDAN_WHEEL)
    sedan.alpha = 0.6 // barely visible, ominous
    scene.addChild(sedan)

    // === ANIMATION TICKER ===
    const tickerCb = () => {
      frameRef.current++
      const frame = frameRef.current

      // Basketball shooting animation (3 frames: hold, shoot, follow-through)
      const shootCycle = frame % 180 // ~3 seconds per cycle
      const armG = armRef.current
      const ballG = ballRef.current

      if (armG && ballG) {
        armG.clear()

        if (shootCycle < 60) {
          // Frame 1: Holding ball, arm at side
          armG.rect(4, -12, 2, 5).fill(FIGURE_SKIN)
          ballG.x = 147
          ballG.y = 107
          ballG.alpha = 1
        } else if (shootCycle < 90) {
          // Frame 2: Arm up, shooting
          armG.rect(3, -18, 2, 7).fill(FIGURE_SKIN)
          const shootT = (shootCycle - 60) / 30
          // Ball arc toward hoop
          ballG.x = 147 + shootT * 18
          ballG.y = 107 - Math.sin(shootT * Math.PI) * 20 - shootT * 5
          ballG.alpha = 1
        } else if (shootCycle < 120) {
          // Frame 3: Follow-through, ball near hoop
          armG.rect(2, -19, 3, 5).fill(FIGURE_SKIN)
          const arcT = (shootCycle - 90) / 30
          ballG.x = 165 + arcT * 2
          ballG.y = 82 + arcT * 20
          ballG.alpha = 1 - arcT * 0.5
        } else {
          // Reset pose
          armG.rect(4, -11, 2, 4).fill(FIGURE_SKIN)
          ballG.x = 147
          ballG.y = 107
          ballG.alpha = 1
        }
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

    // Fade in
    scene.alpha = Math.min(1, p * 3)

    // Dawn sky brightens with progress
    const sky = skyRef.current
    if (sky) {
      drawSky(sky, p)
    }
  }, [])

  return (
    <PixelScene
      progress={progress}
      isInView={isInView}
      ariaLabel="1981年7月2日清晨五點，陳文成在台大運動場打籃球，晨曦中一輛黑色轎車停在遠處"
      onSetup={onSetup}
      onProgress={onProgress}
      fallbackText="七月二日清晨，粉橘色的天空下，陳文成在台大球場打籃球。場邊遠處停著一輛不起眼的黑色轎車。"
    />
  )
}

/** Draw dawn sky gradient, brightening with progress */
function drawSky(sky: Graphics, progress: number) {
  sky.clear()
  const brighten = progress * 0.3 // subtle brightening

  for (let y = 0; y < 72; y++) {
    const t = y / 72

    let r: number, g: number, b: number

    if (t < 0.3) {
      // Top: deep purple → mid purple
      const lt = t / 0.3
      r = Math.round(0x2C + (0x6B - 0x2C) * lt + brighten * 30)
      g = Math.round(0x1E + (0x3A - 0x1E) * lt + brighten * 20)
      b = Math.round(0x4A + (0x6E - 0x4A) * lt + brighten * 10)
    } else if (t < 0.6) {
      // Mid: purple → warm orange
      const lt = (t - 0.3) / 0.3
      r = Math.round(0x6B + (0xD4 - 0x6B) * lt + brighten * 40)
      g = Math.round(0x3A + (0x72 - 0x3A) * lt + brighten * 30)
      b = Math.round(0x6E + (0x5C - 0x6E) * lt + brighten * 10)
    } else if (t < 0.85) {
      // Lower: orange → pink
      const lt = (t - 0.6) / 0.25
      r = Math.round(0xD4 + (0xF5 - 0xD4) * lt + brighten * 20)
      g = Math.round(0x72 + (0xB8 - 0x72) * lt + brighten * 30)
      b = Math.round(0x5C + (0x9A - 0x5C) * lt + brighten * 20)
    } else {
      // Horizon: pink → warm gold
      const lt = (t - 0.85) / 0.15
      r = Math.min(255, Math.round(0xF5 + (0xFF - 0xF5) * lt + brighten * 10))
      g = Math.min(255, Math.round(0xB8 + (0xCB - 0xB8) * lt + brighten * 20))
      b = Math.min(255, Math.round(0x9A + (0xA4 - 0x9A) * lt + brighten * 15))
    }

    r = Math.min(255, Math.max(0, r))
    g = Math.min(255, Math.max(0, g))
    b = Math.min(255, Math.max(0, b))

    const color = (r << 16) | (g << 8) | b
    sky.rect(0, y, BASE_WIDTH, 1).fill(color)
  }
}
