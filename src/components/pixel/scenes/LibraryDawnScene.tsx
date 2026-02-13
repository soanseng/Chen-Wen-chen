import { useCallback, useRef } from 'react'
import { Application, Container, Graphics } from 'pixi.js'
import { PixelScene, type PixelSceneProps, BASE_WIDTH } from '../PixelScene'

// Colors — cold dawn gray-blue
const SKY_TOP = 0x2a3a4a
const SKY_BOTTOM = 0x4a5a6a
const BUILDING_WHITE = 0x8a8a8a
const BUILDING_SHADOW = 0x5a5a5a
const WINDOW_DARK = 0x3a3a4a
const FIRE_ESCAPE = 0x6a6a6a
const RAILING = 0x7a7a7a
const GROUND = 0x2a2a25
const DITCH_COLOR = 0x3a4a4a
const FOG_COLOR = 0xc0c8d0
const TREE_TRUNK = 0x3a3025
const TREE_GREEN = 0x3a4a3a
const GUARD_COLOR = 0x2a3a2a

/**
 * Scene 6: library-dawn — NTU Graduate Library at Dawn
 * Chapter 5: Found Dead at NTU
 * Mood: Cold, solemn — shown with restraint
 * Camera pans down with progress from building overview to ground level
 */
export function LibraryDawnScene({ progress, isInView }: PixelSceneProps) {
  const frameRef = useRef(0)
  const fogLayersRef = useRef<Graphics[]>([])

  const onSetup = useCallback((app: Application, scene: Container) => {
    // The scene is taller than viewport — we'll use a container that shifts up
    // Total scene height = ~300px, viewport = 180px
    // Progress controls camera offset
    const world = new Container()
    scene.addChild(world)

    // Sky gradient
    const sky = new Graphics()
    sky.rect(0, 0, BASE_WIDTH, 60).fill(SKY_TOP)
    sky.rect(0, 60, BASE_WIDTH, 40).fill(SKY_BOTTOM)
    world.addChild(sky)

    // Far trees/background
    const bgTrees = new Graphics()
    for (let x = 0; x < BASE_WIDTH; x += 20) {
      const h = 10 + Math.sin(x * 0.1) * 5
      bgTrees.rect(x, 95 - h, 18, h).fill({ color: TREE_GREEN, alpha: 0.5 })
    }
    world.addChild(bgTrees)

    // 5-story building
    const building = new Graphics()
    const bx = 80
    const by = 30
    const bw = 120
    const floorH = 18
    const floors = 5

    // Main structure
    building.rect(bx, by, bw, floors * floorH).fill(BUILDING_WHITE)
    // Shadow side
    building.rect(bx + bw, by + 5, 10, floors * floorH - 5).fill(BUILDING_SHADOW)

    // Floor lines and windows
    for (let f = 0; f < floors; f++) {
      const fy = by + f * floorH
      // Floor separator
      building.rect(bx, fy, bw, 1).fill(BUILDING_SHADOW)
      // Windows
      for (let w = 0; w < 6; w++) {
        const wx = bx + 8 + w * 18
        building.rect(wx, fy + 4, 10, 10).fill(WINDOW_DARK)
      }
    }
    world.addChild(building)

    // 5th floor railing (83cm high, visually ~4px at scale)
    const railing = new Graphics()
    const railY = by + 1
    railing.rect(bx, railY - 4, bw, 1).fill(RAILING)
    // Railing posts
    for (let i = 0; i < 8; i++) {
      railing.rect(bx + 8 + i * 15, railY - 4, 1, 4).fill(RAILING)
    }
    world.addChild(railing)

    // Fire escape (right side)
    const fireEscape = new Graphics()
    const fex = bx + bw + 2
    for (let f = 0; f < floors; f++) {
      const fy = by + f * floorH + floorH - 2
      // Platform
      fireEscape.rect(fex, fy, 15, 2).fill(FIRE_ESCAPE)
      // Vertical rails
      fireEscape.rect(fex, fy - floorH + 2, 1, floorH).fill(FIRE_ESCAPE)
      fireEscape.rect(fex + 14, fy - floorH + 2, 1, floorH).fill(FIRE_ESCAPE)
      // Diagonal stairs
      if (f < floors - 1) {
        const nextFy = fy + floorH
        fireEscape.moveTo(fex + 2, fy + 2)
        fireEscape.lineTo(fex + 12, nextFy)
        fireEscape.stroke({ width: 1, color: FIRE_ESCAPE })
      }
    }
    world.addChild(fireEscape)

    // Ground level
    const ground = new Graphics()
    ground.rect(0, by + floors * floorH, BASE_WIDTH, 80).fill(GROUND)
    world.addChild(ground)

    // Shallow ditch
    const ditch = new Graphics()
    const ditchY = by + floors * floorH + 15
    ditch.rect(70, ditchY, 140, 6).fill(DITCH_COLOR)
    // Water reflection
    ditch.rect(75, ditchY + 1, 50, 1).fill({ color: 0x5a6a7a, alpha: 0.3 })
    ditch.rect(130, ditchY + 2, 30, 1).fill({ color: 0x5a6a7a, alpha: 0.3 })
    world.addChild(ditch)

    // Shadow/implication area near ditch (no body shown — restraint)
    const shadow = new Graphics()
    shadow.rect(120, ditchY - 2, 20, 8).fill({ color: 0x1a1a1a, alpha: 0.3 })
    world.addChild(shadow)

    // Nearby vegetation
    const plants = new Graphics()
    plants.rect(50, by + floors * floorH - 3, 20, 10).fill(TREE_GREEN)
    plants.rect(45, by + floors * floorH - 8, 5, 12).fill(TREE_TRUNK)
    plants.rect(220, by + floors * floorH - 5, 25, 12).fill(TREE_GREEN)
    plants.rect(235, by + floors * floorH - 12, 4, 15).fill(TREE_TRUNK)
    // Small bushes
    plants.rect(60, ditchY + 6, 12, 5).fill({ color: TREE_GREEN, alpha: 0.7 })
    plants.rect(180, ditchY + 4, 15, 6).fill({ color: TREE_GREEN, alpha: 0.7 })
    world.addChild(plants)

    // Security guard (tiny, distant figure)
    const guard = new Graphics()
    guard.rect(30, by + floors * floorH + 5, 4, 3).fill(GUARD_COLOR)
    guard.rect(30, by + floors * floorH + 8, 4, 6).fill(GUARD_COLOR)
    guard.rect(30, by + floors * floorH + 14, 2, 4).fill(GUARD_COLOR)
    guard.rect(33, by + floors * floorH + 14, 2, 4).fill(GUARD_COLOR)
    world.addChild(guard)

    // Fog layers
    const fogLayers: Graphics[] = []
    for (let i = 0; i < 3; i++) {
      const fog = new Graphics()
      const fogY = 80 + i * 20
      fog.rect(0, fogY, BASE_WIDTH, 15).fill({ color: FOG_COLOR, alpha: 0.08 })
      fog.rect(20 + i * 40, fogY + 5, 80, 8).fill({ color: FOG_COLOR, alpha: 0.05 })
      world.addChild(fog)
      fogLayers.push(fog)
    }
    fogLayersRef.current = fogLayers

    // Animation
    const tickerFn = () => {
      frameRef.current += 1

      // Fog drift
      for (let i = 0; i < fogLayers.length; i++) {
        const drift = Math.sin(frameRef.current * 0.008 + i * 2) * 3
        fogLayers[i].x = drift
      }
    }
    app.ticker.add(tickerFn)

    return () => {
      app.ticker.remove(tickerFn)
      fogLayersRef.current = []
    }
  }, [])

  const onProgress = useCallback((_progress: number, scene: Container) => {
    // Camera pan: move world up as progress increases
    // At progress 0 → show top of building
    // At progress 1 → show ground level (ditch area)
    const world = scene.children[0] as Container
    if (!world) return

    const maxShift = -80 // shift up by 80px to reveal ground
    world.y = _progress * maxShift

    // Overall fade
    scene.alpha = Math.min(1, _progress * 3)
  }, [])

  return (
    <PixelScene
      progress={progress}
      isInView={isInView}
      ariaLabel="清晨台大研究生圖書館：五層白磚建築側面，太平梯、護欄可見，鏡頭緩慢下移至地面淺水溝旁"
      onSetup={onSetup}
      onProgress={onProgress}
      fallbackText="[ 場景：台大研究生圖書館旁清晨——沉重的灰藍色調 ]"
    />
  )
}
