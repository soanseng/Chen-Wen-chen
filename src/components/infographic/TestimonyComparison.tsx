import { useState, useMemo } from 'react'
import { Citation } from '@/components/narrative/Citation'
import testimoniesData from '@/data/testimonies.json'

interface Dimension {
  id: string
  label: string
  description: string
}

interface Witness {
  id: string
  name: string
  role: string
  credibility: 'normal' | 'disputed' | 'unreliable'
  credibilityNote: string | null
  source: string
  testimonies: Record<string, string>
}

interface Contradiction {
  dimensionId: string
  witnessIds: string[]
  description: string
  source: string
}

const dimensions = testimoniesData.dimensions as Dimension[]
const witnesses = testimoniesData.witnesses as Witness[]
const contradictions = testimoniesData.contradictions as Contradiction[]

const credibilityLabel: Record<string, string> = {
  normal: '一般',
  disputed: '存疑',
  unreliable: '不可信',
}

const credibilityStyle: Record<string, string> = {
  normal: 'bg-ink-700/50 text-ink-300',
  disputed: 'bg-accent-gold/20 text-accent-gold',
  unreliable: 'bg-accent-red/20 text-accent-red',
}

function hasContradiction(dimensionId: string, witnessId: string): boolean {
  return contradictions.some(
    (c) => c.dimensionId === dimensionId && c.witnessIds.includes(witnessId),
  )
}

function getContradiction(dimensionId: string): Contradiction | undefined {
  return contradictions.find((c) => c.dimensionId === dimensionId)
}

interface TestimonyComparisonProps {
  progress: number
  isInView: boolean
  className?: string
}

