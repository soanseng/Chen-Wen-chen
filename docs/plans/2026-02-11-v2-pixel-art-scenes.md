# V2 像素風場景與插圖內容計畫

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 為研究桌和文件閱讀器加入像素風場景插圖，讓遊戲從「純文字閱讀器」升級為有視覺沈浸感的 Papers, Please 風格體驗。

**Architecture:** 建立共用的像素風繪圖系統（Canvas 2D + PixiJS），以程式生成所有場景——不依賴外部圖片檔。研究桌每章有不同的背景場景（PixiJS 動畫），關鍵文件內嵌「證據照片」風格的像素插圖（Canvas 靜態）。

**Tech Stack:** PixiJS 8（桌面場景）/ Canvas 2D（文件插圖）/ React（整合層）

---

## 設計哲學

### Papers, Please 的視覺敘事

Papers, Please 用像素風做到了：
- **窗口外的世界**：排隊的旅客、天氣、政治海報——讓你感受到「桌面之外」有個真實世界
- **桌面上的物件**：不只有文件，還有印章、規則手冊、家庭照片
- **人物的存在感**：低解析度的人像卻能傳達情感

### 本遊戲的視覺策略

| 位置 | 像素場景用途 | 情感效果 |
|------|------------|---------|
| 研究桌背景 | 章節場景——從機場到監視、審訊、鑑識、掩蓋 | 讓玩家感受「歷史在桌面之外發生」 |
| 文件頭部插圖 | 證據照片——監聽器材、審訊室、現場、公文 | 讓文字不再抽象，有「看到」的感覺 |
| 發現面板 | 矛盾場景——兩個畫面的對比 | 視覺化矛盾的衝擊力 |

**原則：**
- 全部程式生成（不需要外部圖片檔）
- 使用剪影和極簡細節（尊重歷史敏感度，不畫具體人臉）
- 色調受限於 paper / ink / stamp 調色盤
- 解析度：場景 160×90px，插圖 120×80px，顯示時 2x–3x 放大
- CSS `image-rendering: pixelated` 保持銳利邊緣

---

## 像素調色盤

```
場景用（偏暖深色）：
  桌面木紋：#3d2b1f #5c4030 #7a5a40
  室內牆壁：#5c5248 #4a4038 #3d3228
  燈光暖色：#ffe8a0 #ffd070 #e8b830
  天空夜色：#0a0e1a #1a2040 #2a3060

物件用（ink + stamp 色系）：
  紙張米色：#fefdfb #f5efe3 #e8dcc8
  墨色系列：#0a0a0a #2a2a2a #4a4a4a #8a8a8a
  印章紅色：#8b2020 #c04040 #d06060
  金屬灰色：#6a6a6a #9a9a9a #bababa

自然色：
  植物綠色：#2a4a20 #3a6a30
  水泥灰色：#7a7a6a #9a9a8a
```

---

## Phase F：像素風場景與插圖

### Task F1：像素風繪圖引擎

**Files:**
- Create: `src/pixi/pixelArtEngine.ts`
- Create: `src/pixi/pixelPalette.ts`

**目標：** 建立共用的像素風繪圖工具，支援 Canvas 2D 和 PixiJS 兩種輸出。

**pixelPalette.ts：**
```typescript
/** 統一的像素風調色盤 */
export const PIXEL_PALETTE = {
  // Desk & room
  deskDark: '#3d2b1f',
  deskMid: '#5c4030',
  deskLight: '#7a5a40',
  wallDark: '#3d3228',
  wallMid: '#5c5248',
  wallLight: '#7a7068',
  // Light
  lampWarm: '#ffe8a0',
  lampMid: '#ffd070',
  lampHot: '#e8b830',
  // Sky
  nightDeep: '#0a0e1a',
  nightMid: '#1a2040',
  nightLight: '#2a3060',
  // Paper
  paperWhite: '#fefdfb',
  paperCream: '#f5efe3',
  paperAged: '#e8dcc8',
  // Ink
  inkBlack: '#0a0a0a',
  inkDark: '#2a2a2a',
  inkMid: '#4a4a4a',
  inkLight: '#8a8a8a',
  // Stamp
  stampDark: '#8b2020',
  stampMid: '#c04040',
  stampLight: '#d06060',
  // Metal
  metalDark: '#6a6a6a',
  metalMid: '#9a9a9a',
  metalLight: '#bababa',
  // Nature
  green: '#2a4a20',
  greenLight: '#3a6a30',
  concrete: '#7a7a6a',
  concreteLight: '#9a9a8a',
} as const
```

