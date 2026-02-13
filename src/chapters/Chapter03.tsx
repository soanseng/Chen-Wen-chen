import { ChapterTitle } from '@/components/narrative/ChapterTitle'
import { ScrollSection } from '@/components/narrative/ScrollSection'
import { NarrativeParagraph } from '@/components/narrative/NarrativeParagraph'
import { HourlyTimeline } from '@/components/infographic/HourlyTimeline'
import { AirportReturnScene, LastFreeNightScene } from '@/components/pixel/scenes'
import { staggeredFadeIn } from '@/utils/animation'
import chapterData from '@/data/chapters/ch03.json'
import type { ChapterData } from '@/data/chapters/types'

const data = chapterData as ChapterData

/**
 * 第三章：歸途（1981年5月—7月1日）
 * 情緒基調：表面平靜、暗流洶湧——陷阱正在收攏
 * Pixel Art 場景：airport-return
 * 資訊圖表：july-hourly-timeline（跨 Ch3-4）
 */
export function Chapter03() {
  const [s1, s2] = data.sections

  return (
    <article id="chapter-3" aria-label="第三章：歸途">
      <ChapterTitle
        chapter={3}
        title="歸途"
        timeRange="1981年5月—7月1日"
        mood="表面平靜、暗流洶湧——陷阱正在收攏"
      />

      {/* 返台探親、出境許可被扣 */}
      <ScrollSection aria-label="返台探親">
        {(progress) => (
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
            {s1.paragraphs.map((p, i) => (
              <div
                key={i}
                className="scroll-animated"
                style={staggeredFadeIn(progress, i, s1.paragraphs.length)}
              >
                <NarrativeParagraph paragraph={p} />
              </div>
            ))}
          </div>
        )}
      </ScrollSection>

      {/* PIXEL_SCENE: airport-return */}
      <ScrollSection minHeight="80vh" aria-label="松山機場入境場景">
        {(progress, isInView) => (
          <div className="flex items-center justify-center min-h-[60vh] sm:min-h-[80vh] px-4">
            <AirportReturnScene progress={progress} isInView={isInView} />
          </div>
        )}
      </ScrollSection>

      {/* 6月30日第一次約談、7月1日追問出境證 */}
      <ScrollSection aria-label="第一次約談與出境受阻">
        {(progress) => (
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
            {s2.paragraphs.map((p, i) => (
              <div
                key={i}
                className="scroll-animated"
                style={staggeredFadeIn(progress, i, s2.paragraphs.length)}
              >
                <NarrativeParagraph paragraph={p} />
              </div>
            ))}
          </div>
        )}
      </ScrollSection>

      {/* PIXEL_SCENE: last-free-night */}
      <ScrollSection minHeight="80vh" aria-label="最後的自由之夜場景">
        {(progress, isInView) => (
          <div className="flex items-center justify-center min-h-[60vh] sm:min-h-[80vh] px-4">
            <LastFreeNightScene progress={progress} isInView={isInView} />
          </div>
        )}
      </ScrollSection>

      {/* INFOGRAPHIC: july-hourly-timeline（開始，延續至 Ch4） */}
      <ScrollSection minHeight="60vh" aria-label="七月逐時時間線">
        {(progress, isInView) => (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
            <HourlyTimeline phase={1} progress={progress} isInView={isInView} />
          </div>
        )}
      </ScrollSection>
    </article>
  )
}
