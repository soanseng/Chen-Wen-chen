import { ChapterTitle } from '@/components/narrative/ChapterTitle'
import { ScrollSection } from '@/components/narrative/ScrollSection'

/**
 * 第二章：海外的聲音（1978–1981）
 * 情緒基調：從熱忱轉向不安——暗潮湧動
 * Pixel Art 場景：surveillance-web
 * 資訊圖表：surveillance-timeline
 */
export function Chapter02() {
  return (
    <article aria-label="第二章：海外的聲音">
      <ChapterTitle
        chapter={2}
        title="海外的聲音"
        timeRange="1978–1981"
        mood="從熱忱轉向不安——暗潮湧動"
      />

      {/* 美麗島雜誌與海外運動 */}
      <ScrollSection aria-label="美麗島雜誌與海外運動">
        {(_progress, isInView) => (
          <div
            className="max-w-2xl mx-auto px-4 py-16"
            style={{ opacity: isInView ? 1 : 0, transition: 'opacity 0.6s' }}
          >
            {/* 敘事內容：Task 4.2 填入 */}
            <p className="text-ink-200 leading-relaxed text-lg">
              {/* ch02 section 1 — 美麗島雜誌、募款 */}
            </p>
          </div>
        )}
      </ScrollSection>

      {/* INFOGRAPHIC: surveillance-timeline */}
      <ScrollSection minHeight="60vh" aria-label="彩虹資料監控時間線">
        {(progress, isInView) => (
          <div className="max-w-4xl mx-auto px-4 py-16">
            {/* SurveillanceTimeline 元件：Task 4.3 實作 */}
            <div
              className="text-ink-600 font-mono text-sm text-center"
              style={{ opacity: isInView ? 0.5 : 0, transition: 'opacity 0.6s' }}
            >
              [ surveillance-timeline · progress: {progress.toFixed(2)} ]
            </div>
          </div>
        )}
      </ScrollSection>

      {/* PIXEL_SCENE: surveillance-web */}
      <ScrollSection minHeight="80vh" aria-label="跨太平洋監控網場景">
        {(progress, isInView) => (
          <div className="flex items-center justify-center min-h-[80vh]">
            {/* SurveillanceWebScene 元件：Task 4.8 實作 */}
            <div
              className="text-ink-600 font-mono text-sm"
              style={{ opacity: isInView ? 0.5 : 0, transition: 'opacity 0.6s' }}
            >
              [ surveillance-web scene · progress: {progress.toFixed(2)} ]
            </div>
          </div>
        )}
      </ScrollSection>

      {/* 時代背景：美麗島事件、林宅血案 */}
      <ScrollSection aria-label="時代背景">
        {(_progress, isInView) => (
          <div
            className="max-w-2xl mx-auto px-4 py-16"
            style={{ opacity: isInView ? 1 : 0, transition: 'opacity 0.6s' }}
          >
            {/* 敘事內容：Task 4.2 填入 */}
            <p className="text-ink-200 leading-relaxed text-lg">
              {/* ch02 section 2 — 美麗島事件、林宅血案 */}
            </p>
          </div>
        )}
      </ScrollSection>
    </article>
  )
}
