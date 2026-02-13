import { useState, useMemo } from 'react'
import { Citation } from '@/components/narrative/Citation'

interface Doubt {
  id: number
  title: string
  summary: string
  detail: string
  source: string
  icon: 'direction' | 'hand' | 'clock' | 'strike' | 'vehicle' | 'paint'
}

const doubts: Doubt[] = [
  {
    id: 1,
    title: '傷勢方向與陳屍位置不符',
    summary: '右側傷勢暗示右側著地，但陳屍姿態不符',
    detail:
      '驗屍報告推論右背腰部兩條擦傷是水溝磚頭造成，但水溝沿身體縱向左側延伸，而擦傷呈橫向分佈——兩者互成九十度直角。骨折與出血等體內傷集中在右半身，但水溝和磚頭均位於死者左半身。結論：屍體在落下後被移動到發現位置。',
    source: '陳文成之死因，p. 21–27',
    icon: 'direction',
  },
  {
    id: 2,
    title: '無自我防禦傷痕',
    summary: '手部、腕部、指甲均無傷',
    detail:
      '若為自殺跳樓或意外墜落，人的本能反應是伸出雙手抵抗撞擊，四肢應有傷。但陳文成的手部、膝蓋、手肘均無嚴重出血或骨折，指甲下無皮膚碎片——暗示墜落時已失去意識。',
    source: 'Wecht Report, p. 5, 11',
    icon: 'hand',
  },
  {
    id: 3,
    title: '落地後仍存活半小時以上',
    summary: '體內出血量暗示存活時間',
    detail:
      'Wecht 根據骨折周圍延展出的瘀血判斷，心臟血管系統在落地時仍在運行——陳文成落地後還存活了半小時或更長時間，卻未獲救治。',
    source: 'Wecht Report, p. 11',
    icon: 'clock',
  },
  {
    id: 4,
    title: '可能的致昏手法',
    summary: '頭部打擊或麻醉',
    detail:
      '右後頭皮下有多處出血斑，但頭蓋骨無骨折——與「擊打頭顱底部致昏」假說相容。Wecht 指出：「擊打人的頭顱底部，會使他瞬間失去知覺而不留傷痕⋯⋯攻擊者也可以用哥羅仿麻醉劑使他動彈不得。」',
    source: 'Wecht Report, p. 11；陳文成之死因，p. 17',
    icon: 'strike',
  },
  {
    id: 5,
    title: '遺體如何進入校園？',
    summary: '深夜無車輛進出紀錄',
    detail:
      '校園安全紀錄顯示，晚間十一點至隔日七點之間無車輛進出紀錄。持有特殊證件者可不經詢問或登記進入。當晚有六名校警巡邏，無人報告異常。',
    source: 'Wecht Report, p. 9–10',
    icon: 'vehicle',
  },
  {
    id: 6,
    title: '五樓護欄事後重新上漆',
    summary: '毀滅可能的物理證據',
    detail:
      'Wecht 記錄五樓消防梯護欄是新漆的，黑漆上沒有斑痕或剝漆。他被告知，七月三日事件後曾重新上漆——可能的物理證據（如刮痕、衣物纖維、指紋）已被毀滅。',
    source: 'Wecht Report, p. 9',
    icon: 'paint',
  },
]

