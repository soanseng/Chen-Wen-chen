interface DialogueLine {
  speaker: string
  text: string
  /** Optional style hint: "interrogator" | "subject" | "narrator" */
  role?: 'interrogator' | 'subject' | 'narrator'
}

interface DialogueBoxProps {
  /** All dialogue lines in this section */
  lines: DialogueLine[]
  /** Scroll progress 0–1, controls which lines are visible */
  progress: number
  className?: string
}

export function DialogueBox({ lines, progress, className = '' }: DialogueBoxProps) {
  // Calculate how many lines to show based on progress
  const visibleCount = Math.min(
    lines.length,
    Math.floor(progress * (lines.length + 1)),
  )

  const roleStyles: Record<string, string> = {
    interrogator: 'border-l-accent-red text-ink-200',
    subject: 'border-l-accent-blue text-ink-100',
    narrator: 'border-l-ink-600 text-ink-400 italic',
  }

  return (
    <div
      className={`flex flex-col gap-2 sm:gap-3 max-w-2xl mx-auto font-mono text-xs sm:text-sm ${className}`}
      role="log"
      aria-label="對話紀錄"
    >
      {lines.slice(0, visibleCount).map((line, i) => (
        <div
          key={i}
          className={`border-l-2 pl-2 sm:pl-3 py-1 transition-opacity duration-300
                     ${roleStyles[line.role ?? 'narrator'] ?? roleStyles.narrator}`}
          style={{
            opacity: i === visibleCount - 1 ? 0.7 + progress * 0.3 : 1,
          }}
        >
          <span className="text-ink-500 text-[10px] sm:text-xs block mb-0.5">
            {line.speaker}
          </span>
          <p className="leading-relaxed">{line.text}</p>
        </div>
      ))}
    </div>
  )
}
