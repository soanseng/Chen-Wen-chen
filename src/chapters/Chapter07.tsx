import { ChapterTitle } from '@/components/narrative/ChapterTitle'
import { ScrollSection } from '@/components/narrative/ScrollSection'
import { NarrativeParagraph } from '@/components/narrative/NarrativeParagraph'
import chapterData from '@/data/chapters/ch07.json'
import type { ChapterData } from '@/data/chapters/types'

const data = chapterData as ChapterData

/**
 * 第七章：未完的故事（2020—）
 * 情緒基調：沉重但開放——留給讀者的問題
 * 無 Pixel Art 場景、無資訊圖表
 */
export function Chapter07() {
  const [s1, s2, s3] = data.sections

  return (
    <article aria-label="第七章：未完的故事">
      <ChapterTitle
        chapter={7}
        title="未完的故事"
        timeRange="2020—"
        mood="沉重但開放——留給讀者的問題"
      />

      {/* 促轉會的結論 */}
      <ScrollSection aria-label="促轉會的結論">
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

      {/* 真相為何難明 */}
      <ScrollSection aria-label="真相為何難明">
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

      {/* 整體評價——留白收尾 */}
      <ScrollSection aria-label="整體評價">
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

      {/* 結語留白 */}
      <div className="h-[30vh]" />
    </article>
  )
}
