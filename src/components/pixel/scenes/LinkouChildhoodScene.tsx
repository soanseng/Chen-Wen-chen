/**
 * Scene: Linkou Childhood (林口童年)
 * Chapter 1 Opening — 1950-60s rural Linkou, Taiwan
 * Mood: Warm, hopeful, golden afternoon light
 */

import { useCallback, useRef } from 'react'
import { Application, Container, Graphics } from 'pixi.js'
import { PixelScene, type PixelSceneProps, BASE_WIDTH, BASE_HEIGHT } from '../PixelScene'

// Color palette — warm afternoon golden light
const SUN_COLOR = 0xFBBF24
const SUN_HALO = 0xFEF3C7
const MOUNTAIN_FAR = 0x6B9E8A
const MOUNTAIN_MID = 0x4D8B6F
const MOUNTAIN_NEAR = 0x3A7D5E
const RICE_FIELD_BASE = 0xA3BE5C
const RICE_FIELD_LIGHT = 0xC5D95E
const RICE_TIP = 0xD4E157
const DIRT_PATH = 0xC2956B
const DIRT_PATH_SHADOW = 0xA67B5B
const HOUSE_WALL = 0xD4A574
const HOUSE_WALL_SHADOW = 0xB88B5E
const ROOF_TILE = 0x8B4513
const ROOF_TILE_LIGHT = 0xA0522D
const DOOR_COLOR = 0x5C3A1E
const WINDOW_COLOR = 0x87CEEB
const FIGURE_SKIN = 0xF0C8A0
const FIGURE_HAIR = 0x2C1810
const FIGURE_SHIRT = 0xF5F5DC
const FIGURE_PANTS = 0x4A6741
const FIGURE_BACKPACK = 0x8B6914
const GOLDEN_OVERLAY = 0xFDE68A

