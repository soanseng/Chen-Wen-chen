import { ChapterTitle } from '@/components/narrative/ChapterTitle'
import { ScrollSection } from '@/components/narrative/ScrollSection'

/**
 * 第七章：未完的故事（2020—）
 * 情緒基調：沉重但開放——留給讀者的問題
 * 無 Pixel Art 場景、無資訊圖表
 */
export function Chapter07() {
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
            {/* 敘事內容：Task 4.2 填入 */}
            <p className="text-ink-200 leading-relaxed text-lg">
              {/* ch07 section 1 — 四大結論 */}
            </p>
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
            {/* 敘事內容：Task 4.2 填入 */}
            <p className="text-ink-200 leading-relaxed text-lg">
              {/* ch07 section 2 — 威權妨礙、證據湮滅 */}
            </p>
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
            {/* 敘事內容：Task 4.2 填入 */}
            <p className="text-ink-200 leading-relaxed text-lg">
              {/* ch07 section 3 — 政權維穩、未解的問題 */}
            </p>
          </div>
        )}
      </ScrollSection>

      {/* 結語留白 */}
      <div className="h-[30vh]" />
    </article>
  )
}
