/**
 * Scene: Reading Formosa Magazine (閱讀美麗島雜誌)
 * Chapter 2 — Pittsburgh home study at night
 * Mood: Passion, concern, warm interior vs cold exterior
 */

import { useCallback, useRef } from 'react'
import { Application, Container, Graphics } from 'pixi.js'
import { PixelScene, type PixelSceneProps, BASE_WIDTH, BASE_HEIGHT } from '../PixelScene'

// Color palette — warm interior / cold exterior contrast
const ROOM_DARK = 0x1A1412
const ROOM_FLOOR = 0x2A1F18
const WALL_COLOR = 0x2D2520
const DESK_COLOR = 0x5C3A1E
const DESK_SURFACE = 0x6B4423
const LAMP_BASE = 0x4A4A4A
const LAMP_SHADE = 0xD4A04A
const LAMP_LIGHT = 0xFFF8E1
const LAMP_HALO_INNER = 0xFFF3C4
const LAMP_HALO_OUTER = 0xFDE68A
const FIGURE_SKIN = 0xF0C8A0
const FIGURE_HAIR = 0x2C1810
const FIGURE_SHIRT = 0x3D5A80
const PAPER_WHITE = 0xF5F0E0
const PAPER_TEXT = 0x4A4A4A
const MAGAZINE_COVER = 0xC0392B
const MAGAZINE_TEXT = 0xF5F0E0
const WINDOW_FRAME = 0x4A3728
const NIGHT_SKY = 0x0A1628
const CITY_LIGHT_1 = 0xFFE082
const CITY_LIGHT_2 = 0xFFA726
const CITY_LIGHT_3 = 0x81D4FA
const BRIDGE_COLOR = 0x37474F
const BOOKSHELF_WOOD = 0x5D4037
const BOOK_RED = 0xB71C1C
const BOOK_BLUE = 0x1565C0
const BOOK_GREEN = 0x2E7D32
const BOOK_YELLOW = 0xF9A825
const PHOTO_FRAME = 0x6D4C41

