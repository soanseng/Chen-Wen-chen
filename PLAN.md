# 陳文成事件互動式歷史紀錄網站 — 實作計畫

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 建立一個 scrollytelling 風格的互動式歷史紀錄網站，以「文字電影」形式呈現 1981 年陳文成事件。

**Architecture:** React SPA 搭配 PixiJS pixel art 場景。資料層從 PDF 文獻提取為結構化 JSON/MD，敘事層以章節為單位組織，視覺層結合 TailwindCSS 暗色主題與 PixiJS 像素場景。

**Tech Stack:** TypeScript, React 18, Vite, TailwindCSS v4, PixiJS v8, GSAP ScrollTrigger

---

## Phase 1: 資料提取與整理 ✅ COMPLETED

### Task 1.1: 提取 Wecht 法醫報告 ✅

**Files:**
- Read: `docs/pdfs/Wecht-為民主而死（Death in the Cause of Democracy）.pdf`
- Create: `docs/extracted/01-wecht-report.md`

**Step 1: 讀取 PDF 並提取內容**
使用 Claude 的 PDF 讀取功能，逐頁讀取 Wecht 報告。

**Step 2: 結構化整理**
將提取內容整理為 Markdown，包含：
- 報告摘要
- 法醫鑑定結論
- 傷痕分析
- Wecht 的專業意見
- 關鍵引述（保留原文英文）

**Step 3: 標註頁碼**
每段內容標註原始 PDF 頁碼，格式：`(Wecht Report, p. X)`

**Step 4: Commit**
```bash
git add docs/extracted/01-wecht-report.md
git commit -m "docs: extract Wecht forensic report"
```

---

### Task 1.2: 提取促轉會調查報告（第 1-72 頁） ✅

**Files:**
- Read: `docs/pdfs/促轉會《陳文成案調查報告》001-072.pdf`
- Create: `docs/extracted/02-tjc-report-part1.md`

**Step 1: 分批讀取 PDF**
PDF 共 72 頁，每次讀取 20 頁（1-20, 21-40, 41-60, 61-72）。

**Step 2: 結構化整理**
按報告原始章節結構整理，包含：
- 調查背景與目的
- 陳文成生平
- 事件經過
- 各方證詞
- 關鍵證據

**Step 3: 標註頁碼**
格式：`（促轉會調查報告，第 X 頁）`

**Step 4: Commit**
```bash
git add docs/extracted/02-tjc-report-part1.md
git commit -m "docs: extract TJC investigation report part 1 (pp. 1-72)"
```

---

### Task 1.3: 提取促轉會調查報告（第 73-170 頁） ✅

**Files:**
- Read: `docs/pdfs/促轉會《陳文成案調查報告》073-170.pdf`
- Create: `docs/extracted/03-tjc-report-part2.md`

**Step 1: 分批讀取 PDF**
PDF 共 98 頁，每次讀取 20 頁。

**Step 2: 結構化整理**
延續 Part 1 的章節結構，包含：
- 後續調查發現
- 鑑識報告
- 結論與建議

**Step 3: 標註頁碼**
格式：`（促轉會調查報告，第 X 頁）`

**Step 4: Commit**
```bash
git add docs/extracted/03-tjc-report-part2.md
git commit -m "docs: extract TJC investigation report part 2 (pp. 73-170)"
```

---

### Task 1.4: 提取死因分析報告 ✅

**Files:**
- Read: `docs/pdfs/陳文成之死因.pdf`
- Create: `docs/extracted/04-cause-of-death.md`

**Step 1: 讀取 PDF 並提取內容**

**Step 2: 結構化整理**
包含：
- 官方死因判定
- 各方醫學意見
- 爭議點整理

**Step 3: 標註頁碼**
格式：`（陳文成之死因，第 X 頁）`

**Step 4: Commit**
```bash
git add docs/extracted/04-cause-of-death.md
git commit -m "docs: extract cause of death analysis"
```

---

### Task 1.5: 提取黃怡、林世煜調查報告 ✅

**Files:**
- Read: `docs/pdfs/陳文成事件調查報告-黃怡_林世煜.pdf`
- Create: `docs/extracted/05-investigation-report.md`

**Step 1: 讀取 PDF 並提取內容**

**Step 2: 結構化整理**
包含：
- 調查動機與方法
- 訪談紀錄
- 新發現的證據
- 調查結論

**Step 3: 標註頁碼**
格式：`（黃怡、林世煜調查報告，第 X 頁）`

**Step 4: Commit**
```bash
git add docs/extracted/05-investigation-report.md
git commit -m "docs: extract Huang-Lin investigation report"
```

---

### Task 1.6: 建立整合時間線 ✅

**Files:**
- Read: `docs/extracted/01-wecht-report.md` ~ `05-investigation-report.md`
- Create: `docs/extracted/timeline.json`

**Step 1: 彙整所有文獻中的時間點**
從 5 份提取文件中，收集所有有明確日期的事件。

**Step 2: 建立 JSON 結構**
```json
{
  "events": [
    {
      "date": "1950-01-30",
      "title": "陳文成出生",
      "description": "出生於台北縣林口鄉",
      "source": "促轉會調查報告，第 X 頁",
      "chapter": 1,
      "significance": "background"
    }
  ]
}
```

