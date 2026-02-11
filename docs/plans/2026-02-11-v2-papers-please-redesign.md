# V2 Papers, Please 風格重新設計

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 將陳文成事件遊戲從「閱讀器 + 解謎」重新設計為 Papers, Please 風格的互動調查桌面遊戲，以歷史體驗與理解為核心。

**Architecture:** 保留 React + Vite + TailwindCSS 作為文字與互動層，PixiJS 升級為視覺主力（桌面場景、像素風資產、印章動畫）。核心機制從「標記段落觸發矛盾」改為「閱讀即發現」——讀完兩份相關文件後自動呈現矛盾，搭配完整的歷史解讀面板。手機優先的觸控設計。

**Tech Stack:** React 19 / Vite 7 / TailwindCSS 4 / PixiJS 8 / TypeScript 5.9

---

## 設計核心：為什麼像 Papers, Please

| Papers, Please | 陳文成事件 v2 |
|---|---|
| 你是邊境檢查官 | 你是現代研究員翻閱解密檔案 |
| 比對護照與規定，找出不符 | 比對不同文件，發現矛盾 |
| 蓋章決定（核准/拒絕）| 蓋章記入推理簿（判斷歷史真相）|
| 桌面上散佈文件 | 研究桌上散佈檔案 |
| 每天新規則＝漸進複雜度 | 每章新文件＝漸進揭露真相 |
| 永遠做不完的工作 | 永遠填不滿的推理簿 |
| 機械式操作中感受道德重量 | 閱讀中感受歷史的沉重 |

**關鍵差異**：Papers, Please 用時間壓力製造緊張；本遊戲用「資訊匱乏」製造張力——你知道有 16 個矛盾但有些永遠無解，推理簿有 4 格永遠空白。不趕時間，但永遠不夠。

---

## 畫面設計

### 主畫面：研究桌（Research Desk）

```
┌─────────────────────────────┐
│ 第一章：監視之網          📓│  ← 章節標題 + 推理簿入口
├─────────────────────────────┤
│ ░░░░░░░░ PixiJS 桌面 ░░░░░░│
│                              │
│  ┌─────┐ ┌─────┐ ┌─────┐   │  ← 文件卡片（像素風紙張）
│  │ 監聽 │ │ 攔信 │ │ 安定 │   │     未讀＝封口  已讀＝翻開
│  │ 紀錄 │ │ 紀錄 │ │ 小組 │   │     鎖定＝黑色塗抹
│  │  ✓  │ │ NEW │ │  ✓  │   │
│  └─────┘ └─────┘ └─────┘   │
│  ┌─────┐ ┌─────┐           │
│  │ 報告 │ │ 通話 │           │
│  │  表  │ │ 監聽 │           │
│  │ NEW │ │  🔒 │           │
│  └─────┘ └─────┘           │
│                              │
│  ┌── 調查進度 ───────────┐  │
│  │ ▸ 已發現矛盾：1／2    │  │
│  │ ▸ 繼續閱讀檔案……      │  │
│  └───────────────────────┘  │
├─────────────────────────────┤
│     📁 檔案    📓 推理簿    │  ← 底部導航列
└─────────────────────────────┘
```

### 文件閱讀（Bottom Sheet）

```
┌─────────────────────────────┐
│ ░░░░░░（桌面透視）░░░░░░░░░│  ← 桌面被壓暗
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│┌───────────────────────────┐│
││ ← 返回        DOC-SUR-03 ││  ← 文件從底部滑上
││───────────────────────────││
││ 【極機密】                ││
││ 警總〈報告表〉            ││
││                           ││
││ （可捲動的文件內容）      ││  ← 段落可點擊標記（選配）
││                           ││
│└───────────────────────────┘│
└─────────────────────────────┘
```

### 發現面板（Discovery Panel）

```
┌─────────────────────────────┐
│                              │
│  ╔═══ 發現矛盾 ═══════════╗│
│  ║                          ║│
│  ║  境管局通知 vs           ║│
│  ║  警總約談的共謀          ║│
│  ║                          ║│
│  ║  ┌─ 出境管制文件 ──────┐║│
│  ║  │「境管局致電……        │║│
│  ║  │ 在家等候電話」       │║│
│  ║  └─────────────────────┘║│
│  ║           ⇅ 矛盾         ║│
│  ║  ┌─ 警總報告表 ────────┐║│
│  ║  │「遂假藉境管局        │║│
│  ║  │ 人員名義進行約談」   │║│
│  ║  └─────────────────────┘║│
│  ║                          ║│
│  ║  ── 解讀 ───────────── ║│
│  ║  境管局的電話不是行政通  ║│
│  ║  知，而是警總精心安排的  ║│
│  ║  約談佈局。陳文成在家中  ║│
│  ║  等候，毫不知情。        ║│
│  ║                          ║│
│  ║      [✦ 記入推理簿]     ║│
│  ╚══════════════════════════╝│
│                              │
└─────────────────────────────┘
```