export function LinkouChildhoodScene({ progress, isInView }: PixelSceneProps) {
  const frameRef = useRef(0)
  const riceColumnsRef = useRef<Graphics[]>([])
  const figureRef = useRef<Container | null>(null)
  const figureLegsRef = useRef<Graphics | null>(null)
  const sceneRef = useRef<Container | null>(null)

  const onSetup = useCallback((app: Application, scene: Container) => {
    sceneRef.current = scene
    scene.alpha = 0

    // === SKY GRADIENT ===
    const sky = new Graphics()
    for (let y = 0; y < 80; y++) {
      const t = y / 80
      const r = Math.round(0x87 + (0xFD - 0x87) * t)
      const g = Math.round(0xCE + (0xE6 - 0xCE) * t)
      const b = Math.round(0xEB + (0x8A - 0xEB) * t)
      const color = (r << 16) | (g << 8) | b
      sky.rect(0, y, BASE_WIDTH, 1).fill(color)
    }
    scene.addChild(sky)

    // === SUN ===
    const sun = new Graphics()
    sun.circle(240, 30, 14).fill(SUN_HALO)
    sun.circle(240, 30, 9).fill(SUN_COLOR)
    scene.addChild(sun)

    // === MOUNTAINS (3 layers, far to near) ===
    const mountainFar = new Graphics()
    mountainFar.moveTo(0, 65)
    mountainFar.lineTo(40, 40).lineTo(80, 55).lineTo(120, 35).lineTo(170, 50)
    mountainFar.lineTo(220, 38).lineTo(270, 48).lineTo(BASE_WIDTH, 58)
    mountainFar.lineTo(BASE_WIDTH, 80).lineTo(0, 80).closePath().fill(MOUNTAIN_FAR)
    scene.addChild(mountainFar)

    const mountainMid = new Graphics()
    mountainMid.moveTo(0, 70)
    mountainMid.lineTo(50, 52).lineTo(100, 62).lineTo(150, 48).lineTo(200, 58)
    mountainMid.lineTo(260, 50).lineTo(BASE_WIDTH, 65)
    mountainMid.lineTo(BASE_WIDTH, 85).lineTo(0, 85).closePath().fill(MOUNTAIN_MID)
    scene.addChild(mountainMid)

    const mountainNear = new Graphics()
    mountainNear.moveTo(0, 78)
    mountainNear.lineTo(60, 62).lineTo(130, 72).lineTo(180, 58).lineTo(240, 68)
    mountainNear.lineTo(BASE_WIDTH, 74)
    mountainNear.lineTo(BASE_WIDTH, 90).lineTo(0, 90).closePath().fill(MOUNTAIN_NEAR)
    scene.addChild(mountainNear)

    // === RICE FIELDS ===
    const riceBase = new Graphics()
    riceBase.rect(0, 85, BASE_WIDTH, 95).fill(RICE_FIELD_BASE)
    scene.addChild(riceBase)

    // Rice columns (sway animation targets)
    const columns: Graphics[] = []
    for (let col = 0; col < 40; col++) {
      const x = col * 8 + 2
      const rice = new Graphics()
      // Draw rice stalks
      for (let row = 0; row < 6; row++) {
        const yBase = 90 + row * 14
        if (yBase > BASE_HEIGHT - 10) break
        rice.rect(x, yBase, 2, 10).fill(RICE_FIELD_LIGHT)
        rice.rect(x - 1, yBase, 4, 2).fill(RICE_TIP)
      }
      scene.addChild(rice)
      columns.push(rice)
    }
    riceColumnsRef.current = columns

    // === DIRT PATH (winding from bottom center) ===
    const path = new Graphics()
    // Path shadow
    path.moveTo(148, BASE_HEIGHT)
    path.lineTo(155, 150).lineTo(158, 130).lineTo(162, 115)
    path.lineTo(160, 105).lineTo(155, 95)
    path.lineTo(165, 95).lineTo(170, 105)
    path.lineTo(172, 115).lineTo(168, 130).lineTo(165, 150)
    path.lineTo(172, BASE_HEIGHT).closePath().fill(DIRT_PATH_SHADOW)
    // Path surface
    path.moveTo(150, BASE_HEIGHT)
    path.lineTo(156, 150).lineTo(159, 130).lineTo(163, 115)
    path.lineTo(161, 105).lineTo(157, 96)
    path.lineTo(163, 96).lineTo(168, 105)
    path.lineTo(170, 115).lineTo(166, 130).lineTo(163, 150)
    path.lineTo(170, BASE_HEIGHT).closePath().fill(DIRT_PATH)
    scene.addChild(path)

    // === FARMHOUSE ===
    const house = new Graphics()
    // Wall shadow
    house.rect(80, 86, 40, 24).fill(HOUSE_WALL_SHADOW)
    // Wall
    house.rect(82, 86, 36, 22).fill(HOUSE_WALL)
    // Roof (traditional sloped tile roof)
    house.moveTo(76, 86).lineTo(100, 72).lineTo(124, 86).closePath().fill(ROOF_TILE)
    house.moveTo(78, 86).lineTo(100, 74).lineTo(122, 86).closePath().fill(ROOF_TILE_LIGHT)
    // Door
    house.rect(96, 98, 8, 10).fill(DOOR_COLOR)
    // Window
    house.rect(86, 94, 6, 6).fill(WINDOW_COLOR)
    house.rect(86, 94, 6, 1).fill(ROOF_TILE)
    house.rect(89, 94, 1, 6).fill(ROOF_TILE)
    scene.addChild(house)

    // === YOUNG CHEN WEN-CHEN FIGURE ===
    const figure = new Container()
    figure.x = 160
    figure.y = 120

    // Body
    const body = new Graphics()
    // Head
    body.rect(-2, -14, 5, 5).fill(FIGURE_SKIN)
    // Hair
    body.rect(-2, -15, 5, 3).fill(FIGURE_HAIR)
    // Shirt
    body.rect(-2, -9, 5, 6).fill(FIGURE_SHIRT)
    // Backpack
    body.rect(3, -9, 3, 5).fill(FIGURE_BACKPACK)
    // Arms
    body.rect(-3, -8, 1, 4).fill(FIGURE_SKIN)
    body.rect(3, -8, 1, 4).fill(FIGURE_SKIN)
    figure.addChild(body)

    // Legs (animated)
    const legs = new Graphics()
    legs.rect(-1, -3, 2, 4).fill(FIGURE_PANTS)
    legs.rect(1, -3, 2, 4).fill(FIGURE_PANTS)
    figure.addChild(legs)
    figureLegsRef.current = legs

    scene.addChild(figure)
    figureRef.current = figure

    // === GOLDEN LIGHT OVERLAY ===
    const overlay = new Graphics()
    overlay.rect(0, 0, BASE_WIDTH, BASE_HEIGHT).fill(GOLDEN_OVERLAY)
    overlay.alpha = 0.08
    scene.addChild(overlay)

    // === ANIMATION TICKER ===
    const tickerCb = () => {
      frameRef.current++
      const frame = frameRef.current

      // Rice sway
      for (let i = 0; i < columns.length; i++) {
        const offset = Math.sin((frame * 0.03) + i * 0.5) * 1.5
        columns[i].x = offset
      }

      // Walk cycle (2-frame, every 20 ticks)
      if (legs) {
        const walkFrame = Math.floor(frame / 20) % 2
        legs.clear()
        if (walkFrame === 0) {
          legs.rect(-1, -3, 2, 4).fill(FIGURE_PANTS)
          legs.rect(2, -3, 2, 3).fill(FIGURE_PANTS)
        } else {
          legs.rect(0, -3, 2, 3).fill(FIGURE_PANTS)
          legs.rect(1, -3, 2, 4).fill(FIGURE_PANTS)
        }
      }

      // Golden shimmer
      overlay.alpha = 0.06 + Math.sin(frame * 0.02) * 0.03
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

    // At progress > 0.5, figure moves along path toward house
    const figure = figureRef.current
    if (figure) {
      const moveT = Math.max(0, (p - 0.5) * 2)
      figure.x = 160 - moveT * 20
      figure.y = 120 - moveT * 15
      figure.scale.set(1 - moveT * 0.15)
    }
  }, [])

  return (
    <PixelScene
      progress={progress}
      isInView={isInView}
      ariaLabel="1950年代林口鄉間，年幼的陳文成背著書包走在田間小路上"
      onSetup={onSetup}
      onProgress={onProgress}
      fallbackText="林口鄉間的金色午後，稻田搖曳，年幼的陳文成走在回家的小路上。"
    />
  )
}