function DoubtIcon({ icon, className = '' }: { icon: Doubt['icon']; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`w-8 h-8 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icon === 'direction' && (
        <>
          {/* Crossing arrows - direction mismatch */}
          <line x1="4" y1="20" x2="20" y2="4" />
          <polyline points="14,4 20,4 20,10" />
          <line x1="4" y1="4" x2="20" y2="20" />
          <polyline points="14,20 20,20 20,14" />
        </>
      )}
      {icon === 'hand' && (
        <>
          {/* Open hand - no defensive injuries */}
          <path d="M12 22V14" />
          <path d="M9 18V8.5a1.5 1.5 0 0 1 3 0" />
          <path d="M12 8.5V6.5a1.5 1.5 0 0 1 3 0V12" />
          <path d="M15 9.5a1.5 1.5 0 0 1 3 0V14" />
          <path d="M9 8.5V4.5a1.5 1.5 0 0 0-3 0V14" />
          {/* X mark */}
          <line x1="3" y1="3" x2="7" y2="7" strokeWidth="2" />
          <line x1="7" y1="3" x2="3" y2="7" strokeWidth="2" />
        </>
      )}
      {icon === 'clock' && (
        <>
          {/* Clock - survived 30+ min */}
          <circle cx="12" cy="12" r="10" />
          <polyline points="12,6 12,12 16,14" />
        </>
      )}
      {icon === 'strike' && (
        <>
          {/* Impact mark on head */}
          <circle cx="12" cy="9" r="7" />
          <path d="M8 4L5 1" />
          <path d="M16 4L19 1" />
          <path d="M12 2V0" />
          <line x1="8" y1="20" x2="8" y2="23" />
          <line x1="16" y1="20" x2="16" y2="23" />
        </>
      )}
      {icon === 'vehicle' && (
        <>
          {/* Vehicle with question mark */}
          <rect x="2" y="10" width="16" height="8" rx="1" />
          <circle cx="6" cy="20" r="2" />
          <circle cx="14" cy="20" r="2" />
          <line x1="18" y1="14" x2="20" y2="14" />
          <text
            x="21"
            y="10"
            fill="currentColor"
            stroke="none"
            fontSize="8"
            fontFamily="'JetBrains Mono', monospace"
          >
            ?
          </text>
        </>
      )}
      {icon === 'paint' && (
        <>
          {/* Paint roller - repainted */}
          <rect x="6" y="2" width="12" height="6" rx="2" />
          <line x1="12" y1="8" x2="12" y2="14" />
          <path d="M8 14L16 14" />
          <path d="M8 17L8 22" strokeWidth="2" />
          <path d="M11 17L11 22" strokeWidth="2" />
          <path d="M14" y1="17" x2="14" y2="20" strokeWidth="2" />
        </>
      )}
    </svg>
  )
}

interface SixDoubtsProps {
  progress: number
  isInView: boolean
  className?: string
}

export function SixDoubts({ progress, isInView, className = '' }: SixDoubtsProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const visibleCount = useMemo(() => {
    if (!isInView) return 0
    return Math.ceil(progress * doubts.length * 1.5)
  }, [progress, isInView])

  return (
    <div className={className} role="region" aria-label="六大疑點">
      <h3 className="text-ink-200 text-base font-medium mb-1 text-center">
        六大疑點
      </h3>
      <p className="text-ink-400 text-xs font-mono text-center mb-6">
        法醫證據與現場環境的矛盾 ｜ 指向他殺的關鍵推論
      </p>

      {/* Desktop: 3×2 grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {doubts.map((doubt, i) => {
          const isVisible = i < visibleCount
          const isExpanded = expandedId === doubt.id

          return (
            <DoubtCard
              key={doubt.id}
              doubt={doubt}
              isVisible={isVisible}
              isExpanded={isExpanded}
              delay={i * 0.1}
              onToggle={() => setExpandedId(isExpanded ? null : doubt.id)}
            />
          )
        })}
      </div>

      {/* Mobile: vertical stack, default expanded */}
      <div className="md:hidden space-y-3 max-w-sm mx-auto">
        {doubts.map((doubt, i) => {
          const isVisible = i < visibleCount

          return (
            <DoubtCard
              key={doubt.id}
              doubt={doubt}
              isVisible={isVisible}
              isExpanded={true}
              delay={i * 0.1}
              onToggle={() => {}}
              compact
            />
          )
        })}
      </div>

      {/* Source attribution */}
      <div className="mt-6 text-center">
        <Citation
          source="Wecht Report, p. 9–12；促轉會調查報告（下冊），第159頁；陳文成之死因"
          className="text-xs"
        />
      </div>
    </div>
  )
}

// ----- Doubt Card -----

interface DoubtCardProps {
  doubt: Doubt
  isVisible: boolean
  isExpanded: boolean
  delay: number
  onToggle: () => void
  compact?: boolean
}

function DoubtCard({ doubt, isVisible, isExpanded, delay, onToggle, compact }: DoubtCardProps) {
  return (
    <div
      className={`bg-ink-900/60 border border-ink-800 rounded-lg overflow-hidden transition-all duration-500
        ${isExpanded ? 'border-ink-600' : 'hover:border-ink-600'}
      `}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? 0 : 16}px)`,
        transitionDelay: `${delay}s`,
      }}
    >
      <button
        type="button"
        className="w-full text-left p-4 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-blue"
        onClick={onToggle}
        aria-expanded={isExpanded}
      >
        <div className="flex items-start gap-3">
          {/* Number */}
          <span className="text-accent-red text-2xl font-mono font-bold leading-none shrink-0 mt-0.5">
            {doubt.id}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <DoubtIcon icon={doubt.icon} className="text-ink-500 shrink-0 w-5 h-5" />
              <h4 className="text-ink-100 text-sm font-medium leading-tight">
                {doubt.title}
              </h4>
            </div>
            <p className="text-ink-400 text-xs leading-relaxed">
              {doubt.summary}
            </p>
          </div>
          {!compact && (
            <svg
              className={`w-4 h-4 text-ink-500 shrink-0 mt-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </div>
      </button>

      {/* Expanded detail */}
      {isExpanded && (
        <div className="px-4 pb-4 pt-0 border-t border-ink-800/50">
          <p className="text-ink-300 text-xs leading-relaxed mt-3">
            {doubt.detail}
          </p>
          <Citation source={doubt.source} className="text-xs mt-2" />
        </div>
      )}
    </div>
  )
}
