import { useCallback, useRef } from 'react'
import { Application, Container, Graphics } from 'pixi.js'
import { PixelScene, type PixelSceneProps, BASE_WIDTH, BASE_HEIGHT } from '../PixelScene'

// Colors — forensic cold gray
const BG_COLOR = 0xe8e8e8
const BG_DARK = 0xd0d0d0
const DIVIDER = 0xaaaaaa
const BODY_OUTLINE = 0x4a4a4a
const INJURY_RED = 0xc23b22
const ABSENCE_GREEN = 0x3a8a3a
const ANNOTATION_LINE = 0x7a7a7a
const SHIRT_COLOR = 0xd4d0c8
const SHIRT_TEAR = 0xc23b22
const PANTS_COLOR = 0x5a5a60
const BELT_COLOR = 0x3a3028
const TEXT_DARK = 0x3a3a3a
const LABEL_BG = 0xfafafa
const MEASUREMENT = 0x2266aa

/**
 * Scene 6: forensic-evidence — Forensic Evidence Presentation
 * Chapter 5: Autopsy and Evidence Analysis
 * Mood: Objective, clinical, cold gray — Return of the Obra Dinn analytical perspective
 */
export function ForensicEvidenceScene({ progress, isInView }: PixelSceneProps) {
  const frameRef = useRef(0)
  const leftPanelRef = useRef<Container | null>(null)
  const rightPanelRef = useRef<Container | null>(null)
  const annotationsRef = useRef<Graphics | null>(null)
  const annotLineRef = useRef<Graphics | null>(null)

  const onSetup = useCallback((app: Application, scene: Container) => {
    // Background
    const bg = new Graphics()
    bg.rect(0, 0, BASE_WIDTH, BASE_HEIGHT).fill(BG_COLOR)
    scene.addChild(bg)

    // Center divider line
    const divider = new Graphics()
    divider.rect(BASE_WIDTH / 2 - 1, 8, 1, BASE_HEIGHT - 16).fill(DIVIDER)
    scene.addChild(divider)

    // === LEFT PANEL: Clothing Evidence ===
    const leftPanel = new Container()
    leftPanelRef.current = leftPanel
    leftPanel.alpha = 0
    scene.addChild(leftPanel)

    const leftBg = new Graphics()
    leftBg.rect(4, 4, BASE_WIDTH / 2 - 8, BASE_HEIGHT - 8).fill({ color: LABEL_BG, alpha: 0.5 })
    leftPanel.addChild(leftBg)

    // Title label "衣物證據"
    const leftTitle = new Graphics()
    leftTitle.rect(20, 8, 40, 8).fill(TEXT_DARK)
    // Small text indicator dots
    leftTitle.rect(24, 10, 3, 1).fill(LABEL_BG)
    leftTitle.rect(28, 10, 3, 1).fill(LABEL_BG)
    leftTitle.rect(33, 10, 3, 1).fill(LABEL_BG)
    leftTitle.rect(38, 10, 3, 1).fill(LABEL_BG)
    leftPanel.addChild(leftTitle)

    // Shirt display
    const shirt = new Graphics()
    // Shirt body
    shirt.rect(20, 24, 40, 44).fill(SHIRT_COLOR)
    // Collar
    shirt.rect(30, 20, 20, 6).fill(SHIRT_COLOR)
    shirt.rect(36, 20, 8, 4).fill(BG_COLOR) // V-neck
    // Sleeves
    shirt.rect(10, 26, 12, 20).fill(SHIRT_COLOR)
    shirt.rect(58, 26, 12, 20).fill(SHIRT_COLOR)
    // Tear mark on shirt (37.5cm area)
    shirt.rect(42, 40, 12, 3).fill(SHIRT_TEAR)
    // Tear indication lines
    shirt.rect(42, 40, 1, 3).fill(0x8a1a12)
    shirt.rect(48, 40, 1, 3).fill(0x8a1a12)
    shirt.rect(53, 40, 1, 3).fill(0x8a1a12)
    leftPanel.addChild(shirt)

    // Measurement line for tear (37.5cm)
    const shirtMeasure = new Graphics()
    shirtMeasure.rect(56, 38, 1, 8).fill(MEASUREMENT) // vertical
    shirtMeasure.rect(56, 41, 20, 1).fill(MEASUREMENT) // horizontal
    // "37.5cm" indicator block
    shirtMeasure.rect(62, 36, 20, 7).fill({ color: MEASUREMENT, alpha: 0.2 })
    shirtMeasure.rect(64, 37, 2, 1).fill(MEASUREMENT) // 3
    shirtMeasure.rect(67, 37, 2, 1).fill(MEASUREMENT) // 7
    shirtMeasure.rect(70, 37, 1, 1).fill(MEASUREMENT) // .
    shirtMeasure.rect(72, 37, 2, 1).fill(MEASUREMENT) // 5
    leftPanel.addChild(shirtMeasure)

    // Pants display
    const pants = new Graphics()
    pants.rect(24, 72, 16, 38).fill(PANTS_COLOR)
    pants.rect(42, 72, 16, 38).fill(PANTS_COLOR)
    pants.rect(24, 70, 34, 4).fill(PANTS_COLOR) // waistband
    // Tear mark on pants (41cm area)
    pants.rect(44, 86, 10, 3).fill(SHIRT_TEAR)
    pants.rect(44, 86, 1, 3).fill(0x8a1a12)
    pants.rect(50, 86, 1, 3).fill(0x8a1a12)
    leftPanel.addChild(pants)

    // Measurement line for pants tear (41cm)
    const pantsMeasure = new Graphics()
    pantsMeasure.rect(56, 84, 1, 8).fill(MEASUREMENT)
    pantsMeasure.rect(56, 87, 20, 1).fill(MEASUREMENT)
    pantsMeasure.rect(62, 82, 16, 7).fill({ color: MEASUREMENT, alpha: 0.2 })
    pantsMeasure.rect(64, 83, 2, 1).fill(MEASUREMENT) // 4
    pantsMeasure.rect(67, 83, 2, 1).fill(MEASUREMENT) // 1
    leftPanel.addChild(pantsMeasure)

    // Belt shown OUTSIDE shirt (abnormal detail)
    const belt = new Graphics()
    belt.rect(22, 66, 38, 4).fill(BELT_COLOR)
    // Belt buckle
    belt.rect(36, 65, 6, 6).fill(0x8a7a5a)
    belt.rect(38, 66, 2, 4).fill(BELT_COLOR)
    leftPanel.addChild(belt)

    // Abnormal indicator: exclamation mark near belt
    const abnormal = new Graphics()
    abnormal.rect(64, 64, 8, 8).fill({ color: INJURY_RED, alpha: 0.3 })
    abnormal.rect(67, 65, 2, 4).fill(INJURY_RED)
    abnormal.rect(67, 70, 2, 1).fill(INJURY_RED)
    leftPanel.addChild(abnormal)

    // === RIGHT PANEL: Body Outline + Injuries ===
    const rightPanel = new Container()
    rightPanelRef.current = rightPanel
    rightPanel.alpha = 0
    scene.addChild(rightPanel)

    const rightBg = new Graphics()
    rightBg.rect(BASE_WIDTH / 2 + 4, 4, BASE_WIDTH / 2 - 8, BASE_HEIGHT - 8).fill({ color: LABEL_BG, alpha: 0.5 })
    rightPanel.addChild(rightBg)

    // Title label "傷勢分布"
    const rightTitle = new Graphics()
    rightTitle.rect(180, 8, 40, 8).fill(TEXT_DARK)
    rightTitle.rect(184, 10, 3, 1).fill(LABEL_BG)
    rightTitle.rect(188, 10, 3, 1).fill(LABEL_BG)
    rightTitle.rect(193, 10, 3, 1).fill(LABEL_BG)
    rightTitle.rect(198, 10, 3, 1).fill(LABEL_BG)
    rightPanel.addChild(rightTitle)

    // Body outline (front view, simple pixel figure)
    const body = new Graphics()
    const bx = 210 // center x of body
    const by = 22  // top of head

    // Head (outline)
    body.rect(bx - 4, by, 8, 8).stroke({ width: 1, color: BODY_OUTLINE })
    // Neck
    body.rect(bx - 2, by + 8, 4, 3).stroke({ width: 1, color: BODY_OUTLINE })
    // Torso
    body.rect(bx - 10, by + 11, 20, 30).stroke({ width: 1, color: BODY_OUTLINE })
    // Arms
    body.rect(bx - 16, by + 12, 6, 24).stroke({ width: 1, color: BODY_OUTLINE })
    body.rect(bx + 10, by + 12, 6, 24).stroke({ width: 1, color: BODY_OUTLINE })
    // Hands
    body.rect(bx - 16, by + 36, 6, 6).stroke({ width: 1, color: BODY_OUTLINE })
    body.rect(bx + 10, by + 36, 6, 6).stroke({ width: 1, color: BODY_OUTLINE })
    // Legs
    body.rect(bx - 8, by + 42, 7, 28).stroke({ width: 1, color: BODY_OUTLINE })
    body.rect(bx + 1, by + 42, 7, 28).stroke({ width: 1, color: BODY_OUTLINE })
    // Feet
    body.rect(bx - 10, by + 70, 9, 4).stroke({ width: 1, color: BODY_OUTLINE })
    body.rect(bx + 1, by + 70, 9, 4).stroke({ width: 1, color: BODY_OUTLINE })
    rightPanel.addChild(body)

    // Injury markers — RED blocks
    const injuries = new Graphics()
    // Right ribcage fractures (viewer's left = anatomical right)
    injuries.rect(bx - 9, by + 18, 6, 8).fill({ color: INJURY_RED, alpha: 0.7 })
    // Right back/kidney area
    injuries.rect(bx - 8, by + 28, 5, 6).fill({ color: INJURY_RED, alpha: 0.7 })
    // Spine area
    injuries.rect(bx - 2, by + 22, 4, 14).fill({ color: INJURY_RED, alpha: 0.5 })
    rightPanel.addChild(injuries)

    // Green markers on hands — NO defensive wounds (highlighting absence)
    const noDefense = new Graphics()
    noDefense.rect(bx - 16, by + 36, 6, 6).fill({ color: ABSENCE_GREEN, alpha: 0.4 })
    noDefense.rect(bx + 10, by + 36, 6, 6).fill({ color: ABSENCE_GREEN, alpha: 0.4 })
    rightPanel.addChild(noDefense)

    // === ANNOTATION LINES AND LABELS ===
    const annotations = new Graphics()
    annotationsRef.current = annotations
    annotations.alpha = 0
    scene.addChild(annotations)

    // Annotation lines from injuries to labels
    const annotLines = new Graphics()
    annotLineRef.current = annotLines
    annotLines.alpha = 0
    scene.addChild(annotLines)

    // Subtle grid pattern on background for clinical feel
    const grid = new Graphics()
    for (let x = 0; x < BASE_WIDTH; x += 10) {
      grid.rect(x, 0, 1, BASE_HEIGHT).fill({ color: BG_DARK, alpha: 0.2 })
    }
    for (let y = 0; y < BASE_HEIGHT; y += 10) {
      grid.rect(0, y, BASE_WIDTH, 1).fill({ color: BG_DARK, alpha: 0.2 })
    }
    // Put grid behind everything
    scene.addChildAt(grid, 1)

    // Animation — minimal, mostly static clinical presentation
    const tickerFn = () => {
      frameRef.current += 1
    }
    app.ticker.add(tickerFn)

    return () => {
      app.ticker.remove(tickerFn)
      leftPanelRef.current = null
      rightPanelRef.current = null
      annotationsRef.current = null
      annotLineRef.current = null
    }
  }, [])

  const onProgress = useCallback((_progress: number, scene: Container) => {
    // Phase 1 (0-0.3): Left panel (clothing) fades in
    if (leftPanelRef.current) {
      if (_progress < 0.3) {
        leftPanelRef.current.alpha = Math.min(1, (_progress / 0.3) * 1.2)
      } else {
        leftPanelRef.current.alpha = 1
      }
    }

    // Phase 2 (0.3-0.7): Right panel (body outline + injuries) fades in
    if (rightPanelRef.current) {
      if (_progress < 0.3) {
        rightPanelRef.current.alpha = 0
      } else if (_progress < 0.7) {
        rightPanelRef.current.alpha = Math.min(1, ((_progress - 0.3) / 0.4) * 1.2)
      } else {
        rightPanelRef.current.alpha = 1
      }
    }

    // Phase 3 (0.7-1.0): Annotation lines and labels appear
    if (annotLineRef.current) {
      if (_progress < 0.7) {
        annotLineRef.current.alpha = 0
      } else {
        const p = (_progress - 0.7) / 0.3
        annotLineRef.current.clear()

        const bx = 210
        const by = 22

        // Line lengths grow with progress
        const lineLen = p * 30

        // Ribcage annotation line
        annotLineRef.current.moveTo(bx - 9, by + 22)
        annotLineRef.current.lineTo(bx - 9 - Math.min(lineLen, 20), by + 22)
        annotLineRef.current.stroke({ width: 1, color: ANNOTATION_LINE })

        // Kidney annotation line
        annotLineRef.current.moveTo(bx - 8, by + 31)
        annotLineRef.current.lineTo(bx - 8 - Math.min(lineLen, 18), by + 31)
        annotLineRef.current.stroke({ width: 1, color: ANNOTATION_LINE })

        // Spine annotation line
        annotLineRef.current.moveTo(bx + 2, by + 29)
        annotLineRef.current.lineTo(bx + 2 + Math.min(lineLen, 22), by + 20)
        annotLineRef.current.stroke({ width: 1, color: ANNOTATION_LINE })

        // Hand annotation lines (green — absence of wounds)
        annotLineRef.current.moveTo(bx - 13, by + 42)
        annotLineRef.current.lineTo(bx - 13 - Math.min(lineLen, 16), by + 48)
        annotLineRef.current.stroke({ width: 1, color: ABSENCE_GREEN })

        annotLineRef.current.moveTo(bx + 13, by + 42)
        annotLineRef.current.lineTo(bx + 13 + Math.min(lineLen, 16), by + 48)
        annotLineRef.current.stroke({ width: 1, color: ABSENCE_GREEN })

        // Label blocks at end of lines (appear when lines are long enough)
        if (p > 0.4) {
          const labelAlpha = (p - 0.4) / 0.6
          // Ribcage label
          annotLineRef.current.rect(bx - 44, by + 18, 16, 7).fill({ color: INJURY_RED, alpha: labelAlpha * 0.6 })
          annotLineRef.current.rect(bx - 42, by + 19, 2, 1).fill({ color: LABEL_BG, alpha: labelAlpha })
          annotLineRef.current.rect(bx - 39, by + 19, 2, 1).fill({ color: LABEL_BG, alpha: labelAlpha })
          annotLineRef.current.rect(bx - 42, by + 21, 3, 1).fill({ color: LABEL_BG, alpha: labelAlpha })

          // Kidney label
          annotLineRef.current.rect(bx - 40, by + 28, 14, 7).fill({ color: INJURY_RED, alpha: labelAlpha * 0.6 })
          annotLineRef.current.rect(bx - 38, by + 29, 2, 1).fill({ color: LABEL_BG, alpha: labelAlpha })
          annotLineRef.current.rect(bx - 35, by + 29, 2, 1).fill({ color: LABEL_BG, alpha: labelAlpha })

          // Green "no defense wounds" labels
          annotLineRef.current.rect(bx - 42, by + 46, 14, 7).fill({ color: ABSENCE_GREEN, alpha: labelAlpha * 0.5 })
          annotLineRef.current.rect(bx + 17, by + 46, 14, 7).fill({ color: ABSENCE_GREEN, alpha: labelAlpha * 0.5 })
        }

        annotLineRef.current.alpha = 1
      }
    }

    // Overall scene alpha
    scene.alpha = Math.min(1, _progress * 3)
  }, [])

  return (
    <PixelScene
      progress={progress}
      isInView={isInView}
      ariaLabel="法醫證據分析：左側顯示衣物破損與皮帶異常位置，右側為人體正面輪廓標示肋骨骨折、腎臟與脊椎傷勢，雙手以綠色標記無防禦傷"
      onSetup={onSetup}
      onProgress={onProgress}
      fallbackText="[ 場景：法醫證據——衣物破損與傷勢分布分析圖 ]"
    />
  )
}