**pixelArtEngine.ts：**
```typescript
export interface PixelRect {
  x: number; y: number; w: number; h: number
  color: string
  opacity?: number // default 1
}

export interface PixelScene {
  width: number   // base pixel resolution
  height: number
  bg?: string     // background fill
  layers: PixelRect[][]  // render bottom-to-top
}

/**
 * Render a PixelScene to a Canvas element.
 * @param scale - display scale (2x, 3x)
 */
export function renderToCanvas(
  canvas: HTMLCanvasElement,
  scene: PixelScene,
  scale: number,
): void {
  const dpr = window.devicePixelRatio || 1
  canvas.width = scene.width * scale * dpr
  canvas.height = scene.height * scale * dpr
  canvas.style.width = `${scene.width * scale}px`
  canvas.style.height = `${scene.height * scale}px`
  canvas.style.imageRendering = 'pixelated'

  const ctx = canvas.getContext('2d')!
  ctx.scale(scale * dpr, scale * dpr)
  ctx.imageSmoothingEnabled = false

  if (scene.bg) {
    ctx.fillStyle = scene.bg
    ctx.fillRect(0, 0, scene.width, scene.height)
  }

  for (const layer of scene.layers) {
    for (const rect of layer) {
      ctx.globalAlpha = rect.opacity ?? 1
      ctx.fillStyle = rect.color
      ctx.fillRect(rect.x, rect.y, rect.w, rect.h)
    }
  }
  ctx.globalAlpha = 1
}

/**
 * Render a PixelScene to PixiJS Graphics container.
 */
export function renderToPixi(
  container: PIXI.Container,
  scene: PixelScene,
  scale: number,
): void {
  for (const layer of scene.layers) {
    const g = new PIXI.Graphics()
    for (const rect of layer) {
      g.rect(rect.x * scale, rect.y * scale, rect.w * scale, rect.h * scale)
      g.fill({ color: rect.color, alpha: rect.opacity ?? 1 })
    }
    container.addChild(g)
  }
}
```

**Step 1：建立 pixelPalette.ts 和 pixelArtEngine.ts**

**Step 2：驗證 build 通過**

Run: `npm run build`

**Step 3：Commit**

```bash
git add src/pixi/pixelPalette.ts src/pixi/pixelArtEngine.ts
git commit -m "feat: 建立像素風繪圖引擎與調色盤"
```

---

### Task F2：研究桌章節背景場景（6 個場景）

**Files:**
- Create: `src/pixi/scenes/deskScenes.ts`
- Create: `src/pixi/scenes/index.ts`

**目標：** 為每個章節建立獨特的像素風桌面背景場景，渲染在研究桌文件卡片下方。

**場景清單：**

#### 場景 0：歸鄉（序章）
溫暖的機場場景。一個手提行李箱的剪影走向出口。遠處有「歡迎回國」的牌子。暖色調。
```
構圖：160×90
- 背景：淺藍天空漸層
- 中景：機場航廈剪影（幾何方塊組成）
- 前景：一個拎行李的人物剪影（黑色，8×16px）
- 點綴：「歡迎」橫幅（紅底白字方塊暗示）
- 色調：暖色（lampWarm + paperCream）
```

#### 場景 1：監視之網（第一章）
夜間街道。公寓大樓外觀。一扇亮著的窗戶。路燈下停著一輛黑色轎車，車內有人物剪影。
```
構圖：160×90
- 背景：深藍夜空（nightDeep → nightMid 漸層）
- 中景：公寓大樓（水泥灰方塊），其中一扇窗亮黃色
- 前景：街道（inkDark），路燈（metalMid 桿 + lampWarm 光暈）
- 點綴：黑色轎車剪影，車窗內一個人頭剪影
- 色調：冷色偏暗，只有窗和路燈是暖色
```

#### 場景 2：約談（第二章）
審訊室內部。天花板垂下的裸燈泡。金屬桌。兩張椅子。桌上一台盤式錄音機。
```
構圖：160×90
- 背景：灰牆（wallMid）
- 中心：燈泡垂線 + 暖色光錐向下擴散
- 中景：金屬桌（metalMid），桌上錄音機（inkDark 小方塊 + 兩個圓盤暗示）
- 前景：兩張椅子剪影（wallDark）
- 色調：壓迫感，只有燈泡處是亮色
```

