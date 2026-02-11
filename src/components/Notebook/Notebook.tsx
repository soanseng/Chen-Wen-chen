import { useGame } from '../../context/GameContext.tsx'
import { NOTEBOOK_FIELDS } from '../../data/index.ts'
import type { NotebookFieldDef, NotebookFieldId } from '../../types/index.ts'

// ===== Sub-components =====

interface FieldProps {
  field: NotebookFieldDef
  unlocked: boolean
  value: string | null
  onSelect: (fieldId: NotebookFieldId, value: string) => void
}

function LockedField({ field }: { field: NotebookFieldDef }) {
  return (
    <div className="opacity-60">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-ink-300 text-sm">&#x1F512;</span>
        <span className="text-ink-400 text-sm font-semibold">{field.label}</span>
      </div>
      {field.lockedReason && (
        <p className="text-ink-300 text-xs italic ml-6">{field.lockedReason}</p>
      )}
    </div>
  )
}

function AutoField({ field }: { field: NotebookFieldDef }) {
  return (
    <div>
      <p className="text-ink-500 text-sm font-semibold mb-1">{field.label}</p>
      <p className="text-ink-700 text-sm bg-paper-200/60 px-3 py-2 rounded">
        {field.autoValue}
      </p>
    </div>
  )
}

function ChoiceField({ field, value, onSelect }: Omit<FieldProps, 'unlocked'>) {
  if (!field.options) return null

  return (
    <div>
      <p className="text-ink-500 text-sm font-semibold mb-2">{field.label}</p>
      <div className="flex flex-col gap-1.5 ml-1">
        {field.options.map((option) => {
          const isSelected = value === option.value
          return (
            <label
              key={option.value}
              className={`
                flex items-center gap-2 px-3 py-1.5 rounded cursor-pointer
                text-sm transition-colors
                ${isSelected ? 'bg-stamp-500/10 text-ink-800' : 'text-ink-500 hover:bg-paper-200/60'}
              `}
            >
              <input
                type="radio"
                name={field.id}
                value={option.value}
                checked={isSelected}
                onChange={() => onSelect(field.id, option.value)}
                className="accent-stamp-500"
              />
              {option.label}
            </label>
          )
        })}
      </div>
    </div>
  )
}

function NotebookField({ field, unlocked, value, onSelect }: FieldProps) {
  if (!unlocked) {
    return (
      <div className="py-3 px-4 border border-paper-300/50 rounded bg-paper-200/30">
        <p className="text-ink-200 text-sm">???</p>
      </div>
    )
  }

  if (field.type === 'locked') {
    return (
      <div className="py-3 px-4 border border-paper-300/50 rounded bg-paper-200/30">
        <LockedField field={field} />
      </div>
    )
  }

  if (field.type === 'auto') {
    return (
      <div className="py-3 px-4 border border-paper-300 rounded bg-paper-50">
        <AutoField field={field} />
      </div>
    )
  }

  return (
    <div className="py-3 px-4 border border-paper-300 rounded bg-paper-50">
      <ChoiceField field={field} value={value} onSelect={onSelect} />
    </div>
  )
}

// ===== Notebook field definitions lookup =====

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

// ===== Main component =====

export default function Notebook() {
  const { state, setNotebookField } = useGame()
  const { fields, order } = state.notebook

  // Compute stats
  let unlockedCount = 0
  let filledCount = 0

  for (const fieldId of order) {
    const fieldState = fields[fieldId]
    if (!fieldState?.unlocked) continue

    unlockedCount++

    const def = FIELD_DEF_MAP[fieldId]
    if (def.type === 'auto') {
      filledCount++
    } else if (def.type === 'choice' && fieldState.value !== null) {
      filledCount++
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-ink-800 mb-2">
          推理簿
        </h1>
        <p className="text-ink-400 text-sm mb-3">
          根據文件中發現的線索，記錄你的推論。
        </p>
        <div className="flex gap-4 text-xs text-ink-400">
          <span>已解鎖 {unlockedCount} / 12 欄位</span>
          <span>已填寫 {filledCount} 項</span>
        </div>
      </header>

      <hr className="border-paper-300 mb-6" />

      {/* Field list */}
      <div className="space-y-3">
        {order.map((fieldId) => {
          const def = FIELD_DEF_MAP[fieldId]
          const fieldState = fields[fieldId]
          const isUnlocked = fieldState?.unlocked ?? false
          const value = fieldState?.value ?? null

          return (
            <NotebookField
              key={fieldId}
              field={def}
              unlocked={isUnlocked}
              value={value}
              onSelect={setNotebookField}
            />
          )
        })}
      </div>

      {/* Footer hint */}
      {unlockedCount === 0 && (
        <p className="text-center text-ink-300 text-sm mt-8">
          尚無已解鎖的欄位。閱讀文件並標記可疑段落以發現矛盾。
        </p>
      )}
    </div>
  )
}
