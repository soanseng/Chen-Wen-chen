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

## Phase 2: 敘事結構設計

### Task 2.1: 設計章節結構

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

| 場景 | 章節 | 描述 | 互動方式 |
|------|------|------|---------|
| campus-life | 1 | CMU 校園場景，陳文成在黑板前 | 捲動顯示 |
| reading-formosa | 2 | 閱讀美麗島雜誌的書房場景 | 捲動顯示 |
| airport-return | 3 | 松山機場入境 | 捲動顯示 |
| interrogation | 4 | 警備總部審訊室 | 捲動 + 對話框 |
| library-scene | 5 | 台大研究生圖書館旁，清晨 | 捲動 + 緩慢揭露 |
| investigation | 6 | 法醫檢驗桌 / 文件堆疊 | 捲動顯示 |

**Step 3: 定義每章的資訊圖表需求**
- Chapter 3-4: 7月1-3日逐時時間線
- Chapter 5: 現場平面圖、傷痕位置圖
- Chapter 6: 歷次調查比較表
- 全域: 人物關係圖

**Step 4: Commit**
```bash
git add docs/narrative-structure.md
git commit -m "docs: design narrative chapter structure"
```

---

## Phase 3: 技術架構建立

### Task 3.1: 初始化 Vite + React + TypeScript 專案

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

### Task 3.2: 設定 TailwindCSS 暗色主題

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

### Task 3.3: 整合 PixiJS

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

**Step 4: Commit**
```bash
git add src/components/pixel/
git commit -m "feat: integrate PixiJS with React wrapper"
```

---

### Task 3.4: 建立 Scrollytelling 機制

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

**Step 4: 驗證捲動觸發正常**

**Step 5: Commit**
```bash
git add src/hooks/useScrollProgress.ts src/components/narrative/ScrollSection.tsx
git commit -m "feat: implement scrollytelling mechanism"
```

---

### Task 3.5: 建立基礎 UI 元件

**Files:**
- Create: `src/components/narrative/TypewriterText.tsx` — 打字機效果文字
- Create: `src/components/narrative/Citation.tsx` — 引用來源標註
- Create: `src/components/narrative/ChapterTitle.tsx` — 章節標題
- Create: `src/components/ui/ContentWarning.tsx` — 內容警告

**Step 1: 實作 TypewriterText**
文字逐字出現，搭配打字機音效（可選）。

**Step 2: 實作 Citation**
顯示來源標註，hover 可展開詳細資訊。

**Step 3: 實作 ChapterTitle**
大標題，搭配淡入動畫。

**Step 4: 實作 ContentWarning**
首次進入網站時顯示，告知敏感內容。

**Step 5: Commit**
```bash
git add src/components/narrative/ src/components/ui/
git commit -m "feat: create base narrative and UI components"
```

---

## Phase 4: 核心頁面開發

### Task 4.1: 建立章節框架與路由

**Files:**
- Create: `src/chapters/Chapter01.tsx` ~ `Chapter07.tsx`
- Create: `src/chapters/index.ts`
- Modify: `src/App.tsx`

**Step 1: 建立章節元件框架**
每個章節元件包含：
- 章節標題
- ScrollSection 包裹的敘事段落
- Pixel art 場景插入點（預留）
- 資訊圖表插入點（預留）

**Step 2: 設定 App.tsx 串接所有章節**
單頁捲動式，不用路由。各章節依序排列。

**Step 3: 驗證所有章節可見**

**Step 4: Commit**
```bash
git add src/chapters/ src/App.tsx
git commit -m "feat: create chapter framework"
```

---

### Task 4.2: 填入敘事內容

**Files:**
- Modify: `src/chapters/Chapter01.tsx` ~ `Chapter07.tsx`
- Create: `src/data/chapters/` — 各章文字內容 JSON

**Step 1: 從 narrative.md 提取各章文字**
將敘事內容轉為結構化資料。

**Step 2: 在各章節元件中引入對應內容**
使用 TypewriterText 和 Citation 元件呈現。

**Step 3: 確認所有引用標註正確**

**Step 4: Commit**
```bash
git add src/data/chapters/ src/chapters/
git commit -m "feat: populate chapter narrative content"
```

---

### Task 4.3: 實作 Timeline 元件

**Files:**
- Create: `src/components/infographic/Timeline.tsx`
- Create: `src/components/infographic/TimelineEvent.tsx`
- Read: `docs/extracted/timeline.json`

**Step 1: 設計 Timeline 視覺**
垂直時間線，左右交替顯示事件卡片。
`critical` 事件用 `accent-red` 高亮。

**Step 2: 實作元件**
- 支援篩選（依 significance）
- 捲動時高亮當前時間段
- RWD：手機上改為單側顯示

**Step 3: 整合進 Chapter 3-4（逐時時間線）**

**Step 4: Commit**
```bash
git add src/components/infographic/Timeline.tsx src/components/infographic/TimelineEvent.tsx
git commit -m "feat: implement interactive timeline component"
```

---

### Task 4.4: 實作人物關係圖

**Files:**
- Create: `src/components/infographic/CharacterMap.tsx`
- Create: `src/components/infographic/CharacterCard.tsx`
- Read: `docs/extracted/characters.json`

**Step 1: 設計關係圖視覺**
使用 SVG 或 CSS Grid 呈現人物關係網。
中心為陳文成，周圍按關係類型分組。

**Step 2: 實作元件**
- 點擊人物卡片展開詳細資訊
- 關係線標示關係類型
- RWD：手機上改為列表模式

**Step 3: 整合為獨立可捲動段落**

**Step 4: Commit**
```bash
git add src/components/infographic/CharacterMap.tsx src/components/infographic/CharacterCard.tsx
git commit -m "feat: implement character relationship map"
```

---

### Task 4.5: 實作 Pixel Art 場景

**Files:**
- Create: `src/components/pixel/scenes/CampusScene.tsx`
- Create: `src/components/pixel/scenes/InterrogationScene.tsx`
- Create: `src/components/pixel/scenes/LibraryScene.tsx`
- Create: `public/assets/sprites/` — sprite sheets

**Step 1: 設計場景像素圖**
使用簡約風格（Papers, Please 參考）。
每場景 320×180 像素基礎解析度，再 scale up。

**Step 2: 實作場景元件**
每個場景：
- 接收 `progress` (0-1) 控制動畫進度
- 與 ScrollSection 的 progress 連動
- 手機降級為靜態圖

**Step 3: 整合進對應章節**

**Step 4: Commit**
```bash
git add src/components/pixel/scenes/ public/assets/sprites/
git commit -m "feat: implement pixel art scenes"
```

---

## Phase 5: 打磨與部署

### Task 5.1: 動畫與轉場效果

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
