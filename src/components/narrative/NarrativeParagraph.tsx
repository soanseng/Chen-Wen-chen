import { Citation } from './Citation'
import type { Paragraph } from '@/data/chapters/types'

interface NarrativeParagraphProps {
  paragraph: Paragraph
  className?: string
}

export function NarrativeParagraph({ paragraph, className = '' }: NarrativeParagraphProps) {
  const { text, citation, type = 'text', items } = paragraph

  if (type === 'quote') {
    return (
      <blockquote
        className={`border-l-2 border-ink-600 pl-4 my-6 text-ink-300 italic leading-relaxed ${className}`}
      >
        <p className="text-base whitespace-pre-line">{text}</p>
        {citation && (
          <footer className="mt-2 not-italic">
            <Citation source={citation} />
          </footer>
        )}
      </blockquote>
    )
  }

  if (type === 'note') {
    return (
      <div
        className={`my-6 bg-ink-900/50 border border-ink-700 rounded px-4 py-3 text-sm text-ink-300 leading-relaxed ${className}`}
      >
        <p>{text}</p>
        {citation && (
          <span className="mt-2 block">
            <Citation source={citation} />
          </span>
        )}
      </div>
    )
  }

  if (type === 'list' && items) {
    return (
      <div className={`my-4 ${className}`}>
        {text && <p className="text-ink-200 leading-relaxed text-lg mb-2">{text}</p>}
        <ul className="list-disc list-inside space-y-1 text-ink-200 text-base ml-2">
          {items.map((item, i) => (
            <li key={i} className="leading-relaxed">{item}</li>
          ))}
        </ul>
        {citation && (
          <span className="mt-2 block">
            <Citation source={citation} />
          </span>
        )}
      </div>
    )
  }

  return (
    <p className={`text-ink-200 leading-relaxed text-lg my-4 ${className}`}>
      {text}
      {citation && (
        <>
          {' '}
          <Citation source={citation} />
        </>
      )}
    </p>
  )
}
