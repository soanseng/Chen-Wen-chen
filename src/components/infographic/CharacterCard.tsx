import { useState } from 'react'
import { Citation } from '@/components/narrative/Citation'

export interface CharacterRelation {
  id: string
  type: string
}

export interface CharacterData {
  id: string
  name: string
  nameEn?: string | null
  role: string
  affiliation?: string | null
  description: string
  sourceDescriptions?: Record<string, string>
  relations: CharacterRelation[]
  chapters: number[]
  note?: string
  discrepancy?: string
}

const roleLabels: Record<string, string> = {
  victim: '受害者及家屬',
  perpetrator: '加害體制相關人員',
  investigator: '調查人員',
  witness: '證人',
  media: '媒體相關',
  political: '政治人物',
  academic: '學術人物',
  other: '其他',
}

const roleColors: Record<string, { bg: string; text: string; border: string }> = {
  victim: { bg: 'bg-amber-900/30', text: 'text-amber-300', border: 'border-amber-700/50' },
  perpetrator: { bg: 'bg-slate-800/50', text: 'text-slate-300', border: 'border-slate-600/50' },
  investigator: { bg: 'bg-sky-900/30', text: 'text-sky-300', border: 'border-sky-700/50' },
  witness: { bg: 'bg-emerald-900/30', text: 'text-emerald-300', border: 'border-emerald-700/50' },
  media: { bg: 'bg-purple-900/30', text: 'text-purple-300', border: 'border-purple-700/50' },
  political: { bg: 'bg-rose-900/30', text: 'text-rose-300', border: 'border-rose-700/50' },
  academic: { bg: 'bg-cyan-900/30', text: 'text-cyan-300', border: 'border-cyan-700/50' },
  other: { bg: 'bg-ink-800/50', text: 'text-ink-300', border: 'border-ink-700/50' },
}

interface CharacterCardProps {
  character: CharacterData
  /** Compact mode for mobile list view */
  compact?: boolean
  /** Character name resolver for relations */
  getCharacterName?: (id: string) => string | undefined
  className?: string
}

export function CharacterCard({
  character,
  compact = false,
  getCharacterName,
  className = '',
}: CharacterCardProps) {
  const [expanded, setExpanded] = useState(false)
  const colors = roleColors[character.role] ?? roleColors.other

  const relationTypeLabels: Record<string, string> = {
    spouse: '配偶',
    son: '兒子',
    father: '父親',
    mother: '母親',
    brother: '兄弟',
    sister: '姐妹',
    'father-in-law': '岳父',
    colleague: '同事',
    friend: '友人',
    subordinate: '部屬',
    superior: '上級',
    'subordinate-promoted': '擢升之部屬',
    'invited-by': '受邀於',
    invited: '邀請',
    interrogated: '偵訊對象',
    'political-contact': '政治聯繫',
    contact: '聯絡人',
    'brother-in-law': '姊夫',
  }

  if (compact) {
    return (
      <div
        className={`${colors.bg} border ${colors.border} rounded px-3 py-2
          cursor-pointer transition-all hover:brightness-110 ${className}`}
        onClick={() => setExpanded(!expanded)}
        onKeyDown={(e) => e.key === 'Enter' && setExpanded(!expanded)}
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className={`text-sm font-medium ${colors.text}`}>{character.name}</span>
            {character.nameEn && (
              <span className="text-ink-500 text-xs font-mono truncate">{character.nameEn}</span>
            )}
          </div>
          <svg
            className={`w-3 h-3 text-ink-500 shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {character.affiliation && (
          <div className="text-ink-400 text-xs mt-0.5">{character.affiliation}</div>
        )}

        {expanded && (
          <div className="mt-2 space-y-2 animate-in fade-in">
            <p className="text-ink-200 text-xs leading-relaxed">{character.description}</p>

            {character.discrepancy && (
              <div className="bg-accent-red/10 border border-accent-red/20 rounded px-2 py-1.5">
                <p className="text-accent-red/80 text-xs leading-relaxed">
                  <span className="font-mono text-[10px] mr-1">*</span>
                  {character.discrepancy}
                </p>
              </div>
            )}

            {character.relations.length > 0 && getCharacterName && (
              <div className="text-xs text-ink-400">
                <span className="text-ink-500 font-mono text-[10px]">關係：</span>
                {character.relations
                  .map((r) => {
                    const name = getCharacterName(r.id)
                    const label = relationTypeLabels[r.type] ?? r.type
                    return name ? `${name}（${label}）` : null
                  })
                  .filter(Boolean)
                  .join('、')}
              </div>
            )}

            {character.sourceDescriptions && (
              <div className="space-y-0.5">
                {Object.values(character.sourceDescriptions).map((src, i) => (
                  <Citation key={i} source={src} className="text-[10px]" />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  // Full card (used in desktop popover)
  return (
    <div
      className={`${colors.bg} border ${colors.border} rounded-lg p-4 max-w-sm
        shadow-lg shadow-black/30 ${className}`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <h4 className={`text-base font-medium ${colors.text}`}>{character.name}</h4>
          {character.nameEn && (
            <div className="text-ink-500 text-xs font-mono">{character.nameEn}</div>
          )}
        </div>
        <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono shrink-0 ${colors.bg} ${colors.text}`}>
          {roleLabels[character.role] ?? character.role}
        </span>
      </div>

      {character.affiliation && (
        <div className="text-ink-400 text-xs mb-2">{character.affiliation}</div>
      )}

      <p className="text-ink-200 text-xs leading-relaxed mb-3">{character.description}</p>

      {character.discrepancy && (
        <div className="bg-accent-red/10 border border-accent-red/20 rounded px-2 py-1.5 mb-3">
          <p className="text-accent-red/80 text-xs leading-relaxed">
            <span className="font-mono text-[10px] mr-1">*</span>
            {character.discrepancy}
          </p>
        </div>
      )}

      {character.note && (
        <p className="text-ink-400 text-xs italic mb-3">{character.note}</p>
      )}

      {character.relations.length > 0 && getCharacterName && (
        <div className="text-xs text-ink-400 mb-3">
          <span className="text-ink-500 font-mono text-[10px] block mb-1">關係</span>
          <div className="flex flex-wrap gap-1">
            {character.relations.map((r) => {
              const name = getCharacterName(r.id)
              if (!name) return null
              const label = relationTypeLabels[r.type] ?? r.type
              return (
                <span
                  key={r.id}
                  className="inline-block bg-ink-800 border border-ink-700 rounded px-1.5 py-0.5 text-[10px]"
                >
                  {name}
                  <span className="text-ink-500 ml-0.5">({label})</span>
                </span>
              )
            })}
          </div>
        </div>
      )}

      {character.chapters.length > 0 && (
        <div className="text-[10px] text-ink-500 font-mono">
          出現章節：{character.chapters.map((c) => `第${c}章`).join('、')}
        </div>
      )}

      {character.sourceDescriptions && (
        <div className="mt-2 space-y-0.5 border-t border-ink-700/50 pt-2">
          {Object.values(character.sourceDescriptions).map((src, i) => (
            <Citation key={i} source={src} className="text-[10px]" />
          ))}
        </div>
      )}
    </div>
  )
}
