import { useCallback, useRef } from 'react'
import { Application, Container, Graphics } from 'pixi.js'
import { PixelScene, type PixelSceneProps, BASE_WIDTH, BASE_HEIGHT } from '../PixelScene'

// Colors — extreme minimalism
const PURE_BLACK = 0x050505
const CLOCK_FACE = 0x1a1a1a
const CLOCK_RIM = 0x3a3a3a
const TICK_MARK = 0x4a4a4a
const HOUR_HAND = 0x8a8a8a
const MINUTE_HAND = 0xa0a0a0
const FLASH_COLOR = 0x1a2a3a

// Time mapping: progress 0 = 21:30, progress 1 = 07:00 (next day)
// Total span = 9.5 hours = 570 minutes
const START_MINUTES = 21 * 60 + 30 // 21:30
const END_MINUTES = 31 * 60 // 07:00 next day (24+7=31 hours)
const TOTAL_MINUTES = END_MINUTES - START_MINUTES // 570

function progressToTime(progress: number): { hours: number; minutes: number; display: string } {
  const totalMin = START_MINUTES + progress * TOTAL_MINUTES
  const hours = Math.floor(totalMin / 60) % 24
  const minutes = Math.floor(totalMin % 60)
  const display = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  return { hours, minutes, display }
}

/**
 * Scene 5: blank-hours — The Blank Six Hours
 * Chapter 4 (third segment): The Interrogation
 * Mood: Frozen, unknown — time stands still
 * Progress directly maps to clock: 0 = 21:30, 1 = 07:00
 */
export function BlankHoursScene({ progress, isInView }: PixelSceneProps) {
  const frameRef = useRef(0)
  const clockRef = useRef<{
    hourHand: Graphics
    minuteHand: Graphics
    timeText: Graphics
    fragments: Graphics
  } | null>(null)

  const onSetup = useCallback((app: Application, scene: Container) => {
    // Pure black background
    const bg = new Graphics()
    bg.rect(0, 0, BASE_WIDTH, BASE_HEIGHT)
    bg.fill(PURE_BLACK)
    scene.addChild(bg)

    const cx = BASE_WIDTH / 2
    const cy = BASE_HEIGHT / 2 - 10
    const radius = 30

    // Clock face
    const clockFace = new Graphics()
    clockFace.circle(cx, cy, radius).fill(CLOCK_FACE)
    clockFace.circle(cx, cy, radius).stroke({ width: 2, color: CLOCK_RIM })
    scene.addChild(clockFace)

    // Hour tick marks
    const ticks = new Graphics()
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2 - Math.PI / 2
      const innerR = i % 3 === 0 ? radius - 5 : radius - 3
      const outerR = radius - 1
      const x1 = cx + Math.cos(angle) * innerR
      const y1 = cy + Math.sin(angle) * innerR
      const x2 = cx + Math.cos(angle) * outerR
      const y2 = cy + Math.sin(angle) * outerR
      ticks.moveTo(x1, y1)
      ticks.lineTo(x2, y2)
      ticks.stroke({ width: i % 3 === 0 ? 2 : 1, color: TICK_MARK })
    }
    scene.addChild(ticks)

    // Center dot
    const centerDot = new Graphics()
    centerDot.circle(cx, cy, 2).fill(HOUR_HAND)
    scene.addChild(centerDot)

    // Clock hands (will be updated per progress)
    const hourHand = new Graphics()
    scene.addChild(hourHand)
    const minuteHand = new Graphics()
    scene.addChild(minuteHand)

    // Time display text (pixel-rendered)
    const timeText = new Graphics()
    timeText.y = cy + radius + 12
    scene.addChild(timeText)

    // Flash fragments (brief images in the darkness)
    const fragments = new Graphics()
    fragments.alpha = 0
    scene.addChild(fragments)

    clockRef.current = { hourHand, minuteHand, timeText, fragments }

    // Minimal animation for flash fragments
    const tickerFn = () => {
      frameRef.current += 1

      if (!clockRef.current) return
      const { fragments: frg } = clockRef.current

      // Random flash fragments (200ms equivalent at 60fps = ~12 frames)
      const flashCycle = frameRef.current % 360 // ~6 seconds
      if (flashCycle >= 0 && flashCycle < 8) {
        frg.clear()
        // Brief flash of ambiguous shapes
        const flashType = Math.floor(frameRef.current / 360) % 3
        if (flashType === 0) {
          // Car silhouette
          frg.rect(100, 140, 30, 10).fill(FLASH_COLOR)
          frg.rect(108, 134, 14, 6).fill(FLASH_COLOR)
        } else if (flashType === 1) {
          // Building outline
          frg.rect(130, 120, 20, 40).fill(FLASH_COLOR)
          frg.rect(160, 130, 15, 30).fill(FLASH_COLOR)
        } else {
          // Figure silhouette
          frg.rect(155, 130, 8, 6).fill(FLASH_COLOR)
          frg.rect(153, 136, 12, 14).fill(FLASH_COLOR)
        }
        frg.alpha = 0.15 * (1 - flashCycle / 8)
      } else {
        frg.alpha = 0
      }
    }
    app.ticker.add(tickerFn)

    return () => {
      app.ticker.remove(tickerFn)
      clockRef.current = null
    }
  }, [])

  const onProgress = useCallback((_progress: number, _scene: Container) => {
    if (!clockRef.current) return
    const { hourHand, minuteHand, timeText } = clockRef.current

    const cx = BASE_WIDTH / 2
    const cy = BASE_HEIGHT / 2 - 10
    const { hours, minutes, display } = progressToTime(_progress)

    // Hour hand
    const hourAngle = ((hours % 12) / 12 + minutes / 720) * Math.PI * 2 - Math.PI / 2
    hourHand.clear()
    hourHand.moveTo(cx, cy)
    hourHand.lineTo(cx + Math.cos(hourAngle) * 16, cy + Math.sin(hourAngle) * 16)
    hourHand.stroke({ width: 2, color: HOUR_HAND })

    // Minute hand
    const minuteAngle = (minutes / 60) * Math.PI * 2 - Math.PI / 2
    minuteHand.clear()
    minuteHand.moveTo(cx, cy)
    minuteHand.lineTo(cx + Math.cos(minuteAngle) * 22, cy + Math.sin(minuteAngle) * 22)
    minuteHand.stroke({ width: 1, color: MINUTE_HAND })

    // Digital time display using pixel blocks
    timeText.clear()
    const charWidth = 5
    const totalWidth = display.length * (charWidth + 1)
    const startX = cx - totalWidth / 2

    for (let i = 0; i < display.length; i++) {
      const char = display[i]
      const x = startX + i * (charWidth + 1)
      const y = cy + 42

      if (char === ':') {
        timeText.rect(x + 1, y + 2, 1, 1).fill(TICK_MARK)
        timeText.rect(x + 1, y + 4, 1, 1).fill(TICK_MARK)
        continue
      }

      // Simple 5x7 pixel digit rendering
      const segments = getDigitSegments(char)
      for (let dy = 0; dy < 7; dy++) {
        for (let dx = 0; dx < 5; dx++) {
          if (segments[dy * 5 + dx]) {
            timeText.rect(x + dx, y + dy, 1, 1).fill(TICK_MARK)
          }
        }
      }
    }

    // Scene alpha
    _scene.alpha = Math.min(1, _progress * 5)
  }, [])

  return (
    <PixelScene
      progress={progress}
      isInView={isInView}
      ariaLabel="空白的六小時：全黑畫面中只有一個時鐘，指針從21:30走向翌日07:00，暗示這段時間的真相無人知曉"
      onSetup={onSetup}
      onProgress={onProgress}
      fallbackText="[ 場景：空白的六小時——21:30至07:00，真相無人知曉 ]"
    />
  )
}

