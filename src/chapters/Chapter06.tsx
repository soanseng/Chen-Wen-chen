import { ChapterTitle } from '@/components/narrative/ChapterTitle'
import { ScrollSection } from '@/components/narrative/ScrollSection'

/**
 * 第六章：追尋真相（1981–2020）
 * 情緒基調：憤怒與無力交織——系統性的真相壓制
 * Pixel Art 場景：wecht-arrival
 * 資訊圖表：investigation-waves
 *
 * 七段式結構：
 * 1. 定調——「畏罪自殺」
 * 2. Wecht 的獨立調查
 * 3. 懲罰說真話的人
 * 4. 全面妨礙真相
 * 5. 升官——嫌疑方主管變偵辦主導者
 * 6. 秘密實驗——排除自殺
 * 7. 漫長的調查之路
 */
export function Chapter06() {
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
            {/* 敘事內容：Task 4.2 填入 */}
            <p className="text-ink-200 leading-relaxed text-lg">
              {/* ch06 section 1 — 警總記者會、檢察官偵查報告 */}
            </p>
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
            {/* 敘事內容：Task 4.2 填入 */}
            <p className="text-ink-200 leading-relaxed text-lg">
              {/* ch06 section 2 — Wecht 三天行程、記者會 */}
            </p>
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
            {/* 敘事內容：Task 4.2 填入 */}
            <p className="text-ink-200 leading-relaxed text-lg">
              {/* ch06 sections 3–5 — 記者周清月、投書操縱、汪敬煦升官 */}
            </p>
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
            {/* 敘事內容：Task 4.2 填入 */}
            <p className="text-ink-200 leading-relaxed text-lg">
              {/* ch06 section 6 — 明園專案、汪敬煦簽呈 */}
            </p>
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
            {/* 敘事內容：Task 4.2 填入 */}
            <p className="text-ink-200 leading-relaxed text-lg">
              {/* ch06 section 7 — 七波調查 */}
            </p>
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
