import { useState, useMemo } from 'react'
import { Citation } from '@/components/narrative/Citation'

type InjuryType = 'internal' | 'external' | 'none'
type ViewFilter = 'all' | 'internal' | 'external'

interface Injury {
  id: string
  type: InjuryType
  label: string
  detail: string
  source: string
  /** SVG region: front or back body view */
  view: 'front' | 'back'
  /** Position on the SVG body outline (approximate %) */
  cx: number
  cy: number
  /** Radius of the injury overlay */
  rx: number
  ry: number
}

const injuries: Injury[] = [
  // Internal injuries
  {
    id: 'head-hemorrhage',
    type: 'internal',
    label: '右後頭皮下出血斑',
    detail: '右後頭皮下出血斑四處（最大約 6×5.5 公分），右耳後頭皮下出血一處。頭蓋骨無骨折，硬腦膜下無出血。',
    source: '陳文成之死因，p. 17',
    view: 'back',
    cx: 55,
    cy: 12,
    rx: 10,
    ry: 6,
  },
  {
    id: 'neck-hemorrhage',
    type: 'internal',
    label: '右側頸部皮下出血',
    detail: '右側頸部皮下出血斑。',
    source: '陳文成之死因，p. 17',
    view: 'back',
    cx: 58,
    cy: 20,
    rx: 6,
    ry: 4,
  },
  {
    id: 'clavicle-fracture',
    type: 'internal',
    label: '右鎖骨與肩峯骨折',
    detail: '右鎖骨與肩峯骨折。',
    source: '陳文成之死因，p. 18',
    view: 'front',
    cx: 62,
    cy: 23,
    rx: 10,
    ry: 4,
  },
  {
    id: 'axilla-hemorrhage',
    type: 'internal',
    label: '右腋窩皮下出血',
    detail: '右腋窩皮下出血。',
    source: '陳文成之死因，p. 18',
    view: 'front',
    cx: 68,
    cy: 30,
    rx: 5,
    ry: 4,
  },
  {
    id: 'sternum-fracture',
    type: 'internal',
    label: '胸骨骨折',
    detail: '胸骨（第四肋骨處）骨折。',
    source: '陳文成之死因，p. 18',
    view: 'front',
    cx: 50,
    cy: 32,
    rx: 6,
    ry: 4,
  },
  {
    id: 'right-ribs-body',
    type: 'internal',
    label: '右側肋骨體部完全骨折',
    detail: '右側第二、三、四、五、六肋骨體部完全骨折，斷骨端露出。',
    source: '陳文成之死因，p. 18',
    view: 'front',
    cx: 62,
    cy: 35,
    rx: 12,
    ry: 10,
  },
  {
    id: 'right-ribs-posterior',
    type: 'internal',
    label: '右側肋骨後端骨折',
    detail: '右側第六、七、八、九、十肋骨後端骨折。',
    source: '陳文成之死因，p. 18',
    view: 'back',
    cx: 60,
    cy: 36,
    rx: 10,
    ry: 10,
  },
  {
    id: 'left-ribs',
    type: 'internal',
    label: '左側肋骨後端骨折',
    detail: '左側第二、三、四肋骨後端骨折。',
    source: '陳文成之死因，p. 18',
    view: 'back',
    cx: 38,
    cy: 32,
    rx: 8,
    ry: 6,
  },
  {
    id: 'right-kidney',
    type: 'internal',
    label: '右腎破裂傷',
    detail: '右腎背面破裂傷痕四處。',
    source: '陳文成之死因，p. 19',
    view: 'back',
    cx: 58,
    cy: 44,
    rx: 6,
    ry: 5,
  },
  {
    id: 'lumbar-fracture',
    type: 'internal',
    label: '腰椎橫突骨折',
    detail: '第三、四、五腰椎右側橫突骨折。',
    source: '陳文成之死因，p. 19',
    view: 'back',
    cx: 54,
    cy: 48,
    rx: 6,
    ry: 6,
  },
  {
    id: 'sacral-fracture',
    type: 'internal',
    label: '薦骨右側腰薦關節骨折',
    detail: '薦骨右側腰薦關節骨折。',
    source: '陳文成之死因，p. 19',
    view: 'back',
    cx: 55,
    cy: 54,
    rx: 6,
    ry: 4,
  },
  {
    id: 'pubic-fracture',
    type: 'internal',
    label: '恥骨聯合破裂骨折',
    detail: '恥骨聯合破裂骨折。',
    source: '陳文成之死因，p. 19',
    view: 'front',
    cx: 50,
    cy: 54,
    rx: 8,
    ry: 4,
  },
  // External injuries
  {
    id: 'back-abrasion-1',
    type: 'external',
    label: '右背擦傷（大）',
    detail: '右背肩胛骨下緣：約 15×0.7 公分表皮擦破傷。此擦傷與水溝方向互成90度直角——屍體在落下後被移動。',
    source: '陳文成之死因，p. 12, 21–26',
    view: 'back',
    cx: 58,
    cy: 30,
    rx: 14,
    ry: 2,
  },
  {
    id: 'back-abrasion-2',
    type: 'external',
    label: '右背擦傷（小）',
    detail: '右背第九肋骨部：約 2.8×1 公分表皮擦破傷。',
    source: '陳文成之死因，p. 12',
    view: 'back',
    cx: 60,
    cy: 40,
    rx: 4,
    ry: 2,
  },
  {
    id: 'waist-abrasion',
    type: 'external',
    label: '右腰擦傷',
    detail: '右腰部：約 2.0×1 公分表皮擦破傷。',
    source: '陳文成之死因，p. 12',
    view: 'back',
    cx: 60,
    cy: 46,
    rx: 3,
    ry: 2,
  },
  {
    id: 'left-forearm',
    type: 'external',
    label: '左前臂表皮傷',
    detail: '左前臂有些表皮傷。',
    source: 'Wecht Report, p. 5',
    view: 'front',
    cx: 28,
    cy: 48,
    rx: 4,
    ry: 6,
  },
  // No-injury zones
  {
    id: 'hands-none',
    type: 'none',
    label: '手部、腕部——無傷',
    detail: '手部、腕部、指甲均無明顯傷痕。若為墜落，人的本能反應是伸出雙手抵抗撞擊，四肢應有傷。但陳文成的四肢幾乎完好無損。',
    source: 'Wecht Report, p. 5, 11',
    view: 'front',
    cx: 30,
    cy: 56,
    rx: 6,
    ry: 6,
  },
  {
    id: 'hands-right-none',
    type: 'none',
    label: '右手——無傷',
    detail: '右手無明顯傷痕。無自我防禦傷痕，暗示墜落時已失去意識。',
    source: 'Wecht Report, p. 5, 11',
    view: 'front',
    cx: 72,
    cy: 56,
    rx: 6,
    ry: 6,
  },
  {
    id: 'buttocks-none',
    type: 'none',
    label: '臀部——無傷',
    detail: '臀部無明顯傷痕。',
    source: '陳文成之死因，p. 12',
    view: 'back',
    cx: 50,
    cy: 58,
    rx: 10,
    ry: 5,
  },
]

