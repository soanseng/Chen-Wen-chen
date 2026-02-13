import { ChapterTitle } from '@/components/narrative/ChapterTitle'
import { ScrollSection } from '@/components/narrative/ScrollSection'
import { NarrativeParagraph } from '@/components/narrative/NarrativeParagraph'
import chapterData from '@/data/chapters/ch06.json'
import type { ChapterData } from '@/data/chapters/types'

const data = chapterData as ChapterData

/**
 * 第六章：追尋真相（1981–2020）
 * 情緒基調：憤怒與無力交織——系統性的真相壓制
 * Pixel Art 場景：wecht-arrival
 * 資訊圖表：investigation-waves
 *
 * 五段式結構（合併七段為五段）：
 * 1. 定調——「畏罪自殺」
 * 2. Wecht 的獨立調查
 * 3. 真相壓制（懲罰、妨礙、升官）
 * 4. 秘密實驗——排除自殺
 * 5. 漫長的調查之路
 */
export function Chapter06() {
  const [s1, s2, s3, s4, s5] = data.sections

  return (
    <article aria-label="第六章：追尋真相">
      <ChapterTitle
        chapter={6}
        title="追尋真相"
        timeRange="1981–2020"
        mood="憤怒與無力交織——系統性的真相壓制"
      />

      {/* 第一段：定調——「畏罪自殺」 */}
      <ScrollSection aria-label="官方定調">
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

      {/* 第二段：Wecht 的獨立調查 */}
      <ScrollSection aria-label="Wecht 的獨立調查">
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

      {/* PIXEL_SCENE: wecht-arrival */}
      <ScrollSection minHeight="80vh" aria-label="Wecht 抵台場景">
        {(progress, isInView) => (
          <div className="flex items-center justify-center min-h-[80vh]">
            {/* WechtArrivalScene 元件：Task 4.8 實作 */}
            <div
              className="text-ink-600 font-mono text-sm"
              style={{ opacity: isInView ? 0.5 : 0, transition: 'opacity 0.6s' }}
            >
              [ wecht-arrival scene · progress: {progress.toFixed(2)} ]
            </div>
          </div>
        )}
      </ScrollSection>

      {/* 第三、四、五段：懲罰、妨礙、升官 */}
      <ScrollSection aria-label="真相壓制">
        {(_progress, isInView) => (
          <div
            className="max-w-2xl mx-auto px-4 py-16"
            style={{ opacity: isInView ? 1 : 0, transition: 'opacity 0.6s' }}
          >
            {s3.paragraphs.map((p, i) => (
              <NarrativeParagraph key={i} paragraph={p} />
            ))}
          </div>
        )}
      </ScrollSection>

      {/* 第六段：秘密實驗——排除自殺 */}
      <ScrollSection aria-label="明園專案">
        {(_progress, isInView) => (
          <div
            className="max-w-2xl mx-auto px-4 py-16"
            style={{ opacity: isInView ? 1 : 0, transition: 'opacity 0.6s' }}
          >
            {s4.paragraphs.map((p, i) => (
              <NarrativeParagraph key={i} paragraph={p} />
            ))}
          </div>
        )}
      </ScrollSection>

      {/* 第七段：漫長的調查之路 */}
      <ScrollSection aria-label="漫長的調查之路">
        {(_progress, isInView) => (
          <div
            className="max-w-2xl mx-auto px-4 py-16"
            style={{ opacity: isInView ? 1 : 0, transition: 'opacity 0.6s' }}
          >
            {s5.paragraphs.map((p, i) => (
              <NarrativeParagraph key={i} paragraph={p} />
            ))}
          </div>
        )}
      </ScrollSection>

      {/* INFOGRAPHIC: investigation-waves */}
      <ScrollSection minHeight="60vh" aria-label="七波調查比較表">
        {(progress, isInView) => (
          <div className="max-w-5xl mx-auto px-4 py-16">
            {/* InvestigationWaves 元件：Task 4.7 實作 */}
            <div
              className="text-ink-600 font-mono text-sm text-center"
              style={{ opacity: isInView ? 0.5 : 0, transition: 'opacity 0.6s' }}
            >
              [ investigation-waves · progress: {progress.toFixed(2)} ]
            </div>
          </div>
        )}
      </ScrollSection>
    </article>
  )
}
