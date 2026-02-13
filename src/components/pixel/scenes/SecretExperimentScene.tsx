import { useCallback, useRef } from 'react'
import { Application, Container, Graphics } from 'pixi.js'
import { PixelScene, type PixelSceneProps, BASE_WIDTH, BASE_HEIGHT } from '../PixelScene'

// Colors — cold institutional gray
const SKY_GRAY = 0x3a3a42
const BUILDING_GRAY = 0x7a7a7a
const BUILDING_SHADOW = 0x5a5a5a
const WINDOW_DARK = 0x3a3a4a
const FIRE_ESCAPE = 0x6a6a6a
const RAILING = 0x7a7a7a
const GROUND_COLOR = 0x2a2a28
const DUMMY_COLOR = 0xc8b89a
const DUMMY_CLOTH = 0x8a8880
const TRAJECTORY_DOT = 0xc23b22
const IMPACT_RED = 0xc23b22
const PERSONNEL_GREEN = 0x3a4a3a
const CLIPBOARD_WHITE = 0xe0dcd4
const STAMP_RED = 0xb02020
const TREE_GREEN = 0x3a4a3a

/**
 * Scene 7: secret-experiment — The Dummy Drop Experiment (Ming-Yuan Project)
 * Chapter 6: 1984 NTU Graduate Library — Military reenactment
 * Mood: Absurd, dark — the grotesque logic of using a mannequin to reconstruct death
 */
