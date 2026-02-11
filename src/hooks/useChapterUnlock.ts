import { useEffect, useRef } from 'react'
import { useGame } from '../context/GameContext'
import type { ContradictionId } from '../types'

/**
 * 章節解鎖條件：
 * 序章 → 第一章：序章所有 3 份文件已讀
 * 第一章 → 第二章：觸發至少 2 個矛盾
 * 第二章 → 第三章：C-02 已觸發
 * 第三章 → 第四章：C-08 已觸發
 * 第四章 → 終章：C-09 AND C-15 已觸發
 */

const PROLOGUE_DOCS = ['DOC-EXT-04', 'DOC-OFF-01', 'DOC-NEWS-01'] as const

function hasTriggered(
  connections: { id: ContradictionId; triggered: boolean }[],
  id: ContradictionId,
): boolean {
  return connections.some((c) => c.id === id && c.triggered)
}

export function useChapterUnlock() {
  const { state, unlockChapter } = useGame()
  const { chapter, documents, connections } = state

  const prevConnectionCount = useRef(connections.length)
  const prevReadDocs = useRef(
    Object.entries(documents).filter(([, d]) => d?.read).length,
  )

  useEffect(() => {
    const connectionCount = connections.length
    const readDocCount = Object.entries(documents).filter(([, d]) => d?.read).length

    // Only check when something changed
    if (
      connectionCount === prevConnectionCount.current &&
      readDocCount === prevReadDocs.current
    ) {
      return
    }
    prevConnectionCount.current = connectionCount
    prevReadDocs.current = readDocCount

    // 序章 → 第一章: 序章 3 份文件皆已讀
    if (!chapter.unlocked.includes(1)) {
      const allPrologueRead = PROLOGUE_DOCS.every(
        (id) => documents[id]?.read,
      )
      if (allPrologueRead) {
        unlockChapter(1)
      }
    }

    // 第一章 → 第二章: 至少 2 個矛盾已觸發
    if (!chapter.unlocked.includes(2)) {
      const triggeredCount = connections.filter((c) => c.triggered).length
      if (triggeredCount >= 2) {
        unlockChapter(2)
      }
    }

    // 第二章 → 第三章: C-02 已觸發
    if (!chapter.unlocked.includes(3)) {
      if (hasTriggered(connections, 'C-02')) {
        unlockChapter(3)
      }
    }

    // 第三章 → 第四章: C-08 已觸發
    if (!chapter.unlocked.includes(4)) {
      if (hasTriggered(connections, 'C-08')) {
        unlockChapter(4)
      }
    }

    // 第四章 → 終章: C-09 AND C-15 已觸發
    if (!chapter.unlocked.includes(5)) {
      if (hasTriggered(connections, 'C-09') && hasTriggered(connections, 'C-15')) {
        unlockChapter(5)
      }
    }
  }, [chapter.unlocked, connections, documents, unlockChapter])
}
