import { useEffect, useState } from 'react'
import { useGame } from '../../context/GameContext.tsx'
import { ALL_DOCUMENTS } from '../../data/index.ts'

/**
 * Chapter 1 progressive darkening effect.
 *
 * As the player reads more surveillance documents in Chapter 1,
 * a subtle dark overlay gradually intensifies — creating a sense
 * of growing oppression.
 *
 * Also handles the special Chapter 2 ending darkness when the
 * player reads DOC-INT-02 (the last interrogation before Chen
 * never returns home).
 */

export function ChapterDarkenEffect() {
  const { state } = useGame()
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    const currentChapter = state.chapter.current

    if (currentChapter === 1) {
      // Count how many Chapter 1 surveillance docs have been read
      const ch1Docs = Object.entries(ALL_DOCUMENTS).filter(
        ([, doc]) => doc.chapter === 1,
      )
      const readCount = ch1Docs.filter(
        ([id]) => state.documents[id as keyof typeof state.documents]?.read,
      ).length
      const totalCount = ch1Docs.length

      // Progressive darkening: 0% at 0 docs, up to 6% at all docs read
      setOpacity(totalCount > 0 ? (readCount / totalCount) * 0.06 : 0)
    } else if (currentChapter === 2) {
      // Check if DOC-INT-02 has been read (the critical interrogation transcript)
      const intRead = state.documents['DOC-INT-02']?.read
      setOpacity(intRead ? 0.04 : 0.02)
    } else {
      setOpacity(0)
    }
  }, [state.chapter.current, state.documents])

  if (opacity <= 0) return null

  return (
    <div
      className="fixed inset-0 bg-ink-900 pointer-events-none z-[5] transition-opacity duration-[2000ms]"
      style={{ opacity }}
      aria-hidden="true"
    />
  )
}
