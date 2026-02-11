import { useCallback, useEffect, useRef } from 'react'
import type { GameState } from '../types'
import { useGame } from '../context/GameContext'
import { INITIAL_GAME_STATE } from '../context/gameState'

const SAVE_KEY = 'cwc_game_save_v1'
const CURRENT_VERSION = '1.0.0'

function migrate(raw: GameState): GameState {
  // Future version migrations go here
  if (raw.version === CURRENT_VERSION) return raw
  // Unknown version — return initial state
  return { ...INITIAL_GAME_STATE, created: new Date().toISOString() }
}

export function useSaveGame() {
  const { state, dispatch } = useGame()
  const stateRef = useRef(state)
  stateRef.current = state

  const saveGame = useCallback(() => {
    const toSave: GameState = {
      ...stateRef.current,
      lastSaved: new Date().toISOString(),
    }
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(toSave))
    } catch {
      console.error('Failed to save game to localStorage')
    }
  }, [])

  const loadGame = useCallback((): GameState | null => {
    try {
      const raw = localStorage.getItem(SAVE_KEY)
      if (!raw) return null
      const parsed = JSON.parse(raw) as GameState
      return migrate(parsed)
    } catch {
      console.error('Failed to load game from localStorage')
      return null
    }
  }, [])

  const resetGame = useCallback(() => {
    localStorage.removeItem(SAVE_KEY)
    dispatch({ type: 'RESET_GAME' })
  }, [dispatch])

  const hasSaveData = useCallback((): boolean => {
    return localStorage.getItem(SAVE_KEY) !== null
  }, [])

  // Load saved state on mount
  useEffect(() => {
    const saved = loadGame()
    if (saved) {
      dispatch({ type: 'LOAD_STATE', state: saved })
    }
  }, [loadGame, dispatch])

  // Auto-save on page visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        saveGame()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [saveGame])

  // Auto-save on significant state changes
  const prevTriggered = useRef(state.endings.triggeredContradictions)
  const prevChapter = useRef(state.chapter.current)
  const prevDocCount = useRef(Object.keys(state.documents).length)

  useEffect(() => {
    const triggered = state.endings.triggeredContradictions
    const chapter = state.chapter.current
    const docCount = Object.keys(state.documents).length

    if (
      triggered !== prevTriggered.current ||
      chapter !== prevChapter.current ||
      docCount !== prevDocCount.current
    ) {
      saveGame()
      prevTriggered.current = triggered
      prevChapter.current = chapter
      prevDocCount.current = docCount
    }
  }, [state, saveGame])

  return {
    gameState: state,
    saveGame,
    loadGame,
    resetGame,
    hasSaveData: hasSaveData(),
  }
}
