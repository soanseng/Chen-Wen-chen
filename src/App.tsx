import { useState, useCallback, useRef } from 'react'
import { NavigationMenu } from '@/components/ui/NavigationMenu'
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
      id="afterword"
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
            這個網站本來是打算在二二八的時候才要公告出來的，但因為
            <a
              href="https://soanseng.github.io/the-lin/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-200 underline underline-offset-2 decoration-ink-600 hover:decoration-ink-400 transition-colors"
            >
              林宅血案的那個網站
            </a>
            吸引了大家的注意，我覺得我有責任、有義務把這個網站給做出來。
          </p>

          <p>
            以前讀臺大的時候，在臺大偏僻的角落，曾經耳聞，尤其在總圖的附近，
            學長姐說這裡曾經發生過一個陳文成命案。在我印象中，還記得曾經某些大一迎新的活動，
            扮演鬼屋的時候，有時候也會拿這個梗來開玩笑。現在想想，這個梗真的是地獄梗。
            越想越覺得，原來當時候的自己是這麼不瞭解這件事情。
          </p>

          <p>
            我記得自己曾經當過臺大學生會的文化部的部長。那時候常常要放一些電影、辦一些藝術季。
            記得曾經陳文成事件是否要立紀念碑這件事情，似乎有被討論到，但那時候並不以為然，
            或是覺得這件事情不是很重要。
          </p>

          <p>
            在找資料的過程之中，常常會看到林宅血案和陳文成事件放在一起。
            我曾經想，他就是一個可能比我還要會讀書的人。
            在讀了一些書之後，在一個比較先進的國家，看到自己的國家可能需要一些資金，
            需要一些民主，他只是想要捐一點錢，做一點不一樣的事情、去演講。
          </p>

          <p>
            他過了六年，沒有回家看過爸媽，希望可以回家看看爸媽。讓爸媽看看金孫，抱抱孩子。
            就這樣一個小小的願望，他就再也不曾看過他的妻子，不曾看過他的孩子，
            甚至連他的爸媽都不曾再看過他。他的爸媽，還有他的孩子，他的妻子，
            就或許跟林宅血案一樣，他們就再也得不到答案了。
          </p>

          <p>
            Wecht 的法醫鑑定、促轉會調查報告、黃怡與林世煜的獨立調查——它們各自指向令人不安的結論。
            但一個想了解真相的人，得先知道去哪裡找到這幾百頁中英文的專業文獻，
            還得有能力把不同報告的時間線、證詞、鑑識結果交叉比對。
          </p>

          <p>這不應該是認識自己歷史的門檻。</p>

          <p>
            做這件事情或許沒有也找不到任何的答案，但我希望可以透過簡單的網站，
            快速地瀏覽歷史，讓大家知道曾經在這片島嶼上發生的事情。
            把時間線、人物、證據、矛盾，用你可以捲動、可以停下來想的方式，
            一層一層鋪開。你不需要是歷史學者，不需要讀完所有原始文件，
            只要捲動頁面，就能走進 1981 年那個夏天。
          </p>

          <p>
            我不會告訴你該怎麼想。這裡只有文獻記載的事實、不同報告間的矛盾、
            以及至今沒有答案的問題。判斷，留給你。
          </p>

          <p>
            或許，這是我們可以療傷的方式吧。希望在這長長的假期，有這兩個小小的網站，
            讓你大概知道曾經發生在這片島嶼的事情。
          </p>

          <p>
            祝福大家新春快樂。也讓過去的自己跟自己，還有這片島嶼的過去有個連結，
            有一個新的開始。祝福大家。
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
          <p>2026.02.13</p>
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

function TakeAction() {
  const { ref, progress } = useScrollProgress()
  const style = fadeIn(progress, 0.0, 0.4)

  const linkClass =
    'text-ink-200 underline underline-offset-2 decoration-ink-600 hover:decoration-ink-400 transition-colors'

  return (
    <section
      id="take-action"
      ref={ref}
      aria-label="採取行動"
      className="py-16 sm:py-24 scroll-animated"
      style={style}
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h2 className="text-lg sm:text-xl font-display text-ink-200 mb-8 sm:mb-12 text-center tracking-wide">
          採取行動
        </h2>

        <div className="space-y-6 sm:space-y-8">
          <div className="text-center">
            <a
              href="http://www.cwcmf.org.tw/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-ink-100 text-base sm:text-lg font-display hover:text-accent-gold transition-colors"
            >
              陳文成博士紀念基金會
            </a>
            <p className="text-ink-400 text-xs sm:text-sm mt-2 font-mono">
              cwcmf.org.tw
            </p>
          </div>

          <div className="border-t border-ink-800 pt-6 sm:pt-8">
            <h3 className="text-ink-300 text-sm sm:text-base mb-4 text-center">
              相關機構
            </h3>
            <ul className="space-y-3 text-ink-400 text-xs sm:text-sm leading-relaxed">
              <li>
                <a href="https://www.nhrm.gov.tw/" target="_blank" rel="noopener noreferrer" className={linkClass}>
                  國家人權博物館
                </a>
                <span className="text-ink-500"> — 白色恐怖歷史保存與人權教育</span>
              </li>
              <li>
                <a href="https://www.archives.gov.tw/" target="_blank" rel="noopener noreferrer" className={linkClass}>
                  國家發展委員會檔案管理局
                </a>
                <span className="text-ink-500"> — 國家檔案查詢與調閱</span>
              </li>
            </ul>
          </div>

          <div className="border-t border-ink-800 pt-6 sm:pt-8">
            <h3 className="text-ink-300 text-sm sm:text-base mb-4 text-center">
              資料來源
            </h3>
            <ol className="space-y-3 text-ink-400 text-xs sm:text-sm leading-relaxed list-decimal list-inside">
              <li>
                <a href="http://www.cwcmf.org.tw/the%20truth/report_1.pdf" target="_blank" rel="noopener noreferrer" className={linkClass}>
                  陳文成事件調查報告
                </a>
                <span className="text-ink-500"> / 黃怡、林世煜</span>
              </li>
              <li>
                <a href="http://www.cwcmf.org.tw/the%20truth/doubtful_1.pdf" target="_blank" rel="noopener noreferrer" className={linkClass}>
                  陳文成案之死因
                </a>
              </li>
              <li>
                <a href="http://www.cwcmf.org.tw/the%20truth/wecht_1.pdf" target="_blank" rel="noopener noreferrer" className={linkClass}>
                  魏契——為民主而死
                </a>
                <span className="text-ink-500"> / 原著：Cyril Wecht，中譯：黃怡</span>
              </li>
              <li>
                <a href="https://drive.google.com/file/d/14OI0ySfF-_MbLUFyU-1THrdHUyfoTqdI/view?usp=sharing" target="_blank" rel="noopener noreferrer" className={linkClass}>
                  促轉會《陳文成案調查報告》
                </a>
              </li>
            </ol>
          </div>
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

      {ready && <NavigationMenu />}

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
          <section id="character-map" aria-label="人物關係圖" className="py-10 sm:py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <CharacterMap />
            </div>
          </section>

          <ChapterDivider />

          <Afterword />

          <ChapterDivider />

          <TakeAction />

          <footer className="py-10 sm:py-16 text-center text-ink-600 text-xs sm:text-sm font-mono px-4">
            <p>基於歷史文獻的紀錄呈現 · MIT License</p>
          </footer>
        </main>
      )}
    </div>
  )
}

export default App
