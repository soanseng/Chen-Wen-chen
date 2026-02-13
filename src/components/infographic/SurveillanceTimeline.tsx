import { useState, useMemo } from 'react'
import { Citation } from '@/components/narrative/Citation'
import { TimelineEventCard, type TimelineEventData } from './TimelineEvent'

/** Surveillance events from timeline.json, chapter 2 */
const events: (TimelineEventData & { dateValue: number })[] = [
  {
    id: 'E004',
    date: '1979-09-30',
    dateValue: new Date('1979-09-30').getTime(),
    title: '致電施明德',
    description:
      '陳文成從美國致電《美麗島雜誌》總經理施明德。此為最早被發現的監聽紀錄，直到促轉會調查時才從國安局解密檔案中發現。',
    sources: ['促轉會調查報告，第36頁，圖12'],
    significance: 'turning-point',
    type: 'phone',
  },
  {
    id: 'E005',
    date: '1979-12-10',
    dateValue: new Date('1979-12-10').getTime(),
    title: '美麗島事件爆發',
    description:
      '高雄爆發大規模民主運動示威，國民黨政府隨後大規模逮捕黨外人士。海外台灣人社群的政治參與成為情治機關重點監控對象。',
    sources: ['促轉會調查報告，第33頁'],
    significance: 'turning-point',
    type: 'event',
  },
  {
    id: 'E006',
    date: '1980-01-27',
    dateValue: new Date('1980-01-27').getTime(),
    title: '陳錦華致電陳文成',
    description: '陳錦華自臺北致電陳文成，討論匯款事宜。',
    sources: ['促轉會調查報告，第37頁'],
    significance: 'background',
    type: 'phone',
  },
  {
    id: 'E007',
    date: '1980-02-28',
    dateValue: new Date('1980-02-28').getTime(),
    title: '林宅血案',
    description:
      '省議員林義雄之母與雙生女兒遭殺害，長女重傷，至今未破案。此事件加深海外台灣人對島內政治恐怖的恐懼。',
    sources: ['黃怡、林世煜調查報告，第8頁'],
    significance: 'turning-point',
    type: 'event',
  },
  {
    id: 'E008',
    date: '1980-07-24',
    dateValue: new Date('1980-07-24').getTime(),
    title: '攔截陳素貞家書',
    description:
      '警總特檢處攔截陳素貞寄父親的家書，內含家庭生活描述。顯示情治機關連私人信件也在監控範圍內。',
    sources: ['促轉會調查報告，第38頁，圖14'],
    significance: 'background',
    type: 'mail',
  },
  {
    id: 'E009',
    date: '1981-02-15',
    dateValue: new Date('1981-02-15').getTime(),
    title: '陳錦華致電陳素貞',
    description:
      '陳錦華致電陳素貞，提到「用長途電話不方便」，通話者似乎已隱約意識到監聽的存在。',
    sources: ['促轉會調查報告，第39頁'],
    significance: 'background',
    type: 'phone',
  },
  {
    id: 'E010',
    date: '1981-05-15',
    dateValue: new Date('1981-05-15').getTime(),
    title: '返台前最後監聽紀錄',
    description: '陳錦華家某人致電陳文成，為返台前最後一筆監聽紀錄。',
    sources: ['促轉會調查報告，第40頁'],
    significance: 'background',
    type: 'phone',
  },
]

const TIME_START = new Date('1979-09-01').getTime()
const TIME_END = new Date('1981-06-01').getTime()
const TIME_RANGE = TIME_END - TIME_START

function dateToPercent(dateValue: number): number {
  return ((dateValue - TIME_START) / TIME_RANGE) * 100
}

function formatDate(dateStr: string): string {
  const [y, m] = dateStr.split('-')
  return `${y}.${m}`
}

/** Node icon by event type */
function NodeIcon({ type }: { type: TimelineEventData['type'] }) {
  if (type === 'mail') {
    return (
      <svg
        viewBox="0 0 16 16"
        className="w-3.5 h-3.5"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M1 4a1 1 0 011-1h12a1 1 0 011 1v.5L8 8.5 1 4.5V4zm0 2.5l7 4 7-4V12a1 1 0 01-1 1H2a1 1 0 01-1-1V6.5z" />
      </svg>
    )
  }
  if (type === 'event') {
    return (
      <svg
        viewBox="0 0 16 16"
        className="w-3.5 h-3.5"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M8 1l2.5 5 5.5.8-4 3.9.9 5.3L8 13.5 3.1 16l.9-5.3-4-3.9L5.5 6z" />
      </svg>
    )
  }
  // phone (default)
  return (
    <svg
      viewBox="0 0 16 16"
      className="w-3 h-3"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M3.7 1.4a1 1 0 011.2-.2l2.3 1.3a1 1 0 01.4 1.3L6.5 6.3a8.5 8.5 0 003.2 3.2l2.5-1.1a1 1 0 011.3.4l1.3 2.3a1 1 0 01-.2 1.2l-1.8 1.5a2 2 0 01-2.2.3A14 14 0 012.2 5.7a2 2 0 01.3-2.2L3.7 1.4z" />
    </svg>
  )
}

interface SurveillanceTimelineProps {
  progress: number
  isInView: boolean
  className?: string
}

