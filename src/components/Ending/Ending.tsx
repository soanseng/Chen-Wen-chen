import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../../context/GameContext.tsx'
import { NOTEBOOK_FIELDS } from '../../data/index.ts'
import type { NotebookFieldDef, NotebookFieldId } from '../../types/index.ts'

// ===== Constants =====

const SUMMARY_DISPLAY_MS = 6000
const PHASE_TRANSITION_MS = 1500
const LINE_REVEAL_MS = 1200

const CLOSING_LINES: readonly string[] = [
  '你確認了以下事實：',
  '- 陳文成在被警總帶走後，再也沒有回家。',
  '- 陳屍處並非第一現場。',
  '- 他殺之可能性顯高於自殺或意外。',
  '- 政府自己的實驗早已排除自殺，但選擇隱瞞。',
  '- 四十年間，錄音帶消失了、檔案「不存在」了、證人移居海外了。',
  '',
  '但以下問題仍然無解：',
  '- 那天晚上究竟發生了什麼？',
  '- 是誰？為什麼？',
  '- 完整的錄音帶裡記錄了什麼？',
  '',
  '推理簿上有幾格永遠填不滿。',
  '不是因為你不夠努力，而是因為有人花了四十年確保它們被填不滿。',
  '',
  '然而，每一份被閱讀的檔案，都是對遺忘的抵抗。',
]

// ===== Field definition lookup =====

function buildFieldDefMap(
  fields: NotebookFieldDef[],
): Record<NotebookFieldId, NotebookFieldDef> {
  const map = {} as Record<NotebookFieldId, NotebookFieldDef>
  for (const f of fields) {
    map[f.id] = f
  }
  return map
}

const FIELD_DEF_MAP = buildFieldDefMap(NOTEBOOK_FIELDS)

// ===== Sub-components =====

interface NotebookSummaryProps {
  triggeredContradictions: number
  totalContradictions: number
  fieldOrder: NotebookFieldId[]
  fieldStates: Partial<Record<NotebookFieldId, { unlocked: boolean; value: string | null }>>
}

