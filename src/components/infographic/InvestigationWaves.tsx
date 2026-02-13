import { useState, useMemo } from 'react'
import { Citation } from '@/components/narrative/Citation'
import investigationsData from '@/data/investigations.json'

type ConclusionType = 'suicide' | 'homicide' | 'inconclusive'

interface Investigation {
  id: string
  year: string
  yearLabel: string
  institution: string
  institutionDetail: string
  type: string
  conclusion: string
  conclusionType: ConclusionType
  keyFinding: string
  detail: string
  source: string
}

const investigations = investigationsData.investigations as Investigation[]

const conclusionLabel: Record<ConclusionType, string> = {
  suicide: '自殺定調',
  homicide: '他殺／謀殺',
  inconclusive: '無明確結論',
}

const conclusionBg: Record<ConclusionType, string> = {
  suicide: 'bg-accent-red/20 text-accent-red border-accent-red/40',
  homicide: 'bg-emerald-900/30 text-emerald-400 border-emerald-500/40',
  inconclusive: 'bg-ink-700/40 text-ink-300 border-ink-600',
}

const conclusionDot: Record<ConclusionType, string> = {
  suicide: 'bg-accent-red',
  homicide: 'bg-emerald-500',
  inconclusive: 'bg-ink-500',
}

interface InvestigationWavesProps {
  progress: number
  isInView: boolean
  className?: string
}

