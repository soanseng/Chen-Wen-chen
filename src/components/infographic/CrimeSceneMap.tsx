import { useState, useMemo } from 'react'
import { Citation } from '@/components/narrative/Citation'

interface MapLayer {
  id: string
  label: string
  defaultOn: boolean
}

const layers: MapLayer[] = [
  { id: 'buildings', label: '建築', defaultOn: true },
  { id: 'annotations', label: '標註', defaultOn: true },
  { id: 'routes', label: '可能路徑', defaultOn: false },
]

interface MapAnnotation {
  id: string
  x: number
  y: number
  label: string
  detail: string
  source: string
}

const mapAnnotations: MapAnnotation[] = [
  {
    id: 'body-location',
    x: 298,
    y: 200,
    label: '陳屍位置',
    detail:
      '陳文成仰臥橫跨在建築旁的淺水溝上，背部朝下。水溝寬約17cm、深約5cm。',
    source: 'Wecht Report, p. 10',
  },
  {
    id: 'fire-escape',
    x: 300,
    y: 110,
    label: '消防太平梯',
    detail:
      '鐵製Z字形太平梯，位於建築東北角外側，可通二、四、五樓。寬約0.9公尺。',
    source: '陳文成之死因，p. 8',
  },
  {
    id: 'gate',
    x: 80,
    y: 360,
    label: '校門',
    detail:
      '校園安全紀錄顯示，晚間十一點至隔日七點之間無車輛進出紀錄。持有特殊證件者可不經詢問或登記進入。',
    source: 'Wecht Report, p. 9–10',
  },
  {
    id: 'guard-post',
    x: 120,
    y: 340,
    label: '警衛室',
    detail:
      '當晚有六名校警巡邏，無人報告異常。校警陳治國清晨約七點接到不知名男子電話，稱圖書館附近地上躺了個人。',
    source: 'Wecht Report, p. 10',
  },
  {
    id: 'ditch',
    x: 300,
    y: 260,
    label: '淺水溝',
    detail:
      '沿建築物後方延伸的淺水溝，寬約17cm、深約5cm。周圍是磚頭步道、雜草與甘薯葉。',
    source: 'Wecht Report, p. 10；黃怡、林世煜調查報告，第31頁',
  },
]

interface CrimeSceneMapProps {
  progress: number
  isInView: boolean
  className?: string
}

