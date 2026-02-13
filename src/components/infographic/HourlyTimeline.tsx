import { useMemo } from 'react'
import { Citation } from '@/components/narrative/Citation'
import { TimelineEventCard, type TimelineEventData } from './TimelineEvent'

interface HourlyEvent extends TimelineEventData {
  /** Display time label, e.g. "08:30" or "~21:30" */
  timeLabel: string
  /** Whether this event marks the start of the "blank hours" gap */
  blankHoursStart?: boolean
}

/** Phase 1 events: July 1 (shown in Chapter 3) */
const phase1Events: HourlyEvent[] = [
  {
    id: 'E015',
    date: '1981-07-01',
    time: null,
    timeLabel: '7/1 日間',
    title: '追問出境證未果',
    description:
      '陳文成與弟弟陳文華先至出入境管理局，再到警總會客室追問出境證。對方以代號互相推諉。航空公司曾通知有機位，但因出境證問題無法出境。',
    sources: ['Wecht Report, p. 3', '黃怡、林世煜調查報告，第9–10頁'],
    significance: 'turning-point',
  },
  {
    id: 'E016',
    date: '1981-07-01',
    time: 'evening',
    timeLabel: '7/1 晚間',
    title: '白健二稱與陳文成夫婦共進晚餐',
    description:
      '白健二於1994年公聽會回述：7月1日晚與陳文成夫婦吃晚飯，陳文成提及前一天與警總談話氣氛很好。',
    sources: ['黃怡、林世煜調查報告，第10頁'],
    significance: 'background',
    disputed: true,
    note: '此證詞為1994年公聽會回述，非1981年第一手紀錄',
  },
]

/** Phase 2 events: July 2–3 (shown in Chapter 4) */
const phase2Events: HourlyEvent[] = [
  {
    id: 'E017',
    date: '1981-07-02',
    time: '05:00',
    timeLabel: '05:00',
    title: '清晨起床打籃球',
    description: '清晨5點起床，至台大操場打籃球。',
    sources: ['黃怡、林世煜調查報告，第10頁'],
    significance: 'background',
  },
  {
    id: 'E018',
    date: '1981-07-02',
    time: '07:45',
    timeLabel: '07:45',
    title: '返家詢問出境證通知',
    description: '跑回家詢問陳素貞是否接到出入境管理局電話，回覆未接到。',
    sources: ['黃怡、林世煜調查報告，第10頁'],
    significance: 'background',
  },
  {
    id: 'E019',
    date: '1981-07-02',
    time: '08:30',
    timeLabel: '08:30',
    title: '警總無預警帶走陳文成',
    description:
      '甯漢彤等三名男子出示台灣警備司令部約談傳票，無預警帶走陳文成前往保安處。家屬欲保留傳票未果。',
    sources: [
      'Wecht Report, p. 3',
      '促轉會調查報告，第57–58頁',
      '黃怡、林世煜調查報告，第10頁',
    ],
    significance: 'critical',
  },
  {
    id: 'E020',
    date: '1981-07-02',
    time: '09:00',
    timeLabel: '09:00–21:30',
    title: '保安處約談（約十二小時）',
    description:
      '於警總保安處進行正式約談。約談有錄音但並非全程。約談人員施壓要求承認台獨活動、交代在美活動與人際關係，以出境許可作為交換條件。',
    sources: [
      'Wecht Report, p. 3, 7–8',
      '促轉會調查報告，第58–62頁',
      '促轉會調查報告（下冊），第64–68頁',
    ],
    significance: 'critical',
  },
  {
    id: 'E022',
    date: '1981-07-02',
    time: '21:00-21:30',
    timeLabel: '~21:30',
    title: '警總宣稱約談結束、送返（爭議）',
    description:
      '警總宣稱約談結束後派車送返。但五名目擊證人證詞在時間點、目擊對象身高、交通工具等方面彼此矛盾。促轉會結論：無法證明陳文成被送返住處。',
    sources: [
      'Wecht Report, p. 3, 8',
      '促轉會調查報告（下冊），第69–77頁',
    ],
    significance: 'critical',
    disputed: true,
  },
  {
    id: 'E023',
    date: '1981-07-02',
    time: '22:35',
    timeLabel: '22:35',
    title: '目擊者見不明男子進出公寓',
    description:
      '同棟住戶約22:35左右目擊一高一矮二名男子從車上下來上樓。這些目擊者的證詞在多個維度上互相矛盾。',
    sources: ['促轉會調查報告（下冊），第69–77頁'],
    significance: 'critical',
    disputed: true,
  },
  {
    id: 'E024',
    date: '1981-07-02',
    time: '~23:00-24:00',
    timeLabel: '~23:00',
    title: '陳文成到鄧維祥家（促轉會認定難以採信）',
    description:
      '鄧維祥自稱接到陳文成來電後外出碰面。陳文成離開前說「這可能是我們最後一次見面了」。但促轉會認定鄧維祥歷次證詞前後歧異甚大，此說詞難以採信。',
    sources: [
      'Wecht Report, p. 8–9',
      '促轉會調查報告（下冊），第78–87頁',
    ],
    significance: 'critical',
    disputed: true,
    blankHoursStart: true,
  },
  {
    id: 'BLANK',
    date: '1981-07-03',
    time: '01:00-07:00',
    timeLabel: '01:00–07:00',
    title: '空白的六小時',
    description:
      '自凌晨至清晨，約六小時行蹤完全空白。若鄧維祥說詞不可信，則自被警總帶走後，陳文成的行蹤完全無法確認——現有證據無法證明他曾脫離警總的實力支配。',
    sources: ['促轉會調查報告（下冊），第78–87頁'],
    significance: 'critical',
    note: '無可信證據能證明此時段陳文成的行蹤',
  },
  {
    id: 'E026',
    date: '1981-07-03',
    time: '~07:00-07:30',
    timeLabel: '~07:00',
    title: '陳文成遺體被發現',
    description:
      '校警接到不明男子電話報稱圖書館後方有人倒臥。約20分鐘後在消防梯下發現陳文成遺體，仰臥橫跨在水溝上。衣著異常：襯衫露於長褲外、皮帶繫在襯衫外。',
    sources: [
      'Wecht Report, p. 10',
      '促轉會調查報告，第3頁',
    ],
    significance: 'critical',
  },
]

