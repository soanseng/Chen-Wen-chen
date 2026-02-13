import { ChapterTitle } from '@/components/narrative/ChapterTitle'
import { ScrollSection } from '@/components/narrative/ScrollSection'
import { NarrativeParagraph } from '@/components/narrative/NarrativeParagraph'
import { CampusLifeScene } from '@/components/pixel/scenes'
import { staggeredFadeIn } from '@/utils/animation'
import chapterData from '@/data/chapters/ch01.json'
import type { ChapterData } from '@/data/chapters/types'

const data = chapterData as ChapterData

/**
 * 第一章：學者之路（1950–1978）
 * 情緒基調：溫暖、希望、平靜
 * Pixel Art 場景：campus-life
 */
export function Chapter01() {
  const [s1, s2] = data.sections

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
        {(progress) => (
          <div className="max-w-2xl mx-auto px-4 py-16">
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

      {/* PIXEL_SCENE: campus-life */}
      <ScrollSection minHeight="80vh" aria-label="Carnegie Mellon 校園場景">
        {(progress, isInView) => (
          <div className="flex items-center justify-center min-h-[80vh] px-4">
            <CampusLifeScene progress={progress} isInView={isInView} />
          </div>
        )}
      </ScrollSection>

      {/* 赴美求學與學術成就 */}
      <ScrollSection aria-label="赴美求學與學術成就">
        {(progress) => (
          <div className="max-w-2xl mx-auto px-4 py-16">
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