const typeColors: Record<InjuryType, { fill: string; stroke: string; label: string }> = {
  internal: {
    fill: 'rgba(194, 59, 34, 0.25)',
    stroke: 'rgba(194, 59, 34, 0.6)',
    label: '體內傷',
  },
  external: {
    fill: 'rgba(212, 168, 85, 0.25)',
    stroke: 'rgba(212, 168, 85, 0.6)',
    label: '體外傷',
  },
  none: {
    fill: 'rgba(52, 211, 153, 0.15)',
    stroke: 'rgba(52, 211, 153, 0.5)',
    label: '無傷區域',
  },
}

interface InjuryDiagramProps {
  progress: number
  isInView: boolean
  className?: string
}

export function InjuryDiagram({ progress, isInView, className = '' }: InjuryDiagramProps) {
  const [filter, setFilter] = useState<ViewFilter>('all')
  const [activeInjury, setActiveInjury] = useState<string | null>(null)

  const visibleCount = useMemo(() => {
    if (!isInView) return 0
    return Math.ceil(progress * injuries.length * 1.5)
  }, [progress, isInView])

  const filteredInjuries = useMemo(() => {
    if (filter === 'all') return injuries
    if (filter === 'internal') return injuries.filter((i) => i.type === 'internal')
    return injuries.filter((i) => i.type === 'external' || i.type === 'none')
  }, [filter])

  const activeDetail = injuries.find((i) => i.id === activeInjury)

  return (
    <div className={className} role="region" aria-label="傷痕位置人體標註圖">
      <h3 className="text-ink-200 text-base font-medium mb-1 text-center">
        傷痕位置分析
      </h3>
      <p className="text-ink-400 text-xs font-mono text-center mb-4">
        傷勢集中右側 ｜ 無自我防禦傷 ｜ 傷勢方向與陳屍位置不符
      </p>

      {/* Filter toggle */}
      <div className="flex justify-center gap-2 mb-6">
        {(['all', 'internal', 'external'] as const).map((f) => (
          <button
            key={f}
            type="button"
            className={`text-[11px] px-3 py-1 rounded font-mono transition-colors ${
              filter === f
                ? 'bg-accent-blue/20 text-accent-blue border border-accent-blue/40'
                : 'bg-ink-800 text-ink-400 border border-ink-700 hover:text-ink-200'
            }`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? '全部' : f === 'internal' ? '體內傷' : '體外傷'}
          </button>
        ))}
      </div>

      {/* Desktop: Side-by-side front + back */}
      <div className="hidden md:flex justify-center gap-8">
        <BodySilhouette
          label="正面"
          view="front"
          injuries={filteredInjuries.filter((i) => i.view === 'front')}
          visibleCount={visibleCount}
          activeInjury={activeInjury}
          onInjuryClick={setActiveInjury}
        />
        <BodySilhouette
          label="背面"
          view="back"
          injuries={filteredInjuries.filter((i) => i.view === 'back')}
          visibleCount={visibleCount}
          activeInjury={activeInjury}
          onInjuryClick={setActiveInjury}
        />
      </div>

      {/* Mobile: Stacked */}
      <div className="md:hidden space-y-6">
        <BodySilhouette
          label="正面"
          view="front"
          injuries={filteredInjuries.filter((i) => i.view === 'front')}
          visibleCount={visibleCount}
          activeInjury={activeInjury}
          onInjuryClick={setActiveInjury}
        />
        <BodySilhouette
          label="背面"
          view="back"
          injuries={filteredInjuries.filter((i) => i.view === 'back')}
          visibleCount={visibleCount}
          activeInjury={activeInjury}
          onInjuryClick={setActiveInjury}
        />
      </div>

      {/* Active injury detail */}
      {activeDetail && (
        <div className="mt-4 mx-auto max-w-xl bg-ink-900/90 border border-ink-700 rounded px-4 py-3">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full border"
              style={{
                backgroundColor: typeColors[activeDetail.type].fill,
                borderColor: typeColors[activeDetail.type].stroke,
              }}
            />
            <span className="text-ink-100 text-sm font-medium">{activeDetail.label}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded font-mono"
              style={{
                backgroundColor: typeColors[activeDetail.type].fill,
                color: typeColors[activeDetail.type].stroke,
              }}
            >
              {typeColors[activeDetail.type].label}
            </span>
          </div>
          <p className="text-ink-300 text-xs leading-relaxed">{activeDetail.detail}</p>
          <Citation source={activeDetail.source} className="text-xs mt-2" />
        </div>
      )}

      {/* Mobile: Injury list */}
      <div className="md:hidden mt-6 space-y-2">
        <div className="text-ink-400 text-[10px] font-mono text-center mb-2">
          點擊傷處查看詳情
        </div>
        {filteredInjuries.map((injury, i) => {
          const isVisible = i < visibleCount
          return (
            <button
              key={injury.id}
              type="button"
              className={`w-full text-left bg-ink-900/60 rounded px-3 py-2 transition-all duration-500
                border-l-2 ${activeInjury === injury.id ? 'border-accent-blue' : 'border-ink-700'}
              `}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: `translateY(${isVisible ? 0 : 12}px)`,
              }}
              onClick={() => setActiveInjury(activeInjury === injury.id ? null : injury.id)}
            >
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: typeColors[injury.type].stroke }}
                />
                <span className="text-ink-200 text-xs">{injury.label}</span>
                <span className="text-ink-500 text-[10px] font-mono ml-auto">
                  {injury.view === 'front' ? '正面' : '背面'}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center mt-6 text-[10px] text-ink-500 font-mono">
        {Object.entries(typeColors).map(([type, config]) => (
          <span key={type} className="flex items-center gap-1">
            <span
              className="inline-block w-3 h-3 rounded border"
              style={{ backgroundColor: config.fill, borderColor: config.stroke }}
            />
            {config.label}
          </span>
        ))}
      </div>

      {/* Key inference */}
      <div className="mt-6 bg-ink-900/60 border border-accent-red/20 rounded px-4 py-3 max-w-2xl mx-auto">
        <p className="text-ink-200 text-xs leading-relaxed">
          <span className="text-accent-red font-medium">關鍵推論：</span>
          傷勢集中右側（方向性），無自我防禦傷（失去意識或被控制），
          傷勢方向與陳屍位置不符（屍體可能被移動）。
        </p>
        <Citation source="Wecht Report, p. 5, 11；陳文成之死因，p. 21–27" className="text-xs mt-2" />
      </div>

      <div className="mt-4 text-center">
        <Citation
          source="Wecht Report, p. 9–12；促轉會調查報告（下冊），第92–106頁；陳文成之死因"
          className="text-xs"
        />
      </div>
    </div>
  )
}

