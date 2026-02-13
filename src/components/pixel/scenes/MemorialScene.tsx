import { useCallback, useRef } from 'react'
import { Application, Container, Graphics } from 'pixi.js'
import { PixelScene, type PixelSceneProps, BASE_WIDTH, BASE_HEIGHT } from '../PixelScene'

// Colors — muted warmth returning but not fully
const SKY_GRAY = 0x6a7a8a
const SKY_LIGHT = 0x8a98a8
const SKY_WARM = 0x9aa8b0
const GROUND_GREEN = 0x4a6040
const PATH_COLOR = 0x9a9088
const PATH_LIGHT = 0xb0a89a
const MEMORIAL_STONE = 0x7a7a7a
const MEMORIAL_DARK = 0x5a5a5a
const MEMORIAL_FACE = 0x9a9a9a
const TREE_TRUNK = 0x5a4a38
const TREE_GREEN_DARK = 0x3a5a35
const TREE_GREEN_MID = 0x4a6a45
const TREE_GREEN_LIGHT = 0x5a7a55
const GRASS_COLOR = 0x506a46
const GRASS_LIGHT = 0x608050
const FLOWER_WHITE = 0xe8e4e0
const FLOWER_YELLOW = 0xd8c878
const BORDER_DARK = 0x0a0a0a
const CAMPUS_BUILDING = 0x8a8a82
const CAMPUS_WINDOW = 0x5a6a7a
const BENCH_COLOR = 0x6a5a48

/**
 * Scene 8: memorial — Chen Wen-chen Memorial on NTU Campus
 * Chapter 7 ending: The most "open" scene — contrast with enclosed darkness of earlier scenes
 * Mood: Heavy but open, Journey-like ending — light returns but truth remains gray
 */
