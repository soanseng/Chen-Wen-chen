import { ChapterTitle } from '@/components/narrative/ChapterTitle'
import { ScrollSection } from '@/components/narrative/ScrollSection'
import { NarrativeParagraph } from '@/components/narrative/NarrativeParagraph'
import { MemorialScene } from '@/components/pixel/scenes'
import { staggeredFadeIn } from '@/utils/animation'
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
    <article id="chapter-7" aria-label="第七章：未完的故事">
      <ChapterTitle
        chapter={7}
        title="未完的故事"
        timeRange="2020—"
        mood="沉重但開放——留給讀者的問題"
      />

      {/* 促轉會的結論 */}
      <ScrollSection aria-label="促轉會的結論">
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

      {/* 真相為何難明 */}
      <ScrollSection aria-label="真相為何難明">
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

      {/* 整體評價——留白收尾 */}
      <ScrollSection aria-label="整體評價">
        {(progress) => (
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
            {s3.paragraphs.map((p, i) => (
              <div
                key={i}
                className="scroll-animated"
                style={staggeredFadeIn(progress, i, s3.paragraphs.length)}
              >
                <NarrativeParagraph paragraph={p} />
              </div>
            ))}
          </div>
        )}
      </ScrollSection>

      {/* PIXEL_SCENE: memorial */}
      <ScrollSection minHeight="80vh" aria-label="陳文成紀念廣場場景">
        {(progress, isInView) => (
          <div className="flex items-center justify-center min-h-[60vh] sm:min-h-[80vh] px-4">
            <MemorialScene progress={progress} isInView={isInView} />
          </div>
        )}
      </ScrollSection>

      {/* 結語留白 */}
      <div className="h-[30vh]" />
    </article>
  )
}
