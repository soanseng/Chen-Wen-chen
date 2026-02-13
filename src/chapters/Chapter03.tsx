import { ChapterTitle } from '@/components/narrative/ChapterTitle'
import { ScrollSection } from '@/components/narrative/ScrollSection'
import { NarrativeParagraph } from '@/components/narrative/NarrativeParagraph'
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
    <article aria-label="第三章：歸途">
      <ChapterTitle
        chapter={3}
        title="歸途"
        timeRange="1981年5月—7月1日"
        mood="表面平靜、暗流洶湧——陷阱正在收攏"
      />

      {/* 返台探親、出境許可被扣 */}
      <ScrollSection aria-label="返台探親">
        {(_progress, isInView) => (
          <div
            className="max-w-2xl mx-auto px-4 py-16"
            style={{ opacity: isInView ? 1 : 0, transition: 'opacity 0.6s' }}
          >
            {s1.paragraphs.map((p, i) => (
              <NarrativeParagraph key={i} paragraph={p} />
            ))}
          </div>
        )}
      </ScrollSection>

      {/* PIXEL_SCENE: airport-return */}
      <ScrollSection minHeight="80vh" aria-label="松山機場入境場景">
        {(progress, isInView) => (
          <div className="flex items-center justify-center min-h-[80vh]">
            {/* AirportReturnScene 元件：Task 4.8 實作 */}
            <div
              className="text-ink-600 font-mono text-sm"
              style={{ opacity: isInView ? 0.5 : 0, transition: 'opacity 0.6s' }}
            >
              [ airport-return scene · progress: {progress.toFixed(2)} ]
            </div>
          </div>
        )}
      </ScrollSection>

      {/* 6月30日第一次約談、7月1日追問出境證 */}
      <ScrollSection aria-label="第一次約談與出境受阻">
        {(_progress, isInView) => (
          <div
            className="max-w-2xl mx-auto px-4 py-16"
            style={{ opacity: isInView ? 1 : 0, transition: 'opacity 0.6s' }}
          >
            {s2.paragraphs.map((p, i) => (
              <NarrativeParagraph key={i} paragraph={p} />
            ))}
          </div>
        )}
      </ScrollSection>

      {/* INFOGRAPHIC: july-hourly-timeline（開始，延續至 Ch4） */}
      <ScrollSection minHeight="60vh" aria-label="七月逐時時間線">
        {(progress, isInView) => (
          <div className="max-w-4xl mx-auto px-4 py-16">
            {/* HourlyTimeline 元件：Task 4.3 實作 */}
            <div
              className="text-ink-600 font-mono text-sm text-center"
              style={{ opacity: isInView ? 0.5 : 0, transition: 'opacity 0.6s' }}
            >
              [ july-hourly-timeline (part 1) · progress: {progress.toFixed(2)} ]
            </div>
          </div>
        )}
      </ScrollSection>
    </article>
  )
}