---

## Phase A：自動發現系統（取代手動標記觸發）

### Task 1：擴充矛盾資料結構

**Files:**
- Modify: `src/types/index.ts`
- Modify: `src/data/contradictions.ts`

**目標：** 每個矛盾新增 `quoteA`、`quoteB`、`explanation` 欄位，供發現面板顯示。

**Step 1：更新 ContradictionDef 型別**

在 `src/types/index.ts` 的 `ContradictionDef` 介面新增：

```typescript
export interface ContradictionDef {
  // ...existing fields...

  /** 發現面板顯示用 */
  display: {
    quoteA: { docTitle: string; text: string }
    quoteB: { docTitle: string; text: string }
    explanation: string
  }
}
```

**Step 2：為所有 17 個矛盾填入 display 資料**

在 `src/data/contradictions.ts` 為每個矛盾新增 `display` 欄位，引用對應段落的關鍵句與歷史解讀。

範例（C-03）：
```typescript
display: {
  quoteA: {
    docTitle: '出境管制相關文件',
    text: '境管局致電陳文成胞弟住處，通知陳文成於7月2日上午8時在家等候電話……',
  },
  quoteB: {
    docTitle: '警總〈報告表〉',
    text: '遂假藉境管局人員名義進行約談……',
  },
  explanation: '境管局的電話不是行政通知，而是警總精心安排的約談佈局。陳文成在家中等候的是出境許可的消息，來的卻是帶走他的人。',
}
```

**Step 3：Commit**

```bash
git add src/types/index.ts src/data/contradictions.ts
git commit -m "feat: 矛盾資料新增 display 欄位（引文＋歷史解讀）"
```

---

### Task 2：建立 DiscoveryPanel 元件

**Files:**
- Create: `src/components/DiscoveryPanel.tsx`

**目標：** 全螢幕覆蓋面板，以 Papers, Please 風格呈現矛盾發現。

```typescript
interface DiscoveryPanelProps {
  contradiction: ContradictionDef
  onAcknowledge: () => void
}
```

**設計重點：**
- 全螢幕半透明黑底覆蓋
- 中央卡片用 paper 色系背景＋邊框
- 兩段引文各用不同紙張底色區分
- 中間「⇅ 矛盾」符號分隔
- 底部「解讀」段落用較小字號、淡色
- 「記入推理簿」按鈕用 stamp 暗紅色
- 進場動畫：淡入 + 向上滑入
- 退場：點擊按鈕後淡出

**Step 1：建立元件**

```tsx
export default function DiscoveryPanel({ contradiction, onAcknowledge }: DiscoveryPanelProps) {
  const { display, name } = contradiction

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-fadeIn">
      <div className="mx-4 max-w-md w-full bg-paper-100 border-2 border-paper-400 rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-ink-800 px-5 py-3">
          <p className="text-paper-300 text-xs tracking-widest">發現矛盾</p>
          <h2 className="text-paper-50 text-lg font-serif font-semibold mt-1">{name}</h2>
        </div>

        <div className="p-5 space-y-4">
          {/* Quote A */}
          <div className="bg-paper-200 border-l-2 border-stamp-500 px-4 py-3 rounded-r">
            <p className="text-[10px] text-ink-400 font-mono mb-1">{display.quoteA.docTitle}</p>
            <p className="text-sm text-ink-700 font-serif leading-relaxed">
              「{display.quoteA.text}」
            </p>
          </div>

          {/* Contradiction indicator */}
          <p className="text-center text-stamp-500 text-lg font-bold">⇅</p>

          {/* Quote B */}
          <div className="bg-paper-200 border-l-2 border-ink-500 px-4 py-3 rounded-r">
            <p className="text-[10px] text-ink-400 font-mono mb-1">{display.quoteB.docTitle}</p>
            <p className="text-sm text-ink-700 font-serif leading-relaxed">
              「{display.quoteB.text}」
            </p>
          </div>

          {/* Explanation */}
          <div className="border-t border-paper-300 pt-3">
            <p className="text-xs text-ink-500 font-serif leading-relaxed">
              {display.explanation}
            </p>
          </div>

          {/* Acknowledge button */}
          <button
            onClick={onAcknowledge}
            className="w-full py-3 bg-stamp-500 text-paper-50 font-serif font-semibold rounded
                       hover:bg-stamp-600 active:bg-stamp-700 transition-colors"
          >
            ✦ 記入推理簿
          </button>
        </div>
      </div>
    </div>
  )
}
```