/** Simple 5x7 pixel font for digits 0-9 */
function getDigitSegments(char: string): boolean[] {
  const digits: Record<string, boolean[]> = {
    '0': [
      false, true, true, true, false,
      true, false, false, false, true,
      true, false, false, true, true,
      true, false, true, false, true,
      true, true, false, false, true,
      true, false, false, false, true,
      false, true, true, true, false,
    ],
    '1': [
      false, false, true, false, false,
      false, true, true, false, false,
      false, false, true, false, false,
      false, false, true, false, false,
      false, false, true, false, false,
      false, false, true, false, false,
      false, true, true, true, false,
    ],
    '2': [
      false, true, true, true, false,
      true, false, false, false, true,
      false, false, false, false, true,
      false, false, true, true, false,
      false, true, false, false, false,
      true, false, false, false, false,
      true, true, true, true, true,
    ],
    '3': [
      false, true, true, true, false,
      true, false, false, false, true,
      false, false, false, false, true,
      false, false, true, true, false,
      false, false, false, false, true,
      true, false, false, false, true,
      false, true, true, true, false,
    ],
    '4': [
      false, false, false, true, false,
      false, false, true, true, false,
      false, true, false, true, false,
      true, false, false, true, false,
      true, true, true, true, true,
      false, false, false, true, false,
      false, false, false, true, false,
    ],
    '5': [
      true, true, true, true, true,
      true, false, false, false, false,
      true, true, true, true, false,
      false, false, false, false, true,
      false, false, false, false, true,
      true, false, false, false, true,
      false, true, true, true, false,
    ],
    '6': [
      false, true, true, true, false,
      true, false, false, false, false,
      true, false, false, false, false,
      true, true, true, true, false,
      true, false, false, false, true,
      true, false, false, false, true,
      false, true, true, true, false,
    ],
    '7': [
      true, true, true, true, true,
      false, false, false, false, true,
      false, false, false, true, false,
      false, false, true, false, false,
      false, false, true, false, false,
      false, false, true, false, false,
      false, false, true, false, false,
    ],
    '8': [
      false, true, true, true, false,
      true, false, false, false, true,
      true, false, false, false, true,
      false, true, true, true, false,
      true, false, false, false, true,
      true, false, false, false, true,
      false, true, true, true, false,
    ],
    '9': [
      false, true, true, true, false,
      true, false, false, false, true,
      true, false, false, false, true,
      false, true, true, true, true,
      false, false, false, false, true,
      false, false, false, false, true,
      false, true, true, true, false,
    ],
  }
  return digits[char] ?? new Array(35).fill(false)
}