export function ReadingFormosaScene({ progress, isInView }: PixelSceneProps) {
  const frameRef = useRef(0)
  const sceneRef = useRef<Container | null>(null)
  const haloRef = useRef<Graphics | null>(null)
  const pageRef = useRef<Graphics | null>(null)
  const haloBaseRadius = useRef(45)

  const onSetup = useCallback((app: Application, scene: Container) => {
    sceneRef.current = scene
    scene.alpha = 0

    // === ROOM BACKGROUND (dark) ===
    const room = new Graphics()
    room.rect(0, 0, BASE_WIDTH, BASE_HEIGHT).fill(ROOM_DARK)
    // Wall
    room.rect(0, 0, BASE_WIDTH, 130).fill(WALL_COLOR)
    // Floor
    room.rect(0, 130, BASE_WIDTH, 50).fill(ROOM_FLOOR)
    scene.addChild(room)

    // === WINDOW (right side) ===
    const window = new Graphics()
    // Frame
    window.rect(210, 20, 70, 55).fill(WINDOW_FRAME)
    // Night sky through window
    window.rect(213, 23, 64, 49).fill(NIGHT_SKY)
    // Window cross frame
    window.rect(244, 23, 2, 49).fill(WINDOW_FRAME)
    window.rect(213, 46, 64, 2).fill(WINDOW_FRAME)
    // Pittsburgh skyline silhouette
    window.rect(220, 55, 4, 17).fill(BRIDGE_COLOR)
    window.rect(230, 60, 6, 12).fill(BRIDGE_COLOR)
    window.rect(240, 58, 3, 14).fill(BRIDGE_COLOR)
    window.rect(250, 62, 8, 10).fill(BRIDGE_COLOR)
    window.rect(262, 57, 5, 15).fill(BRIDGE_COLOR)
    // Bridge suggestion (Fort Pitt / Roberto Clemente)
    window.rect(215, 66, 60, 2).fill(BRIDGE_COLOR)
    window.rect(225, 64, 1, 3).fill(BRIDGE_COLOR)
    window.rect(245, 64, 1, 3).fill(BRIDGE_COLOR)
    window.rect(265, 64, 1, 3).fill(BRIDGE_COLOR)
    scene.addChild(window)

    // City lights (tiny dots)
    const cityLights = new Graphics()
    const lightPositions = [
      { x: 222, y: 54, c: CITY_LIGHT_1 },
      { x: 232, y: 59, c: CITY_LIGHT_2 },
      { x: 235, y: 61, c: CITY_LIGHT_1 },
      { x: 253, y: 61, c: CITY_LIGHT_3 },
      { x: 256, y: 63, c: CITY_LIGHT_1 },
      { x: 264, y: 56, c: CITY_LIGHT_2 },
      { x: 241, y: 57, c: CITY_LIGHT_1 },
      { x: 270, y: 60, c: CITY_LIGHT_3 },
    ]
    for (const lp of lightPositions) {
      cityLights.rect(lp.x, lp.y, 1, 1).fill(lp.c)
    }
    scene.addChild(cityLights)

    // === BOOKSHELF (left wall) ===
    const bookshelf = new Graphics()
    // Shelf frame
    bookshelf.rect(15, 25, 50, 50).fill(BOOKSHELF_WOOD)
    bookshelf.rect(17, 27, 46, 11).fill(ROOM_DARK)
    bookshelf.rect(17, 40, 46, 11).fill(ROOM_DARK)
    bookshelf.rect(17, 53, 46, 11).fill(ROOM_DARK)
    // Books (row 1)
    bookshelf.rect(18, 28, 4, 10).fill(BOOK_RED)
    bookshelf.rect(23, 28, 3, 10).fill(BOOK_BLUE)
    bookshelf.rect(27, 29, 5, 9).fill(BOOK_GREEN)
    bookshelf.rect(33, 28, 3, 10).fill(BOOK_YELLOW)
    bookshelf.rect(37, 28, 4, 10).fill(BOOK_BLUE)
    bookshelf.rect(42, 29, 5, 9).fill(BOOK_RED)
    bookshelf.rect(48, 28, 4, 10).fill(BOOK_GREEN)
    bookshelf.rect(53, 28, 5, 10).fill(BOOK_YELLOW)
    // Books (row 2)
    bookshelf.rect(18, 41, 5, 10).fill(BOOK_BLUE)
    bookshelf.rect(24, 42, 4, 9).fill(BOOK_RED)
    bookshelf.rect(29, 41, 3, 10).fill(BOOK_YELLOW)
    bookshelf.rect(33, 41, 6, 10).fill(BOOK_GREEN)
    bookshelf.rect(40, 42, 4, 9).fill(BOOK_RED)
    bookshelf.rect(45, 41, 5, 10).fill(BOOK_BLUE)
    // Books (row 3)
    bookshelf.rect(18, 54, 4, 10).fill(BOOK_GREEN)
    bookshelf.rect(23, 55, 6, 9).fill(BOOK_YELLOW)
    bookshelf.rect(30, 54, 3, 10).fill(BOOK_BLUE)
    bookshelf.rect(34, 54, 5, 10).fill(BOOK_RED)
    bookshelf.rect(40, 55, 4, 9).fill(BOOK_GREEN)
    scene.addChild(bookshelf)

    // === LAMP HALO (drawn before desk so it appears behind figure) ===
    const halo = new Graphics()
    haloRef.current = halo
    scene.addChild(halo)

    // === DESK ===
    const desk = new Graphics()
    // Desk surface
    desk.rect(80, 105, 100, 6).fill(DESK_SURFACE)
    desk.rect(78, 104, 104, 2).fill(DESK_COLOR)
    // Desk legs
    desk.rect(85, 111, 4, 20).fill(DESK_COLOR)
    desk.rect(170, 111, 4, 20).fill(DESK_COLOR)
    scene.addChild(desk)

    // === SCATTERED PAPERS ===
    const papers = new Graphics()
    papers.rect(100, 100, 14, 10).fill(PAPER_WHITE)
    // Text lines on paper
    papers.rect(102, 102, 10, 1).fill(PAPER_TEXT)
    papers.rect(102, 104, 8, 1).fill(PAPER_TEXT)
    papers.rect(102, 106, 10, 1).fill(PAPER_TEXT)
    // Another paper slightly angled
    papers.rect(118, 99, 12, 9).fill(PAPER_WHITE)
    papers.rect(120, 101, 8, 1).fill(PAPER_TEXT)
    papers.rect(120, 103, 6, 1).fill(PAPER_TEXT)
    scene.addChild(papers)

    // === FORMOSA MAGAZINE ===
    const magazine = new Graphics()
    magazine.rect(134, 96, 16, 12).fill(MAGAZINE_COVER)
    // "美麗島" text hint (simplified pixel text)
    magazine.rect(136, 98, 2, 3).fill(MAGAZINE_TEXT)
    magazine.rect(139, 98, 2, 3).fill(MAGAZINE_TEXT)
    magazine.rect(142, 98, 2, 3).fill(MAGAZINE_TEXT)
    // Horizontal line
    magazine.rect(136, 102, 12, 1).fill(MAGAZINE_TEXT)
    magazine.rect(136, 104, 8, 1).fill(MAGAZINE_TEXT)
    scene.addChild(magazine)

    // === PHOTO FRAME ===
    const photo = new Graphics()
    photo.rect(90, 96, 8, 9).fill(PHOTO_FRAME)
    photo.rect(91, 97, 6, 7).fill(0xE8D5B7)
    // Tiny family silhouettes
    photo.rect(92, 99, 2, 3).fill(FIGURE_HAIR)
    photo.rect(95, 99, 2, 3).fill(FIGURE_HAIR)
    scene.addChild(photo)

    // === LAMP (physical object) ===
    const lamp = new Graphics()
    // Lamp base
    lamp.rect(155, 100, 8, 4).fill(LAMP_BASE)
    // Lamp arm
    lamp.rect(158, 86, 2, 14).fill(LAMP_BASE)
    // Lamp shade
    lamp.moveTo(153, 86).lineTo(160, 80).lineTo(167, 86).closePath().fill(LAMP_SHADE)
    // Bulb
    lamp.rect(158, 84, 3, 2).fill(LAMP_LIGHT)
    scene.addChild(lamp)

    // === CHEN WEN-CHEN FIGURE (seated at desk) ===
    const figure = new Graphics()
    // Head
    figure.rect(126, 82, 7, 7).fill(FIGURE_SKIN)
    // Hair
    figure.rect(126, 81, 7, 3).fill(FIGURE_HAIR)
    // Body/shirt (slightly hunched forward)
    figure.rect(124, 89, 10, 12).fill(FIGURE_SHIRT)
    // Arms reaching to desk
    figure.rect(122, 93, 3, 8).fill(FIGURE_SHIRT)
    figure.rect(134, 93, 3, 8).fill(FIGURE_SHIRT)
    // Hands on desk
    figure.rect(122, 101, 3, 2).fill(FIGURE_SKIN)
    figure.rect(134, 101, 3, 2).fill(FIGURE_SKIN)
    scene.addChild(figure)

    // === PAGE TURN EFFECT (flicker overlay on magazine) ===
    const pageTurn = new Graphics()
    pageTurn.rect(134, 96, 16, 12).fill(PAPER_WHITE)
    pageTurn.alpha = 0
    pageRef.current = pageTurn
    scene.addChild(pageTurn)

    // === ANIMATION TICKER ===
    const tickerCb = () => {
      frameRef.current++
      const frame = frameRef.current

      // Lamp halo pulse
      const haloG = haloRef.current
      if (haloG) {
        haloG.clear()
        const radius = haloBaseRadius.current + Math.sin(frame * 0.04) * 3
        // Outer halo
        haloG.circle(160, 90, radius).fill(LAMP_HALO_OUTER)
        haloG.alpha = 0.12
        // Inner halo
        haloG.circle(160, 90, radius * 0.6).fill(LAMP_HALO_INNER)
      }

      // City lights twinkle
      cityLights.clear()
      for (let i = 0; i < lightPositions.length; i++) {
        const lp = lightPositions[i]
        const visible = Math.sin(frame * 0.05 + i * 1.7) > -0.5
        if (visible) {
          cityLights.rect(lp.x, lp.y, 1, 1).fill(lp.c)
        }
      }

      // Page turn every ~300 frames (~5 seconds at 60fps)
      const pageTurnG = pageRef.current
      if (pageTurnG) {
        const cyclePos = frame % 300
        if (cyclePos >= 0 && cyclePos < 12) {
          pageTurnG.alpha = Math.sin((cyclePos / 12) * Math.PI) * 0.7
        } else {
          pageTurnG.alpha = 0
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

    // Lamp halo radius increases gently with progress
    haloBaseRadius.current = 45 + p * 15
  }, [])

  return (
    <PixelScene
      progress={progress}
      isInView={isInView}
      ariaLabel="匹茲堡深夜書房，陳文成在檯燈下閱讀美麗島雜誌，窗外是城市夜景"
      onSetup={onSetup}
      onProgress={onProgress}
      fallbackText="深夜的匹茲堡公寓，檯燈下陳文成伏案閱讀美麗島雜誌，散落的文件與家庭合照，窗外是冰冷的城市燈火。"
    />
  )
}