#### 場景 3：證據（第三章）
清晨。一棟大學建築物外觀。消防梯。地面上一個人形輪廓標記。
```
構圖：160×90
- 背景：破曉天空（nightLight → 微橙漸層）
- 中景：方正的大學建築（concrete 色系），外掛消防梯（metalDark 線條）
- 前景：草地（green），白色人形輪廓（paperWhite 虛線勾勒）
- 點綴：幾個三角形鑑識標記（stampMid 小三角）
- 色調：冷清的清晨，不安的靜默
```

#### 場景 4：掩蓋（第四章）
政府辦公室。成排的檔案櫃。一張辦公桌。桌上電話。角落的碎紙機。
```
構圖：160×90
- 背景：辦公室牆壁（wallLight）
- 中景：三個檔案櫃（metalMid 大方塊 + 抽屜線條），其中一個半開
- 前景：辦公桌（deskMid），桌上旋轉電話（inkDark），紅色機密印章
- 右下角：碎紙機剪影，紙條散落
- 色調：官僚的冷灰 + 印章紅色點綴
```

#### 場景 5：未完的檔案（終章）
紀念場景。石碑前擺放鮮花。一張框裡的照片。柔和的光。
```
構圖：160×90
- 背景：柔和漸層（paperCream → lampWarm）
- 中心：一塊石碑剪影（concrete），上方有文字方塊暗示
- 前景：花束（stampLight + greenLight 色塊），相框（deskMid 邊框 + 內部留白）
- 點綴：幾支蠟燭（lampHot 小點 + 微弱光暈）
- 色調：溫暖但沈重，留白感
```

**實作方式：** 每個場景是一個函式，回傳 `PixelScene`。

```typescript
// src/pixi/scenes/deskScenes.ts
import type { PixelScene } from '../pixelArtEngine'
import { PIXEL_PALETTE as P } from '../pixelPalette'

export function createPrologueScene(): PixelScene { /* ... */ }
export function createChapter1Scene(): PixelScene { /* ... */ }
export function createChapter2Scene(): PixelScene { /* ... */ }
export function createChapter3Scene(): PixelScene { /* ... */ }
export function createChapter4Scene(): PixelScene { /* ... */ }
export function createFinaleScene(): PixelScene { /* ... */ }

export function getDeskSceneForChapter(chapter: number): PixelScene {
  switch (chapter) {
    case 0: return createPrologueScene()
    case 1: return createChapter1Scene()
    case 2: return createChapter2Scene()
    case 3: return createChapter3Scene()
    case 4: return createChapter4Scene()
    case 5: return createFinaleScene()
    default: return createPrologueScene()
  }
}
```

**Step 1：建立 6 個章節場景定義**

**Step 2：驗證 build 通過**

**Step 3：Commit**

```bash
git add src/pixi/scenes/
git commit -m "feat: 建立 6 個研究桌章節背景像素場景"
```

---

### Task F3：研究桌場景渲染元件

**Files:**
- Create: `src/components/visual/DeskSceneBackground.tsx`
- Modify: `src/components/ResearchDesk/ResearchDesk.tsx`（或現有的 FileBrowser）

**目標：** 將章節場景渲染為研究桌的背景層。

```tsx
// src/components/visual/DeskSceneBackground.tsx
import { useRef, useEffect } from 'react'
import { getDeskSceneForChapter } from '../../pixi/scenes/deskScenes'
import { renderToCanvas } from '../../pixi/pixelArtEngine'

interface Props {
  chapter: number
}

export function DeskSceneBackground({ chapter }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const scene = getDeskSceneForChapter(chapter)
    renderToCanvas(canvasRef.current, scene, 3) // 3x scale
  }, [chapter])

  return (
    <div className="relative w-full overflow-hidden rounded-lg mb-4">
      <canvas
        ref={canvasRef}
        className="w-full h-auto block"
        style={{ imageRendering: 'pixelated' }}
      />
      {/* Subtle vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-900/30 pointer-events-none" />
    </div>
  )
}
```

**Step 1：建立 DeskSceneBackground 元件**

**Step 2：整合到研究桌主畫面（文件卡片上方顯示當前章節場景）**

**Step 3：驗證 build + 視覺效果**

**Step 4：Commit**

```bash
git add src/components/visual/DeskSceneBackground.tsx src/components/ResearchDesk/ResearchDesk.tsx
git commit -m "feat: 研究桌渲染章節像素背景場景"
```

---

### Task F4：文件插圖定義（12 份關鍵文件）

