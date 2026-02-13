import { useState, useMemo, useCallback } from 'react'
import { Citation } from '@/components/narrative/Citation'
import { CharacterCard, type CharacterData } from './CharacterCard'
import rawCharacters from '../../../docs/extracted/characters.json'

const characters: CharacterData[] = rawCharacters.characters as unknown as CharacterData[]

/** Role groups with display config */
const roleGroups = [
  { role: 'victim', label: '受害者及家屬', color: '#d4a855', hue: 'amber' },
  { role: 'perpetrator', label: '加害體制相關人員', color: '#64748b', hue: 'slate' },
  { role: 'investigator', label: '調查人員', color: '#38bdf8', hue: 'sky' },
  { role: 'witness', label: '證人', color: '#34d399', hue: 'emerald' },
  { role: 'political', label: '政治人物', color: '#fb7185', hue: 'rose' },
  { role: 'academic', label: '學術人物', color: '#22d3ee', hue: 'cyan' },
  { role: 'media', label: '媒體相關', color: '#a78bfa', hue: 'purple' },
  { role: 'other', label: '其他', color: '#94a3b8', hue: 'gray' },
] as const

/** Muted fill colors for the SVG nodes */
const roleFills: Record<string, string> = {
  victim: 'rgba(212, 168, 85, 0.25)',
  perpetrator: 'rgba(100, 116, 139, 0.3)',
  investigator: 'rgba(56, 189, 248, 0.2)',
  witness: 'rgba(52, 211, 153, 0.2)',
  political: 'rgba(251, 113, 133, 0.2)',
  academic: 'rgba(34, 211, 238, 0.2)',
  media: 'rgba(167, 139, 250, 0.2)',
  other: 'rgba(148, 163, 184, 0.15)',
}

const roleStrokes: Record<string, string> = {
  victim: 'rgba(212, 168, 85, 0.6)',
  perpetrator: 'rgba(100, 116, 139, 0.5)',
  investigator: 'rgba(56, 189, 248, 0.5)',
  witness: 'rgba(52, 211, 153, 0.5)',
  political: 'rgba(251, 113, 133, 0.5)',
  academic: 'rgba(34, 211, 238, 0.5)',
  media: 'rgba(167, 139, 250, 0.5)',
  other: 'rgba(148, 163, 184, 0.3)',
}

const allChapters = [1, 2, 3, 4, 5, 6, 7]

function getCharacterName(id: string): string | undefined {
  return characters.find((c) => c.id === id)?.name
}

interface CharacterMapProps {
  /** If set, only show characters from this chapter */
  chapterFilter?: number | null
  className?: string
}