`significance` 等級：`"background"` | `"turning-point"` | `"critical"` | `"aftermath"`

**Step 3: 按時間排序並驗證**

**Step 4: Commit**
```bash
git add docs/extracted/timeline.json
git commit -m "docs: create integrated event timeline"
```

---

### Task 1.7: 建立人物資料庫 ✅

**Files:**
- Read: `docs/extracted/01-wecht-report.md` ~ `05-investigation-report.md`
- Create: `docs/extracted/characters.json`

**Step 1: 彙整所有出現的人物**

**Step 2: 建立 JSON 結構**
```json
{
  "characters": [
    {
      "id": "chen-wen-chen",
      "name": "陳文成",
      "nameEn": "Chen Wen-chen",
      "role": "受害者",
      "description": "統計學者，Carnegie Mellon 大學助理教授",
      "relations": ["chen-su-zhen"],
      "sources": ["促轉會調查報告，第 X 頁"]
    }
  ]
}
```

**Step 3: 建立人物關係**
標註人物間的關係（家人、同事、相關官員等）。

**Step 4: Commit**
```bash
git add docs/extracted/characters.json
git commit -m "docs: create character database with relationships"
```

---

### Task 1.8: 撰寫整合敘事 ✅

**Files:**
- Read: `docs/extracted/01-wecht-report.md` ~ `05-investigation-report.md`
- Read: `docs/extracted/timeline.json`
- Read: `docs/extracted/characters.json`
- Create: `docs/extracted/narrative.md`

**Step 1: 依時間線撰寫完整敘事**
以第三人稱、紀錄片口吻撰寫。每段標註出處。

**Step 2: 標記適合 pixel art 的場景**
在敘事中用 `<!-- PIXEL_SCENE: scene-name -->` 標記。

**Step 3: 標記章節分割點**
用 `<!-- CHAPTER_BREAK: N -->` 標記。

**Step 4: Commit**
```bash
git add docs/extracted/narrative.md
git commit -m "docs: write integrated narrative with scene markers"
```

---

## Phase 2: 敘事結構設計 ✅ COMPLETED

### Task 2.1: 設計章節結構 ✅

**Files:**
- Read: `docs/extracted/narrative.md`
- Read: `docs/extracted/timeline.json`
- Create: `docs/narrative-structure.md`

**Step 1: 規劃 5-7 章結構**

建議章節：

| 章 | 標題 | 時間範圍 | 敘事重點 |
|----|------|---------|---------|
| 1 | 學者之路 | 1950-1978 | 陳文成生平、赴美求學、學術成就 |
| 2 | 海外的聲音 | 1978-1981 | 在美關心台灣民主運動、捐款美麗島雜誌 |
| 3 | 歸途 | 1981.05-07.01 | 返台探親、被警備總部盯上 |
| 4 | 約談 | 1981.07.02 | 被帶走、審訊過程（各方說法） |
| 5 | 陳屍台大 | 1981.07.03 | 發現遺體、現場狀況、疑點 |
| 6 | 追尋真相 | 1981-2020 | 歷次調查、Wecht 鑑定、促轉會報告 |
| 7 | 未完的故事 | 2020- | 轉型正義、紀念與影響 |

**Step 2: 為每章標記 pixel art 場景需求**

依據 `docs/narrative-structure.md` 各章情緒基調與關鍵時刻，規劃以下場景。
分為**核心場景**（必做）與**擴充場景**（視開發時程決定）。

核心場景（7 個）：

| 場景 ID | 章節 | 描述 | 情緒基調 | 互動方式 |
|---------|------|------|---------|---------|
| campus-life | 1 | CMU 校園，陳文成在黑板前授課，暖色金光 | 溫暖、平靜 | 捲動顯示 |
| surveillance-web | 2 | 跨太平洋監控網——電話線、郵件、檔案層層浮現 | 不安、暗潮湧動 | 捲動 + 元素逐層浮現 |
| airport-return | 3 | 松山機場入境，出境許可被扣，陷阱收攏 | 表面平靜、壓迫 | 捲動顯示 |
| interrogation-room | 4 | 警備總部保安處審訊室，冷白燈光，壓迫空間 | 黑暗、恐懼 | 捲動 + 對話框 |
| blank-hours | 4 | 空白的六小時——純黑畫面中只有時鐘滴答 | 凝滯、未知 | 時鐘動畫 + 捲動推進 |
| library-dawn | 5 | 台大研究生圖書館旁，清晨薄霧，遺體被發現 | 冷靜、沉重 | 捲動 + 緩慢揭露 |
| wecht-arrival | 6 | Wecht 抵台——殯儀館驗屍、台大現場勘查 | 灰暗中有光 | 捲動顯示 |

擴充場景（8 個）：

