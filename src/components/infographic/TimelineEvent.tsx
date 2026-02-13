import { useState } from 'react'
import { Citation } from '@/components/narrative/Citation'

export interface TimelineEventData {
  id: string
  date: string
  time?: string | null
  title: string
  description: string
  sources: string[]
  significance: 'background' | 'turning-point' | 'critical' | 'aftermath'
  type?: 'phone' | 'mail' | 'event'
  disputed?: boolean
  note?: string
}

const significanceBorder: Record<TimelineEventData['significance'], string> = {
  background: 'border-ink-700',
  'turning-point': 'border-accent-gold',
  critical: 'border-accent-red',
  aftermath: 'border-ink-500',
}

const significanceLabel: Record<TimelineEventData['significance'], string> = {
  background: '背景',
  'turning-point': '轉折',
  critical: '關鍵',
  aftermath: '後續',
}

interface TimelineEventCardProps {
  event: TimelineEventData
  className?: string
  /** Show only title by default; expand on click */
  compact?: boolean
  /** Force expanded state */
  expanded?: boolean
}

export function TimelineEventCard({
  event,
  className = '',
  compact = false,
  expanded: forceExpanded,
}: TimelineEventCardProps) {
  const [localExpanded, setLocalExpanded] = useState(false)
  const expanded = forceExpanded ?? localExpanded

  return (
    <div
      className={`bg-ink-900/80 border-l-2 ${significanceBorder[event.significance]}
        rounded-r px-3 py-2 transition-all hover:bg-ink-800/80
        ${compact ? 'cursor-pointer' : ''} ${className}`}
      onClick={compact ? () => setLocalExpanded(!localExpanded) : undefined}
      onKeyDown={compact ? (e) => e.key === 'Enter' && setLocalExpanded(!localExpanded) : undefined}
      role={compact ? 'button' : undefined}
      tabIndex={compact ? 0 : undefined}
      aria-expanded={compact ? expanded : undefined}
    >
      <div className="flex items-start gap-2">
        {event.significance !== 'background' && (
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded font-mono shrink-0
              ${event.significance === 'critical' ? 'bg-accent-red/20 text-accent-red' : ''}
              ${event.significance === 'turning-point' ? 'bg-accent-gold/20 text-accent-gold' : ''}
              ${event.significance === 'aftermath' ? 'bg-ink-700/50 text-ink-400' : ''}
            `}
          >
            {significanceLabel[event.significance]}
          </span>
        )}
        <h4 className="text-ink-100 text-sm font-medium leading-tight">{event.title}</h4>
      </div>

      {event.disputed && (
        <span className="text-[10px] text-accent-red/80 font-mono mt-1 block">
          * 證詞存疑
        </span>
      )}

      {(!compact || expanded) && (
        <p className="text-ink-300 text-xs mt-1.5 leading-relaxed">{event.description}</p>
      )}

      {expanded && event.sources.length > 0 && (
        <div className="mt-2 space-y-0.5">
          {event.sources.map((src, i) => (
            <Citation key={i} source={src} className="text-xs" />
          ))}
        </div>
      )}

      {expanded && event.note && (
        <p className="text-ink-400 text-xs mt-2 italic">{event.note}</p>
      )}
    </div>
  )
}