export function CharacterMap({ chapterFilter: initialChapter = null, className = '' }: CharacterMapProps) {
  const [selectedChapter, setSelectedChapter] = useState<number | null>(initialChapter)
  const [activeCharacter, setActiveCharacter] = useState<string | null>(null)
  const [hoveredCharacter, setHoveredCharacter] = useState<string | null>(null)

  const filtered = useMemo(() => {
    if (!selectedChapter) return characters
    return characters.filter((c) => c.chapters.includes(selectedChapter))
  }, [selectedChapter])

  const grouped = useMemo(() => {
    const groups: Record<string, CharacterData[]> = {}
    for (const c of filtered) {
      if (!groups[c.role]) groups[c.role] = []
      groups[c.role].push(c)
    }
    return groups
  }, [filtered])

  const activeChar = characters.find((c) => c.id === activeCharacter)

  /** Get characters connected to a given character */
  const connectedIds = useMemo(() => {
    const target = hoveredCharacter ?? activeCharacter
    if (!target) return new Set<string>()
    const char = characters.find((c) => c.id === target)
    if (!char) return new Set<string>()
    const ids = new Set(char.relations.map((r) => r.id))
    ids.add(target)
    // Also add characters that have relations pointing to target
    for (const c of characters) {
      if (c.relations.some((r) => r.id === target)) {
        ids.add(c.id)
      }
    }
    return ids
  }, [hoveredCharacter, activeCharacter])

  const hasHighlight = hoveredCharacter !== null || activeCharacter !== null

  const handleNodeClick = useCallback((id: string) => {
    setActiveCharacter((prev) => (prev === id ? null : id))
  }, [])

  return (
    <div
      className={`${className}`}
      role="region"
      aria-label="人物關係圖"
    >
      <h3 className="text-ink-200 text-base font-medium mb-1 text-center">
        人物關係圖
      </h3>
      <p className="text-ink-400 text-xs font-mono text-center mb-4">
        以陳文成為中心——家人、同事、情治人員、調查者、證人
      </p>

      {/* Chapter filter */}
      <div className="flex flex-wrap justify-center gap-1.5 mb-6">
        <button
          type="button"
          className={`text-[11px] px-2 py-1 rounded font-mono transition-colors
            ${!selectedChapter ? 'bg-accent-blue/20 text-accent-blue border border-accent-blue/40' : 'bg-ink-800 text-ink-400 border border-ink-700 hover:text-ink-200'}`}
          onClick={() => setSelectedChapter(null)}
        >
          全部
        </button>
        {allChapters.map((ch) => (
          <button
            key={ch}
            type="button"
            className={`text-[11px] px-2 py-1 rounded font-mono transition-colors
              ${selectedChapter === ch ? 'bg-accent-blue/20 text-accent-blue border border-accent-blue/40' : 'bg-ink-800 text-ink-400 border border-ink-700 hover:text-ink-200'}`}
            onClick={() => setSelectedChapter(selectedChapter === ch ? null : ch)}
          >
            第{ch}章
          </button>
        ))}
      </div>

      {/* Desktop: SVG radial layout */}
      <div className="hidden md:block relative">
        <DesktopRadialMap
          characters={filtered}
          activeCharacter={activeCharacter}
          hoveredCharacter={hoveredCharacter}
          connectedIds={connectedIds}
          hasHighlight={hasHighlight}
          onNodeClick={handleNodeClick}
          onNodeHover={setHoveredCharacter}
        />

        {/* Active character popover */}
        {activeChar && (
          <div className="absolute top-4 right-4 z-20 animate-in fade-in slide-in-from-right-2">
            <button
              type="button"
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-ink-800 border border-ink-600
                text-ink-400 hover:text-ink-100 flex items-center justify-center text-xs z-10"
              onClick={() => setActiveCharacter(null)}
              aria-label="關閉"
            >
              &times;
            </button>
            <CharacterCard
              character={activeChar}
              getCharacterName={getCharacterName}
            />
          </div>
        )}
      </div>

      {/* Mobile: Grouped list */}
      <div className="md:hidden space-y-4">
        {roleGroups
          .filter((g) => grouped[g.role]?.length)
          .map((group) => (
            <MobileGroup
              key={group.role}
              label={group.label}
              color={group.color}
              characters={grouped[group.role]}
            />
          ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 justify-center mt-6 text-[10px] text-ink-500 font-mono">
        {roleGroups
          .filter((g) => grouped[g.role]?.length)
          .map((g) => (
            <span key={g.role} className="flex items-center gap-1">
              <span
                className="inline-block w-2.5 h-2.5 rounded-full border"
                style={{ backgroundColor: roleFills[g.role], borderColor: roleStrokes[g.role] }}
              />
              {g.label}
            </span>
          ))}
      </div>

      {/* Source */}
      <div className="mt-4 text-center">
        <Citation source="整合五份文獻之人物資料庫" className="text-xs" />
      </div>
    </div>
  )
}

// ---------------------
// Desktop SVG Radial Map
// ---------------------

interface DesktopRadialMapProps {
  characters: CharacterData[]
  activeCharacter: string | null
  hoveredCharacter: string | null
  connectedIds: Set<string>
  hasHighlight: boolean
  onNodeClick: (id: string) => void
  onNodeHover: (id: string | null) => void
}

function DesktopRadialMap({
  characters,
  activeCharacter,
  hoveredCharacter,
  connectedIds,
  hasHighlight,
  onNodeClick,
  onNodeHover,
}: DesktopRadialMapProps) {
  const cx = 400
  const cy = 300
  const viewBox = '0 0 800 600'

  /** Lay out characters in concentric rings by role */
  const layout = useMemo(() => {
    // Center node: Chen Wen-chen
    const center = characters.find((c) => c.id === 'chen-wen-chen')
    const others = characters.filter((c) => c.id !== 'chen-wen-chen')

    // Group by role, keeping order from roleGroups
    const groups: { role: string; chars: CharacterData[] }[] = []
    for (const g of roleGroups) {
      const chars = others.filter((c) => c.role === g.role)
      if (chars.length) groups.push({ role: g.role, chars })
    }

    // Distribute groups into ring segments
    const totalOthers = others.length
    const positions: { char: CharacterData; x: number; y: number }[] = []

    if (center) {
      positions.push({ char: center, x: cx, y: cy })
    }

    let angleOffset = -Math.PI / 2 // start at top
    for (const group of groups) {
      const angleShare = (group.chars.length / totalOthers) * 2 * Math.PI
      const radius = group.chars.length > 4 ? 200 : 160

      group.chars.forEach((char, i) => {
        const angle = angleOffset + (i + 0.5) * (angleShare / group.chars.length)
        // Add slight radial variation to avoid overlap
        const r = radius + (i % 2 === 0 ? 0 : 30)
        positions.push({
          char,
          x: cx + r * Math.cos(angle),
          y: cy + r * Math.sin(angle),
        })
      })

      angleOffset += angleShare
    }

    return positions
  }, [characters])

  /** Compute relation lines */
  const lines = useMemo(() => {
    const posMap = new Map(layout.map((p) => [p.char.id, { x: p.x, y: p.y }]))
    const result: { from: string; to: string; x1: number; y1: number; x2: number; y2: number }[] = []
    const seen = new Set<string>()

    for (const pos of layout) {
      for (const rel of pos.char.relations) {
        const key = [pos.char.id, rel.id].sort().join('-')
        if (seen.has(key)) continue
        seen.add(key)

        const target = posMap.get(rel.id)
        if (!target) continue

        result.push({
          from: pos.char.id,
          to: rel.id,
          x1: pos.x,
          y1: pos.y,
          x2: target.x,
          y2: target.y,
        })
      }
    }
    return result
  }, [layout])

  return (
    <svg
      viewBox={viewBox}
      className="w-full max-w-3xl mx-auto"
      style={{ maxHeight: '520px' }}
      role="img"
      aria-label="人物關係圖：以陳文成為中心的放射狀關係網絡"
    >
      {/* Relation lines */}
      {lines.map((line) => {
        const isHighlighted = connectedIds.has(line.from) && connectedIds.has(line.to)
        return (
          <line
            key={`${line.from}-${line.to}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={isHighlighted ? 'rgba(212, 168, 85, 0.5)' : 'rgba(148, 163, 184, 0.1)'}
            strokeWidth={isHighlighted ? 1.5 : 0.5}
            style={{
              opacity: hasHighlight ? (isHighlighted ? 1 : 0.2) : 0.6,
              transition: 'all 0.3s',
            }}
          />
        )
      })}

      {/* Character nodes */}
      {layout.map(({ char, x, y }) => {
        const isCenter = char.id === 'chen-wen-chen'
        const isActive = activeCharacter === char.id
        const isHovered = hoveredCharacter === char.id
        const isConnected = connectedIds.has(char.id)

        const r = isCenter ? 28 : 18
        const fill = roleFills[char.role] ?? roleFills.other
        const stroke = roleStrokes[char.role] ?? roleStrokes.other

        const dimmed = hasHighlight && !isConnected

        return (
          <g
            key={char.id}
            className="cursor-pointer"
            onClick={() => onNodeClick(char.id)}
            onMouseEnter={() => onNodeHover(char.id)}
            onMouseLeave={() => onNodeHover(null)}
            style={{
              opacity: dimmed ? 0.2 : 1,
              transition: 'opacity 0.3s',
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onNodeClick(char.id)}
            aria-label={`${char.name}${char.nameEn ? ` (${char.nameEn})` : ''} — ${roleGroups.find((g) => g.role === char.role)?.label ?? char.role}`}
          >
            {/* Highlight ring */}
            {(isActive || isHovered) && (
              <circle
                cx={x}
                cy={y}
                r={r + 4}
                fill="none"
                stroke="rgba(74, 111, 165, 0.5)"
                strokeWidth={2}
              />
            )}

            {/* Node circle */}
            <circle
              cx={x}
              cy={y}
              r={r}
              fill={fill}
              stroke={stroke}
              strokeWidth={isCenter ? 2 : 1}
            />

            {/* Name text */}
            <text
              x={x}
              y={isCenter ? y - 4 : y - 2}
              textAnchor="middle"
              dominantBaseline="central"
              fill={isCenter ? '#d4a855' : '#e8e4db'}
              fontSize={isCenter ? 11 : 8}
              fontWeight={isCenter ? 600 : 400}
              fontFamily="'Noto Serif TC', serif"
              style={{ pointerEvents: 'none' }}
            >
              {char.name.length > 3 ? char.name.slice(0, 3) : char.name}
            </text>
            {isCenter && (
              <text
                x={x}
                y={y + 10}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#9a8f7d"
                fontSize={6}
                fontFamily="'JetBrains Mono', monospace"
                style={{ pointerEvents: 'none' }}
              >
                1950–1981
              </text>
            )}
            {!isCenter && char.name.length > 3 && (
              <text
                x={x}
                y={y + 8}
                textAnchor="middle"
                dominantBaseline="central"
                fill={dimmed ? 'rgba(232, 228, 219, 0.3)' : '#b8b0a0'}
                fontSize={7}
                fontFamily="'Noto Serif TC', serif"
                style={{ pointerEvents: 'none' }}
              >
                {char.name.slice(3)}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}

// ---------------------
// Mobile Grouped List
// ---------------------

interface MobileGroupProps {
  label: string
  color: string
  characters: CharacterData[]
}

function MobileGroup({ label, color, characters: chars }: MobileGroupProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="border border-ink-800 rounded-lg overflow-hidden">
      <button
        type="button"
        className="w-full flex items-center justify-between px-3 py-2.5 bg-ink-900/50
          hover:bg-ink-800/50 transition-colors"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full border shrink-0"
            style={{ backgroundColor: `${color}33`, borderColor: `${color}88` }}
          />
          <span className="text-sm text-ink-200">{label}</span>
          <span className="text-[10px] text-ink-500 font-mono">{chars.length}</span>
        </div>
        <svg
          className={`w-4 h-4 text-ink-500 transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <div className="px-3 pb-3 pt-1 space-y-2 animate-in fade-in">
          {chars.map((c) => (
            <CharacterCard
              key={c.id}
              character={c}
              compact
              getCharacterName={getCharacterName}
            />
          ))}
        </div>
      )}
    </div>
  )
}
