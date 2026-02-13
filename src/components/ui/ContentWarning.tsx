import { useState, useEffect } from 'react'

interface ContentWarningProps {
  /** Callback when user dismisses the warning */
  onDismiss: () => void
}

const STORAGE_KEY = 'chen-wen-chen:content-warning-dismissed'

export function ContentWarning({ onDismiss }: ContentWarningProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY)
    if (!dismissed) {
      setVisible(true)
    } else {
      onDismiss()
    }
  }, [onDismiss])

  const handleDismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
    onDismiss()
  }

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/95 p-4"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="cw-title"
      aria-describedby="cw-desc"
    >
      <div className="max-w-lg text-center">
        <h2
          id="cw-title"
          className="text-2xl font-display text-ink-50 mb-6"
        >
          內容提醒
        </h2>
        <p
          id="cw-desc"
          className="text-ink-300 leading-relaxed mb-8"
        >
          本網站記錄 1981 年陳文成事件的歷史。內容涉及政治迫害、非自然死亡及法醫證據描述，可能引起不適。所有內容基於歷史文獻，以客觀紀錄方式呈現。
        </p>
        <button
          type="button"
          onClick={handleDismiss}
          className="px-6 py-2 border border-ink-400 text-ink-100 font-mono text-sm
                     tracking-wider hover:bg-ink-800 hover:border-ink-200
                     transition-colors focus:outline-none focus:ring-2 focus:ring-accent-gold"
        >
          我了解，繼續瀏覽
        </button>
      </div>
    </div>
  )
}