interface HourlyTimelineProps {
  /** Phase 1 = Ch3 (July 1), Phase 2 = Ch4 (July 2–3) */
  phase: 1 | 2
  progress: number
  isInView: boolean
  className?: string
}

export function HourlyTimeline({
  phase,
  progress,
  isInView,
  className = '',
}: HourlyTimelineProps) {
  const evts = phase === 1 ? phase1Events : phase2Events

  const visibleCount = useMemo(() => {
    if (!isInView) return 0
    return Math.ceil(progress * evts.length * 1.8)
  }, [progress, isInView, evts.length])

  const dateLabel = phase === 1 ? '7月1日' : '7月2日 — 7月3日'
  const phaseDescription =
    phase === 1
      ? '出境受阻——陷阱收攏'
      : '被帶走、審訊、消失——核心48小時'

  return (
    <div
      className={`${className}`}
      role="region"
      aria-label={`${dateLabel} 逐時時間線`}
    >
      <h3 className="text-ink-200 text-base font-medium mb-1 text-center">
        {dateLabel}
      </h3>
      <p className="text-ink-400 text-xs font-mono text-center mb-8">
        {phaseDescription}
      </p>

      {/* Timeline */}
      <div className="relative max-w-3xl mx-auto">
        {/* Center line (desktop) / Left line (mobile) */}
        <div
          className="absolute top-0 bottom-0 w-px bg-ink-700
            left-4 sm:left-1/2 sm:-translate-x-1/2"
        />

        {evts.map((event, i) => {
          const isVisible = i < visibleCount
          const isRight = i % 2 === 0
          const isBlank = event.id === 'BLANK'
          const isCritical = event.significance === 'critical'

          return (
            <div
              key={event.id}
              className={`relative transition-all duration-700
                ${isVisible ? 'opacity-100' : 'opacity-0'}
              `}
              style={{
                transitionDelay: `${i * 80}ms`,
                transform: `translateY(${isVisible ? 0 : 16}px)`,
              }}
            >
              {/* Blank hours visual separator */}
              {isBlank && (
                <div className="py-4">
                  <div
                    className="absolute top-0 bottom-0 w-px border-l border-dashed border-ink-600
                      left-4 sm:left-1/2 sm:-translate-x-1/2"
                  />
                  <div
                    className="ml-10 sm:ml-0 sm:mx-auto sm:max-w-xs
                      bg-ink-900/90 border border-ink-700 border-dashed rounded
                      px-4 py-6 text-center"
                  >
                    <div className="text-ink-500 text-xs font-mono mb-2">
                      {event.timeLabel}
                    </div>
                    <h4 className="text-ink-300 text-sm font-medium mb-2">
                      {event.title}
                    </h4>
                    <p className="text-ink-500 text-xs leading-relaxed">
                      {event.description}
                    </p>
                    {event.note && (
                      <p className="text-ink-600 text-[10px] mt-2 italic font-mono">
                        {event.note}
                      </p>
                    )}
                    <div className="mt-2">
                      {event.sources.map((src, si) => (
                        <Citation key={si} source={src} className="text-[10px]" />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Regular event */}
              {!isBlank && (
                <div className="flex items-start gap-0 pb-6 sm:pb-8">
                  {/* Mobile: always left-aligned after the line */}
                  {/* Desktop: alternating left/right */}

                  {/* Left card (desktop only, odd items) */}
                  <div
                    className={`hidden sm:block w-[calc(50%-20px)]
                      ${isRight ? 'invisible' : 'text-right pr-4'}
                    `}
                  >
                    {!isRight && (
                      <div className="inline-block text-left max-w-sm">
                        <TimelineEventCard event={event} compact />
                      </div>
                    )}
                  </div>

                  {/* Node */}
                  <div className="relative shrink-0 z-10">
                    {/* Desktop node */}
                    <div
                      className={`hidden sm:flex items-center justify-center w-10 h-10
                        rounded-full transition-colors
                        ${isCritical
                          ? 'bg-accent-red/15 border-2 border-accent-red/50'
                          : event.disputed
                            ? 'bg-accent-gold/10 border border-accent-gold/30'
                            : 'bg-ink-800 border border-ink-600'
                        }
                      `}
                    >
                      <span
                        className={`text-[10px] font-mono
                          ${isCritical ? 'text-accent-red' : 'text-ink-400'}
                        `}
                      >
                        {event.timeLabel.replace(/^7\/[0-9] /, '')}
                      </span>
                    </div>

                    {/* Mobile node */}
                    <div
                      className={`sm:hidden flex items-center justify-center w-8 h-8
                        rounded-full
                        ${isCritical
                          ? 'bg-accent-red/15 border-2 border-accent-red/50'
                          : event.disputed
                            ? 'bg-accent-gold/10 border border-accent-gold/30'
                            : 'bg-ink-800 border border-ink-600'
                        }
                      `}
                    >
                      <span
                        className={`text-[9px] font-mono
                          ${isCritical ? 'text-accent-red' : 'text-ink-400'}
                        `}
                      >
                        {event.timeLabel.split('–')[0].replace(/^7\/[0-9] /, '')}
                      </span>
                    </div>
                  </div>

                  {/* Right card (desktop: even items, mobile: all items) */}
                  <div
                    className={`flex-1 min-w-0 pl-3
                      sm:w-[calc(50%-20px)]
                      ${isRight ? 'sm:pl-4' : 'sm:invisible sm:hidden'}
                    `}
                  >
                    <TimelineEventCard event={event} compact />
                  </div>

                  {/* Mobile-hidden left card re-shown on desktop for odd items */}
                  {!isRight && (
                    <div className="hidden" aria-hidden="true" />
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center mt-6 text-[10px] text-ink-500 font-mono">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full bg-accent-red/15 border-2 border-accent-red/50" />
          關鍵事件
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full bg-accent-gold/10 border border-accent-gold/30" />
          證詞存疑
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full bg-ink-800 border border-ink-600" />
          背景事件
        </span>
        {phase === 2 && (
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-6 h-px border-t border-dashed border-ink-600" />
            空白時段
          </span>
        )}
      </div>

      {/* Source attribution */}
      <div className="mt-4 text-center">
        <Citation
          source={
            phase === 1
              ? '黃怡、林世煜調查報告，第9–10頁'
              : '促轉會調查報告（下冊），第64–87頁；Wecht Report, p. 3, 7–9'
          }
          className="text-xs"
        />
      </div>
    </div>
  )
}