| 場景 ID | 章節 | 描述 | 情緒基調 | 互動方式 |
|---------|------|------|---------|---------|
| linkou-childhood | 1 | 林口鄉村景色，清寒家庭，童年記憶 | 溫暖、希望 | 捲動顯示 |
| reading-formosa | 2 | 匹茲堡書房，夜晚燈下閱讀《美麗島雜誌》 | 熱忱、關切 | 捲動顯示 |
| last-free-night | 3 | 7月1日夜晚——「陳文成以自由之身度過的最後一個夜晚」 | 沉重、懸念 | 捲動 + 淡出至黑 |
| morning-basketball | 4 | 7月2日清晨 05:00，台大操場打籃球，日出微光 | 短暫平靜 | 捲動顯示 |
| being-taken | 4 | 08:30 三名男子持傳票帶走陳文成 | 壓迫、突然 | 捲動 + 對話框 |
| forensic-evidence | 5 | 衣著異常與傷痕——法醫視角的客觀呈現 | 客觀、冷灰 | 捲動 + 標註互動 |
| secret-experiment | 6 | 明園專案——人體模型從五樓拋落實驗（1984） | 荒謬、黑暗 | 捲動顯示 |
| memorial | 7 | 台大陳文成事件紀念廣場，留白與未解 | 沉重但開放 | 捲動 + 留白 |

詳細場景規格見 `docs/extracted/pixel-art-scenes.md`。

**Step 3: 定義每章的資訊圖表需求**

| 圖表 ID | 章節 | 類型 | 資料內容 | 視覺建議 |
|---------|------|------|---------|---------|
| surveillance-timeline | 2 | 橫向時間線 | 彩虹資料五筆監聽紀錄（1979.09–1981.05）+ 郵件攔截 | 冷色線條，監控節點脈動 |
| july-hourly-timeline | 3–4 | 垂直逐時時間線 | 7/1–7/3 每小時事件推進（核心 48 小時） | 時間軸左右交替，critical 事件紅色高亮 |
| testimony-comparison | 4 | 對照表 | 五名目擊證人證詞矛盾對比 + 警總官方說法 | 並列欄位，矛盾處用紅色標記 |
| library-building | 5 | 建築剖面圖 | 台大研究生圖書館五層結構、太平梯、五樓護欄（83cm）、陳屍位置 | 簡約線稿，SVG 互動標註 |
| injury-diagram | 5 | 人體標註圖 | 體內傷（肋骨骨折、脊椎、腎裂傷）+ 體外傷（右背擦傷、無防禦傷） | 正面+背面人體輪廓，傷處色塊標註 |
| crime-scene-map | 5 | 現場平面圖 | 陳屍位置、淺水溝、建築物相對位置、可能路徑 | 俯瞰視角，標註距離 |
| six-doubts | 5 | 圖文列表 | 六大疑點視覺化（傷勢方向、無防禦傷、存活時間等） | 編號卡片，每疑點配簡圖 |
| investigation-waves | 6 | 比較表 | 七波調查（1981–2020）：時間、主導機關、結論、關鍵發現 | 橫向表格，結論欄用色塊區分 |
| character-map | 全域 | 關係圖 | 以陳文成為中心——家人、同事、情治人員、調查者、證人 | SVG 或 CSS Grid，點擊展開卡片 |

詳細圖表規格見 `docs/extracted/infographic-specs.md`。

**Step 4: 建立 pixel art 場景規格文件**

- Create: `docs/extracted/pixel-art-scenes.md`
- 內容：每個場景的詳細描述、情緒氛圍、需要的元素清單、參考風格、技術考量

**Step 5: 建立資訊圖表規格文件**

- Create: `docs/extracted/infographic-specs.md`
- 內容：每個圖表的類型、資料來源、視覺設計建議、互動方式、RWD 降級策略

**Step 6: Commit** ✅
```bash
git add docs/narrative-structure.md docs/extracted/pixel-art-scenes.md docs/extracted/infographic-specs.md
git commit -m "docs: design narrative chapter structure with scene and infographic specs"
```

---

## Phase 3: 技術架構建立 ✅ COMPLETED

### Task 3.1: 初始化 Vite + React + TypeScript 專案 ✅

**Files:**
- Create: `package.json`, `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`, `index.html`
- Create: `src/main.tsx`, `src/App.tsx`
- Create: `.gitignore` (更新)

**Step 1: 使用 Vite 初始化專案**
```bash
cd /home/scipio/projects/Chen-Wen-chen
npm create vite@latest . -- --template react-ts
```
（若目錄非空，手動建立必要檔案）

**Step 2: 安裝核心依賴**
```bash
npm install react react-dom
npm install -D typescript @types/react @types/react-dom vite @vitejs/plugin-react
```

**Step 3: 確認 dev server 可啟動**
```bash
npm run dev
# 預期：Vite dev server 在 localhost:5173 啟動
```

**Step 4: Commit**
```bash
git add package.json tsconfig.json vite.config.ts index.html src/main.tsx src/App.tsx
git commit -m "feat: initialize Vite + React + TypeScript project"
```

---

### Task 3.2: 設定 TailwindCSS 暗色主題 ✅

**Files:**
- Modify: `package.json` (加依賴)
- Create: `tailwind.config.ts`
- Create: `src/styles/globals.css`

**Step 1: 安裝 TailwindCSS**
```bash
npm install -D tailwindcss @tailwindcss/vite
```

