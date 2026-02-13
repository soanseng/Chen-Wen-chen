import { useState, useMemo } from 'react'
import { Citation } from '@/components/narrative/Citation'

interface AnnotationPoint {
  id: string
  x: number
  y: number
  label: string
  detail: string
  source: string
}

const annotations: AnnotationPoint[] = [
  {
    id: 'railing',
    x: 158,
    y: 68,
    label: '五樓護欄（83cm）',
    detail:
      '五樓頂層平台長約193cm、寬約89cm，護欄高度僅83cm。Wecht 記錄護欄是新漆的，七月三日事件後曾重新上漆。',
    source: 'Wecht Report, p. 9；陳文成之死因，p. 8',
  },
  {
    id: 'platform',
    x: 140,
    y: 80,
    label: '五樓平台',
    detail: '消防太平梯五樓頂層平台，長約193cm、寬約89cm。',
    source: '陳文成之死因，p. 8',
  },
  {
    id: 'fire-escape',
    x: 172,
    y: 180,
    label: '消防太平梯',
    detail:
      '鐵製Z字形消防太平梯，寬約0.9公尺，可通二、四、五樓。位於建築東北角外側。',
    source: '陳文成之死因，p. 8；黃怡、林世煜調查報告，第31頁',
  },
  {
    id: 'body',
    x: 200,
    y: 340,
    label: '陳屍位置',
    detail:
      '陳文成仰臥橫跨在建築旁的淺水溝上，背部朝下。水溝寬約17cm、深約5cm。周圍是磚頭步道、雜草與甘薯葉。',
    source: 'Wecht Report, p. 10；黃怡、林世煜調查報告，第31頁',
  },
  {
    id: 'height',
    x: 90,
    y: 200,
    label: '約 13.8 公尺',
    detail: '從五樓頂到地面的距離約13.80公尺。',
    source: '陳文成之死因，p. 8',
  },
]

interface LibraryBuildingProps {
  progress: number
  isInView: boolean
  className?: string
}

