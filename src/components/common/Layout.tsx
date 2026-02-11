import { Outlet, NavLink, useLocation, Link } from 'react-router-dom'
import { useGame } from '../../context/GameContext.tsx'
import { useGameOrchestrator } from '../../hooks/useGameOrchestrator.ts'
import { ALL_DOCUMENTS } from '../../data/index.ts'
import ChapterTransition from '../ChapterTransition/ChapterTransition.tsx'
import { ChapterDarkenEffect } from '../visual/ChapterDarkenEffect.tsx'
import type { DocumentId } from '../../types/index.ts'

const tabs = [
  { path: '/browse', label: '檔案', icon: '📁' },
  { path: '/notebook', label: '推理簿', icon: '📓' },
] as const

function extractDocId(pathname: string): DocumentId | null {
  const match = pathname.match(/^\/doc\/(.+)$/)
  if (!match) return null
  const id = match[1] as DocumentId
  if (ALL_DOCUMENTS[id]) return id
  return null
}

export default function Layout() {
  const location = useLocation()
  const { state } = useGame()
  const { transitionChapter, handleTransitionComplete } = useGameOrchestrator()

  const isDocPage = location.pathname.startsWith('/doc/')
  const activeDocId = extractDocId(location.pathname)
  const activeDoc = activeDocId ? ALL_DOCUMENTS[activeDocId] : null
  const connectionCount = state.connections.filter((c) => c.triggered).length

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      {/* Chapter transition overlay */}
      {transitionChapter !== null && (
        <ChapterTransition
          chapterNumber={transitionChapter}
          onComplete={handleTransitionComplete}
        />
      )}

      {/* Progressive darkening effect (Ch1 oppression, Ch2 ending) */}
      <ChapterDarkenEffect />
      {/* Desktop sidebar navigation */}
      <nav className="hidden md:flex md:flex-col md:w-64 md:shrink-0 md:border-r md:border-paper-300 md:shadow-[1px_0_4px_rgba(0,0,0,0.05)] bg-paper-200">
        {/* Game title header */}
        <div className="px-5 pt-5 pb-4 border-b border-paper-300/60">
          <h1 className="text-base font-semibold text-ink-700 tracking-wider font-serif">
            陳文成事件
          </h1>
          <p className="text-xs text-ink-400 mt-1">互動文字調查遊戲</p>
        </div>

        {/* Navigation links */}
        <div className="flex flex-col gap-1 p-3">
          {tabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2.5 text-sm rounded transition-colors ${
                  isActive
                    ? 'bg-paper-300 text-ink-800 font-semibold'
                    : 'text-ink-500 hover:bg-paper-300/50'
                }`
              }
            >
              <span>{tab.icon}</span>
              <span className="flex-1">{tab.label}</span>
              {tab.path === '/notebook' && connectionCount > 0 && (
                <span className="min-w-[20px] h-5 flex items-center justify-center rounded-full bg-stamp-500 text-paper-50 text-[10px] font-semibold leading-none px-1.5">
                  {connectionCount}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        {/* Active document context (shown when reading a document) */}
        {activeDoc && (
          <div className="mt-auto border-t border-paper-300/60 px-4 py-4">
            <p className="text-[10px] uppercase tracking-widest text-ink-300 mb-2">
              閱讀中
            </p>
            <p className="text-sm font-semibold text-ink-700 leading-snug">
              {activeDoc.title}
            </p>
            <p className="text-xs text-ink-400 mt-1 font-mono">
              {activeDoc.id}
            </p>
            <Link
              to="/browse"
              className="inline-block mt-3 text-xs text-stamp-500 hover:underline"
            >
              &larr; 返回檔案列表
            </Link>
          </div>
        )}
      </nav>

      {/* Main content area */}
      <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
        <Outlet />
      </main>

      {/* Mobile bottom tab bar */}
      {!isDocPage && (
        <nav
          className="fixed bottom-0 left-0 right-0 md:hidden flex border-t border-paper-300 bg-paper-100"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          {tabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center justify-center py-3 min-h-[44px] text-xs transition-colors ${
                  isActive
                    ? 'text-stamp-500 font-semibold'
                    : 'text-ink-400'
                }`
              }
            >
              <span className="relative text-lg leading-none">
                {tab.icon}
                {tab.path === '/notebook' && connectionCount > 0 && (
                  <span className="absolute -top-1.5 -right-3 min-w-[16px] h-4 flex items-center justify-center rounded-full bg-stamp-500 text-paper-50 text-[9px] font-semibold leading-none px-1">
                    {connectionCount}
                  </span>
                )}
              </span>
              <span className="mt-0.5">{tab.label}</span>
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  )
}