**Step 2: 配置自訂暗色主題**
```ts
// tailwind.config.ts
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // 暗色主題 — 報紙/打字機質感
        ink: {
          50: '#f5f5f0',
          100: '#e8e4db',
          200: '#d4cfc3',
          300: '#b8b0a0',
          400: '#9a8f7d',
          500: '#7d7163',
          600: '#635850',
          700: '#4a4039',
          800: '#332b25',
          900: '#1c1814',
          950: '#0d0b09',
        },
        accent: {
          red: '#c23b22',     // 警示、重要時刻
          gold: '#d4a855',    // 高亮
          blue: '#4a6fa5',    // 連結、互動元素
        },
      },
      fontFamily: {
        serif: ['"Noto Serif TC"', 'serif'],
        mono: ['"JetBrains Mono"', '"Noto Sans Mono"', 'monospace'],
        display: ['"Noto Serif TC"', 'serif'],
      },
    },
  },
}
```

**Step 3: 建立全域樣式**
```css
/* src/styles/globals.css */
@import "tailwindcss";

body {
  @apply bg-ink-950 text-ink-100 font-serif;
}
```

**Step 4: 驗證 Tailwind 運作**
在 App.tsx 加入測試類別，確認樣式生效。

**Step 5: Commit**
```bash
git add tailwind.config.ts src/styles/globals.css
git commit -m "feat: configure TailwindCSS with dark newspaper theme"
```

---

### Task 3.3: 整合 PixiJS ✅

**Files:**
- Modify: `package.json`
- Create: `src/components/pixel/PixiCanvas.tsx`
- Create: `src/components/pixel/usePixiApp.ts`

**Step 1: 安裝 PixiJS**
```bash
npm install pixi.js
```

**Step 2: 建立 PixiJS React wrapper**
```tsx
// src/components/pixel/PixiCanvas.tsx
import { useRef, useEffect } from 'react';
import { Application } from 'pixi.js';

interface PixiCanvasProps {
  width: number;
  height: number;
  onAppReady: (app: Application) => void;
  className?: string;
}

export function PixiCanvas({ width, height, onAppReady, className }: PixiCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const app = new Application();
    const initApp = async () => {
      await app.init({
        width,
        height,
        backgroundAlpha: 0,
        resolution: 1,
        antialias: false, // pixel art 不要反鋸齒
      });
      containerRef.current?.appendChild(app.canvas as HTMLCanvasElement);
      onAppReady(app);
    };

    initApp();

    return () => {
      app.destroy(true);
    };
  }, [width, height, onAppReady]);

  return <div ref={containerRef} className={className} />;
}
```

**Step 3: 建立測試場景確認 PixiJS 運作**
用 `docs/extracted/pixel-art-scenes.md` 中的 `campus-life` 場景做簡單概念驗證：320×180 解析度、`antialias: false`、接收 `progress` prop。

**Step 4: Commit**
```bash
git add src/components/pixel/
git commit -m "feat: integrate PixiJS with React wrapper"
```

---

### Task 3.4: 建立 Scrollytelling 機制 ✅

**Files:**
- Modify: `package.json`
- Create: `src/hooks/useScrollProgress.ts`
- Create: `src/components/narrative/ScrollSection.tsx`

**Step 1: 安裝 GSAP（或使用 Intersection Observer）**
```bash
npm install gsap
```

**Step 2: 建立 scroll progress hook**
```ts
// src/hooks/useScrollProgress.ts
import { useState, useEffect, useRef } from 'react';

export function useScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    // Intersection Observer 追蹤元素可見度與捲動進度
    // ...
  }, []);

  return { ref, progress, isInView };
}
```

**Step 3: 建立 ScrollSection 元件**
包裹每個敘事段落，提供進場/出場動畫觸發。
須將 `progress` (0–1) 傳給子元件（pixel art 場景依賴此值控制動畫，詳見 `docs/extracted/pixel-art-scenes.md` 通用技術規範）。

**Step 4: 驗證捲動觸發正常**

**Step 5: Commit**
```bash
git add src/hooks/useScrollProgress.ts src/components/narrative/ScrollSection.tsx
git commit -m "feat: implement scrollytelling mechanism"
```

---

### Task 3.5: 建立基礎 UI 元件 ✅

**Files:**
- Create: `src/components/narrative/TypewriterText.tsx` — 打字機效果文字
- Create: `src/components/narrative/Citation.tsx` — 引用來源標註
- Create: `src/components/narrative/ChapterTitle.tsx` — 章節標題
- Create: `src/components/narrative/DialogueBox.tsx` — 對話框（審訊場景用）
- Create: `src/components/ui/ContentWarning.tsx` — 內容警告

**Step 1: 實作 TypewriterText**
文字逐字出現，搭配打字機音效（可選）。

**Step 2: 實作 Citation**
顯示來源標註，hover 可展開詳細資訊。統一格式：`（來源：促轉會調查報告，第 XX 頁）`，詳見 `docs/extracted/infographic-specs.md` 通用技術規範。

**Step 3: 實作 ChapterTitle**
大標題，搭配淡入動畫。每章標題、時間範圍、情緒基調參照 `docs/narrative-structure.md`。