export function InvestigationWaves({
  progress,
  isInView,
  className = '',
}: InvestigationWavesProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)

  const visibleRows = useMemo(() => {
    if (!isInView) return 0
    return Math.ceil(progress * investigations.length * 1.5)
  }, [progress, isInView])

  function toggleExpand(id: string) {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div
      className={className}
      role="region"
      aria-label="歷次調查比較表：1981至2020年陳文成案七波調查的結論與發現"
    >
      <h3 className="text-ink-200 text-base font-medium mb-1 text-center">
        歷次調查比較
      </h3>
      <p className="text-ink-400 text-xs font-mono text-center mb-6">
        1981–2020 ｜ 四十年間的七波調查
      </p>

      {/* Desktop: Table view */}
      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="text-left p-2 text-ink-300 font-mono text-xs border-b border-ink-700 w-[80px]">
                  年份
                </th>
                <th className="text-left p-2 text-ink-300 font-mono text-xs border-b border-ink-700 w-[140px]">
                  主導機關
                </th>
                <th className="text-left p-2 text-ink-300 font-mono text-xs border-b border-ink-700 w-[80px]">
                  類型
                </th>
                <th className="text-left p-2 text-ink-300 font-mono text-xs border-b border-ink-700 w-[160px]">
                  結論
                </th>
                <th className="text-left p-2 text-ink-300 font-mono text-xs border-b border-ink-700">
                  關鍵發現
                </th>
              </tr>
            </thead>
            <tbody>
              {investigations.map((inv, i) => {
                const isVisible = i < visibleRows
                const isExpanded = expandedId === inv.id
                const isHovered = hoveredRow === inv.id

                return (
                  <tr
                    key={inv.id}
                    className={`cursor-pointer transition-all duration-500 ${
                      isHovered ? 'bg-ink-800/40' : ''
                    } ${isExpanded ? 'bg-ink-800/60' : ''}`}
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: `translateY(${isVisible ? 0 : 8}px)`,
                    }}
                    onClick={() => toggleExpand(inv.id)}
                    onMouseEnter={() => setHoveredRow(inv.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    {/* Year */}
                    <td className="p-2 border-b border-ink-800 align-top">
                      <div className="flex items-center gap-2">
                        {/* Timeline dot */}
                        <span
                          className={`shrink-0 w-2 h-2 rounded-full ${conclusionDot[inv.conclusionType]}`}
                        />
                        <span className="text-ink-100 text-xs font-mono font-medium">
                          {inv.year}
                        </span>
                      </div>
                    </td>

                    {/* Institution */}
                    <td className="p-2 border-b border-ink-800 align-top">
                      <div className="text-ink-100 text-xs font-medium">
                        {inv.institution}
                      </div>
                      <div className="text-ink-500 text-[10px] font-mono mt-0.5">
                        {inv.institutionDetail}
                      </div>
                    </td>

                    {/* Type */}
                    <td className="p-2 border-b border-ink-800 align-top">
                      <span className="text-ink-300 text-xs">{inv.type}</span>
                    </td>

                    {/* Conclusion with color block */}
                    <td className="p-2 border-b border-ink-800 align-top">
                      <span
                        className={`inline-block text-xs px-2 py-0.5 rounded border ${conclusionBg[inv.conclusionType]}`}
                      >
                        {inv.conclusion}
                      </span>
                    </td>

                    {/* Key Finding */}
                    <td className="p-2 border-b border-ink-800 align-top">
                      <div className="text-ink-300 text-xs leading-relaxed">
                        {inv.keyFinding}
                      </div>
                      {/* Expanded detail */}
                      {isExpanded && (
                        <div className="mt-2 pt-2 border-t border-ink-800">
                          <p className="text-ink-200 text-xs leading-relaxed">
                            {inv.detail}
                          </p>
                          <Citation source={inv.source} className="text-xs mt-1" />
                        </div>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile: Vertical card stack */}
      <div className="md:hidden space-y-3">
        {investigations.map((inv, i) => {
          const isVisible = i < visibleRows
          const isExpanded = expandedId === inv.id

          return (
            <div
              key={inv.id}
              className={`bg-ink-900/80 rounded px-3 py-3 transition-all duration-500 cursor-pointer
                border-l-3 ${
                  inv.conclusionType === 'suicide'
                    ? 'border-l-accent-red'
                    : inv.conclusionType === 'homicide'
                      ? 'border-l-emerald-500'
                      : 'border-l-ink-600'
                }
              `}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: `translateY(${isVisible ? 0 : 12}px)`,
              }}
              onClick={() => toggleExpand(inv.id)}
              role="button"
              tabIndex={0}
              aria-expanded={isExpanded}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  toggleExpand(inv.id)
                }
              }}
            >
              {/* Header row */}
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div>
                  <span className="text-ink-100 text-xs font-mono font-medium">
                    {inv.year}
                  </span>
                  <span className="text-ink-500 text-[10px] mx-1.5">·</span>
                  <span className="text-ink-200 text-xs font-medium">
                    {inv.institution}
                  </span>
                </div>
                <span className="text-ink-500 text-[10px] shrink-0">
                  {isExpanded ? '▲' : '▼'}
                </span>
              </div>

              {/* Type + Conclusion */}
              <div className="flex items-center gap-2 mb-1">
                <span className="text-ink-400 text-[10px] font-mono">
                  {inv.type}
                </span>
                <span
                  className={`inline-block text-[10px] px-1.5 py-0.5 rounded border ${conclusionBg[inv.conclusionType]}`}
                >
                  {inv.conclusion}
                </span>
              </div>

              {/* Key finding */}
              <div className="text-ink-300 text-xs leading-relaxed">
                {inv.keyFinding}
              </div>

              {/* Expanded detail */}
              {isExpanded && (
                <div className="mt-2 pt-2 border-t border-ink-800">
                  <p className="text-ink-200 text-xs leading-relaxed">
                    {inv.detail}
                  </p>
                  <Citation source={inv.source} className="text-xs mt-2" />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center mt-6 text-[10px] text-ink-500 font-mono">
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded bg-accent-red/20 border border-accent-red/40" />
          {conclusionLabel.suicide}
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded bg-emerald-900/30 border border-emerald-500/40" />
          {conclusionLabel.homicide}
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded bg-ink-700/40 border border-ink-600" />
          {conclusionLabel.inconclusive}
        </span>
      </div>

      {/* Conclusion */}
      <div className="mt-6 bg-ink-900/60 border border-ink-700 rounded px-4 py-3 max-w-2xl mx-auto">
        <blockquote className="text-ink-200 text-xs leading-relaxed italic">
          「{investigationsData.conclusion.text}」
        </blockquote>
        <Citation source={investigationsData.conclusion.source} className="text-xs mt-2" />
      </div>

      {/* Source attribution */}
      <div className="mt-4 text-center">
        <Citation source={investigationsData.source} className="text-xs" />
      </div>
    </div>
  )
}