export function LibraryBuilding({ progress, isInView, className = '' }: LibraryBuildingProps) {
  const [activeAnnotation, setActiveAnnotation] = useState<string | null>(null)
  const [view, setView] = useState<'side' | 'overhead'>('side')

  const visibleAnnotations = useMemo(() => {
    if (!isInView) return 0
    return Math.ceil(progress * annotations.length * 1.5)
  }, [progress, isInView])

  const activePoint = annotations.find((a) => a.id === activeAnnotation)

  return (
    <div className={className} role="region" aria-label="台大研究生圖書館建築剖面圖">
      <h3 className="text-ink-200 text-sm sm:text-base font-medium mb-1 text-center">
        研究生圖書館建築剖面
      </h3>
      <p className="text-ink-400 text-[10px] sm:text-xs font-mono text-center mb-3 sm:mb-4">
        五層白磚水泥建築 ｜ 東北角消防太平梯 ｜ 五樓護欄高僅 83cm
      </p>

      {/* View toggle */}
      <div className="flex justify-center gap-2 mb-4 sm:mb-6">
        <button
          type="button"
          className={`text-[11px] px-3 py-1.5 sm:py-1 rounded font-mono transition-colors ${
            view === 'side'
              ? 'bg-accent-blue/20 text-accent-blue border border-accent-blue/40'
              : 'bg-ink-800 text-ink-400 border border-ink-700 hover:text-ink-200'
          }`}
          onClick={() => setView('side')}
        >
          側面剖面
        </button>
        <button
          type="button"
          className={`text-[11px] px-3 py-1.5 sm:py-1 rounded font-mono transition-colors ${
            view === 'overhead'
              ? 'bg-accent-blue/20 text-accent-blue border border-accent-blue/40'
              : 'bg-ink-800 text-ink-400 border border-ink-700 hover:text-ink-200'
          }`}
          onClick={() => setView('overhead')}
        >
          俯瞰平面
        </button>
      </div>

      {view === 'side' ? (
        <SideView
          visibleAnnotations={visibleAnnotations}
          activeAnnotation={activeAnnotation}
          onAnnotationClick={setActiveAnnotation}
        />
      ) : (
        <OverheadView
          visibleAnnotations={visibleAnnotations}
          activeAnnotation={activeAnnotation}
          onAnnotationClick={setActiveAnnotation}
        />
      )}

      {/* Active annotation detail */}
      {activePoint && (
        <div className="mt-3 sm:mt-4 mx-auto max-w-xl bg-ink-900/90 border border-ink-700 rounded px-3 sm:px-4 py-2 sm:py-3 transition-all">
          <div className="text-ink-100 text-xs sm:text-sm font-medium mb-1">{activePoint.label}</div>
          <p className="text-ink-300 text-[11px] sm:text-xs leading-relaxed">{activePoint.detail}</p>
          <Citation source={activePoint.source} className="text-[10px] sm:text-xs mt-2" />
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mt-4 sm:mt-6 text-[9px] sm:text-[10px] text-ink-500 font-mono">
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-0.5 bg-ink-400" />
          建築結構
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-0.5 border-b border-dashed border-accent-red" />
          可能墜落軌跡
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-accent-red/30 border border-accent-red/60" />
          陳屍位置
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-2.5 h-2.5 rounded bg-accent-blue/20 border border-accent-blue/40" />
          標註點
        </span>
      </div>

      <div className="mt-4 text-center">
        <Citation
          source="Wecht Report, p. 4–5, 9–10；陳文成之死因，p. 8；促轉會調查報告（下冊），第92–106頁"
          className="text-xs"
        />
      </div>
    </div>
  )
}

// ----- Side cross-section view -----

interface ViewProps {
  visibleAnnotations: number
  activeAnnotation: string | null
  onAnnotationClick: (id: string | null) => void
}

function SideView({ visibleAnnotations, activeAnnotation, onAnnotationClick }: ViewProps) {
  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full max-w-2xl mx-auto"
      style={{ minHeight: '280px', maxHeight: '480px' }}
      role="img"
      aria-label="研究生圖書館側面剖面圖：五層建築與消防太平梯"
    >
      {/* Ground */}
      <rect x="0" y="350" width="400" height="50" fill="rgba(28, 24, 20, 0.8)" />
      <line x1="0" y1="350" x2="400" y2="350" stroke="rgba(74, 64, 57, 0.6)" strokeWidth="1" />

      {/* Building — 5 floors */}
      {[0, 1, 2, 3, 4].map((floor) => {
        const floorY = 350 - (floor + 1) * 56
        const floorNum = floor + 1
        return (
          <g key={floor}>
            {/* Floor slab */}
            <rect
              x="20"
              y={floorY}
              width="120"
              height="56"
              fill="rgba(51, 43, 37, 0.6)"
              stroke="rgba(74, 64, 57, 0.8)"
              strokeWidth="0.5"
            />
            {/* Floor label */}
            <text
              x="80"
              y={floorY + 30}
              textAnchor="middle"
              fill="rgba(154, 143, 125, 0.5)"
              fontSize="10"
              fontFamily="'JetBrains Mono', monospace"
            >
              {floorNum}F
            </text>
          </g>
        )
      })}

      {/* Fire escape (Z-shaped) on the right side */}
      <g stroke="rgba(154, 143, 125, 0.6)" strokeWidth="1" fill="none">
        {/* 5F platform */}
        <rect
          x="140"
          y="62"
          width="30"
          height="14"
          fill="rgba(51, 43, 37, 0.4)"
          stroke="rgba(154, 143, 125, 0.6)"
          strokeWidth="0.5"
        />
        {/* Railing on 5F */}
        <line x1="155" y1="62" x2="155" y2="48" stroke="rgba(154, 143, 125, 0.8)" strokeWidth="1.5" />
        <line x1="170" y1="62" x2="170" y2="48" stroke="rgba(154, 143, 125, 0.8)" strokeWidth="1.5" />
        <line x1="155" y1="48" x2="170" y2="48" stroke="rgba(154, 143, 125, 0.8)" strokeWidth="1.5" />

        {/* Railing height annotation */}
        <line x1="178" y1="48" x2="178" y2="62" stroke="rgba(212, 168, 85, 0.5)" strokeWidth="0.5" />
        <line x1="175" y1="48" x2="181" y2="48" stroke="rgba(212, 168, 85, 0.5)" strokeWidth="0.5" />
        <line x1="175" y1="62" x2="181" y2="62" stroke="rgba(212, 168, 85, 0.5)" strokeWidth="0.5" />
        <text
          x="184"
          y="57"
          fill="rgba(212, 168, 85, 0.7)"
          fontSize="7"
          fontFamily="'JetBrains Mono', monospace"
        >
          83cm
        </text>

        {/* Z-shaped stairs: 5F → 4F */}
        <line x1="145" y1="76" x2="165" y2="76" />
        <line x1="165" y1="76" x2="145" y2="118" />
        {/* 4F landing */}
        <line x1="140" y1="118" x2="170" y2="118" />
        {/* 4F → 2F (skip 3F) */}
        <line x1="145" y1="118" x2="165" y2="230" />
        {/* 2F landing */}
        <line x1="140" y1="230" x2="170" y2="230" />
        {/* 2F → ground */}
        <line x1="155" y1="230" x2="155" y2="350" />
      </g>

      {/* Fall trajectory (dashed) */}
      <path
        d="M 160 62 Q 200 200 200 340"
        fill="none"
        stroke="rgba(194, 59, 34, 0.4)"
        strokeWidth="1"
        strokeDasharray="4 3"
      />
      <text
        x="210"
        y="200"
        fill="rgba(194, 59, 34, 0.5)"
        fontSize="8"
        fontFamily="'JetBrains Mono', monospace"
        transform="rotate(75, 210, 200)"
      >
        可能墜落軌跡
      </text>

      {/* Height annotation on left */}
      <line x1="10" y1="62" x2="10" y2="350" stroke="rgba(154, 143, 125, 0.3)" strokeWidth="0.5" strokeDasharray="2 2" />
      <line x1="6" y1="62" x2="14" y2="62" stroke="rgba(154, 143, 125, 0.4)" strokeWidth="0.5" />
      <line x1="6" y1="350" x2="14" y2="350" stroke="rgba(154, 143, 125, 0.4)" strokeWidth="0.5" />
      <text
        x="12"
        y="210"
        fill="rgba(154, 143, 125, 0.5)"
        fontSize="8"
        fontFamily="'JetBrains Mono', monospace"
        textAnchor="middle"
        transform="rotate(-90, 12, 210)"
      >
        ≈ 13.8m
      </text>

      {/* Body location (drainage ditch) */}
      <g>
        {/* Drainage ditch cross-section */}
        <rect x="185" y="347" width="30" height="6" fill="rgba(51, 43, 37, 0.3)" stroke="rgba(74, 64, 57, 0.5)" strokeWidth="0.5" rx="1" />
        <text
          x="200"
          y="365"
          textAnchor="middle"
          fill="rgba(154, 143, 125, 0.4)"
          fontSize="6"
          fontFamily="'JetBrains Mono', monospace"
        >
          淺水溝 17cm×5cm
        </text>
        {/* Body marker */}
        <circle cx="200" cy="340" r="5" fill="rgba(194, 59, 34, 0.3)" stroke="rgba(194, 59, 34, 0.6)" strokeWidth="1" />
      </g>

      {/* Repainted annotation */}
      <g>
        <text
          x="220"
          y="42"
          fill="rgba(212, 168, 85, 0.6)"
          fontSize="7"
          fontFamily="'JetBrains Mono', monospace"
        >
          ⚠ 護欄事後重新上漆
        </text>
      </g>

      {/* Annotation points */}
      {annotations.map((point, i) => {
        const isVisible = i < visibleAnnotations
        const isActive = activeAnnotation === point.id
        if (point.id === 'height') return null // height shown separately

        return (
          <g
            key={point.id}
            className="cursor-pointer"
            onClick={() => onAnnotationClick(isActive ? null : point.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === 'Enter' && onAnnotationClick(isActive ? null : point.id)
            }
            aria-label={point.label}
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 0.5s',
            }}
          >
            {/* Invisible larger touch target */}
            <circle
              cx={point.x}
              cy={point.y}
              r={16}
              fill="transparent"
            />
            <circle
              cx={point.x}
              cy={point.y}
              r={isActive ? 7 : 5}
              fill={isActive ? 'rgba(74, 111, 165, 0.4)' : 'rgba(74, 111, 165, 0.2)'}
              stroke={isActive ? 'rgba(74, 111, 165, 0.8)' : 'rgba(74, 111, 165, 0.5)'}
              strokeWidth="1"
            />
            {isActive && (
              <circle
                cx={point.x}
                cy={point.y}
                r={10}
                fill="none"
                stroke="rgba(74, 111, 165, 0.3)"
                strokeWidth="0.5"
              />
            )}
          </g>
        )
      })}
    </svg>
  )
}