**Step 4: 實作 DialogueBox**
與 ScrollSection progress 連動、逐條顯示的對話框系統。用於第四章審訊場景（`interrogation-room`）。

**Step 5: 實作 ContentWarning**
首次進入網站時顯示，告知敏感內容。

**Step 6: Commit**
```bash
git add src/components/narrative/ src/components/ui/
git commit -m "feat: create base narrative and UI components"
```

---

## Phase 4: 核心頁面開發

> Phase 2 產出了三份詳細規格文件，Phase 4 依此拆分為 9 個 Task。
> 場景規格：`docs/extracted/pixel-art-scenes.md`
> 圖表規格：`docs/extracted/infographic-specs.md`
> 章節結構：`docs/narrative-structure.md`

### Task 4.1: 建立章節框架與路由 ✅

**Files:**
- Create: `src/chapters/Chapter01.tsx` ~ `Chapter07.tsx`
- Create: `src/chapters/index.ts`
- Modify: `src/App.tsx`

**Step 1: 建立章節元件框架**
依 `docs/narrative-structure.md` 的七章結構，每個章節元件包含：
- `ChapterTitle`（含章節號、標題、時間範圍）
- `ScrollSection` 包裹的敘事段落（段數依各章結構而異）
- Pixel art 場景插入點（`{/* PIXEL_SCENE: scene-id */}`）
- 資訊圖表插入點（`{/* INFOGRAPHIC: chart-id */}`）

各章對應的場景與圖表插入點（依規格文件）：

| 章 | 標題 | Pixel Art 場景 | 資訊圖表 |
|----|------|---------------|---------|
| 1 | 學者之路 | `campus-life` | — |
| 2 | 海外的聲音 | `surveillance-web` | `surveillance-timeline` |
| 3 | 歸途 | `airport-return` | `july-hourly-timeline`（跨 Ch3-4） |
| 4 | 約談 | `interrogation-room`, `blank-hours` | `testimony-comparison`, `july-hourly-timeline`（續） |
| 5 | 陳屍台大 | `library-dawn` | `library-building`, `injury-diagram`, `crime-scene-map`, `six-doubts` |
| 6 | 追尋真相 | `wecht-arrival` | `investigation-waves` |
| 7 | 未完的故事 | — | — |
| 全域 | — | — | `character-map` |

**Step 2: 設定 App.tsx 串接所有章節**
單頁捲動式，不用路由。各章節依序排列。章節間加入轉場區塊（`<div>` 預留，Phase 5 加動畫）。

**Step 3: 驗證所有章節可見**

**Step 4: Commit**
```bash
git add src/chapters/ src/App.tsx
git commit -m "feat: create chapter framework with scene and infographic slots"
```

---

### Task 4.2: 填入敘事內容 ✅

**Files:**
- Modify: `src/chapters/Chapter01.tsx` ~ `Chapter07.tsx`
- Create: `src/data/chapters/ch01.json` ~ `ch07.json`
- Read: `docs/extracted/narrative.md`, `docs/narrative-structure.md`

**Step 1: 從 narrative.md 提取各章文字**
依 `docs/narrative-structure.md` 各章的「敘事重點」與段落結構，將 `narrative.md` 內容分割為 JSON。每章 JSON 結構：

```json
{
  "chapter": 4,
  "title": "約談",
  "timeRange": "1981.07.02",
  "mood": "壓迫、恐懼、空白",
  "sections": [
    {
      "id": "ch4-s1",
      "subtitle": "清晨——被帶走",
      "paragraphs": [
        { "text": "...", "citation": "Wecht Report, p.3" }
      ],
      "sceneId": null,
      "infographicId": null
    }
  ]
}
```

**Step 2: 在各章節元件中引入對應內容**
使用 `TypewriterText`、`Citation`、`DialogueBox`（Ch4）元件呈現。
Ch4 三段式結構、Ch5 六段式結構需特別注意段落編排。

**Step 3: 確認所有引用標註正確**
每段敘述需有 `citation` 欄位，對應原始文獻頁碼。

**Step 4: Commit**
```bash
git add src/data/chapters/ src/chapters/
git commit -m "feat: populate chapter narrative content"
```

---

### Task 4.3: 實作 Timeline 元件（兩種時間線） ✅

規格來源：`docs/extracted/infographic-specs.md` → `surveillance-timeline` + `july-hourly-timeline`

**Files:**
- Create: `src/components/infographic/SurveillanceTimeline.tsx` — 橫向監控時間線（Ch2）
- Create: `src/components/infographic/HourlyTimeline.tsx` — 垂直逐時時間線（Ch3-4）
- Create: `src/components/infographic/TimelineEvent.tsx` — 共用事件卡片
- Read: `docs/extracted/timeline.json`

**Step 1: 實作 SurveillanceTimeline（橫向時間線）**
- 橫向時間軸：1979.09 → 1981.05
- 五筆監聽紀錄用節點標示，hover/點擊展開詳情
- 郵件攔截用信封 + 紅色攔截標記
- 美麗島事件、林宅血案用 `accent-red` 作為背景事件錨點
- 色調：冷藍/冷綠
- RWD 降級：手機改為垂直時間線

