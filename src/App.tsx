import { useState, useCallback, useRef } from 'react'
import { ContentWarning } from '@/components/ui/ContentWarning'
import { CharacterMap } from '@/components/infographic/CharacterMap'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { fadeIn, lineDrawProgress } from '@/utils/animation'
import {
  Chapter01,
  Chapter02,
  Chapter03,
  Chapter04,
  Chapter05,
  Chapter06,
  Chapter07,
} from '@/chapters'

function ChapterDivider() {
  const { ref, progress } = useScrollProgress()
  const widthPct = lineDrawProgress(progress)

  return (
    <div
      ref={ref}
      className="h-[20vh] flex items-center justify-center scroll-animated"
      aria-hidden="true"
    >
      <div
        className="h-px bg-ink-700"
        style={{ width: `${widthPct * 0.64}px`, maxWidth: '4rem' }}
      />
    </div>
  )
}

function HeroHeader() {
  const { ref, progress } = useScrollProgress()
  const style = fadeIn(progress, 0.0, 0.25)

  return (
    <header
      ref={ref}
      className="flex flex-col items-center justify-center h-[80vh] sm:h-screen text-center px-4 sm:px-6 scroll-animated"
      style={style}
    >
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-display text-ink-50 mb-3 sm:mb-4">
        陳文成事件
      </h1>
      <p className="text-ink-400 font-mono text-xs sm:text-sm tracking-wider">
        互動式歷史紀錄 · 1981
      </p>
    </header>
  )
}

function Afterword() {
  const { ref, progress } = useScrollProgress()
  const style = fadeIn(progress, 0.0, 0.4)

  return (
    <section
      ref={ref}
      aria-label="為什麼要架這個網站"
      className="py-16 sm:py-24 scroll-animated"
      style={style}
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h2 className="text-lg sm:text-xl font-display text-ink-200 mb-8 sm:mb-12 text-center tracking-wide">
          為什麼要架這個網站
        </h2>

        <div className="space-y-5 sm:space-y-6 text-ink-300 leading-relaxed text-sm sm:text-base">
          <p>行醫多年，我始終相信一件事——真相是療癒的前提。</p>

          <p>
            一個人的身體出了問題，要先有正確的診斷，才談得上治療。一個社會也是。
            陳文成事件是台灣集體記憶裡一道從未癒合的傷口，不是因為缺乏證據，
            而是因為這些證據散落在不同語言、不同年代、不同格式的文件裡，
            始終沒有被好好攤開來讓所有人看見。
          </p>

          <p>
            Wecht 的法醫鑑定、促轉會調查報告、黃怡與林世煜的獨立調查——它們各自指向令人不安的結論。
            但一個想了解真相的人，得先知道去哪裡找到這幾百頁中英文的專業文獻，
            還得有能力把不同報告的時間線、證詞、鑑識結果交叉比對。
          </p>

          <p>這不應該是認識自己歷史的門檻。</p>

          <p>
            所以我做了這個網站。把時間線、人物、證據、矛盾，用你可以捲動、可以停下來想的方式，
            一層一層鋪開。你不需要是歷史學者，不需要讀完所有原始文件，
            只要捲動頁面，就能走進 1981 年那個夏天。
          </p>

          <p>
            我不會告訴你該怎麼想。這裡只有文獻記載的事實、不同報告間的矛盾、
            以及至今沒有答案的問題。判斷，留給你。
          </p>

          <p>
            全站程式碼以{' '}
            <a
              href="https://opensource.org/licenses/MIT"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-200 underline underline-offset-2 decoration-ink-600 hover:decoration-ink-400 transition-colors"
            >
              MIT 授權
            </a>
            公開。歷史不屬於任何人，它屬於所有人。
            如果你能讓這份記錄被更多人看見——翻譯、改作、引用——請自由取用。
          </p>

          <p className="text-ink-400 italic">記得的人越多，被遺忘就越難。</p>
        </div>

        <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-ink-800 text-center text-ink-400 text-xs sm:text-sm font-mono space-y-1">
          <p className="text-ink-300">陳璿丞 醫師</p>
          <p>
            <a
              href="https://anatomind.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink-200 transition-colors"
            >
              anatomind.com
            </a>
            {' · '}
            <a
              href="https://facebook.com/anatomind.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink-200 transition-colors"
            >
              Facebook
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

function App() {
  const [ready, setReady] = useState(false)
  const mainRef = useRef<HTMLElement>(null)

  const handleWarningDismiss = useCallback(() => {
    setReady(true)
    // Move focus to main content after warning is dismissed
    requestAnimationFrame(() => {
      mainRef.current?.focus()
    })
  }, [])

  return (
    <div className="min-h-screen bg-ink-950 text-ink-100 font-serif">
      {/* Skip navigation link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-ink-900 focus:text-ink-100 focus:px-4 focus:py-2 focus:border focus:border-accent-gold focus:rounded focus:text-sm focus:font-mono"
      >
        跳至主要內容
      </a>

      <ContentWarning onDismiss={handleWarningDismiss} />

      {ready && (
        <main
          ref={mainRef}
          id="main-content"
          tabIndex={-1}
          className="outline-none"
        >
          <HeroHeader />

          <Chapter01 />
          <ChapterDivider />
          <Chapter02 />
          <ChapterDivider />
          <Chapter03 />
          <ChapterDivider />
          <Chapter04 />
          <ChapterDivider />
          <Chapter05 />
          <ChapterDivider />
          <Chapter06 />
          <ChapterDivider />
          <Chapter07 />

          <ChapterDivider />

          {/* INFOGRAPHIC: character-map (global) */}
          <section aria-label="人物關係圖" className="py-10 sm:py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <CharacterMap />
            </div>
          </section>

          <ChapterDivider />

          <Afterword />

          <footer className="py-10 sm:py-16 text-center text-ink-600 text-xs sm:text-sm font-mono px-4">
            <p>基於歷史文獻的紀錄呈現 · MIT License</p>
          </footer>
        </main>
      )}
    </div>
  )
}

export default App