export function CrimeSceneMap({ progress, isInView, className = '' }: CrimeSceneMapProps) {
  const [activeLayers, setActiveLayers] = useState<Set<string>>(
    () => new Set(layers.filter((l) => l.defaultOn).map((l) => l.id)),
  )
  const [activeAnnotation, setActiveAnnotation] = useState<string | null>(null)

  const visibleAnnotations = useMemo(() => {
    if (!isInView) return 0
    return Math.ceil(progress * mapAnnotations.length * 1.5)
  }, [progress, isInView])

  const toggleLayer = (id: string) => {
    setActiveLayers((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const activeDetail = mapAnnotations.find((a) => a.id === activeAnnotation)

  return (
    <div className={className} role="region" aria-label="陳文成案現場平面圖">
      <h3 className="text-ink-200 text-base font-medium mb-1 text-center">
        現場平面圖
      </h3>
      <p className="text-ink-400 text-xs font-mono text-center mb-4">
        台大研究生圖書館周邊 ｜ 陳屍位置 ｜ 深夜無車輛進出紀錄
      </p>

      {/* Layer toggles */}
      <div className="flex justify-center gap-2 mb-6">
        {layers.map((layer) => (
          <button
            key={layer.id}
            type="button"
            className={`text-[11px] px-3 py-1 rounded font-mono transition-colors ${
              activeLayers.has(layer.id)
                ? 'bg-accent-blue/20 text-accent-blue border border-accent-blue/40'
                : 'bg-ink-800 text-ink-400 border border-ink-700 hover:text-ink-200'
            }`}
            onClick={() => toggleLayer(layer.id)}
          >
            {layer.label}
          </button>
        ))}
      </div>

      {/* SVG Map */}
      <svg
        viewBox="0 0 500 420"
        className="w-full max-w-2xl mx-auto"
        style={{ maxHeight: '480px' }}
        role="img"
        aria-label="台大研究生圖書館現場俯瞰圖"
      >
        {/* Campus boundary */}
        <rect
          x="20"
          y="20"
          width="460"
          height="380"
          fill="rgba(28, 24, 20, 0.3)"
          stroke="rgba(74, 64, 57, 0.3)"
          strokeWidth="1"
          strokeDasharray="6 4"
          rx="4"
        />

        {/* Campus label */}
        <text
          x="250"
          y="408"
          textAnchor="middle"
          fill="rgba(154, 143, 125, 0.3)"
          fontSize="10"
          fontFamily="'JetBrains Mono', monospace"
        >
          台灣大學校園
        </text>

        {/* North arrow */}
        <g transform="translate(450, 50)">
          <line x1="0" y1="20" x2="0" y2="-5" stroke="rgba(154, 143, 125, 0.5)" strokeWidth="1" />
          <polygon points="0,-8 -4,0 4,0" fill="rgba(154, 143, 125, 0.5)" />
          <text
            x="0"
            y="-12"
            textAnchor="middle"
            fill="rgba(154, 143, 125, 0.4)"
            fontSize="9"
            fontFamily="'JetBrains Mono', monospace"
          >
            N
          </text>
        </g>

        {/* Buildings layer */}
        {activeLayers.has('buildings') && (
          <g>
            {/* Main library building */}
            <rect
              x="120"
              y="100"
              width="160"
              height="180"
              fill="rgba(51, 43, 37, 0.5)"
              stroke="rgba(74, 64, 57, 0.7)"
              strokeWidth="1"
            />
            <text
              x="200"
              y="185"
              textAnchor="middle"
              fill="rgba(154, 143, 125, 0.4)"
              fontSize="11"
              fontFamily="'Noto Serif TC', serif"
            >
              研究生圖書館
            </text>
            <text
              x="200"
              y="200"
              textAnchor="middle"
              fill="rgba(154, 143, 125, 0.25)"
              fontSize="8"
              fontFamily="'JetBrains Mono', monospace"
            >
              五層建築（坐北向南）
            </text>

            {/* Fire escape structure (NE corner) */}
            <rect
              x="280"
              y="95"
              width="22"
              height="50"
              fill="rgba(51, 43, 37, 0.3)"
              stroke="rgba(154, 143, 125, 0.4)"
              strokeWidth="0.5"
            />
            <text
              x="291"
              y="125"
              textAnchor="middle"
              fill="rgba(154, 143, 125, 0.35)"
              fontSize="6"
              fontFamily="'JetBrains Mono', monospace"
              transform="rotate(-90, 291, 125)"
            >
              太平梯
            </text>

            {/* Drainage ditch along east side */}
            <line
              x1="285"
              y1="90"
              x2="285"
              y2="290"
              stroke="rgba(74, 111, 165, 0.3)"
              strokeWidth="4"
            />

            {/* Road/path around building */}
            <rect
              x="100"
              y="80"
              width="230"
              height="220"
              fill="none"
              stroke="rgba(74, 64, 57, 0.2)"
              strokeWidth="0.5"
              rx="2"
            />

            {/* Nearby building */}
            <rect
              x="360"
              y="140"
              width="80"
              height="100"
              fill="rgba(51, 43, 37, 0.25)"
              stroke="rgba(74, 64, 57, 0.3)"
              strokeWidth="0.5"
            />
            <text
              x="400"
              y="195"
              textAnchor="middle"
              fill="rgba(154, 143, 125, 0.2)"
              fontSize="7"
              fontFamily="'JetBrains Mono', monospace"
            >
              鄰近建築
            </text>

            {/* Gate */}
            <rect
              x="60"
              y="355"
              width="40"
              height="12"
              fill="none"
              stroke="rgba(154, 143, 125, 0.4)"
              strokeWidth="0.5"
              rx="1"
            />
            <text
              x="80"
              y="380"
              textAnchor="middle"
              fill="rgba(154, 143, 125, 0.35)"
              fontSize="8"
              fontFamily="'JetBrains Mono', monospace"
            >
              校門
            </text>
          </g>
        )}

        {/* Body location - always visible */}
        <g>
          <circle
            cx="295"
            cy="200"
            r="7"
            fill="rgba(194, 59, 34, 0.3)"
            stroke="rgba(194, 59, 34, 0.6)"
            strokeWidth="1"
          />
          <circle
            cx="295"
            cy="200"
            r="12"
            fill="none"
            stroke="rgba(194, 59, 34, 0.2)"
            strokeWidth="0.5"
            strokeDasharray="2 2"
          />
          <text
            x="312"
            y="203"
            fill="rgba(194, 59, 34, 0.6)"
            fontSize="8"
            fontFamily="'JetBrains Mono', monospace"
          >
            陳屍位置
          </text>
        </g>

        {/* Distance annotations */}
        {activeLayers.has('annotations') && (
          <g>
            {/* Distance from building to body */}
            <line
              x1="280"
              y1="210"
              x2="295"
              y2="210"
              stroke="rgba(212, 168, 85, 0.4)"
              strokeWidth="0.5"
            />
            <line x1="280" y1="207" x2="280" y2="213" stroke="rgba(212, 168, 85, 0.4)" strokeWidth="0.5" />
            <line x1="295" y1="207" x2="295" y2="213" stroke="rgba(212, 168, 85, 0.4)" strokeWidth="0.5" />

            {/* Distance from gate to building */}
            <line
              x1="100"
              y1="350"
              x2="200"
              y2="285"
              stroke="rgba(154, 143, 125, 0.15)"
              strokeWidth="0.5"
              strokeDasharray="3 3"
            />

            {/* No vehicle entry annotation */}
            <text
              x="80"
              y="395"
              textAnchor="middle"
              fill="rgba(194, 59, 34, 0.4)"
              fontSize="7"
              fontFamily="'JetBrains Mono', monospace"
            >
              23:00–07:00 無車輛進出紀錄
            </text>

            {/* Drainage ditch label */}
            <text
              x="302"
              y="275"
              fill="rgba(74, 111, 165, 0.4)"
              fontSize="7"
              fontFamily="'JetBrains Mono', monospace"
            >
              淺水溝
            </text>
            <text
              x="302"
              y="285"
              fill="rgba(74, 111, 165, 0.3)"
              fontSize="6"
              fontFamily="'JetBrains Mono', monospace"
            >
              17cm × 5cm
            </text>
          </g>
        )}

        {/* Possible routes layer */}
        {activeLayers.has('routes') && (
          <g>
            {/* Route 1: From gate to building */}
            <path
              d="M 80 355 L 150 310 L 200 280 L 280 220 L 295 200"
              fill="none"
              stroke="rgba(194, 59, 34, 0.25)"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              markerEnd="url(#arrow)"
            />
            <text
              x="160"
              y="295"
              fill="rgba(194, 59, 34, 0.35)"
              fontSize="7"
              fontFamily="'JetBrains Mono', monospace"
              transform="rotate(-35, 160, 295)"
            >
              可能運送路徑
            </text>

            {/* Route 2: From side entrance */}
            <path
              d="M 480 220 L 400 210 L 320 205 L 295 200"
              fill="none"
              stroke="rgba(194, 59, 34, 0.2)"
              strokeWidth="1"
              strokeDasharray="4 4"
              markerEnd="url(#arrow)"
            />

            {/* Arrow marker definition */}
            <defs>
              <marker
                id="arrow"
                markerWidth="6"
                markerHeight="6"
                refX="5"
                refY="3"
                orient="auto"
              >
                <path d="M 0 0 L 6 3 L 0 6 Z" fill="rgba(194, 59, 34, 0.35)" />
              </marker>
            </defs>
          </g>
        )}

        {/* Interactive annotation points */}
        {activeLayers.has('annotations') &&
          mapAnnotations.map((point, i) => {
            const isVisible = i < visibleAnnotations
            const isActive = activeAnnotation === point.id
            // Skip body-location since it's always shown above
            if (point.id === 'body-location') return null

            return (
              <g
                key={point.id}
                className="cursor-pointer"
                onClick={() => setActiveAnnotation(isActive ? null : point.id)}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transition: 'opacity 0.5s',
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === 'Enter' && setActiveAnnotation(isActive ? null : point.id)
                }
                aria-label={point.label}
              >
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={isActive ? 6 : 4}
                  fill={isActive ? 'rgba(74, 111, 165, 0.4)' : 'rgba(74, 111, 165, 0.2)'}
                  stroke={isActive ? 'rgba(74, 111, 165, 0.8)' : 'rgba(74, 111, 165, 0.5)'}
                  strokeWidth="1"
                />
              </g>
            )
          })}
      </svg>

      {/* Active annotation detail */}
      {activeDetail && (
        <div className="mt-4 mx-auto max-w-xl bg-ink-900/90 border border-ink-700 rounded px-4 py-3">
          <div className="text-ink-100 text-sm font-medium mb-1">{activeDetail.label}</div>
          <p className="text-ink-300 text-xs leading-relaxed">{activeDetail.detail}</p>
          <Citation source={activeDetail.source} className="text-xs mt-2" />
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center mt-6 text-[10px] text-ink-500 font-mono">
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded bg-ink-700/50 border border-ink-600" />
          建築
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-accent-red/30 border border-accent-red/60" />
          陳屍位置
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-0.5 border-b border-dashed border-accent-red/40" />
          可能路徑
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-1 bg-accent-blue/30" />
          淺水溝
        </span>
      </div>

      <div className="mt-4 text-center">
        <Citation
          source="Wecht Report, p. 4–5, 9–10；促轉會調查報告（下冊），第92–106頁"
          className="text-xs"
        />
      </div>
    </div>
  )
}
