import { useCallback, useRef } from 'react'
import { Application, Container, Graphics } from 'pixi.js'
import { PixelScene, type PixelSceneProps, BASE_WIDTH, BASE_HEIGHT } from '../PixelScene'

// Colors
const WALL_COLOR = 0x4a4039
const FLOOR_COLOR = 0x332b25
const BLACKBOARD = 0x2d4a3e
const CHALK = 0xe8e4db
const WINDOW_FRAME = 0x635850
const WINDOW_LIGHT = 0xffe8a0
const DESK_COLOR = 0x5c4a3a
const SHIRT_COLOR = 0xd4cfc3
const PANTS_COLOR = 0x3a3530
const HAIR_COLOR = 0x1c1814
const SKIN_COLOR = 0xc9a882

/**
 * Scene 1: campus-life — CMU Campus Teaching
 * Chapter 1: The Scholar's Path
 * Mood: Warm, peaceful, golden academic light
 */
export function CampusLifeScene({ progress, isInView }: PixelSceneProps) {
  const frameRef = useRef(0)

  const onSetup = useCallback((app: Application, scene: Container) => {
    // Background wall
    const wall = new Graphics()
    wall.rect(0, 0, BASE_WIDTH, BASE_HEIGHT * 0.75)
    wall.fill(WALL_COLOR)
    scene.addChild(wall)

    // Floor
    const floor = new Graphics()
    floor.rect(0, BASE_HEIGHT * 0.75, BASE_WIDTH, BASE_HEIGHT * 0.25)
    floor.fill(FLOOR_COLOR)
    scene.addChild(floor)

    // Window (right side)
    const windowBg = new Graphics()
    windowBg.rect(240, 20, 50, 70)
    windowBg.fill(WINDOW_LIGHT)
    windowBg.rect(240, 20, 50, 2)
    windowBg.fill(WINDOW_FRAME)
    windowBg.rect(240, 88, 50, 2)
    windowBg.fill(WINDOW_FRAME)
    windowBg.rect(240, 20, 2, 70)
    windowBg.fill(WINDOW_FRAME)
    windowBg.rect(288, 20, 2, 70)
    windowBg.fill(WINDOW_FRAME)
    windowBg.rect(264, 20, 2, 70)
    windowBg.fill(WINDOW_FRAME)
    windowBg.rect(240, 54, 50, 2)
    windowBg.fill(WINDOW_FRAME)
    scene.addChild(windowBg)

    // Light rays from window
    const lightRays = new Graphics()
    lightRays.alpha = 0.15
    scene.addChild(lightRays)

    // Blackboard
    const board = new Graphics()
    board.rect(40, 20, 140, 80)
    board.fill(BLACKBOARD)
    // Board frame
    board.rect(38, 18, 144, 2)
    board.fill(DESK_COLOR)
    board.rect(38, 100, 144, 2)
    board.fill(DESK_COLOR)
    board.rect(38, 18, 2, 84)
    board.fill(DESK_COLOR)
    board.rect(180, 18, 2, 84)
    board.fill(DESK_COLOR)
    scene.addChild(board)

    // Chalk writing on blackboard (statistical formulas)
    const chalk = new Graphics()
    // Sigma symbol approximation
    chalk.rect(55, 32, 8, 2).fill(CHALK)
    chalk.rect(53, 34, 4, 2).fill(CHALK)
    chalk.rect(55, 36, 6, 2).fill(CHALK)
    chalk.rect(53, 38, 4, 2).fill(CHALK)
    chalk.rect(55, 40, 8, 2).fill(CHALK)
    // = sign
    chalk.rect(68, 34, 8, 2).fill(CHALK)
    chalk.rect(68, 38, 8, 2).fill(CHALK)
    // Numbers/formula
    chalk.rect(80, 34, 12, 2).fill(CHALK)
    chalk.rect(80, 38, 16, 2).fill(CHALK)
    // Second line
    chalk.rect(55, 50, 20, 2).fill(CHALK)
    chalk.rect(80, 50, 14, 2).fill(CHALK)
    chalk.rect(100, 50, 8, 2).fill(CHALK)
    // Third line
    chalk.rect(55, 60, 30, 2).fill(CHALK)
    chalk.rect(90, 60, 10, 2).fill(CHALK)
    // More formulas
    chalk.rect(120, 32, 16, 2).fill(CHALK)
    chalk.rect(120, 38, 20, 2).fill(CHALK)
    chalk.rect(140, 32, 2, 8).fill(CHALK)
    chalk.rect(120, 50, 24, 2).fill(CHALK)
    chalk.rect(120, 60, 18, 2).fill(CHALK)
    scene.addChild(chalk)

    // Desk
    const desk = new Graphics()
    desk.rect(200, 100, 60, 8)
    desk.fill(DESK_COLOR)
    desk.rect(204, 108, 4, 28)
    desk.fill(DESK_COLOR)
    desk.rect(252, 108, 4, 28)
    desk.fill(DESK_COLOR)
    scene.addChild(desk)

    // Papers on desk
    const papers = new Graphics()
    papers.rect(210, 96, 14, 6).fill(0xe8e4db)
    papers.rect(228, 97, 12, 5).fill(0xd4cfc3)
    // Coffee cup
    papers.rect(248, 94, 8, 8).fill(0x7d7163)
    papers.rect(248, 93, 8, 2).fill(0x635850)
    scene.addChild(papers)

    // Chen Wen-chen figure (at blackboard, ~24x32 px)
    const figure = new Container()
    figure.x = 130
    figure.y = 103

    // Body (shirt)
    const body = new Graphics()
    body.rect(0, 8, 16, 16).fill(SHIRT_COLOR)
    // Collar
    body.rect(4, 6, 8, 4).fill(SHIRT_COLOR)
    figure.addChild(body)

    // Pants
    const pants = new Graphics()
    pants.rect(2, 24, 5, 10).fill(PANTS_COLOR)
    pants.rect(9, 24, 5, 10).fill(PANTS_COLOR)
    figure.addChild(pants)

    // Shoes
    const shoes = new Graphics()
    shoes.rect(1, 34, 6, 2).fill(0x1c1814)
    shoes.rect(9, 34, 6, 2).fill(0x1c1814)
    figure.addChild(shoes)

    // Head
    const head = new Graphics()
    head.rect(3, 0, 10, 8).fill(SKIN_COLOR)
    figure.addChild(head)

    // Hair
    const hair = new Graphics()
    hair.rect(3, 0, 10, 3).fill(HAIR_COLOR)
    hair.rect(3, 0, 2, 5).fill(HAIR_COLOR)
    figure.addChild(hair)

    // Glasses
    const glasses = new Graphics()
    glasses.rect(4, 3, 4, 2).fill(0x332b25)
    glasses.rect(9, 3, 4, 2).fill(0x332b25)
    glasses.rect(8, 3, 1, 2).fill(0x332b25)
    figure.addChild(glasses)

    // Arm (raised, pointing at board)
    const arm = new Graphics()
    arm.rect(-6, 8, 6, 3).fill(SHIRT_COLOR)
    arm.rect(-8, 7, 3, 3).fill(SKIN_COLOR)
    figure.addChild(arm)

    scene.addChild(figure)

    // Chair
    const chair = new Graphics()
    chair.rect(210, 124, 16, 4).fill(0x5c4a3a)
    chair.rect(212, 128, 3, 10).fill(0x5c4a3a)
    chair.rect(222, 128, 3, 10).fill(0x5c4a3a)
    chair.rect(210, 118, 2, 8).fill(0x5c4a3a)
    scene.addChild(chair)

    // Animation loop
    const tickerFn = () => {
      frameRef.current += 1

      // Light ray animation (subtle shimmer)
      lightRays.clear()
      const shimmer = Math.sin(frameRef.current * 0.03) * 0.05
      lightRays.alpha = 0.12 + shimmer
      // Diagonal light rays from window
      lightRays.moveTo(240, 20)
      lightRays.lineTo(160, BASE_HEIGHT)
      lightRays.lineTo(240, BASE_HEIGHT)
      lightRays.lineTo(290, 20)
      lightRays.fill(WINDOW_LIGHT)
    }
    app.ticker.add(tickerFn)

    return () => {
      app.ticker.remove(tickerFn)
    }
  }, [])

  const onProgress = useCallback((_progress: number, scene: Container) => {
    // Layered entrance: room → figure → warm glow
    scene.alpha = Math.min(1, _progress * 3)

    // Phase 1 (0-0.3): Room structure visible
    // Phase 2 (0.3-0.6): Figure appears, chalk text sharpens
    // Phase 3 (0.6-1.0): Light intensifies to full warmth
    const children = scene.children
    // Figure is child index 8 (after wall, floor, window, lightRays, board, chalk, desk, papers)
    const figure = children[8] as Container | undefined
    if (figure) {
      const figureAlpha = Math.min(1, Math.max(0, (_progress - 0.2) * 4))
      figure.alpha = figureAlpha
    }

    // Light rays intensify with progress
    const lightRays = children[3] as Graphics | undefined
    if (lightRays) {
      lightRays.alpha = 0.08 + _progress * 0.12
    }
  }, [])

  return (
    <PixelScene
      progress={progress}
      isInView={isInView}
      ariaLabel="Carnegie Mellon 大學校園：陳文成在黑板前講授統計學，窗外透入金色光線"
      onSetup={onSetup}
      onProgress={onProgress}
      fallbackText="[ 場景：陳文成在 CMU 校園黑板前授課 ]"
    />
  )
}