**Files:**
- Create: `src/pixi/illustrations/index.ts`
- Create: `src/pixi/illustrations/prologueIllustrations.ts`
- Create: `src/pixi/illustrations/chapter1Illustrations.ts`
- Create: `src/pixi/illustrations/chapter2Illustrations.ts`
- Create: `src/pixi/illustrations/chapter3Illustrations.ts`
- Create: `src/pixi/illustrations/chapter4Illustrations.ts`
- Create: `src/pixi/illustrations/finaleIllustrations.ts`

**目標：** 為 12 份關鍵文件定義 header 插圖場景——像是「證據照片」或「場景重建」。

**插圖清單：**

| 文件 ID | 標題 | 插圖描述 | 解析度 |
|---------|------|---------|--------|
| DOC-EXT-04 | 陳文成生平簡介 | 大學校園，一個拿著書的人物剪影站在黑板前 | 120×80 |
| DOC-OFF-01 | 出境管制相關文件 | 辦公桌上一台電話和印章，暗示「通知」 | 120×80 |
| DOC-SUR-01-1 | 電話監聽紀錄 | 兩台電話，中間有一條虛線（竊聽暗示） | 120×80 |
| DOC-SUR-02 | 信件攔截紀錄 | 桌燈下一封被拆開重封的信，可見膠帶痕跡 | 120×80 |
| DOC-INT-01 | 警總約談紀錄 | 審訊室俯視圖：桌子兩側各一個人物剪影 | 120×80 |
| DOC-INT-02 | 約談錄音譯文 | 盤式錄音機特寫，磁帶在轉動 | 120×80 |
| DOC-FOR-01 | 法醫鑑定書 | 檢驗工具整齊排列在白布上 | 120×80 |
| DOC-FOR-05 | 現場勘查報告 | 建築外觀——從下方仰望消防梯和屋頂 | 120×80 |
| DOC-FOR-04 | 落體實驗報告 | 建築側面剪影，一條拋物線軌跡 | 120×80 |
| DOC-NSA-01 | 國安局陳文成案卷宗 | 一隻手從標記「密」的檔案櫃抽出資料夾 | 120×80 |
| DOC-OFF-05 | 汪敬煦呈蔣經國 | 桌燈下一隻手在文件上簽名 | 120×80 |
| DOC-TJC-01 | 促轉會調查報告結論 | 一疊厚檔案上蓋著紅色「解密」印章 | 120×80 |

**實作方式：**

```typescript
// src/pixi/illustrations/chapter2Illustrations.ts
import type { PixelScene } from '../pixelArtEngine'
import { PIXEL_PALETTE as P } from '../pixelPalette'

/** DOC-INT-01：審訊室俯視圖 */
export function createInterrogationRoomTopDown(): PixelScene {
  return {
    width: 120, height: 80,
    bg: P.wallDark,
    layers: [
      // Layer 0: Floor
      [
        { x: 0, y: 0, w: 120, h: 80, color: P.wallMid },
      ],
      // Layer 1: Table
      [
        { x: 35, y: 25, w: 50, h: 30, color: P.metalDark },
        { x: 36, y: 26, w: 48, h: 28, color: P.metalMid },
      ],
      // Layer 2: Figures (silhouettes)
      [
        // Interrogator (top side of table)
        { x: 55, y: 15, w: 10, h: 10, color: P.inkBlack },
        // Chen Wen-chen (bottom side)
        { x: 55, y: 55, w: 10, h: 10, color: P.inkDark },
      ],
      // Layer 3: Tape recorder on table
      [
        { x: 52, y: 36, w: 16, h: 8, color: P.inkBlack },
        { x: 54, y: 37, w: 4, h: 4, color: P.inkDark }, // reel L
        { x: 62, y: 37, w: 4, h: 4, color: P.inkDark }, // reel R
      ],
      // Layer 4: Light cone from above
      [
        { x: 40, y: 20, w: 40, h: 40, color: P.lampWarm, opacity: 0.08 },
        { x: 45, y: 25, w: 30, h: 30, color: P.lampWarm, opacity: 0.06 },
      ],
    ],
  }
}

/** DOC-INT-02：盤式錄音機特寫 */
export function createTapeRecorderCloseup(): PixelScene {
  return {
    width: 120, height: 80,
    bg: P.deskDark,
    layers: [
      // Layer 0: Desk surface
      [
        { x: 0, y: 0, w: 120, h: 80, color: P.deskMid },
      ],
      // Layer 1: Recorder body
      [
        { x: 20, y: 15, w: 80, h: 50, color: P.inkDark },
        { x: 22, y: 17, w: 76, h: 46, color: P.inkMid },
      ],
      // Layer 2: Reels
      [
        // Left reel (full)
        { x: 30, y: 22, w: 24, h: 24, color: P.inkBlack },
        { x: 34, y: 26, w: 16, h: 16, color: P.inkDark },
        { x: 38, y: 30, w: 8, h: 8, color: P.metalMid },
        // Right reel (empty)
        { x: 66, y: 22, w: 24, h: 24, color: P.inkBlack },
        { x: 70, y: 26, w: 16, h: 16, color: P.inkDark },
        { x: 74, y: 30, w: 8, h: 8, color: P.metalMid },
      ],
      // Layer 3: Tape path between reels
      [
        { x: 54, y: 33, w: 12, h: 2, color: P.stampDark },
      ],
      // Layer 4: Controls
      [
        { x: 35, y: 50, w: 8, h: 6, color: P.metalDark }, // play
        { x: 47, y: 50, w: 8, h: 6, color: P.metalDark }, // stop
        { x: 59, y: 50, w: 8, h: 6, color: P.stampMid },  // record (red)
        { x: 71, y: 50, w: 8, h: 6, color: P.metalDark }, // rewind
      ],
      // Layer 5: VU meter
      [
        { x: 45, y: 17, w: 30, h: 4, color: P.inkBlack },
        { x: 46, y: 18, w: 12, h: 2, color: P.greenLight }, // level
      ],
    ],
  }
}
```

