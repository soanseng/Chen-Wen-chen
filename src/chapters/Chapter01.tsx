import { ChapterTitle } from '@/components/narrative/ChapterTitle'
import { ScrollSection } from '@/components/narrative/ScrollSection'

/**
 * 第一章：學者之路（1950–1978）
 * 情緒基調：溫暖、希望、平靜
 * Pixel Art 場景：campus-life
 */
export function Chapter01() {
  return (
    <article aria-label="第一章：學者之路">
      <ChapterTitle
        chapter={1}
        title="學者之路"
        timeRange="1950–1978"
        mood="溫暖、希望、平靜"
      />

      {/* 成長背景 */}
      <ScrollSection aria-label="成長背景">
        {(_progress, isInView) => (
          <div
            className="max-w-2xl mx-auto px-4 py-16"
            style={{ opacity: isInView ? 1 : 0, transition: 'opacity 0.6s' }}
          >
            {/* 敘事內容：Task 4.2 填入 */}
            <p className="text-ink-200 leading-relaxed text-lg">
              {/* ch01 section 1 — 林口童年 */}
            </p>
          </div>
        )}
      </ScrollSection>

      {/* PIXEL_SCENE: campus-life */}
      <ScrollSection minHeight="80vh" aria-label="Carnegie Mellon 校園場景">
        {(progress, isInView) => (
          <div className="flex items-center justify-center min-h-[80vh]">
            {/* CampusLifeScene 元件：Task 4.8 實作 */}
            <div
              className="text-ink-600 font-mono text-sm"
              style={{ opacity: isInView ? 0.5 : 0, transition: 'opacity 0.6s' }}
            >
              [ campus-life scene · progress: {progress.toFixed(2)} ]
            </div>
          </div>
        )}
      </ScrollSection>

      {/* 赴美求學與學術成就 */}
      <ScrollSection aria-label="赴美求學與學術成就">
        {(_progress, isInView) => (
          <div
            className="max-w-2xl mx-auto px-4 py-16"
            style={{ opacity: isInView ? 1 : 0, transition: 'opacity 0.6s' }}
          >
            {/* 敘事內容：Task 4.2 填入 */}
            <p className="text-ink-200 leading-relaxed text-lg">
              {/* ch01 section 2 — 赴美、博士、CMU 助理教授 */}
            </p>
          </div>
        )}
      </ScrollSection>
    </article>
  )
}