// ----- Overhead plan view -----

function OverheadView({ visibleAnnotations, activeAnnotation, onAnnotationClick }: ViewProps) {
  const overheadAnnotations = [
    { id: 'building', x: 160, y: 160, label: '圖書館建築' },
    { id: 'fire-escape', x: 250, y: 100, label: '太平梯' },
    { id: 'body', x: 270, y: 160, label: '陳屍位置' },
  ]

  return (
    <svg
      viewBox="0 0 400 340"
      className="w-full max-w-2xl mx-auto"
      style={{ minHeight: '240px', maxHeight: '400px' }}
      role="img"
      aria-label="研究生圖書館俯瞰平面圖"
    >
      {/* Building footprint */}
      <rect
        x="80"
        y="80"
        width="160"
        height="160"
        fill="rgba(51, 43, 37, 0.5)"
        stroke="rgba(74, 64, 57, 0.8)"
        strokeWidth="1"
      />
      <text
        x="160"
        y="165"
        textAnchor="middle"
        fill="rgba(154, 143, 125, 0.4)"
        fontSize="11"
        fontFamily="'Noto Serif TC', serif"
      >
        研究生圖書館
      </text>
      <text
        x="160"
        y="180"
        textAnchor="middle"
        fill="rgba(154, 143, 125, 0.3)"
        fontSize="8"
        fontFamily="'JetBrains Mono', monospace"
      >
        五層白磚水泥建築
      </text>

      {/* North arrow */}
      <g transform="translate(350, 40)">
        <line x1="0" y1="20" x2="0" y2="-5" stroke="rgba(154, 143, 125, 0.5)" strokeWidth="1" />
        <polygon points="0,-8 -4,0 4,0" fill="rgba(154, 143, 125, 0.5)" />
        <text
          x="0"
          y="-12"
          textAnchor="middle"
          fill="rgba(154, 143, 125, 0.4)"
          fontSize="8"
          fontFamily="'JetBrains Mono', monospace"
        >
          N
        </text>
      </g>

      {/* Fire escape (NE corner) */}
      <rect
        x="240"
        y="75"
        width="18"
        height="50"
        fill="rgba(51, 43, 37, 0.3)"
        stroke="rgba(154, 143, 125, 0.5)"
        strokeWidth="0.5"
        strokeDasharray="2 2"
      />
      <text
        x="249"
        y="105"
        textAnchor="middle"
        fill="rgba(154, 143, 125, 0.4)"
        fontSize="7"
        fontFamily="'JetBrains Mono', monospace"
        transform="rotate(-90, 249, 105)"
      >
        太平梯
      </text>

      {/* Drainage ditch along building */}
      <line
        x1="245"
        y1="80"
        x2="245"
        y2="240"
        stroke="rgba(74, 64, 57, 0.5)"
        strokeWidth="3"
        strokeDasharray="6 2"
      />
      <text
        x="252"
        y="220"
        fill="rgba(154, 143, 125, 0.3)"
        fontSize="6"
        fontFamily="'JetBrains Mono', monospace"
      >
        淺水溝
      </text>

      {/* Body location */}
      <circle cx="248" cy="155" r="6" fill="rgba(194, 59, 34, 0.3)" stroke="rgba(194, 59, 34, 0.6)" strokeWidth="1" />
      <text
        x="262"
        y="158"
        fill="rgba(194, 59, 34, 0.6)"
        fontSize="7"
        fontFamily="'JetBrains Mono', monospace"
      >
        陳屍位置
      </text>

      {/* Distance annotation */}
      <line x1="240" y1="158" x2="248" y2="158" stroke="rgba(212, 168, 85, 0.4)" strokeWidth="0.5" strokeDasharray="2 1" />

      {/* Campus gate */}
      <rect x="40" y="290" width="30" height="10" fill="none" stroke="rgba(154, 143, 125, 0.4)" strokeWidth="0.5" />
      <text
        x="55"
        y="315"
        textAnchor="middle"
        fill="rgba(154, 143, 125, 0.3)"
        fontSize="7"
        fontFamily="'JetBrains Mono', monospace"
      >
        校門
      </text>

      {/* Campus boundary */}
      <rect
        x="20"
        y="20"
        width="360"
        height="300"
        fill="none"
        stroke="rgba(74, 64, 57, 0.3)"
        strokeWidth="0.5"
        strokeDasharray="4 4"
        rx="2"
      />

      {/* Annotation points */}
      {overheadAnnotations.map((point, i) => {
        const isVisible = i < visibleAnnotations
        const isActive = activeAnnotation === point.id

        return (
          <g
            key={point.id}
            className="cursor-pointer"
            onClick={() => onAnnotationClick(isActive ? null : point.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === 'Enter' && onAnnotationClick(isActive ? null : point.id)
            }
            aria-label={point.label}
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 0.5s',
            }}
          >
            {/* Invisible larger touch target */}
            <circle
              cx={point.x}
              cy={point.y}
              r={16}
              fill="transparent"
            />
            <circle
              cx={point.x}
              cy={point.y}
              r={isActive ? 7 : 5}
              fill={isActive ? 'rgba(74, 111, 165, 0.4)' : 'rgba(74, 111, 165, 0.2)'}
              stroke={isActive ? 'rgba(74, 111, 165, 0.8)' : 'rgba(74, 111, 165, 0.5)'}
              strokeWidth="1"
            />
          </g>
        )
      })}
    </svg>
  )
}