**每個插圖的函式回傳 `PixelScene`，透過 `DOCUMENT_ILLUSTRATIONS` map 對應文件 ID：**

```typescript
// src/pixi/illustrations/index.ts
import type { PixelScene } from '../pixelArtEngine'
import type { DocumentId } from '../../types/index'

import { createCampusProfessor } from './prologueIllustrations'
import { createPhoneAndStamp } from './prologueIllustrations'
import { createWiretapPhones, createInterceptedLetter } from './chapter1Illustrations'
import { createInterrogationRoomTopDown, createTapeRecorderCloseup } from './chapter2Illustrations'
import { createForensicTools, createBuildingStairwell } from './chapter3Illustrations'
import { createFallExperiment, createClassifiedCabinet, createSigningDocument } from './chapter4Illustrations'
import { createDeclassifiedFiles } from './finaleIllustrations'

export const DOCUMENT_ILLUSTRATIONS: Partial<Record<DocumentId, () => PixelScene>> = {
  'DOC-EXT-04': createCampusProfessor,
  'DOC-OFF-01': createPhoneAndStamp,
  'DOC-SUR-01-1': createWiretapPhones,
  'DOC-SUR-02': createInterceptedLetter,
  'DOC-INT-01': createInterrogationRoomTopDown,
  'DOC-INT-02': createTapeRecorderCloseup,
  'DOC-FOR-01': createForensicTools,
  'DOC-FOR-05': createBuildingStairwell,
  'DOC-FOR-04': createFallExperiment,
  'DOC-NSA-01': createClassifiedCabinet,
  'DOC-OFF-05': createSigningDocument,
  'DOC-TJC-01': createDeclassifiedFiles,
}
```

**Step 1：建立插圖 index 和 6 個章節插圖檔**

**Step 2：每份插圖定義場景（PixelRect 層級結構）**

**Step 3：驗證 build 通過**

**Step 4：Commit**

```bash
git add src/pixi/illustrations/
git commit -m "feat: 定義 12 份關鍵文件的像素風插圖場景"
```

---

### Task F5：文件插圖渲染元件

**Files:**
- Create: `src/components/visual/DocumentIllustration.tsx`
- Modify: `src/components/DocumentReader/DocumentReader.tsx`

**目標：** 在文件閱讀器的 header 區域渲染像素插圖（如果該文件有定義插圖）。

```tsx
// src/components/visual/DocumentIllustration.tsx
import { useRef, useEffect } from 'react'
import { DOCUMENT_ILLUSTRATIONS } from '../../pixi/illustrations/index'
import { renderToCanvas } from '../../pixi/pixelArtEngine'
import type { DocumentId } from '../../types/index'

interface Props {
  docId: DocumentId
  scale?: number
}

export function DocumentIllustration({ docId, scale = 3 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneFactory = DOCUMENT_ILLUSTRATIONS[docId]

  useEffect(() => {
    if (!canvasRef.current || !sceneFactory) return
    const scene = sceneFactory()
    renderToCanvas(canvasRef.current, scene, scale)
  }, [docId, scale, sceneFactory])

  if (!sceneFactory) return null

  return (
    <div className="relative mx-4 mb-4 overflow-hidden rounded border border-paper-300">
      <canvas
        ref={canvasRef}
        className="w-full h-auto block"
        style={{ imageRendering: 'pixelated' }}
      />
      {/* Film grain / aged photo overlay */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-multiply"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
        }}
      />
    </div>
  )
}
```

