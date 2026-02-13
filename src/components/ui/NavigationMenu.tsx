import { useState, useCallback, useEffect, useRef } from 'react'

interface NavItem {
  id: string
  label: string
  subtitle?: string
}

const NAV_ITEMS: NavItem[] = [
  { id: 'chapter-1', label: '第一章', subtitle: '學者之路' },
  { id: 'chapter-2', label: '第二章', subtitle: '海外的聲音' },
  { id: 'chapter-3', label: '第三章', subtitle: '歸途' },
  { id: 'chapter-4', label: '第四章', subtitle: '約談' },
  { id: 'chapter-5', label: '第五章', subtitle: '陳屍台大' },
  { id: 'chapter-6', label: '第六章', subtitle: '追尋真相' },
  { id: 'chapter-7', label: '第七章', subtitle: '未完的故事' },
  { id: 'character-map', label: '人物關係圖' },
  { id: 'afterword', label: '後記' },
  { id: 'take-action', label: '採取行動' },
]

export function NavigationMenu() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const toggle = useCallback(() => setOpen((v) => !v), [])

  const handleNavigate = useCallback((id: string) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  // Trap focus inside menu when open
  useEffect(() => {
    if (!open) return
    const menu = menuRef.current
    if (!menu) return
    const focusables = menu.querySelectorAll<HTMLElement>(
      'button, a, [tabindex]:not([tabindex="-1"])'
    )
    if (focusables.length > 0) {
      focusables[0].focus()
    }
  }, [open])

  // Close when clicking outside
  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])

  return (
    <>
      {/* Hamburger button */}
      <button
        ref={buttonRef}
        onClick={toggle}
        aria-expanded={open}
        aria-controls="nav-menu"
        aria-label={open ? '關閉目錄' : '開啟目錄'}
        className="fixed top-4 left-4 z-50 w-10 h-10 flex items-center justify-center rounded border border-ink-700 bg-ink-950/80 backdrop-blur-sm text-ink-300 hover:text-ink-100 hover:border-ink-500 transition-colors"
      >
        {open ? (
          // X icon
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ) : (
          // Hamburger icon
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M3 5H15M3 9H15M3 13H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-ink-950/60 backdrop-blur-[2px] transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Menu panel */}
      <nav
        ref={menuRef}
        id="nav-menu"
        role="navigation"
        aria-label="章節目錄"
        className={`fixed top-0 left-0 z-40 h-full w-64 sm:w-72 bg-ink-900/95 backdrop-blur-md border-r border-ink-800 transform transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="pt-18 px-5 pb-6 h-full overflow-y-auto">
          <p className="text-ink-500 font-mono text-[10px] tracking-[0.25em] uppercase mb-6">
            目錄
          </p>
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigate(item.id)}
                  className="w-full text-left px-3 py-2.5 rounded text-sm text-ink-300 hover:text-ink-100 hover:bg-ink-800/60 transition-colors group"
                >
                  <span className="font-mono text-[11px] text-ink-500 group-hover:text-ink-400 transition-colors">
                    {item.label}
                  </span>
                  {item.subtitle && (
                    <span className="ml-2 text-ink-300 group-hover:text-ink-100 transition-colors">
                      {item.subtitle}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}
