import { useEffect, useRef } from 'react'
import type { DocumentId } from '../../types/index.ts'

// ===== Stamp configuration per document =====

interface StampConfig {
  text: string
  rotation: number // degrees
  x: number // percentage from left
  y: number // percentage from top
  size: number // font size in px
  opacity: number
}

const DOCUMENT_STAMPS: Partial<Record<DocumentId, StampConfig[]>> = {
  'DOC-SUR-01-1': [
    {
      text: '極機密',
      rotation: -7,
      x: 65,
      y: 8,
      size: 28,
      opacity: 0.7,
    },
  ],
  'DOC-FOR-04': [
    {
      text: '機密',
      rotation: -5,
      x: 70,
      y: 6,
      size: 32,
      opacity: 0.65,
    },
  ],
  'DOC-OFF-05': [
    {
      text: '已報總統',
      rotation: -3,
      x: 60,
      y: 5,
      size: 24,
      opacity: 0.6,
    },
    {
      text: '71.7.11',
      rotation: 2,
      x: 72,
      y: 18,
      size: 16,
      opacity: 0.55,
    },
  ],
}

// ===== Pixel-style stamp renderer =====

function drawPixelStamp(
  ctx: CanvasRenderingContext2D,
  stamp: StampConfig,
  canvasWidth: number,
  canvasHeight: number,
  dpr: number,
): void {
  const x = (stamp.x / 100) * canvasWidth
  const y = (stamp.y / 100) * canvasHeight
  const fontSize = stamp.size * dpr

  ctx.save()
  ctx.translate(x, y)
  ctx.rotate((stamp.rotation * Math.PI) / 180)

  // Use a pixel-ish font style
  ctx.font = `bold ${fontSize}px "Noto Serif TC", serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  const metrics = ctx.measureText(stamp.text)
  const textWidth = metrics.width
  const textHeight = fontSize * 1.2
  const padding = fontSize * 0.4

  // Draw stamp border (double-line for official look)
  ctx.strokeStyle = `rgba(139, 32, 32, ${stamp.opacity})`
  ctx.lineWidth = 3 * dpr

  const boxW = textWidth + padding * 2
  const boxH = textHeight + padding * 2

  // Outer border
  ctx.strokeRect(-boxW / 2, -boxH / 2, boxW, boxH)

  // Inner border (slight offset for double-line effect)
  ctx.lineWidth = 1.5 * dpr
  const inset = 4 * dpr
  ctx.strokeRect(
    -boxW / 2 + inset,
    -boxH / 2 + inset,
    boxW - inset * 2,
    boxH - inset * 2,
  )

  // Draw stamp text
  ctx.fillStyle = `rgba(139, 32, 32, ${stamp.opacity})`
  ctx.fillText(stamp.text, 0, 0)

  // Add ink bleed effect with scattered dots
  const rng = mulberry32(stamp.text.charCodeAt(0) * 137)
  for (let i = 0; i < 20; i++) {
    const dx = (rng() - 0.5) * boxW * 1.1
    const dy = (rng() - 0.5) * boxH * 1.1
    const dotSize = rng() * 2 * dpr + 0.5
    ctx.globalAlpha = stamp.opacity * (rng() * 0.3 + 0.1)
    ctx.fillStyle = 'rgb(139, 32, 32)'
    ctx.fillRect(dx - dotSize / 2, dy - dotSize / 2, dotSize, dotSize)
  }

  ctx.restore()
}

/** Simple seeded PRNG for deterministic ink bleed */
function mulberry32(seed: number): () => number {
  let s = seed | 0
  return () => {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// ===== Component =====

interface StampOverlayProps {
  docId: DocumentId
}

export function StampOverlay({ docId }: StampOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stamps = DOCUMENT_STAMPS[docId]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !stamps || stamps.length === 0) return

    const parent = canvas.parentElement
    if (!parent) return

    const dpr = window.devicePixelRatio ?? 1
    const rect = parent.getBoundingClientRect()
    const width = rect.width
    const height = Math.max(rect.height, 200) // minimum height for stamps to show

    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (const stamp of stamps) {
      drawPixelStamp(ctx, stamp, canvas.width, canvas.height, dpr)
    }
  }, [stamps])

  if (!stamps || stamps.length === 0) return null

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10"
      aria-hidden="true"
    />
  )
}
