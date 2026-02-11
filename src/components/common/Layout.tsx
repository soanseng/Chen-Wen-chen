import { Outlet, NavLink, useLocation } from 'react-router-dom'

const tabs = [
  { path: '/browse', label: '檔案', icon: '📁' },
  { path: '/notebook', label: '推理簿', icon: '📓' },
] as const

export default function Layout() {
  const location = useLocation()
  const isDocPage = location.pathname.startsWith('/doc/')

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      {/* 桌面端側邊導航 */}
      <nav className="hidden md:flex md:flex-col md:w-48 md:border-r md:border-paper-300 bg-paper-200 p-4 gap-2">
        <h1 className="text-sm font-semibold text-ink-500 mb-4 tracking-wider">
          陳文成事件
        </h1>
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `px-3 py-2 text-sm rounded transition-colors ${
                isActive
                  ? 'bg-paper-300 text-ink-800 font-semibold'
                  : 'text-ink-500 hover:bg-paper-300/50'
              }`
            }
          >
            {tab.icon} {tab.label}
          </NavLink>
        ))}
      </nav>

      {/* 主要內容區 */}
      <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
        <Outlet />
      </main>

      {/* 手機端底部 Tab */}
      {!isDocPage && (
        <nav className="fixed bottom-0 left-0 right-0 md:hidden flex border-t border-paper-300 bg-paper-100">
          {tabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center py-2 text-xs transition-colors ${
                  isActive
                    ? 'text-stamp-500 font-semibold'
                    : 'text-ink-400'
                }`
              }
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  )
}
