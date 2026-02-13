import { ChapterTitle } from '@/components/narrative/ChapterTitle'
import { ScrollSection } from '@/components/narrative/ScrollSection'

/**
 * 第五章：陳屍台大（1981年7月3日）
 * 情緒基調：冷靜客觀的法醫語言——以克制呈現沉重
 * Pixel Art 場景：library-dawn
 * 資訊圖表：library-building, injury-diagram, crime-scene-map, six-doubts
 *
 * 六段式結構：
 * 1. 清晨的發現
 * 2. 遺體姿態的矛盾
 * 3. 衣著異常
 * 4. 傷痕分析
 * 5. 關鍵疑點（六大疑點）
 * 6. 死因研判
 */
export function Chapter05() {
  return (
    <article aria-label="第五章：陳屍台大">
      <ChapterTitle
        chapter={5}
        title="陳屍台大"
        timeRange="1981年7月3日"
        mood="冷靜客觀的法醫語言——以克制呈現沉重"
      />

      {/* PIXEL_SCENE: library-dawn */}
      <ScrollSection minHeight="80vh" aria-label="台大研究生圖書館旁清晨場景">
        {(progress, isInView) => (
          <div className="flex items-center justify-center min-h-[80vh]">
            {/* LibraryDawnScene 元件：Task 4.8 實作 */}
            <div
              className="text-ink-600 font-mono text-sm"
              style={{ opacity: isInView ? 0.5 : 0, transition: 'opacity 0.6s' }}
            >
              [ library-dawn scene · progress: {progress.toFixed(2)} ]
            </div>
          </div>
        )}
      </ScrollSection>

      {/* 第一段：清晨的發現 */}
      <ScrollSection aria-label="清晨的發現">
        {(_progress, isInView) => (
          <div
            className="max-w-2xl mx-auto px-4 py-16"
            style={{ opacity: isInView ? 1 : 0, transition: 'opacity 0.6s' }}
          >
            {/* 敘事內容：Task 4.2 填入 */}
            <p className="text-ink-200 leading-relaxed text-lg">
              {/* ch05 section 1 — 校警電話、發現遺體 */}
            </p>
          </div>
        )}
      </ScrollSection>

      {/* INFOGRAPHIC: library-building */}
      <ScrollSection minHeight="60vh" aria-label="研究生圖書館建築剖面圖">
        {(progress, isInView) => (
          <div className="max-w-4xl mx-auto px-4 py-16">
            {/* LibraryBuilding 元件：Task 4.6 實作 */}
            <div
              className="text-ink-600 font-mono text-sm text-center"
              style={{ opacity: isInView ? 0.5 : 0, transition: 'opacity 0.6s' }}
            >
              [ library-building diagram · progress: {progress.toFixed(2)} ]
            </div>
          </div>
        )}
      </ScrollSection>

      {/* 第二、三段：遺體姿態的矛盾 & 衣著異常 */}
      <ScrollSection aria-label="遺體姿態與衣著異常">
        {(_progress, isInView) => (
          <div
            className="max-w-2xl mx-auto px-4 py-16"
            style={{ opacity: isInView ? 1 : 0, transition: 'opacity 0.6s' }}
          >
            {/* 敘事內容：Task 4.2 填入 */}
            <p className="text-ink-200 leading-relaxed text-lg">
              {/* ch05 sections 2–3 */}
            </p>
          </div>
        )}
      </ScrollSection>

      {/* 第四段：傷痕分析 */}
      <ScrollSection aria-label="傷痕分析">
        {(_progress, isInView) => (
          <div
            className="max-w-2xl mx-auto px-4 py-16"
            style={{ opacity: isInView ? 1 : 0, transition: 'opacity 0.6s' }}
          >
            {/* 敘事內容：Task 4.2 填入 */}
            <p className="text-ink-200 leading-relaxed text-lg">
              {/* ch05 section 4 — 體內傷、體外傷 */}
            </p>
          </div>
        )}
      </ScrollSection>

      {/* INFOGRAPHIC: injury-diagram */}
      <ScrollSection minHeight="60vh" aria-label="傷痕位置人體圖">
        {(progress, isInView) => (
          <div className="max-w-4xl mx-auto px-4 py-16">
            {/* InjuryDiagram 元件：Task 4.6 實作 */}
            <div
              className="text-ink-600 font-mono text-sm text-center"
              style={{ opacity: isInView ? 0.5 : 0, transition: 'opacity 0.6s' }}
            >
              [ injury-diagram · progress: {progress.toFixed(2)} ]
            </div>
          </div>
        )}
      </ScrollSection>

      {/* 第五段：關鍵疑點 */}
      <ScrollSection aria-label="六大關鍵疑點">
        {(_progress, isInView) => (
          <div
            className="max-w-2xl mx-auto px-4 py-16"
            style={{ opacity: isInView ? 1 : 0, transition: 'opacity 0.6s' }}
          >
            {/* 敘事內容：Task 4.2 填入 */}
            <p className="text-ink-200 leading-relaxed text-lg">
              {/* ch05 section 5 — 六大疑點 */}
            </p>
          </div>
        )}
      </ScrollSection>

      {/* INFOGRAPHIC: six-doubts */}
      <ScrollSection minHeight="60vh" aria-label="六大疑點卡片">
        {(progress, isInView) => (
          <div className="max-w-4xl mx-auto px-4 py-16">
            {/* SixDoubts 元件：Task 4.6 實作 */}
            <div
              className="text-ink-600 font-mono text-sm text-center"
              style={{ opacity: isInView ? 0.5 : 0, transition: 'opacity 0.6s' }}
            >
              [ six-doubts · progress: {progress.toFixed(2)} ]
            </div>
          </div>
        )}
      </ScrollSection>

      {/* 第六段：死因研判 */}
      <ScrollSection aria-label="死因研判">
        {(_progress, isInView) => (
          <div
            className="max-w-2xl mx-auto px-4 py-16"
            style={{ opacity: isInView ? 1 : 0, transition: 'opacity 0.6s' }}
          >
            {/* 敘事內容：Task 4.2 填入 */}
            <p className="text-ink-200 leading-relaxed text-lg">
              {/* ch05 section 6 — Wecht 謀殺判定、促轉會結論 */}
            </p>
          </div>
        )}
      </ScrollSection>

      {/* INFOGRAPHIC: crime-scene-map */}
      <ScrollSection minHeight="60vh" aria-label="現場平面圖">
        {(progress, isInView) => (
          <div className="max-w-4xl mx-auto px-4 py-16">
            {/* CrimeSceneMap 元件：Task 4.6 實作 */}
            <div
              className="text-ink-600 font-mono text-sm text-center"
              style={{ opacity: isInView ? 0.5 : 0, transition: 'opacity 0.6s' }}
            >
              [ crime-scene-map · progress: {progress.toFixed(2)} ]
            </div>
          </div>
        )}
      </ScrollSection>
    </article>
  )
}