**Step 2: 實作 HourlyTimeline（垂直逐時時間線）**
- 垂直時間軸：7/1 日間 → 7/3 清晨
- 左右交替事件卡片
- `critical` 事件用 `accent-red` 高亮邊框
- 空白的六小時（21:30–07:00）用虛線 + 灰色區塊（「無可信證據」）
- 捲動時高亮當前時間段（active state）
- RWD 降級：手機改為單側

**Step 3: 整合進對應章節**
- `SurveillanceTimeline` → Chapter02
- `HourlyTimeline` → Chapter03–04（跨章節）

**Step 4: Commit**
```bash
git add src/components/infographic/SurveillanceTimeline.tsx src/components/infographic/HourlyTimeline.tsx src/components/infographic/TimelineEvent.tsx
git commit -m "feat: implement surveillance and hourly timeline components"
```

---

### Task 4.4: 實作人物關係圖 ✅

規格來源：`docs/extracted/infographic-specs.md` → `character-map`

**Files:**
- Create: `src/components/infographic/CharacterMap.tsx`
- Create: `src/components/infographic/CharacterCard.tsx`
- Read: `docs/extracted/characters.json`

**Step 1: 設計關係圖視覺**
SVG 中心放射狀布局，陳文成在中央。六組關係類型用不同顏色圈：
- 家人（暖色）
- 學術同儕
- 海外運動
- 情治機關（冷色/暗色）
- 調查者
- 證人

**Step 2: 實作元件**
- 點擊人物節點展開 `CharacterCard`（姓名、角色、關鍵行為、來源）
- hover 高亮相關連線
- 可按章節篩選（只顯示該章出現的人物）
- RWD 降級：手機改為分組列表 + 摺疊面板

**Step 3: 整合為全域可存取元件**
可在任何章節中引用，或作為獨立區塊。

**Step 4: Commit**
```bash
git add src/components/infographic/CharacterMap.tsx src/components/infographic/CharacterCard.tsx
git commit -m "feat: implement character relationship map"
```

---

### Task 4.5: 實作證詞矛盾對照表 ✅

規格來源：`docs/extracted/infographic-specs.md` → `testimony-comparison`

**Files:**
- Create: `src/components/infographic/TestimonyComparison.tsx`
- Create: `src/data/testimonies.json`

**Step 1: 建立證詞資料**
從 `docs/extracted/03-tjc-report-part2.md`（促轉會調查報告下冊 p.64–87）提取五名證人 + 警總官方說法，整理為 JSON。
主題維度：約談結束時間、是否派車送返、陳文成離開狀態、是否見到陳文成返家。
標註可信度（鄧維祥——存疑、倪肇強——不可信）。

**Step 2: 實作並列對照表**
- 固定左欄（主題），橫向可捲動查看各證人
- 矛盾處紅色標記 + 對角線連接
- 被質疑證詞加註可信度標籤
- hover 高亮同一主題的所有欄位
- RWD 降級：手機改為 tab 切換（每 tab 一個證人）或摺疊面板

**Step 3: 整合進 Chapter04**

**Step 4: Commit**
```bash
git add src/components/infographic/TestimonyComparison.tsx src/data/testimonies.json
git commit -m "feat: implement testimony contradiction comparison table"
```

---

### Task 4.6: 實作第五章法醫證據圖表（4 個） ✅

規格來源：`docs/extracted/infographic-specs.md` → `library-building`, `injury-diagram`, `crime-scene-map`, `six-doubts`

**Files:**
- Create: `src/components/infographic/LibraryBuilding.tsx` — 建築剖面圖（SVG）
- Create: `src/components/infographic/InjuryDiagram.tsx` — 傷痕位置人體圖（SVG）
- Create: `src/components/infographic/CrimeSceneMap.tsx` — 現場平面圖（SVG）
- Create: `src/components/infographic/SixDoubts.tsx` — 六大疑點卡片

**Step 1: 實作 LibraryBuilding**
- SVG 側面剖面圖：五層建築、太平梯、五樓護欄（83cm）
- 虛線標示可能墜落軌跡
- 陳屍位置用 `accent-red`
- hover/點擊標註點展開詳情
- 可切換視角：側面剖面 ↔ 俯瞰平面

**Step 2: 實作 InjuryDiagram**
- SVG 正面 + 背面人體輪廓
- 體內傷：半透明紅色色塊覆蓋（右側肋骨骨折、脊椎骨折、右腎裂傷等）
- 體外傷：橘色區塊（右背擦傷）
- 「無傷」區域：手部、腕部用綠色框標註
- 可切換：體內傷 / 體外傷 / 全部
- hover/點擊展開法醫描述 + 來源頁碼

**Step 3: 實作 CrimeSceneMap**
- SVG 俯瞰圖：建築、太平梯、陳屍位置（淺水溝）、校門
- 距離標註（公尺）
- 可能運送路徑用虛線箭頭
- 可疊加/取消不同資訊圖層

**Step 4: 實作 SixDoubts**
- 六張編號卡片（3×2 grid / 手機 1×6 stack）
- 每張含大編號、疑點標題、簡圖/圖示、展開後詳細說明 + 來源
- 捲動進場：卡片依序淡入
- 色調：冷灰底 + `accent-red` 編號

