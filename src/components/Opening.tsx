import { useNavigate } from 'react-router-dom'

export default function Opening() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-ink-900 text-paper-200 px-6">
      <h1 className="text-3xl font-semibold mb-2 tracking-wide">
        陳文成事件
      </h1>
      <p className="text-paper-400 text-sm mb-12">互動文字調查遊戲</p>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button
          onClick={() => navigate('/browse')}
          className="w-full py-3 border border-paper-400 text-paper-200 hover:bg-paper-400/10 transition-colors text-sm tracking-wider"
        >
          開始調查
        </button>
        <button
          onClick={() => navigate('/browse')}
          className="w-full py-3 text-paper-500 hover:text-paper-300 transition-colors text-sm"
        >
          繼續遊戲
        </button>
      </div>

      <p className="absolute bottom-8 text-paper-500 text-xs">
        基於促轉會《陳文成案調查報告》
      </p>
    </div>
  )
}