export function SurveillanceTimeline({
  progress,
  isInView,
  className = '',
}: SurveillanceTimelineProps) {
  const [activeEvent, setActiveEvent] = useState<string | null>(null)

  /** Number of nodes visible, animated by progress */
  const visibleCount = useMemo(() => {
    if (!isInView) return 0
    return Math.ceil(progress * events.length * 1.5)
  }, [progress, isInView])

  const activeEventData = events.find((e) => e.id === activeEvent)

  return (
    <div
      className={`${className}`}
      role="region"
      aria-label="1979–1981 彩虹資料監控時間線"
    >
      <h3 className="text-ink-200 text-base font-medium mb-1 text-center">
        跨太平洋的監控網
      </h3>
      <p className="text-ink-400 text-xs font-mono text-center mb-6">
        1979.09 — 1981.05 ｜ 彩虹資料：五筆監聽紀錄與郵件攔截
      </p>

      {/* Desktop: Horizontal timeline */}
      <div className="hidden sm:block">
        <div className="relative h-48">
          {/* Timeline axis */}
          <div className="absolute top-12 left-0 right-0 h-px bg-accent-blue/30" />

          {/* Year markers */}
          {['1979', '1980', '1981'].map((year) => {
            const pct = dateToPercent(new Date(`${year}-01-01`).getTime())
            const clampedPct = Math.max(2, Math.min(98, pct))
            return (
              <div
                key={year}
                className="absolute top-6 -translate-x-1/2 text-ink-500 text-[10px] font-mono"
                style={{ left: `${clampedPct}%` }}
              >
                {year}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-px h-3 bg-ink-700" />
              </div>
            )
          })}

          {/* Event nodes */}
          {events.map((event, i) => {
            const pct = dateToPercent(event.dateValue)
            const isVisible = i < visibleCount
            const isActive = activeEvent === event.id
            const isEventType = event.type === 'event'

            return (
              <div
                key={event.id}
                className="absolute top-10 -translate-x-1/2 transition-all duration-500"
                style={{
                  left: `${Math.max(3, Math.min(97, pct))}%`,
                  opacity: isVisible ? 1 : 0,
                  transform: `translateX(-50%) translateY(${isVisible ? 0 : 8}px)`,
                }}
              >
                {/* Node */}
                <button
                  type="button"
                  className={`relative flex items-center justify-center rounded-full
                    transition-all duration-200 z-10
                    ${isEventType ? 'w-7 h-7' : 'w-6 h-6'}
                    ${isActive ? 'ring-2 ring-accent-blue/50 scale-125' : ''}
                    ${event.significance === 'turning-point'
                      ? 'bg-accent-gold/20 text-accent-gold border border-accent-gold/40'
                      : event.type === 'mail'
                        ? 'bg-accent-red/15 text-accent-red/80 border border-accent-red/30'
                        : 'bg-accent-blue/20 text-accent-blue border border-accent-blue/40'
                    }
                  `}
                  onClick={() => setActiveEvent(isActive ? null : event.id)}
                  aria-label={`${formatDate(event.date)} ${event.title}`}
                >
                  <NodeIcon type={event.type} />
                </button>

                {/* Date label */}
                <div className="mt-1 text-[9px] font-mono text-ink-500 text-center whitespace-nowrap">
                  {formatDate(event.date)}
                </div>

                {/* Abbreviated title */}
                <div className="mt-0.5 text-[10px] text-ink-400 text-center whitespace-nowrap max-w-[80px] truncate">
                  {event.title}
                </div>
              </div>
            )
          })}
        </div>

        {/* Expanded event card (desktop) */}
        {activeEventData && (
          <div className="mt-4 max-w-md mx-auto animate-in fade-in">
            <TimelineEventCard event={activeEventData} />
          </div>
        )}
      </div>

      {/* Mobile: Vertical timeline */}
      <div className="sm:hidden space-y-3">
        {events.map((event, i) => {
          const isVisible = i < visibleCount

          return (
            <div
              key={event.id}
              className="flex gap-3 transition-all duration-500"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: `translateY(${isVisible ? 0 : 12}px)`,
              }}
            >
              {/* Node + line */}
              <div className="flex flex-col items-center shrink-0">
                <div
                  className={`flex items-center justify-center rounded-full w-6 h-6
                    ${event.significance === 'turning-point'
                      ? 'bg-accent-gold/20 text-accent-gold border border-accent-gold/40'
                      : event.type === 'mail'
                        ? 'bg-accent-red/15 text-accent-red/80 border border-accent-red/30'
                        : 'bg-accent-blue/20 text-accent-blue border border-accent-blue/40'
                    }
                  `}
                >
                  <NodeIcon type={event.type} />
                </div>
                {i < events.length - 1 && (
                  <div className="w-px flex-1 bg-accent-blue/20 min-h-[16px]" />
                )}
              </div>

              {/* Content */}
              <div className="pb-3 flex-1 min-w-0">
                <div className="text-[10px] font-mono text-ink-500 mb-0.5">
                  {formatDate(event.date)}
                </div>
                <TimelineEventCard event={event} compact />
              </div>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center mt-6 text-[10px] text-ink-500 font-mono">
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-full bg-accent-blue/20 border border-accent-blue/40" />
          電話監聽
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-full bg-accent-red/15 border border-accent-red/30" />
          郵件攔截
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-full bg-accent-gold/20 border border-accent-gold/40" />
          時代事件
        </span>
      </div>

      {/* Source attribution */}
      <div className="mt-4 text-center">
        <Citation source="促轉會調查報告，第33–43頁" className="text-xs" />
      </div>
    </div>
  )
}
