import { ChapterTitle } from '@/components/narrative/ChapterTitle'
import { ScrollSection } from '@/components/narrative/ScrollSection'

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
        {(_progress, isInView) => (
          <div
            className="max-w-2xl mx-auto px-4 py-16"
            style={{ opacity: isInView ? 1 : 0, transition: 'opacity 0.6s' }}
          >
            {/* 敘事內容：Task 4.2 填入 */}
            <p className="text-ink-200 leading-relaxed text-lg">
              {/* ch04 section 1 — 05:00 打籃球、07:45 電話、08:30 被帶走 */}
            </p>
          </div>
        )}
      </ScrollSection>

      {/* INFOGRAPHIC: july-hourly-timeline（續） */}
      <ScrollSection minHeight="60vh" aria-label="七月逐時時間線（續）">
        {(progress, isInView) => (
          <div className="max-w-4xl mx-auto px-4 py-16">
            {/* HourlyTimeline 元件：Task 4.3 實作 */}
            <div
              className="text-ink-600 font-mono text-sm text-center"
              style={{ opacity: isInView ? 0.5 : 0, transition: 'opacity 0.6s' }}
            >
              [ july-hourly-timeline (part 2) · progress: {progress.toFixed(2)} ]
            </div>
          </div>
        )}
      </ScrollSection>

      {/* PIXEL_SCENE: interrogation-room */}
      <ScrollSection minHeight="80vh" aria-label="審訊室場景">
        {(progress, isInView) => (
          <div className="flex items-center justify-center min-h-[80vh]">
            {/* InterrogationRoomScene 元件：Task 4.8 實作 */}
            {/* 與 DialogueBox 連動 */}
            <div
              className="text-ink-600 font-mono text-sm"
              style={{ opacity: isInView ? 0.5 : 0, transition: 'opacity 0.6s' }}
            >
              [ interrogation-room scene · progress: {progress.toFixed(2)} ]
            </div>
          </div>
        )}
      </ScrollSection>

      {/* 第二段：保安處——十二個小時 */}
      <ScrollSection aria-label="保安處——十二個小時">
        {(_progress, isInView) => (
          <div
            className="max-w-2xl mx-auto px-4 py-16"
            style={{ opacity: isInView ? 1 : 0, transition: 'opacity 0.6s' }}
          >
            {/* 敘事內容（含 DialogueBox）：Task 4.2 填入 */}
            <p className="text-ink-200 leading-relaxed text-lg">
              {/* ch04 section 2 — 十二小時審訊、錄音、矛盾說法 */}
            </p>
          </div>
        )}
      </ScrollSection>

      {/* INFOGRAPHIC: testimony-comparison */}
      <ScrollSection minHeight="60vh" aria-label="證詞矛盾對照表">
        {(progress, isInView) => (
          <div className="max-w-5xl mx-auto px-4 py-16">
            {/* TestimonyComparison 元件：Task 4.5 實作 */}
            <div
              className="text-ink-600 font-mono text-sm text-center"
              style={{ opacity: isInView ? 0.5 : 0, transition: 'opacity 0.6s' }}
            >
              [ testimony-comparison · progress: {progress.toFixed(2)} ]
            </div>
          </div>
        )}
      </ScrollSection>

      {/* 第三段：空白的六小時 */}
      <ScrollSection aria-label="空白的六小時">
        {(_progress, isInView) => (
          <div
            className="max-w-2xl mx-auto px-4 py-16"
            style={{ opacity: isInView ? 1 : 0, transition: 'opacity 0.6s' }}
          >
            {/* 敘事內容：Task 4.2 填入 */}
            <p className="text-ink-200 leading-relaxed text-lg">
              {/* ch04 section 3 — 空白的六小時、五名證人矛盾 */}
            </p>
          </div>
        )}
      </ScrollSection>

      {/* PIXEL_SCENE: blank-hours */}
      <ScrollSection minHeight="80vh" aria-label="空白的六小時場景">
        {(progress, isInView) => (
          <div className="flex items-center justify-center min-h-[80vh]">
            {/* BlankHoursScene 元件：Task 4.8 實作 */}
            <div
              className="text-ink-600 font-mono text-sm"
              style={{ opacity: isInView ? 0.5 : 0, transition: 'opacity 0.6s' }}
            >
              [ blank-hours scene · progress: {progress.toFixed(2)} ]
            </div>
          </div>
        )}
      </ScrollSection>
    </article>
  )
}
