import { useMemo } from 'react'
import type { DocumentCategory } from '../../types/index.ts'

// ===== Paper texture configuration =====

interface TextureConfig {
  /** Yellowing intensity: 0 = clean white, 1 = heavy aged */
  aging: number
  /** Show horizontal rules (for handwritten transcript style) */
  gridLines: boolean
  /** Background color tint */
  bgClass: string
  /** Extra CSS filter for aging effect */
  filter: string
}

const TEXTURE_BY_CATEGORY: Record<DocumentCategory, TextureConfig> = {
  INT: {
    aging: 0.9,
    gridLines: true,
    bgClass: 'bg-[#f4e8c8]',
    filter: 'sepia(0.15) brightness(0.97)',
  },
  SUR: {
    aging: 0.8,
    gridLines: false,
    bgClass: 'bg-[#f6ecd4]',
    filter: 'sepia(0.12) brightness(0.98)',
  },
  FOR: {
    aging: 0.2,
    gridLines: false,
    bgClass: 'bg-[#fcfaf6]',
    filter: 'sepia(0.03) brightness(1.0)',
  },
  WIT: {
    aging: 0.7,
    gridLines: true,
    bgClass: 'bg-[#f5ebd0]',
    filter: 'sepia(0.10) brightness(0.98)',
  },
  OFF: {
    aging: 0.6,
    gridLines: false,
    bgClass: 'bg-[#f7eeda]',
    filter: 'sepia(0.08) brightness(0.99)',
  },
  EXT: {
    aging: 0.4,
    gridLines: false,
    bgClass: 'bg-[#faf6eb]',
    filter: 'sepia(0.05) brightness(0.99)',
  },
  NEWS: {
    aging: 0.75,
    gridLines: false,
    bgClass: 'bg-[#f3e7c6]',
    filter: 'sepia(0.14) brightness(0.97)',
  },
  NSA: {
    aging: 0.65,
    gridLines: false,
    bgClass: 'bg-[#f6edd7]',
    filter: 'sepia(0.09) brightness(0.98)',
  },
  TJC: {
    aging: 0.15,
    gridLines: false,
    bgClass: 'bg-[#fdfbf7]',
    filter: 'sepia(0.02) brightness(1.0)',
  },
}

// Edge wear patterns — generated deterministically from category
function generateEdgeWearStyle(category: DocumentCategory): React.CSSProperties {
  const config = TEXTURE_BY_CATEGORY[category]
  if (config.aging < 0.3) return {}

  const intensity = config.aging * 12
  return {
    boxShadow: `inset 0 0 ${intensity}px rgba(180, 160, 120, ${config.aging * 0.15})`,
  }
}

// ===== Component =====

interface PaperTextureProps {
  category: DocumentCategory
  chapter: number
  children: React.ReactNode
}

export function PaperTexture({ category, chapter, children }: PaperTextureProps) {
  const config = TEXTURE_BY_CATEGORY[category]

  // Adjust aging based on chapter (earlier chapters = older documents)
  const chapterAging = chapter <= 2 ? 1.0 : chapter <= 4 ? 0.85 : 0.6
  const effectiveAging = config.aging * chapterAging

  const edgeWear = useMemo(() => generateEdgeWearStyle(category), [category])

  const containerStyle: React.CSSProperties = {
    filter: effectiveAging > 0.3 ? config.filter : 'none',
    ...edgeWear,
  }

  return (
    <div
      className={`relative ${config.bgClass} rounded-sm`}
      style={containerStyle}
    >
      {/* Grid lines for handwritten documents */}
      {config.gridLines && effectiveAging > 0.4 && (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06] z-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(transparent, transparent 27px, #8b7355 27px, #8b7355 28px)',
          }}
          aria-hidden="true"
        />
      )}

      {/* Subtle stain spots for heavily aged documents */}
      {effectiveAging > 0.6 && (
        <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
          <div
            className="absolute rounded-full"
            style={{
              width: '80px',
              height: '60px',
              top: '15%',
              right: '10%',
              background: `radial-gradient(ellipse, rgba(180, 160, 120, ${effectiveAging * 0.06}) 0%, transparent 70%)`,
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: '120px',
              height: '90px',
              bottom: '20%',
              left: '5%',
              background: `radial-gradient(ellipse, rgba(160, 140, 100, ${effectiveAging * 0.04}) 0%, transparent 70%)`,
            }}
          />
        </div>
      )}

      {/* Corner wear for old documents */}
      {effectiveAging > 0.7 && (
        <>
          <div
            className="absolute top-0 left-0 w-8 h-8 pointer-events-none z-0"
            style={{
              background: `linear-gradient(135deg, rgba(200, 180, 140, ${effectiveAging * 0.08}) 0%, transparent 60%)`,
            }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none z-0"
            style={{
              background: `linear-gradient(315deg, rgba(200, 180, 140, ${effectiveAging * 0.1}) 0%, transparent 60%)`,
            }}
            aria-hidden="true"
          />
        </>
      )}

      <div className="relative z-[1]">{children}</div>
    </div>
  )
}
