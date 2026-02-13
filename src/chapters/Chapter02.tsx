import { ChapterTitle } from '@/components/narrative/ChapterTitle'
import { ScrollSection } from '@/components/narrative/ScrollSection'
import { NarrativeParagraph } from '@/components/narrative/NarrativeParagraph'
import { SurveillanceTimeline } from '@/components/infographic/SurveillanceTimeline'
import chapterData from '@/data/chapters/ch02.json'
import type { ChapterData } from '@/data/chapters/types'

const data = chapterData as ChapterData

/**
 * 第二章：海外的聲音（1978–1981）
 * 情緒基調：從熱忱轉向不安——暗潮湧動
 * Pixel Art 場景：surveillance-web
 * 資訊圖表：surveillance-timeline
 */
export function Chapter02() {
  const [s1, s2] = data.sections

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
            {s1.paragraphs.map((p, i) => (
              <NarrativeParagraph key={i} paragraph={p} />
            ))}
          </div>
        )}
      </ScrollSection>

      {/* INFOGRAPHIC: surveillance-timeline */}
      <ScrollSection minHeight="60vh" aria-label="彩虹資料監控時間線">
        {(progress, isInView) => (
          <div className="max-w-4xl mx-auto px-4 py-16">
            <SurveillanceTimeline progress={progress} isInView={isInView} />
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

      {/* 監控與時代背景 */}
      <ScrollSection aria-label="監控與時代背景">
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
    </article>
  )
}