export function SecretExperimentScene({ progress, isInView }: PixelSceneProps) {
  const frameRef = useRef(0)
  const dummyRef = useRef<Graphics | null>(null)
  const personnelRef = useRef<Graphics | null>(null)
  const trajectoryRef = useRef<Graphics | null>(null)
  const impactRef = useRef<Graphics | null>(null)
  const stampRef = useRef<Graphics | null>(null)
  const clipboardArmRef = useRef<Graphics | null>(null)

  const onSetup = useCallback((app: Application, scene: Container) => {
    // Dark gray sky
    const sky = new Graphics()
    sky.rect(0, 0, BASE_WIDTH, 80).fill(SKY_GRAY)
    scene.addChild(sky)

    // Ground
    const ground = new Graphics()
    ground.rect(0, 140, BASE_WIDTH, 40).fill(GROUND_COLOR)
    scene.addChild(ground)

    // Background trees
    const bgTrees = new Graphics()
    for (let x = 0; x < 60; x += 18) {
      const h = 12 + Math.sin(x * 0.15) * 4
      bgTrees.rect(x, 90 - h, 16, h + 50).fill({ color: TREE_GREEN, alpha: 0.4 })
    }
    for (let x = 250; x < BASE_WIDTH; x += 18) {
      const h = 10 + Math.sin(x * 0.12) * 5
      bgTrees.rect(x, 88 - h, 16, h + 52).fill({ color: TREE_GREEN, alpha: 0.4 })
    }
    scene.addChild(bgTrees)

    // 5-story building (similar shape to LibraryDawnScene)
    const building = new Graphics()
    const bx = 80
    const by = 10
    const bw = 120
    const floorH = 18
    const floors = 5

    // Main structure
    building.rect(bx, by + 20, bw, floors * floorH).fill(BUILDING_GRAY)
    // Shadow side
    building.rect(bx + bw, by + 25, 10, floors * floorH - 5).fill(BUILDING_SHADOW)
    // Roof ledge
    building.rect(bx - 2, by + 18, bw + 4, 4).fill(BUILDING_SHADOW)

    // Floor lines and windows
    for (let f = 0; f < floors; f++) {
      const fy = by + 20 + f * floorH
      building.rect(bx, fy, bw, 1).fill(BUILDING_SHADOW)
      for (let w = 0; w < 6; w++) {
        const wx = bx + 8 + w * 18
        building.rect(wx, fy + 4, 10, 10).fill(WINDOW_DARK)
      }
    }
    scene.addChild(building)

    // 5th floor railing
    const railing = new Graphics()
    const railY = by + 21
    railing.rect(bx, railY - 4, bw, 1).fill(RAILING)
    for (let i = 0; i < 8; i++) {
      railing.rect(bx + 8 + i * 15, railY - 4, 1, 4).fill(RAILING)
    }
    scene.addChild(railing)

    // Fire escape (right side)
    const fireEscape = new Graphics()
    const fex = bx + bw + 2
    for (let f = 0; f < floors; f++) {
      const fy = by + 20 + f * floorH + floorH - 2
      fireEscape.rect(fex, fy, 15, 2).fill(FIRE_ESCAPE)
      fireEscape.rect(fex, fy - floorH + 2, 1, floorH).fill(FIRE_ESCAPE)
      fireEscape.rect(fex + 14, fy - floorH + 2, 1, floorH).fill(FIRE_ESCAPE)
      if (f < floors - 1) {
        const nextFy = fy + floorH
        fireEscape.moveTo(fex + 2, fy + 2)
        fireEscape.lineTo(fex + 12, nextFy)
        fireEscape.stroke({ width: 1, color: FIRE_ESCAPE })
      }
    }
    scene.addChild(fireEscape)

    // Military personnel on 5th floor (2-3 figures)
    const personnel = new Graphics()
    personnelRef.current = personnel
    scene.addChild(personnel)

    // Clipboard arm animation (separate for ticker)
    const clipboardArm = new Graphics()
    clipboardArmRef.current = clipboardArm
    scene.addChild(clipboardArm)

    // Trajectory dotted line
    const trajectory = new Graphics()
    trajectoryRef.current = trajectory
    trajectory.alpha = 0
    scene.addChild(trajectory)

    // Falling dummy
    const dummy = new Graphics()
    dummyRef.current = dummy
    dummy.alpha = 0
    scene.addChild(dummy)

    // Impact point marker
    const impact = new Graphics()
    impactRef.current = impact
    impact.alpha = 0
    scene.addChild(impact)

    // "機密" CLASSIFIED stamp overlay
    const stamp = new Graphics()
    stampRef.current = stamp
    stamp.alpha = 0
    scene.addChild(stamp)

    // Draw personnel (static silhouettes on 5th floor)
    const drawPersonnel = (g: Graphics) => {
      g.clear()
      const py = by + 22 // 5th floor level

      // Person 1 — standing at railing edge
      g.rect(110, py, 6, 5).fill(PERSONNEL_GREEN)
      g.rect(108, py + 5, 10, 12).fill(PERSONNEL_GREEN)
      g.rect(109, py + 17, 4, 8).fill(PERSONNEL_GREEN)
      g.rect(114, py + 17, 4, 8).fill(PERSONNEL_GREEN)

      // Person 2 — slightly back, with clipboard
      g.rect(130, py, 6, 5).fill(PERSONNEL_GREEN)
      g.rect(128, py + 5, 10, 12).fill(PERSONNEL_GREEN)
      g.rect(129, py + 17, 4, 8).fill(PERSONNEL_GREEN)
      g.rect(134, py + 17, 4, 8).fill(PERSONNEL_GREEN)
      // Clipboard
      g.rect(138, py + 7, 4, 6).fill(CLIPBOARD_WHITE)

      // Person 3 — further back
      g.rect(150, py + 2, 6, 5).fill({ color: PERSONNEL_GREEN, alpha: 0.7 })
      g.rect(148, py + 7, 10, 12).fill({ color: PERSONNEL_GREEN, alpha: 0.7 })
      g.rect(149, py + 19, 4, 6).fill({ color: PERSONNEL_GREEN, alpha: 0.7 })
      g.rect(154, py + 19, 4, 6).fill({ color: PERSONNEL_GREEN, alpha: 0.7 })
    }

    drawPersonnel(personnel)

    // Animation
    const tickerFn = () => {
      frameRef.current += 1
      const t = frameRef.current

      // Clipboard writing animation — subtle arm movement
      if (clipboardArmRef.current) {
        clipboardArmRef.current.clear()
        const py = by + 22
        const armOffset = Math.sin(t * 0.06) * 1
        clipboardArmRef.current.rect(136, py + 8 + armOffset, 2, 3).fill(PERSONNEL_GREEN)
      }
    }
    app.ticker.add(tickerFn)

    return () => {
      app.ticker.remove(tickerFn)
      dummyRef.current = null
      personnelRef.current = null
      trajectoryRef.current = null
      impactRef.current = null
      stampRef.current = null
      clipboardArmRef.current = null
    }
  }, [])

  const onProgress = useCallback((_progress: number, scene: Container) => {
    const bx = 80
    const by = 10

    // Phase 1 (0-0.2): Building appears
    scene.alpha = Math.min(1, _progress * 5)

    // Phase 2 (0.2-0.6): Dummy falls from 5th floor
    if (_progress >= 0.2 && dummyRef.current) {
      const fallProgress = Math.min(1, (_progress - 0.2) / 0.4)

      // Start position: at 5th floor railing
      const startX = bx + 50
      const startY = by + 20
      // End position: ground level
      const endX = bx + 40
      const endY = 138

      // Parabolic trajectory (slight outward arc)
      const t = fallProgress
      const dummyX = startX + (endX - startX) * t + Math.sin(t * Math.PI) * 15
      const dummyY = startY + (endY - startY) * t

      dummyRef.current.clear()
      dummyRef.current.alpha = 1

      // Draw dummy (simplified human form)
      // Head
      dummyRef.current.rect(dummyX, dummyY, 6, 5).fill(DUMMY_COLOR)
      // Body
      dummyRef.current.rect(dummyX - 1, dummyY + 5, 8, 10).fill(DUMMY_CLOTH)
      // Limbs (flailing — angle changes during fall)
      const limbAngle = t * Math.PI * 2
      const lx = Math.cos(limbAngle) * 3
      const ly = Math.sin(limbAngle) * 2
      dummyRef.current.rect(dummyX - 3 + lx, dummyY + 6 + ly, 3, 2).fill(DUMMY_COLOR)
      dummyRef.current.rect(dummyX + 6 - lx, dummyY + 7 - ly, 3, 2).fill(DUMMY_COLOR)
      // Legs
      dummyRef.current.rect(dummyX, dummyY + 15, 3, 6).fill(DUMMY_CLOTH)
      dummyRef.current.rect(dummyX + 4, dummyY + 15, 3, 6).fill(DUMMY_CLOTH)

      // Draw trajectory dotted line
      if (trajectoryRef.current) {
        trajectoryRef.current.clear()
        trajectoryRef.current.alpha = 0.6
        const numDots = Math.floor(fallProgress * 12)
        for (let i = 0; i < numDots; i++) {
          const dt = i / 12
          const dotX = startX + (endX - startX) * dt + Math.sin(dt * Math.PI) * 15 + 3
          const dotY = startY + (endY - startY) * dt + 3
          trajectoryRef.current.circle(dotX, dotY, 1).fill(TRAJECTORY_DOT)
        }
      }
    }

    // Phase 3 (0.6-0.8): Impact point highlighted
    if (_progress >= 0.6 && impactRef.current) {
      const impactProgress = Math.min(1, (_progress - 0.6) / 0.2)
      impactRef.current.clear()
      impactRef.current.alpha = impactProgress

      const ix = bx + 40 + 3
      const iy = 142

      // Impact circle expanding
      const radius = 3 + impactProgress * 6
      impactRef.current.circle(ix, iy, radius).fill({ color: IMPACT_RED, alpha: 0.3 })
      impactRef.current.circle(ix, iy, 3).fill({ color: IMPACT_RED, alpha: 0.6 })
      // Impact lines radiating
      for (let a = 0; a < 4; a++) {
        const angle = (a / 4) * Math.PI * 2
        const len = impactProgress * 8
        impactRef.current.moveTo(ix + Math.cos(angle) * 4, iy + Math.sin(angle) * 2)
        impactRef.current.lineTo(ix + Math.cos(angle) * (4 + len), iy + Math.sin(angle) * (2 + len * 0.5))
        impactRef.current.stroke({ width: 1, color: IMPACT_RED })
      }

      // Lock dummy at ground position
      if (dummyRef.current) {
        dummyRef.current.clear()
        dummyRef.current.alpha = 1
        const dx = bx + 40
        const dy = 134
        // Crumpled dummy on ground
        dummyRef.current.rect(dx - 2, dy, 10, 4).fill(DUMMY_CLOTH)
        dummyRef.current.rect(dx, dy - 2, 6, 3).fill(DUMMY_COLOR)
        dummyRef.current.rect(dx + 7, dy + 1, 6, 3).fill(DUMMY_CLOTH)
        dummyRef.current.rect(dx - 4, dy + 1, 4, 3).fill(DUMMY_CLOTH)
      }
    }

    // Phase 4 (0.8-1.0): "機密" CLASSIFIED stamp fades in
    if (_progress >= 0.8 && stampRef.current) {
      const stampProgress = (_progress - 0.8) / 0.2
      stampRef.current.clear()
      stampRef.current.alpha = stampProgress * 0.7

      // Large diagonal stamp across scene
      const cx = BASE_WIDTH / 2
      const cy = BASE_HEIGHT / 2

      // Outer stamp border (rotated rectangle simulated with offset rects)
      // Stamp frame
      stampRef.current.rect(cx - 50, cy - 20, 100, 40).fill({ color: STAMP_RED, alpha: 0.15 })
      stampRef.current.rect(cx - 50, cy - 20, 100, 2).fill(STAMP_RED)
      stampRef.current.rect(cx - 50, cy + 18, 100, 2).fill(STAMP_RED)
      stampRef.current.rect(cx - 50, cy - 20, 2, 40).fill(STAMP_RED)
      stampRef.current.rect(cx + 48, cy - 20, 2, 40).fill(STAMP_RED)

      // "機密" characters (pixel block representation)
      // Character 1: 機
      stampRef.current.rect(cx - 30, cy - 10, 4, 18).fill(STAMP_RED) // vertical stroke
      stampRef.current.rect(cx - 34, cy - 6, 12, 2).fill(STAMP_RED) // horizontal
      stampRef.current.rect(cx - 34, cy, 12, 2).fill(STAMP_RED) // horizontal
      stampRef.current.rect(cx - 34, cy + 6, 12, 2).fill(STAMP_RED) // horizontal
      stampRef.current.rect(cx - 36, cy - 10, 2, 18).fill(STAMP_RED) // left stroke
      stampRef.current.rect(cx - 22, cy - 10, 2, 18).fill(STAMP_RED) // right stroke

      // Character 2: 密
      stampRef.current.rect(cx + 10, cy - 10, 4, 18).fill(STAMP_RED) // vertical
      stampRef.current.rect(cx + 4, cy - 8, 16, 2).fill(STAMP_RED) // top horizontal
      stampRef.current.rect(cx + 6, cy - 2, 12, 2).fill(STAMP_RED) // mid horizontal
      stampRef.current.rect(cx + 4, cy + 4, 16, 2).fill(STAMP_RED) // bottom horizontal
      stampRef.current.rect(cx + 4, cy - 10, 2, 18).fill(STAMP_RED) // left
      stampRef.current.rect(cx + 18, cy - 10, 2, 18).fill(STAMP_RED) // right
    }
  }, [])

  return (
    <PixelScene
      progress={progress}
      isInView={isInView}
      ariaLabel="1984年台大研究生圖書館，明園專案重演實驗：軍方人員從五樓投擲假人模型，記錄落下軌跡，最終蓋上機密紅色印章"
      onSetup={onSetup}
      onProgress={onProgress}
      fallbackText="[ 場景：明園專案——荒誕的假人墜落重演實驗 ]"
    />
  )
}