export function MemorialScene({ progress, isInView }: PixelSceneProps) {
  const frameRef = useRef(0)
  const treeRefs = useRef<Graphics[]>([])
  const borderLeftRef = useRef<Graphics | null>(null)
  const borderRightRef = useRef<Graphics | null>(null)
  const skyRef = useRef<Graphics | null>(null)
  const lightOverlayRef = useRef<Graphics | null>(null)
  const greeneryRef = useRef<Container | null>(null)

  const onSetup = useCallback((app: Application, scene: Container) => {
    // Sky — starts dark gray, lightens with progress
    const sky = new Graphics()
    skyRef.current = sky
    scene.addChild(sky)

    // Distant campus buildings (far background)
    const distantBuildings = new Graphics()
    // Building 1
    distantBuildings.rect(20, 50, 40, 30).fill({ color: CAMPUS_BUILDING, alpha: 0.4 })
    distantBuildings.rect(24, 52, 8, 6).fill({ color: CAMPUS_WINDOW, alpha: 0.3 })
    distantBuildings.rect(36, 52, 8, 6).fill({ color: CAMPUS_WINDOW, alpha: 0.3 })
    distantBuildings.rect(24, 62, 8, 6).fill({ color: CAMPUS_WINDOW, alpha: 0.3 })
    distantBuildings.rect(36, 62, 8, 6).fill({ color: CAMPUS_WINDOW, alpha: 0.3 })
    // Building 2
    distantBuildings.rect(250, 45, 50, 35).fill({ color: CAMPUS_BUILDING, alpha: 0.4 })
    distantBuildings.rect(254, 48, 8, 6).fill({ color: CAMPUS_WINDOW, alpha: 0.3 })
    distantBuildings.rect(268, 48, 8, 6).fill({ color: CAMPUS_WINDOW, alpha: 0.3 })
    distantBuildings.rect(282, 48, 8, 6).fill({ color: CAMPUS_WINDOW, alpha: 0.3 })
    distantBuildings.rect(254, 60, 8, 6).fill({ color: CAMPUS_WINDOW, alpha: 0.3 })
    distantBuildings.rect(268, 60, 8, 6).fill({ color: CAMPUS_WINDOW, alpha: 0.3 })
    distantBuildings.rect(282, 60, 8, 6).fill({ color: CAMPUS_WINDOW, alpha: 0.3 })
    scene.addChild(distantBuildings)

    // Ground — campus green
    const ground = new Graphics()
    ground.rect(0, 80, BASE_WIDTH, BASE_HEIGHT - 80).fill(GROUND_GREEN)
    scene.addChild(ground)

    // Pathways (converging toward memorial center)
    const paths = new Graphics()
    // Main path from bottom to memorial
    paths.rect(140, 100, 40, 80).fill(PATH_COLOR)
    // Cross path
    paths.rect(40, 115, 240, 14).fill(PATH_COLOR)
    // Path edges (lighter)
    paths.rect(139, 100, 1, 80).fill(PATH_LIGHT)
    paths.rect(180, 100, 1, 80).fill(PATH_LIGHT)
    paths.rect(40, 114, 240, 1).fill(PATH_LIGHT)
    paths.rect(40, 129, 240, 1).fill(PATH_LIGHT)
    scene.addChild(paths)

    // Grass patches
    const grass = new Graphics()
    for (let x = 0; x < BASE_WIDTH; x += 6) {
      for (let y = 82; y < BASE_HEIGHT; y += 8) {
        // Skip path areas
        if (x >= 138 && x <= 182 && y >= 98) continue
        if (y >= 112 && y <= 131 && x >= 38 && x <= 282) continue
        const shade = Math.random() > 0.5 ? GRASS_COLOR : GRASS_LIGHT
        grass.rect(x, y, 4, 3).fill({ color: shade, alpha: 0.6 })
      }
    }
    scene.addChild(grass)

    // Greenery container (trees appear with progress)
    const greenery = new Container()
    greeneryRef.current = greenery
    greenery.alpha = 0
    scene.addChild(greenery)

    // Trees (various sizes)
    const trees: Graphics[] = []

    const drawTree = (g: Graphics, x: number, y: number, size: number) => {
      // Trunk
      g.rect(x, y, Math.max(3, size * 0.4), size * 1.5).fill(TREE_TRUNK)
      // Canopy layers
      const canopyW = size * 2
      const canopyH = size * 1.2
      g.rect(x - canopyW / 2 + 1, y - canopyH, canopyW, canopyH).fill(TREE_GREEN_DARK)
      g.rect(x - canopyW / 2 + 3, y - canopyH - size * 0.3, canopyW - 4, canopyH * 0.6).fill(TREE_GREEN_MID)
      g.rect(x - canopyW / 2 + 5, y - canopyH - size * 0.1, canopyW - 8, canopyH * 0.4).fill(TREE_GREEN_LIGHT)
    }

    // Left trees
    const tree1 = new Graphics()
    drawTree(tree1, 30, 90, 14)
    greenery.addChild(tree1)
    trees.push(tree1)

    const tree2 = new Graphics()
    drawTree(tree2, 70, 95, 10)
    greenery.addChild(tree2)
    trees.push(tree2)

    // Right trees
    const tree3 = new Graphics()
    drawTree(tree3, 260, 88, 16)
    greenery.addChild(tree3)
    trees.push(tree3)

    const tree4 = new Graphics()
    drawTree(tree4, 230, 96, 9)
    greenery.addChild(tree4)
    trees.push(tree4)

    // Background trees (smaller, further)
    const tree5 = new Graphics()
    drawTree(tree5, 100, 82, 8)
    greenery.addChild(tree5)
    trees.push(tree5)

    const tree6 = new Graphics()
    drawTree(tree6, 210, 80, 7)
    greenery.addChild(tree6)
    trees.push(tree6)

    treeRefs.current = trees

    // Bench near path
    const bench = new Graphics()
    bench.rect(100, 132, 24, 4).fill(BENCH_COLOR)
    bench.rect(102, 136, 3, 5).fill(BENCH_COLOR)
    bench.rect(119, 136, 3, 5).fill(BENCH_COLOR)
    bench.rect(100, 128, 24, 3).fill(BENCH_COLOR) // back
    greenery.addChild(bench)

    // Memorial stone/marker (center of scene)
    const memorial = new Graphics()
    // Base platform
    memorial.rect(148, 104, 24, 4).fill(MEMORIAL_DARK)
    memorial.rect(146, 108, 28, 3).fill(MEMORIAL_DARK)
    // Stone upright
    memorial.rect(152, 80, 16, 24).fill(MEMORIAL_STONE)
    // Front face (slightly lighter)
    memorial.rect(153, 81, 14, 22).fill(MEMORIAL_FACE)
    // Engraved text lines (tiny pixels representing characters)
    memorial.rect(156, 84, 2, 2).fill(MEMORIAL_DARK)
    memorial.rect(160, 84, 2, 2).fill(MEMORIAL_DARK)
    memorial.rect(164, 84, 2, 2).fill(MEMORIAL_DARK)
    memorial.rect(155, 89, 8, 1).fill(MEMORIAL_DARK)
    memorial.rect(155, 92, 6, 1).fill(MEMORIAL_DARK)
    memorial.rect(155, 95, 8, 1).fill(MEMORIAL_DARK)
    memorial.rect(155, 98, 4, 1).fill(MEMORIAL_DARK)
    scene.addChild(memorial)

    // Small flowers at base of memorial
    const flowers = new Graphics()
    flowers.rect(148, 102, 3, 3).fill(FLOWER_WHITE)
    flowers.rect(152, 103, 2, 2).fill(FLOWER_YELLOW)
    flowers.rect(166, 102, 3, 3).fill(FLOWER_WHITE)
    flowers.rect(170, 103, 2, 2).fill(FLOWER_YELLOW)
    flowers.rect(158, 104, 2, 2).fill(FLOWER_WHITE)
    scene.addChild(flowers)

    // Dark borders (narrow view effect — will shrink with progress)
    const borderLeft = new Graphics()
    borderLeftRef.current = borderLeft
    scene.addChild(borderLeft)

    const borderRight = new Graphics()
    borderRightRef.current = borderRight
    scene.addChild(borderRight)

    // Light overlay (brightening effect)
    const lightOverlay = new Graphics()
    lightOverlayRef.current = lightOverlay
    scene.addChild(lightOverlay)

    // Animation — gentle tree sway
    const tickerFn = () => {
      frameRef.current += 1
      const t = frameRef.current

      for (let i = 0; i < treeRefs.current.length; i++) {
        const tree = treeRefs.current[i]
        if (tree) {
          // Very subtle sway (0.3-0.5px)
          tree.x = Math.sin(t * 0.01 + i * 1.5) * 0.4
        }
      }
    }
    app.ticker.add(tickerFn)

    return () => {
      app.ticker.remove(tickerFn)
      treeRefs.current = []
      borderLeftRef.current = null
      borderRightRef.current = null
      skyRef.current = null
      lightOverlayRef.current = null
      greeneryRef.current = null
    }
  }, [])

  const onProgress = useCallback((_progress: number, scene: Container) => {
    // Sky color transitions from dark to lighter (but never fully bright)
    if (skyRef.current) {
      skyRef.current.clear()
      if (_progress < 0.5) {
        skyRef.current.rect(0, 0, BASE_WIDTH, 80).fill(SKY_GRAY)
      } else {
        // Gradual transition
        const p = (_progress - 0.5) / 0.5
        // Draw bands to simulate gradient change
        skyRef.current.rect(0, 0, BASE_WIDTH, 30).fill(SKY_GRAY)
        skyRef.current.rect(0, 30, BASE_WIDTH, 25).fill({ color: SKY_LIGHT, alpha: p })
        skyRef.current.rect(0, 55, BASE_WIDTH, 25).fill({ color: SKY_WARM, alpha: p * 0.7 })
        // Remaining gray tinge (truth not fully revealed)
        skyRef.current.rect(0, 0, BASE_WIDTH, 80).fill({ color: 0x808890, alpha: 0.2 })
      }
    }

    // Phase 1 (0-0.3): Narrow dark view
    // Phase 2 (0.3-0.7): View expands, light increases, greenery appears
    // Phase 3 (0.7-1.0): Full open view with remaining gray tinge

    // Border contraction (starts wide, shrinks to nothing)
    const borderWidth = _progress < 0.3
      ? BASE_WIDTH * 0.3 * (1 - _progress / 0.3)
      : _progress < 0.7
        ? BASE_WIDTH * 0.1 * (1 - (_progress - 0.3) / 0.4) * 0.5
        : 0

    if (borderLeftRef.current) {
      borderLeftRef.current.clear()
      if (borderWidth > 0) {
        borderLeftRef.current.rect(0, 0, borderWidth, BASE_HEIGHT).fill(BORDER_DARK)
      }
    }
    if (borderRightRef.current) {
      borderRightRef.current.clear()
      if (borderWidth > 0) {
        borderRightRef.current.rect(BASE_WIDTH - borderWidth, 0, borderWidth, BASE_HEIGHT).fill(BORDER_DARK)
      }
    }

    // Greenery appears during phase 2
    if (greeneryRef.current) {
      if (_progress < 0.3) {
        greeneryRef.current.alpha = _progress / 0.3 * 0.3
      } else if (_progress < 0.7) {
        greeneryRef.current.alpha = 0.3 + ((_progress - 0.3) / 0.4) * 0.7
      } else {
        greeneryRef.current.alpha = 1
      }
    }

    // Light overlay — brightens scene progressively
    if (lightOverlayRef.current) {
      lightOverlayRef.current.clear()
      if (_progress > 0.3) {
        const lightP = (_progress - 0.3) / 0.7
        // Warm light from above (but not fully warm — gray tinge stays)
        lightOverlayRef.current.rect(0, 0, BASE_WIDTH, BASE_HEIGHT)
          .fill({ color: 0xd0c8b8, alpha: lightP * 0.1 })
        // Sun-like glow in upper area
        lightOverlayRef.current.circle(BASE_WIDTH / 2, 20, 40 + lightP * 20)
          .fill({ color: 0xe0d8c8, alpha: lightP * 0.06 })
      }
      // Permanent gray tinge overlay (truth remains obscured)
      if (_progress > 0.7) {
        lightOverlayRef.current.rect(0, 0, BASE_WIDTH, BASE_HEIGHT)
          .fill({ color: 0x8a9098, alpha: 0.05 })
      }
    }

    // Overall scene fade in
    scene.alpha = Math.min(1, _progress * 3.5)
  }, [])

  return (
    <PixelScene
      progress={progress}
      isInView={isInView}
      ariaLabel="台大校園陳文成事件紀念廣場：紀念碑矗立在綠蔭與步道之間，視野從狹窄黑暗逐漸開闊，光線回暖但天空仍留灰色"
      onSetup={onSetup}
      onProgress={onProgress}
      fallbackText="[ 場景：台大校園紀念廣場——光線漸明但真相仍未完全揭露 ]"
    />
  )
}
