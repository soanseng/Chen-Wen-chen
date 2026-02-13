import { ChapterTitle } from '@/components/narrative/ChapterTitle'
import { ScrollSection } from '@/components/narrative/ScrollSection'
import { NarrativeParagraph } from '@/components/narrative/NarrativeParagraph'
import { DialogueBox } from '@/components/narrative/DialogueBox'
import { HourlyTimeline } from '@/components/infographic/HourlyTimeline'
import { TestimonyComparison } from '@/components/infographic/TestimonyComparison'
import { InterrogationRoomScene, BlankHoursScene } from '@/components/pixel/scenes'
import { staggeredFadeIn } from '@/utils/animation'
import chapterData from '@/data/chapters/ch04.json'
import type { ChapterData } from '@/data/chapters/types'

const data = chapterData as ChapterData

/**
 * 第四章：約談（1981年7月2日）
 * 情緒基調：壓迫、恐懼、空白——時間感凝滯
 * Pixel Art 場景：interrogation-room, blank-hours
 * 資訊圖表：testimony-comparison, july-hourly-timeline（續）
 *
 * 三段式結構：
 * 1. 清晨——被帶走（05:00–08:30）
 * 2. 保安處——十二個小時（08:30–~21:30）
 * 3. 晚間——空白的六小時（~21:30–翌日07:00）
 */
export function Chapter04() {
  const [s1, s2, s3] = data.sections

  return (
    <article aria-label="第四章：約談">
      <ChapterTitle
        chapter={4}
        title="約談"
        timeRange="1981年7月2日"
        mood="壓迫、恐懼、空白——時間感凝滯"
      />

      {/* 第一段：清晨——被帶走 */}
      <ScrollSection aria-label="清晨——被帶走">
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

      {/* INFOGRAPHIC: july-hourly-timeline（續） */}
      <ScrollSection minHeight="60vh" aria-label="七月逐時時間線（續）">
        {(progress, isInView) => (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
            <HourlyTimeline phase={2} progress={progress} isInView={isInView} />
          </div>
        )}
      </ScrollSection>

      {/* PIXEL_SCENE: interrogation-room */}
      <ScrollSection minHeight="80vh" aria-label="審訊室場景">
        {(progress, isInView) => (
          <div className="flex items-center justify-center min-h-[60vh] sm:min-h-[80vh] px-4">
            <InterrogationRoomScene progress={progress} isInView={isInView} />
          </div>
        )}
      </ScrollSection>

      {/* 第二段：保安處——十二個小時 */}
      <ScrollSection aria-label="保安處——十二個小時">
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

            {/* 審訊對話 */}
            {s2.dialogue && (
              <div className="my-8">
                <DialogueBox lines={s2.dialogue} progress={progress} />
                <p className="text-ink-500 text-xs mt-2 text-right font-mono">
                  （來源：促轉會調查報告，第59–61頁）
                </p>
              </div>
            )}
          </div>
        )}
      </ScrollSection>

      {/* INFOGRAPHIC: testimony-comparison */}
      <ScrollSection minHeight="60vh" aria-label="證詞矛盾對照表">
        {(progress, isInView) => (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
            <TestimonyComparison progress={progress} isInView={isInView} />
          </div>
        )}
      </ScrollSection>

      {/* 第三段：空白的六小時 */}
      <ScrollSection aria-label="空白的六小時">
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

      {/* PIXEL_SCENE: blank-hours */}
      <ScrollSection minHeight="80vh" aria-label="空白的六小時場景">
        {(progress, isInView) => (
          <div className="flex items-center justify-center min-h-[60vh] sm:min-h-[80vh] px-4">
            <BlankHoursScene progress={progress} isInView={isInView} />
          </div>
        )}
      </ScrollSection>
    </article>
  )
}
