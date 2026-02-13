import { ChapterTitle } from '@/components/narrative/ChapterTitle'
import { ScrollSection } from '@/components/narrative/ScrollSection'
import { NarrativeParagraph } from '@/components/narrative/NarrativeParagraph'
import { InvestigationWaves } from '@/components/infographic/InvestigationWaves'
import { WechtArrivalScene, SecretExperimentScene } from '@/components/pixel/scenes'
import { staggeredFadeIn } from '@/utils/animation'
import chapterData from '@/data/chapters/ch06.json'
import type { ChapterData } from '@/data/chapters/types'

const data = chapterData as ChapterData

/**
 * 第六章：追尋真相（1981–2020）
 * 情緒基調：憤怒與無力交織——系統性的真相壓制
 * Pixel Art 場景：wecht-arrival
 * 資訊圖表：investigation-waves
 *
 * 五段式結構（合併七段為五段）：
 * 1. 定調——「畏罪自殺」
 * 2. Wecht 的獨立調查
 * 3. 真相壓制（懲罰、妨礙、升官）
 * 4. 秘密實驗——排除自殺
 * 5. 漫長的調查之路
 */
export function Chapter06() {
  const [s1, s2, s3, s4, s5] = data.sections

  return (
    <article id="chapter-6" aria-label="第六章：追尋真相">
      <ChapterTitle
        chapter={6}
        title="追尋真相"
        timeRange="1981–2020"
        mood="憤怒與無力交織——系統性的真相壓制"
      />

      {/* 第一段：定調——「畏罪自殺」 */}
      <ScrollSection aria-label="官方定調">
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

      {/* 第二段：Wecht 的獨立調查 */}
      <ScrollSection aria-label="Wecht 的獨立調查">
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

      {/* PIXEL_SCENE: wecht-arrival */}
      <ScrollSection minHeight="80vh" aria-label="Wecht 抵台場景">
        {(progress, isInView) => (
          <div className="flex items-center justify-center min-h-[60vh] sm:min-h-[80vh] px-4">
            <WechtArrivalScene progress={progress} isInView={isInView} />
          </div>
        )}
      </ScrollSection>

      {/* 第三、四、五段：懲罰、妨礙、升官 */}
      <ScrollSection aria-label="真相壓制">
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

      {/* 第六段：秘密實驗——排除自殺 */}
      <ScrollSection aria-label="明園專案">
        {(progress) => (
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
            {s4.paragraphs.map((p, i) => (
              <div
                key={i}
                className="scroll-animated"
                style={staggeredFadeIn(progress, i, s4.paragraphs.length)}
              >
                <NarrativeParagraph paragraph={p} />
              </div>
            ))}
          </div>
        )}
      </ScrollSection>

      {/* PIXEL_SCENE: secret-experiment */}
      <ScrollSection minHeight="80vh" aria-label="明園專案秘密實驗場景">
        {(progress, isInView) => (
          <div className="flex items-center justify-center min-h-[60vh] sm:min-h-[80vh] px-4">
            <SecretExperimentScene progress={progress} isInView={isInView} />
          </div>
        )}
      </ScrollSection>

      {/* 第七段：漫長的調查之路 */}
      <ScrollSection aria-label="漫長的調查之路">
        {(progress) => (
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
            {s5.paragraphs.map((p, i) => (
              <div
                key={i}
                className="scroll-animated"
                style={staggeredFadeIn(progress, i, s5.paragraphs.length)}
              >
                <NarrativeParagraph paragraph={p} />
              </div>
            ))}
          </div>
        )}
      </ScrollSection>

      {/* INFOGRAPHIC: investigation-waves */}
      <ScrollSection minHeight="60vh" aria-label="七波調查比較表">
        {(progress, isInView) => (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
            <InvestigationWaves
              progress={progress}
              isInView={isInView}
            />
          </div>
        )}
      </ScrollSection>
    </article>
  )
}