**DocumentReader 整合點：** 在 `<header>` 和 `<hr>` 之間插入：

```tsx
{/* Document illustration (pixel art "evidence photo") */}
<DocumentIllustration docId={docId} />
```

**Step 1：建立 DocumentIllustration 元件**

**Step 2：在 DocumentReader.tsx 的 header 後方插入**

**Step 3：驗證 build + 視覺效果（有插圖的文件顯示像素畫，沒有的不影響）**

**Step 4：Commit**

```bash
git add src/components/visual/DocumentIllustration.tsx src/components/DocumentReader/DocumentReader.tsx
git commit -m "feat: 文件閱讀器嵌入像素風插圖"
```

---

### Task F6：發現面板矛盾場景插圖（選配）

**Files:**
- Create: `src/pixi/illustrations/contradictionIllustrations.ts`
- Modify: `src/components/DiscoveryPanel.tsx`（當 Phase A 完成後）

**目標：** 在發現面板頂部加入一幅小型像素場景，視覺化矛盾的核心衝突。

**優先實作的 5 個矛盾插圖：**

| 矛盾 | 插圖描述 | 解析度 |
|------|---------|--------|
| C-01（時間矛盾） | 兩個時鐘：左邊 22:00，右邊 04:00，中間斷裂線 | 100×50 |
| C-02（錄音帶遺失） | 錄音機，磁帶轉盤空無一物 | 100×50 |
| C-03（境管局共謀） | 左半電話機，右半軍用吉普車 | 100×50 |
| C-08（第一現場） | 建築底部 vs 建築頂部，箭頭標示不可能的軌跡 | 100×50 |
| C-09（落體實驗 vs 說法） | 文件上寫「自殺」被紅色大叉劃掉 | 100×50 |

**實作方式同 Task F4，但場景更小（100×50）。**

```typescript
// src/pixi/illustrations/contradictionIllustrations.ts
export const CONTRADICTION_ILLUSTRATIONS: Partial<Record<ContradictionId, () => PixelScene>> = {
  'C-01': createTimeContradiction,
  'C-02': createMissingTape,
  'C-03': createPhoneVsJeep,
  'C-08': createCrimeSceneContradiction,
  'C-09': createFallExperimentContradiction,
}
```

**Step 1：建立 5 個矛盾插圖場景**

**Step 2：整合到 DiscoveryPanel（header 區域）**

**Step 3：Commit**

```bash
git add src/pixi/illustrations/contradictionIllustrations.ts src/components/DiscoveryPanel.tsx
git commit -m "feat: 發現面板加入矛盾像素場景插圖"
```

---

## 實作順序

```
Task F1（繪圖引擎）→ 基礎工具
  ↓
Task F2（桌面場景定義）→ 6 個場景資料
  ↓
Task F3（桌面場景渲染）→ 整合到研究桌
  ↓
Task F4（文件插圖定義）→ 12 個插圖資料
  ↓
Task F5（文件插圖渲染）→ 整合到文件閱讀器
  ↓
Task F6（矛盾插圖，選配）→ 整合到發現面板
```

**依賴關係：**
- F1 是所有後續 task 的基礎
- F2 + F3 可與 F4 + F5 平行開發
- F6 依賴 Phase A 的 DiscoveryPanel 完成

---

## 與既有 V2 計畫的整合

此計畫是 `2026-02-11-v2-papers-please-redesign.md` 的 **Phase F 補充**：

| 原計畫 Phase | 關聯 |
|-------------|------|
| Phase B: ResearchDesk | Task F3 的桌面場景渲染需搭配 ResearchDesk 整合 |
| Phase C: Task 10 桌面背景 | 被 Task F2 + F3 取代/擴充 |
| Phase C: Task 12 章節轉場 | Task F2 的場景可復用為轉場畫面 |
| Phase A: DiscoveryPanel | Task F6 需等 Phase A 完成 |

**建議執行順序：**
```
Phase A → Phase F（F1-F5）→ Phase B → Phase C（剩餘 tasks）→ Phase D → Phase E → Phase F（F6）
```