**Step 5: 整合進 Chapter05**
依六段式結構插入對應位置：
- 「清晨的發現」段後 → `LibraryBuilding`
- 「傷痕分析」段後 → `InjuryDiagram`
- 「關鍵疑點」段 → `SixDoubts`
- 「死因研判」段旁 → `CrimeSceneMap`

**Step 6: Commit**
```bash
git add src/components/infographic/LibraryBuilding.tsx src/components/infographic/InjuryDiagram.tsx src/components/infographic/CrimeSceneMap.tsx src/components/infographic/SixDoubts.tsx
git commit -m "feat: implement Chapter 5 forensic evidence infographics"
```

---

### Task 4.7: 實作七波調查比較表 ✅

規格來源：`docs/extracted/infographic-specs.md` → `investigation-waves`

**Files:**
- Create: `src/components/infographic/InvestigationWaves.tsx`
- Create: `src/data/investigations.json`

**Step 1: 建立調查資料**
七波調查（1981–2020）：年份、主導機關、調查類型、結論、關鍵發現。
結論色塊分類：紅色（自殺定調）、綠色（謀殺/他殺判定）、灰色（無明確結論）。

**Step 2: 實作橫向比較表**
- 每列一波調查，時間軸從上至下
- 結論欄用色塊區分
- hover 展開詳細描述 + 來源
- 捲動進場：列依序淡入
- RWD 降級：手機改為垂直卡片堆疊或固定首欄橫向滾動

**Step 3: 整合進 Chapter06（「漫長的調查之路」段）**

**Step 4: Commit**
```bash
git add src/components/infographic/InvestigationWaves.tsx src/data/investigations.json
git commit -m "feat: implement investigation waves comparison table"
```

---

### Task 4.8: 實作核心 Pixel Art 場景（7 個） ✅

規格來源：`docs/extracted/pixel-art-scenes.md` → 核心場景

**Files:**
- Create: `src/components/pixel/scenes/CampusLifeScene.tsx` — Ch1 CMU 校園
- Create: `src/components/pixel/scenes/SurveillanceWebScene.tsx` — Ch2 跨太平洋監控網
- Create: `src/components/pixel/scenes/AirportReturnScene.tsx` — Ch3 松山機場
- Create: `src/components/pixel/scenes/InterrogationRoomScene.tsx` — Ch4 審訊室
- Create: `src/components/pixel/scenes/BlankHoursScene.tsx` — Ch4 空白的六小時
- Create: `src/components/pixel/scenes/LibraryDawnScene.tsx` — Ch5 台大圖書館旁
- Create: `src/components/pixel/scenes/WechtArrivalScene.tsx` — Ch6 Wecht 抵台
- Create: `public/assets/sprites/{scene-id}/` — 各場景 sprite sheets

所有場景共用規範：
- 基礎解析度 320×180，scale up 至視窗寬度
- 接收 `progress` prop (0–1)，與 `useScrollProgress` 連動
- `antialias: false`（pixel art 不反鋸齒）
- 手機（< 640px）降級為靜態 PNG
- 離開 viewport 後釋放 PixiJS 資源
- 提供 `aria-label`，支援 `prefers-reduced-motion`

**Step 1: CampusLifeScene（溫暖場景）**
- 陳文成站在黑板前（站立 + 書寫兩幀 sprite）
- 暖金色光線從窗戶透入（alpha 動畫）
- 進入 viewport 淡入

**Step 2: SurveillanceWebScene（漸進式揭露）**
- 左側匹茲堡（暖色）、右側台北（冷色）、中間太平洋
- `progress` 控制元素浮現：0–0.3 基礎場景 → 0.3–0.6 電話線 + 郵件 → 0.6–1.0 完整監控網
- 電話線脈動、信件被攔截動畫

**Step 3: AirportReturnScene（壓迫感）**
- 機場入境通道，冷白日光燈
- 便衣人影用低 alpha sprite + 微動畫
- 陳文成行走 2–3 幀動畫

**Step 4: InterrogationRoomScene（最暗場景）**
- 吊燈錐形冷白光，其餘全暗
- 審訊者用剪影/模糊面容
- 燈光搖晃 1–2px 偏移循環
- 錄音機磁帶轉動微動畫
- 與 `DialogueBox` 元件連動，逐條顯示對話

**Step 5: BlankHoursScene（極簡場景）**
- 全黑 + 中央時鐘，指針 21:30 → 07:00
- `progress` 直接映射時鐘時間
- 閃現碎片：極短 alpha fade in/out（200ms）
- 最低資源消耗，手機可保留

**Step 6: LibraryDawnScene（緩慢揭露）**
- 五層建築側面 + 太平梯 + 護欄
- 鏡頭緩移：camera offset 與 progress 連動，從建築全景下移至地面
- 清晨灰藍色調 + 霧氣半透明 sprite 層
- 不直接顯示遺體——用留白/陰影暗示

**Step 7: WechtArrivalScene（三段式場景）**
- progress 切換三段：殯儀館（冷）→ 台大現場（灰）→ 松山機場記者會（微暖）
- 復用 library-dawn 建築 sprite
- 國安局監控人影持續出現