**Step 2：Commit**

```bash
git add src/components/DiscoveryPanel.tsx
git commit -m "feat: 建立 DiscoveryPanel 矛盾發現面板元件"
```

---

### Task 3：自動偵測邏輯（讀完即觸發）

**Files:**
- Modify: `src/hooks/useContradiction.ts`

**目標：** 新增 `checkReadBasedContradictions()` 函式，根據已讀文件自動偵測可觸發的矛盾。

```typescript
/**
 * 檢查已讀文件是否湊齊某個矛盾的兩份文件。
 * 回傳所有新觸發的矛盾（按 ID 排序）。
 */
export function checkReadBasedContradictions(
  readDocIds: Set<DocumentId>,
  alreadyTriggeredIds: Set<ContradictionId>,
): ContradictionDef[] {
  const results: ContradictionDef[] = []

  for (const contradiction of Object.values(CONTRADICTIONS)) {
    if (alreadyTriggeredIds.has(contradiction.id)) continue

    const docA = contradiction.triggers[0].docId
    const docB = contradiction.triggers[1].docId

    if (readDocIds.has(docA) && readDocIds.has(docB)) {
      results.push(contradiction)
    }
  }

  return results
}
```

**保留既有的手動標記觸發**作為 power-user 功能。

**Step 1：在 useContradiction.ts 新增函式**

**Step 2：Commit**

```bash
git add src/hooks/useContradiction.ts
git commit -m "feat: 新增 read-based 矛盾自動偵測"
```

---

### Task 4：整合自動偵測到 Orchestrator

**Files:**
- Modify: `src/hooks/useGameOrchestrator.ts`
- Modify: `src/components/common/Layout.tsx`

**目標：** 當文件被標記為已讀時，檢查是否有新矛盾可觸發。使用佇列逐一呈現發現面板。

**useGameOrchestrator 新增：**
- `discoveryQueue: ContradictionDef[]` 狀態
- `currentDiscovery: ContradictionDef | null` 狀態
- 監聽 `state.documents` 變化，呼叫 `checkReadBasedContradictions`
- 新發現時加入佇列
- 提供 `handleDiscoveryAcknowledge()` callback

**Layout 新增：**
- 渲染 `<DiscoveryPanel>` 覆蓋層

**Step 1：修改 useGameOrchestrator**

```typescript
// New state
const [discoveryQueue, setDiscoveryQueue] = useState<ContradictionDef[]>([])
const currentDiscovery = discoveryQueue[0] ?? null

// Watch for newly read documents
useEffect(() => {
  const readDocIds = new Set(
    Object.entries(state.documents)
      .filter(([, d]) => d?.read)
      .map(([id]) => id as DocumentId)
  )
  const alreadyTriggered = new Set(state.connections.map(c => c.id))

  const newContradictions = checkReadBasedContradictions(readDocIds, alreadyTriggered)

  if (newContradictions.length > 0) {
    setDiscoveryQueue(prev => {
      const existingIds = new Set(prev.map(c => c.id))
      const toAdd = newContradictions.filter(c => !existingIds.has(c.id))
      return [...prev, ...toAdd]
    })
  }
}, [state.documents, state.connections])

// Handle acknowledge
const handleDiscoveryAcknowledge = useCallback(() => {
  if (!currentDiscovery) return

  // Trigger the contradiction in game state
  triggerContradiction(
    currentDiscovery.id,
    ['auto', 'auto'],
    currentDiscovery.unlocks.documents,
    currentDiscovery.unlocks.notebookFields,
  )

  // Remove from queue
  setDiscoveryQueue(prev => prev.slice(1))
}, [currentDiscovery, triggerContradiction])
```

**Step 2：Layout 渲染 DiscoveryPanel**

```tsx
{currentDiscovery && (
  <DiscoveryPanel
    contradiction={currentDiscovery}
    onAcknowledge={handleDiscoveryAcknowledge}
  />
)}
```

**Step 3：Commit**

```bash
git add src/hooks/useGameOrchestrator.ts src/components/common/Layout.tsx
git commit -m "feat: 整合自動偵測＋發現面板佇列到遊戲流程"
```

---

### Task 5：移除舊的標記教學 UI

**Files:**
- Modify: `src/components/DocumentReader/DocumentReader.tsx`
- Modify: `src/components/FileBrowser/FileBrowser.tsx`

**目標：** 移除上一版加入的「點擊段落標記」教學提示和進度面板。段落標記功能保留（選配），但不再作為主要推進機制。

