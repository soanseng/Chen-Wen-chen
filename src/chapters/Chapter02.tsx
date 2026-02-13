import { ChapterTitle } from '@/components/narrative/ChapterTitle'
import { ScrollSection } from '@/components/narrative/ScrollSection'
import { NarrativeParagraph } from '@/components/narrative/NarrativeParagraph'
import { SurveillanceTimeline } from '@/components/infographic/SurveillanceTimeline'
import { SurveillanceWebScene, ReadingFormosaScene } from '@/components/pixel/scenes'
import { staggeredFadeIn } from '@/utils/animation'
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
    <article id="chapter-2" aria-label="第二章：海外的聲音">
      <ChapterTitle
        chapter={2}
        title="海外的聲音"
        timeRange="1978–1981"
        mood="從熱忱轉向不安——暗潮湧動"
      />

      {/* 美麗島雜誌與海外運動 */}
      <ScrollSection aria-label="美麗島雜誌與海外運動">
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

      {/* INFOGRAPHIC: surveillance-timeline */}
      <ScrollSection minHeight="60vh" aria-label="彩虹資料監控時間線">
        {(progress, isInView) => (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
            <SurveillanceTimeline progress={progress} isInView={isInView} />
          </div>
        )}
      </ScrollSection>

      {/* PIXEL_SCENE: surveillance-web */}
      <ScrollSection minHeight="80vh" aria-label="跨太平洋監控網場景">
        {(progress, isInView) => (
          <div className="flex items-center justify-center min-h-[60vh] sm:min-h-[80vh] px-4">
            <SurveillanceWebScene progress={progress} isInView={isInView} />
          </div>
        )}
      </ScrollSection>

      {/* PIXEL_SCENE: reading-formosa */}
      <ScrollSection minHeight="80vh" aria-label="閱讀美麗島雜誌場景">
        {(progress, isInView) => (
          <div className="flex items-center justify-center min-h-[60vh] sm:min-h-[80vh] px-4">
            <ReadingFormosaScene progress={progress} isInView={isInView} />
          </div>
        )}
      </ScrollSection>

      {/* 監控與時代背景 */}
      <ScrollSection aria-label="監控與時代背景">
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
    </article>
  )
}