**Step 8: 整合進各章節**
將各場景元件嵌入對應章節的預留插入點。

**Step 9: Commit**
```bash
git add src/components/pixel/scenes/ public/assets/sprites/
git commit -m "feat: implement 7 core pixel art scenes"
```

---

### Task 4.9: 實作擴充 Pixel Art 場景（選做）

規格來源：`docs/extracted/pixel-art-scenes.md` → 擴充場景

**Files:**
- Create: `src/components/pixel/scenes/LinkouChildhoodScene.tsx` — Ch1 林口童年
- Create: `src/components/pixel/scenes/ReadingFormosaScene.tsx` — Ch2 閱讀美麗島
- Create: `src/components/pixel/scenes/LastFreeNightScene.tsx` — Ch3 最後的自由夜晚
- Create: `src/components/pixel/scenes/MorningBasketballScene.tsx` — Ch4 清晨籃球
- Create: `src/components/pixel/scenes/BeingTakenScene.tsx` — Ch4 被帶走
- Create: `src/components/pixel/scenes/ForensicEvidenceScene.tsx` — Ch5 法醫證據
- Create: `src/components/pixel/scenes/SecretExperimentScene.tsx` — Ch6 明園專案
- Create: `src/components/pixel/scenes/MemorialScene.tsx` — Ch7 紀念廣場

> 此 Task 為選做，視開發時程決定。各場景規格詳見 `docs/extracted/pixel-art-scenes.md` 擴充場景 #8–#15。

**Step 1: 依優先順序實作**
建議優先順序（依敘事衝擊力）：
1. `BlankHoursScene` 已在核心場景完成
2. `BeingTakenScene` — Ch4 的轉折點
3. `LastFreeNightScene` — Ch3 收尾，銜接 Ch4
4. `MemorialScene` — Ch7 收尾，全篇結語
5. 其餘依時程

**Step 2: 整合進對應章節**

**Step 3: Commit**
```bash
git add src/components/pixel/scenes/
git commit -m "feat: implement extended pixel art scenes"
```

---

## Phase 5: 打磨與部署

### Task 5.1: 動畫與轉場效果 ✅

**Files:**
- Modify: `src/chapters/Chapter01.tsx` ~ `Chapter07.tsx`
- Modify: `src/components/narrative/ScrollSection.tsx`

**Step 1: 章節間轉場**
使用淡入淡出 + 視差效果。

**Step 2: 文字進場動畫**
段落隨捲動逐段淡入。

**Step 3: Pixel art 場景動畫**
與捲動進度連動的動畫序列。

**Step 4: 效能測試**
確保 60fps 滾動，無掉幀。

**Step 5: Commit**
```bash
git add -A
git commit -m "feat: add transitions and scroll animations"
```

---

### Task 5.2: RWD 最佳化

**Files:**
- Modify: 各元件
- Modify: `tailwind.config.ts` (breakpoints)

**Step 1: 手機版 (< 640px)**
- 單欄排版
- Pixel art 場景改為靜態圖
- Timeline 改為單側
- 人物關係圖改為列表

**Step 2: 平板版 (640-1024px)**
- 雙欄部分保留
- Pixel art 保留但縮小

**Step 3: 桌面版 (> 1024px)**
- 完整體驗

**Step 4: 跨裝置測試**

**Step 5: Commit**
```bash
git add -A
git commit -m "feat: responsive design optimization"
```

---

### Task 5.3: SEO 與 OG Tags

**Files:**
- Modify: `index.html`
- Create: `public/og-image.png`

**Step 1: 設定 meta tags**
```html
<meta name="description" content="1981年陳文成事件互動式歷史紀錄" />
<meta property="og:title" content="陳文成事件 — 互動式歷史紀錄" />
<meta property="og:description" content="以文字電影風格呈現的台灣白色恐怖歷史" />
<meta property="og:image" content="/og-image.png" />
<meta property="og:type" content="website" />
```

**Step 2: 結構化資料 (JSON-LD)**
加入 Article schema。

**Step 3: 無障礙 (a11y)**
- 所有圖片有 alt text
- 鍵盤可導航
- ARIA labels

**Step 4: Commit**
```bash
git add index.html public/og-image.png
git commit -m "feat: add SEO, OG tags, and accessibility"
```

---

### Task 5.4: 部署

**Files:**
- Create: `vercel.json` 或 `netlify.toml`

**Step 1: 建置測試**
```bash
npm run build
npm run preview
```

**Step 2: 設定部署平台**
連接 Git repository，設定自動部署。

**Step 3: 部署並驗證**
確認線上版本功能正常。

**Step 4: Commit**
```bash
git add vercel.json
git commit -m "chore: add deployment configuration"
```

---

## 注意事項

- **每個 Task 完成後都要 commit**
- **Phase 1 是基礎**：必須完整且準確，後續所有內容都建立在此
- **歷史敘事**：每段文字都要有出處，不可虛構
- **效能**：PixiJS 場景需注意記憶體管理，離開 viewport 要釋放資源
- **無障礙**：網站應可用鍵盤操作，螢幕閱讀器友善