**DocumentReader：** 移除 `state.highlights.length < 3` 的教學提示區塊。

**FileBrowser：** 移除 `InvestigationHint` 元件，改為更簡潔的章節進度指示。

**Step 1：清理 DocumentReader 教學提示**

**Step 2：簡化 FileBrowser 進度顯示**

**Step 3：Commit**

```bash
git add src/components/DocumentReader/DocumentReader.tsx src/components/FileBrowser/FileBrowser.tsx
git commit -m "refactor: 移除手動標記教學 UI，保留選配標記功能"
```

---

## Phase B：研究桌 UI（Papers, Please 風格）

### Task 6：建立 ResearchDesk 元件

**Files:**
- Create: `src/components/ResearchDesk/ResearchDesk.tsx`
- Modify: `src/App.tsx`

**目標：** 取代 FileBrowser 作為主要導航畫面。以視覺化桌面呈現文件，文件卡片排列在桌面上。

**設計：**
- 背景：深色木紋質感（CSS gradient 或 PixiJS）
- 文件卡片：米色紙張外觀，3x3 或 4x3 網格
- 卡片狀態：NEW（新＋封口）、已讀（翻開）、鎖定（黑色塗抹）
- 章節切換：頂部標籤或左右滑動
- 點擊卡片：開啟文件（底部滑入 sheet）

**Step 1：建立基礎桌面元件（CSS grid 排列文件卡片）**

**Step 2：在 App.tsx 中替換 /browse 路由**

**Step 3：Commit**

```bash
git add src/components/ResearchDesk/ResearchDesk.tsx src/App.tsx
git commit -m "feat: 建立研究桌 ResearchDesk 主畫面"
```

---

### Task 7：文件卡片元件（像素風紙張）

**Files:**
- Create: `src/components/ResearchDesk/DocumentCard.tsx`

**目標：** 每份文件以視覺化卡片呈現，像素風格的小型紙張圖示。

**狀態視覺：**
- `locked`：深灰底 + 黑色線條塗抹效果
- `new`（unlocked, unread）：米色底 + 紅色 NEW 標記 + 封口效果
- `read`：米色底偏暗 + 翻開效果 + 分類圖示

**卡片資訊：**
- 分類像素圖示（沿用 CategoryIcon）
- 文件標題（截斷）
- 文件 ID（monospace 小字）

**Step 1：建立 DocumentCard 元件**

**Step 2：Commit**

```bash
git add src/components/ResearchDesk/DocumentCard.tsx
git commit -m "feat: 建立文件卡片 DocumentCard 元件"
```

---

### Task 8：Bottom Sheet 文件閱讀器

**Files:**
- Create: `src/components/DocumentSheet/DocumentSheet.tsx`
- Modify: `src/App.tsx`

**目標：** 文件不再是獨立路由頁面，改為從底部滑上的 sheet 覆蓋在桌面上。

**設計：**
- 點擊文件卡片 → sheet 從底部滑上（佔 85% 螢幕高度）
- 桌面在背後被壓暗但可見
- 向下滑動或點擊「返回」可關閉
- 內容與現有 DocumentReader 相同（紙張質感、印章、段落標記）
- 在手機上全螢幕，桌面版佔右側 60%

**Step 1：建立 DocumentSheet 元件（包含滑入動畫）**

**Step 2：修改路由，改用 state-based 開啟而非 route-based**

**Step 3：Commit**

```bash
git add src/components/DocumentSheet/DocumentSheet.tsx src/App.tsx
git commit -m "feat: 建立 Bottom Sheet 文件閱讀器"
```

---

### Task 9：底部導航列

**Files:**
- Modify: `src/components/common/Layout.tsx`

**目標：** 固定底部導航列，兩個入口：檔案（桌面）、推理簿。

取代目前的條件式 bottom bar，改為永遠可見的簡潔導航。

**Step 1：修改 Layout 底部導航**

**Step 2：Commit**

```bash
git add src/components/common/Layout.tsx
git commit -m "feat: 重新設計底部導航列"
```

---

## Phase C：像素風視覺強化

### Task 10：桌面背景場景

**Files:**
- Modify: `src/pixi/PixiCanvas.tsx`
- Create: `src/pixi/deskScene.ts`

**目標：** PixiJS 渲染研究桌背景——深色木紋桌面、桌燈光暈、散落的紙屑。

**元素：**
- 木紋桌面（程序生成或 sprite）
- 微妙的桌燈光暈（左上角暖色漸層）
- 章節越深，桌面越暗（沿用 ChapterDarkenEffect 概念）

---

### Task 11：強化印章動畫