export function TestimonyComparison({
  progress,
  isInView,
  className = '',
}: TestimonyComparisonProps) {
  const [activeDimension, setActiveDimension] = useState<string | null>(null)
  const [activeWitness, setActiveWitness] = useState<string | null>(null)
  // Mobile: tab-based view
  const [mobileTab, setMobileTab] = useState(0)

  const visibleRows = useMemo(() => {
    if (!isInView) return 0
    return Math.ceil(progress * dimensions.length * 1.5)
  }, [progress, isInView])

  const activeContradiction = activeDimension ? getContradiction(activeDimension) : null

  return (
    <div
      className={className}
      role="region"
      aria-label="證詞矛盾對照表：五名目擊證人與警總官方說法的交叉比對"
    >
      <h3 className="text-ink-200 text-base font-medium mb-1 text-center">
        證詞矛盾對照
      </h3>
      <p className="text-ink-400 text-xs font-mono text-center mb-6">
        五名目擊證人 + 警總官方說法 ｜ 7月2日晚間「送還」過程的矛盾
      </p>

      {/* Desktop: Table view */}
      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 bg-ink-950 text-left p-2 text-ink-300 font-mono text-xs border-b border-ink-700 min-w-[120px]">
                  比對主題
                </th>
                {witnesses.map((w) => (
                  <th
                    key={w.id}
                    className={`p-2 text-left border-b border-ink-700 min-w-[140px] transition-colors duration-200 ${
                      activeWitness === w.id ? 'bg-ink-800/60' : ''
                    }`}
                    onMouseEnter={() => setActiveWitness(w.id)}
                    onMouseLeave={() => setActiveWitness(null)}
                  >
                    <div className="text-ink-100 text-xs font-medium">{w.name}</div>
                    <div className="text-ink-500 text-[10px] font-mono mt-0.5">{w.role}</div>
                    {w.credibility !== 'normal' && (
                      <span
                        className={`inline-block text-[10px] px-1.5 py-0.5 rounded font-mono mt-1 ${credibilityStyle[w.credibility]}`}
                      >
                        {credibilityLabel[w.credibility]}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dimensions.map((dim, i) => {
                const isVisible = i < visibleRows
                const isHighlighted = activeDimension === dim.id

                return (
                  <tr
                    key={dim.id}
                    className={`transition-all duration-500 ${
                      isHighlighted ? 'bg-ink-800/40' : ''
                    }`}
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: `translateY(${isVisible ? 0 : 8}px)`,
                    }}
                    onMouseEnter={() => setActiveDimension(dim.id)}
                    onMouseLeave={() => setActiveDimension(null)}
                  >
                    <td className="sticky left-0 z-10 bg-ink-950 p-2 border-b border-ink-800 align-top">
                      <div className="text-ink-200 text-xs font-medium">{dim.label}</div>
                      <div className="text-ink-500 text-[10px] mt-0.5 leading-tight">
                        {dim.description}
                      </div>
                    </td>
                    {witnesses.map((w) => {
                      const text = w.testimonies[dim.id]
                      const isContradicted = hasContradiction(dim.id, w.id)
                      const isCellHighlighted =
                        activeWitness === w.id || activeDimension === dim.id

                      return (
                        <td
                          key={w.id}
                          className={`p-2 border-b border-ink-800 align-top text-xs leading-relaxed transition-colors duration-200
                            ${isCellHighlighted ? 'bg-ink-800/30' : ''}
                            ${isContradicted ? 'text-accent-red/90' : 'text-ink-300'}
                          `}
                          onMouseEnter={() => setActiveWitness(w.id)}
                          onMouseLeave={() => setActiveWitness(null)}
                        >
                          <span>{text}</span>
                          {isContradicted && (
                            <span
                              className="inline-block ml-1 text-accent-red text-[10px] font-mono"
                              role="img"
                              aria-label="此證詞與其他證詞存在矛盾"
                            >
                              ✕
                            </span>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Contradiction detail popover (desktop) */}
        {activeContradiction && (
          <div className="mt-3 mx-auto max-w-xl bg-ink-900/90 border border-accent-red/30 rounded px-4 py-3 transition-all">
            <div className="flex items-start gap-2">
              <span className="text-accent-red text-sm mt-0.5 shrink-0">✕</span>
              <div>
                <p className="text-ink-200 text-xs leading-relaxed">
                  {activeContradiction.description}
                </p>
                <Citation source={activeContradiction.source} className="text-xs mt-1" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile: Tab-based view — one witness per tab */}
      <div className="md:hidden">
        {/* Tab bar */}
        <div className="flex overflow-x-auto gap-1 pb-2 mb-4 border-b border-ink-800 scrollbar-none">
          {witnesses.map((w, i) => (
            <button
              key={w.id}
              type="button"
              className={`shrink-0 px-3 py-1.5 rounded-t text-xs transition-colors whitespace-nowrap
                ${mobileTab === i
                  ? 'bg-ink-800 text-ink-100 border-b-2 border-accent-blue'
                  : 'text-ink-400 hover:text-ink-200'
                }
              `}
              onClick={() => setMobileTab(i)}
              aria-selected={mobileTab === i}
              role="tab"
            >
              {w.name}
              {w.credibility !== 'normal' && (
                <span className={`ml-1 text-[9px] px-1 py-px rounded ${credibilityStyle[w.credibility]}`}>
                  {credibilityLabel[w.credibility]}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Active tab content */}
        {(() => {
          const w = witnesses[mobileTab]
          return (
            <div role="tabpanel" aria-label={`${w.name}的證詞`}>
              {/* Witness header */}
              <div className="mb-4">
                <div className="text-ink-100 text-sm font-medium">{w.name}</div>
                <div className="text-ink-500 text-xs font-mono">{w.role}</div>
                {w.credibilityNote && (
                  <p className="text-ink-400 text-xs mt-1 leading-relaxed italic">
                    {w.credibilityNote}
                  </p>
                )}
              </div>

              {/* Dimension cards */}
              <div className="space-y-2">
                {dimensions.map((dim, i) => {
                  const text = w.testimonies[dim.id]
                  const isContradicted = hasContradiction(dim.id, w.id)
                  const isVisible = i < visibleRows

                  return (
                    <div
                      key={dim.id}
                      className={`bg-ink-900/80 rounded px-3 py-2 transition-all duration-500
                        ${isContradicted ? 'border-l-2 border-accent-red' : 'border-l-2 border-ink-700'}
                      `}
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: `translateY(${isVisible ? 0 : 12}px)`,
                      }}
                    >
                      <div className="text-ink-300 text-[10px] font-mono mb-1">{dim.label}</div>
                      <div className={`text-xs leading-relaxed ${isContradicted ? 'text-accent-red/90' : 'text-ink-200'}`}>
                        {text}
                        {isContradicted && (
                          <span className="ml-1 text-accent-red text-[10px] font-mono">✕ 矛盾</span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-3">
                <Citation source={w.source} className="text-xs" />
              </div>
            </div>
          )
        })()}
      </div>

      {/* Credibility legend */}
      <div className="flex flex-wrap gap-4 justify-center mt-6 text-[10px] text-ink-500 font-mono">
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded bg-ink-700/50 border border-ink-600" />
          一般
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded bg-accent-gold/20 border border-accent-gold/40" />
          存疑
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded bg-accent-red/20 border border-accent-red/40" />
          不可信
        </span>
        <span className="flex items-center gap-1">
          <span className="text-accent-red">✕</span>
          矛盾標記
        </span>
      </div>

      {/* Conclusion */}
      <div className="mt-6 bg-ink-900/60 border border-ink-700 rounded px-4 py-3 max-w-2xl mx-auto">
        <blockquote className="text-ink-200 text-xs leading-relaxed italic">
          「{testimoniesData.conclusion.text}」
        </blockquote>
        <Citation source={testimoniesData.conclusion.source} className="text-xs mt-2" />
      </div>

      <div className="mt-3 bg-ink-900/60 border border-accent-red/20 rounded px-4 py-3 max-w-2xl mx-auto">
        <blockquote className="text-ink-100 text-xs leading-relaxed font-medium">
          「{testimoniesData.tjcConclusion.text}」
        </blockquote>
        <Citation source={testimoniesData.tjcConclusion.source} className="text-xs mt-2" />
      </div>

      {/* Source attribution */}
      <div className="mt-4 text-center">
        <Citation source={testimoniesData.source} className="text-xs" />
      </div>
    </div>
  )
}