function NotebookSummary({
  triggeredContradictions,
  totalContradictions,
  fieldOrder,
  fieldStates,
}: NotebookSummaryProps) {
  return (
    <div className="max-w-lg w-full mx-auto space-y-8">
      <div>
        <p className="text-paper-400 text-xs tracking-widest mb-2">
          矛盾連結
        </p>
        <p className="text-paper-200 text-lg font-serif">
          {triggeredContradictions} / {totalContradictions}
        </p>
      </div>

      <div>
        <p className="text-paper-400 text-xs tracking-widest mb-4">
          推理簿
        </p>
        <div className="space-y-3">
          {fieldOrder.map((fieldId) => {
            const def = FIELD_DEF_MAP[fieldId]
            const fieldState = fieldStates[fieldId]
            return (
              <NotebookFieldRow
                key={fieldId}
                def={def}
                unlocked={fieldState?.unlocked ?? false}
                value={fieldState?.value ?? null}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

interface NotebookFieldRowProps {
  def: NotebookFieldDef
  unlocked: boolean
  value: string | null
}

function NotebookFieldRow({ def, unlocked, value }: NotebookFieldRowProps) {
  const isFilled = getFieldIsFilled(def, unlocked, value)
  const displayValue = getFieldDisplayValue(def, unlocked, value)

  return (
    <div className="py-2 border-b border-paper-200/10">
      <div className="flex items-start justify-between gap-4">
        <p className="text-paper-300 text-sm">{def.label}</p>
        {isFilled ? (
          <p className="text-paper-200 text-sm text-right shrink-0">
            {displayValue}
          </p>
        ) : (
          <p className="text-paper-500/60 text-sm text-right shrink-0">
            ------
          </p>
        )}
      </div>
      {def.type === 'locked' && def.lockedReason && (
        <p className="text-paper-500/50 text-xs mt-1 italic">
          {def.lockedReason}
        </p>
      )}
    </div>
  )
}

function getFieldIsFilled(
  def: NotebookFieldDef,
  unlocked: boolean,
  value: string | null,
): boolean {
  if (!unlocked) return false
  if (def.type === 'locked') return false
  if (def.type === 'auto') return true
  return value !== null
}

function getFieldDisplayValue(
  def: NotebookFieldDef,
  unlocked: boolean,
  value: string | null,
): string | null {
  if (!unlocked) return null
  if (def.type === 'auto') return def.autoValue ?? null
  if (def.type === 'choice' && value !== null && def.options) {
    const option = def.options.find((o) => o.value === value)
    return option?.label ?? value
  }
  return null
}

// ===== Line-by-line text reveal hook =====

function useLineReveal(
  lines: readonly string[],
  active: boolean,
): { visibleCount: number; finished: boolean } {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    if (!active) return
    if (visibleCount >= lines.length) return

    const timer = setTimeout(() => {
      setVisibleCount((prev) => prev + 1)
    }, LINE_REVEAL_MS)

    return () => clearTimeout(timer)
  }, [active, visibleCount, lines.length])

  return {
    visibleCount,
    finished: visibleCount >= lines.length,
  }
}

// ===== Phase state machine =====

/**
 * Phase progression: summary -> summaryFading -> closing -> final
 *
 * - summary: Notebook stats are displayed
 * - summaryFading: Summary fades out over 1s (CSS transition)
 * - closing: Closing text reveals line by line
 * - final: Return button appears
 */
type EndingPhase = 'summary' | 'summaryFading' | 'closing' | 'final'

// ===== Main component =====

export default function Ending() {
  const navigate = useNavigate()
  const { state } = useGame()
  const [phase, setPhase] = useState<EndingPhase>('summary')

  const closingActive = phase === 'closing' || phase === 'final'
  const { visibleCount, finished: closingFinished } = useLineReveal(
    CLOSING_LINES,
    closingActive,
  )

  // summary -> summaryFading
  useEffect(() => {
    if (phase !== 'summary') return

    const timer = setTimeout(() => {
      setPhase('summaryFading')
    }, SUMMARY_DISPLAY_MS)

    return () => clearTimeout(timer)
  }, [phase])

  // summaryFading -> closing (after fade-out animation completes)
  useEffect(() => {
    if (phase !== 'summaryFading') return

    const timer = setTimeout(() => {
      setPhase('closing')
    }, PHASE_TRANSITION_MS)

    return () => clearTimeout(timer)
  }, [phase])

  // closing -> final (after all lines revealed)
  useEffect(() => {
    if (phase !== 'closing') return
    if (!closingFinished) return

    const timer = setTimeout(() => {
      setPhase('final')
    }, PHASE_TRANSITION_MS)

    return () => clearTimeout(timer)
  }, [phase, closingFinished])

  function handleReturn(): void {
    navigate('/browse')
  }

  const showSummary = phase === 'summary' || phase === 'summaryFading'
  const summaryFading = phase === 'summaryFading'

  return (
    <div className="min-h-screen bg-ink-900 text-paper-200 font-serif flex flex-col items-center justify-center px-6 py-12">
      {/* Phase 1: Notebook Summary */}
      {showSummary && (
        <div
          className={`transition-opacity duration-1000 ${
            summaryFading ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <NotebookSummary
            triggeredContradictions={state.endings.triggeredContradictions}
            totalContradictions={state.endings.totalContradictions}
            fieldOrder={state.notebook.order}
            fieldStates={state.notebook.fields}
          />
        </div>
      )}

      {/* Phase 2: Closing Text */}
      {closingActive && (
        <div className="max-w-lg w-full mx-auto space-y-4 animate-[fadeIn_1s_ease-in_forwards]">
          {CLOSING_LINES.slice(0, visibleCount).map((line, i) => {
            if (line === '') {
              return <div key={i} className="h-4" />
            }

            const isListItem = line.startsWith('-')
            return (
              <p
                key={i}
                className={`leading-relaxed tracking-wide animate-[fadeIn_0.8s_ease-in_forwards] ${
                  isListItem
                    ? 'text-paper-300/90 text-sm ml-2'
                    : 'text-paper-200 text-base'
                }`}
              >
                {line}
              </p>
            )
          })}
        </div>
      )}

      {/* Phase 3: Return Button */}
      {phase === 'final' && (
        <div className="mt-12 animate-[fadeIn_1.5s_ease-in_forwards]">
          <button
            onClick={handleReturn}
            className="py-3 px-8 border border-paper-400/40 text-paper-400 hover:text-paper-200 hover:border-paper-300/60 transition-colors text-sm tracking-wider font-serif"
          >
            回到檔案室
          </button>
        </div>
      )}
    </div>
  )
}