**Files:**
- Modify: `src/components/visual/StampOverlay.tsx`
- Create: `src/pixi/stampAnimation.ts`

**目標：** 當發現面板點擊「記入推理簿」時，播放像素風印章蓋下的動畫。

**效果：**
1. 印章從畫面上方落下
2. 接觸紙面瞬間有墨水飛濺效果
3. 墨水逐漸擴散形成最終印文
4. 伴隨畫面微震（CSS transform）

---

### Task 12：章節轉場像素場景

**Files:**
- Modify: `src/components/ChapterTransition/ChapterTransition.tsx`
- Create: `src/pixi/chapterScenes.ts`

**目標：** 每個章節轉場搭配像素風場景插圖。

**場景清單：**
- 序章→第一章：一封被拆開重封的信
- 第一章→第二章：監視攝影機的紅燈在黑暗中亮起
- 第二章→第三章：一捲錄音帶緩緩消失
- 第三章→第四章：研究圖書館旁的身影
- 第四章→終章：一疊檔案上蓋著「密」字印章

每個場景 160x90 像素，放大 2x 或 3x 顯示。

---

### Task 13：文件分類像素圖示強化

**Files:**
- Modify: `src/components/visual/CategoryIcon.tsx`

**目標：** 將目前 16x16 的 SVG 圖示擴充為 32x32，增加細節。新增動態效果（未讀文件圖示有微閃爍）。

---

## Phase D：互動推理簿（印章機制）

### Task 14：推理簿視覺重設計

**Files:**
- Modify: `src/components/Notebook/Notebook.tsx`

**目標：** 推理簿改為像素風手帳外觀。每個欄位看起來像實體筆記本上的空格。

**設計：**
- 背景：方格紙質感
- 欄位：手寫風標題 + 空白底線
- choice 欄位：三個選項以「印章」形式呈現
- auto 欄位：自動以打字機效果填入
- locked 欄位：以黑色墨水塗抹遮蓋

---

### Task 15：印章蓋章互動

**Files:**
- Create: `src/components/Notebook/StampSelector.tsx`

**目標：** 當玩家要填入 choice 類型的推理簿欄位時，呈現印章選擇器。

**互動：**
1. 點擊欄位 → 底部滑出印章選擇列
2. 三個選項各是一個圓形/方形印章
3. 點擊選擇 → 印章蓋下動畫
4. 蓋章後不可更改（配合遊戲「判斷的重量」主題）

---

## Phase E：手機觸控優化

### Task 16：觸控手勢優化

**Files:**
- Modify: `src/components/DocumentSheet/DocumentSheet.tsx`

**目標：**
- 下滑關閉文件 sheet（touch drag gesture）
- 左右滑動切換章節（在桌面視圖）
- 所有互動元素最小 44x44px 觸控區域

---

### Task 17：響應式佈局微調

**Files:**
- Multiple component files

**目標：**
- 手機：全螢幕桌面 + 底部 sheet 文件
- 平板：桌面佔左側 40%，文件佔右側 60%
- 桌面：桌面佔左側 35%，文件佔中央 40%，推理簿佔右側 25%

---

### Task 18：效能優化

**Files:**
- Multiple files

**目標：**
- PixiJS 場景使用 `requestAnimationFrame` 控制更新頻率
- 文件卡片使用 `React.memo` 避免不必要重繪
- 圖片資源 lazy load
- Bundle size 目標：< 500KB gzipped

---

## 實作順序建議

```
Phase A（核心機制）→ 可玩版本，閱讀即推進
  Task 1 → Task 2 → Task 3 → Task 4 → Task 5

Phase B（桌面 UI）→ Papers, Please 視覺體驗
  Task 6 → Task 7 → Task 8 → Task 9

Phase C（像素風）→ 視覺品質提升
  Task 10 → Task 11 → Task 12 → Task 13

Phase D（推理簿）→ 互動深度
  Task 14 → Task 15

Phase E（手機優化）→ 發布品質
  Task 16 → Task 17 → Task 18
```

每個 Phase 結束後都是一個可玩的里程碑。

---

## GitHub Issues 對應

| Issue | Phase | 標題 |
|-------|-------|------|
| #1 | A | feat: 自動發現系統——閱讀即觸發矛盾 |
| #2 | A | feat: DiscoveryPanel 矛盾發現面板 |
| #3 | B | feat: ResearchDesk 研究桌主畫面 |
| #4 | B | feat: Bottom Sheet 文件閱讀器 |
| #5 | C | feat: 像素風視覺資產（桌面、印章、轉場） |
| #6 | D | feat: 互動推理簿印章機制 |
| #7 | E | feat: 手機觸控與響應式優化 |