// ----- Body Silhouette SVG -----

interface BodySilhouetteProps {
  label: string
  view: 'front' | 'back'
  injuries: Injury[]
  visibleCount: number
  activeInjury: string | null
  onInjuryClick: (id: string | null) => void
}

function BodySilhouette({
  label,
  view,
  injuries: viewInjuries,
  visibleCount,
  activeInjury,
  onInjuryClick,
}: BodySilhouetteProps) {
  return (
    <div className="flex-1 max-w-[220px]">
      <div className="text-ink-400 text-[10px] font-mono text-center mb-2">{label}</div>
      <svg
        viewBox="0 0 100 100"
        className="w-full"
        role="img"
        aria-label={`人體${label}傷痕標註圖`}
      >
        {/* Simplified body outline */}
        {view === 'front' ? <FrontBody /> : <BackBody />}

        {/* Injury overlays */}
        {viewInjuries.map((injury, i) => {
          const allIndex = injuries.indexOf(injury)
          const isVisible = allIndex < visibleCount
          const isActive = activeInjury === injury.id
          const colors = typeColors[injury.type]

          return (
            <g
              key={injury.id}
              className="cursor-pointer"
              onClick={() => onInjuryClick(isActive ? null : injury.id)}
              style={{
                opacity: isVisible ? 1 : 0,
                transition: `opacity 0.5s ${i * 0.1}s`,
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onInjuryClick(isActive ? null : injury.id)}
              aria-label={injury.label}
            >
              <ellipse
                cx={injury.cx}
                cy={injury.cy}
                rx={injury.rx}
                ry={injury.ry}
                fill={colors.fill}
                stroke={isActive ? colors.stroke : 'transparent'}
                strokeWidth={isActive ? 0.8 : 0}
              />
              {isActive && (
                <ellipse
                  cx={injury.cx}
                  cy={injury.cy}
                  rx={injury.rx + 2}
                  ry={injury.ry + 2}
                  fill="none"
                  stroke={colors.stroke}
                  strokeWidth={0.3}
                  strokeDasharray="1 1"
                />
              )}
            </g>
          )
        })}

        {/* Right side indicator */}
        <text
          x={view === 'front' ? 80 : 20}
          y="18"
          fill="rgba(194, 59, 34, 0.4)"
          fontSize="4"
          fontFamily="'JetBrains Mono', monospace"
          textAnchor="middle"
        >
          右側
        </text>
      </svg>
    </div>
  )
}

// Simplified front body outline
function FrontBody() {
  return (
    <g stroke="rgba(154, 143, 125, 0.3)" strokeWidth="0.5" fill="none">
      {/* Head */}
      <ellipse cx="50" cy="10" rx="7" ry="8" />
      {/* Neck */}
      <line x1="47" y1="18" x2="47" y2="22" />
      <line x1="53" y1="18" x2="53" y2="22" />
      {/* Shoulders */}
      <line x1="47" y1="22" x2="32" y2="26" />
      <line x1="53" y1="22" x2="68" y2="26" />
      {/* Torso */}
      <line x1="38" y1="24" x2="36" y2="52" />
      <line x1="62" y1="24" x2="64" y2="52" />
      {/* Hips */}
      <path d="M 36 52 Q 50 56 64 52" />
      {/* Left arm */}
      <line x1="32" y1="26" x2="26" y2="44" />
      <line x1="26" y1="44" x2="24" y2="58" />
      {/* Right arm */}
      <line x1="68" y1="26" x2="74" y2="44" />
      <line x1="74" y1="44" x2="76" y2="58" />
      {/* Left leg */}
      <line x1="42" y1="54" x2="38" y2="78" />
      <line x1="38" y1="78" x2="36" y2="96" />
      {/* Right leg */}
      <line x1="58" y1="54" x2="62" y2="78" />
      <line x1="62" y1="78" x2="64" y2="96" />
      {/* Center line (subtle) */}
      <line x1="50" y1="22" x2="50" y2="52" stroke="rgba(154, 143, 125, 0.1)" strokeDasharray="1 2" />
    </g>
  )
}

// Simplified back body outline
function BackBody() {
  return (
    <g stroke="rgba(154, 143, 125, 0.3)" strokeWidth="0.5" fill="none">
      {/* Head */}
      <ellipse cx="50" cy="10" rx="7" ry="8" />
      {/* Neck */}
      <line x1="47" y1="18" x2="47" y2="22" />
      <line x1="53" y1="18" x2="53" y2="22" />
      {/* Shoulders */}
      <line x1="47" y1="22" x2="32" y2="26" />
      <line x1="53" y1="22" x2="68" y2="26" />
      {/* Torso */}
      <line x1="38" y1="24" x2="36" y2="52" />
      <line x1="62" y1="24" x2="64" y2="52" />
      {/* Hips */}
      <path d="M 36 52 Q 50 56 64 52" />
      {/* Spine (subtle) */}
      <line x1="50" y1="22" x2="50" y2="52" stroke="rgba(154, 143, 125, 0.15)" strokeDasharray="1 2" />
      {/* Left arm (mirrored on back view) */}
      <line x1="68" y1="26" x2="74" y2="44" />
      <line x1="74" y1="44" x2="76" y2="58" />
      {/* Right arm (mirrored on back view) */}
      <line x1="32" y1="26" x2="26" y2="44" />
      <line x1="26" y1="44" x2="24" y2="58" />
      {/* Left leg */}
      <line x1="58" y1="54" x2="62" y2="78" />
      <line x1="62" y1="78" x2="64" y2="96" />
      {/* Right leg */}
      <line x1="42" y1="54" x2="38" y2="78" />
      <line x1="38" y1="78" x2="36" y2="96" />
      {/* Shoulder blades (subtle) */}
      <path d="M 42 28 Q 44 32 42 36" stroke="rgba(154, 143, 125, 0.12)" />
      <path d="M 58 28 Q 56 32 58 36" stroke="rgba(154, 143, 125, 0.12)" />
    </g>
  )
}
