# 陳文成事件 — 互動式歷史紀錄

> 以「文字電影」（scrollytelling documentary）的形式，呈現 1981 年陳文成事件的歷史脈絡。

<p align="center">
  <strong>
    <a href="https://soanseng.github.io/Chen-Wen-chen/">線上閱讀 Live Demo</a>
  </strong>
</p>

---

## 關於這個專案

1981 年 7 月 2 日，旅美統計學者陳文成被台灣警備總司令部約談後，隔日陳屍於台灣大學研究生圖書館旁。四十多年來，真相始終未明。

這個網站將散落在不同語言、不同年代的調查報告——Cyril Wecht 法醫鑑定、促轉會調查報告、黃怡與林世煜的獨立調查——整合為一條可以「走過」的互動式敘事。透過捲動頁面，讀者可以像觀看紀錄片一樣，逐步進入事件的時間線、人物、證據與爭議。

**核心原則：** 歷史紀錄，非政治評論。所有敘述皆有文獻依據，不臆測、不虛構。不同報告有矛盾時並列呈現，判斷留給讀者。

---

## 章節結構

網站以七章敘事呈現陳文成事件的完整脈絡：

| 章 | 標題 | 時間範圍 | 內容 |
|----|------|---------|------|
| 1 | 學者之路 | 1950–1978 | 林口童年、赴美求學、Carnegie Mellon 學術生涯 |
| 2 | 返鄉 | 1979–1981 | 海外民主運動參與、跨太平洋監控、返台決定 |
| 3 | 監控與約談前夜 | 1981/6–7/1 | 情治機關佈局、彩虹資料監聽、最後的自由夜晚 |
| 4 | 約談 | 1981/7/2 | 被帶走、審訊過程、空白的十二小時 |
| 5 | 失蹤與發現 | 1981/7/2–3 | 遺體發現、傷痕分析、六大疑點、死因研判 |
| 6 | 追尋真相 | 1981–2020 | 七波調查、Wecht 法醫鑑定、明園專案、各方結論 |
| 7 | 未完的故事 | 2020— | 促轉會結論、真相為何難明、未竟的轉型正義 |

---

## 技術架構

### 技術棧

| 層級 | 技術 | 版本 | 用途 |
|------|------|------|------|
| 建置工具 | [Vite](https://vite.dev/) | 7 | 開發伺服器、HMR、production build |
| 框架 | [React](https://react.dev/) | 19 | UI 元件、狀態管理 |
| 語言 | [TypeScript](https://www.typescriptlang.org/) | 5.9 (strict) | 型別安全 |
| 樣式 | [TailwindCSS](https://tailwindcss.com/) | 4 | 工具類 CSS、自訂暗色主題（`ink-*` 色階） |
| 場景渲染 | [PixiJS](https://pixijs.com/) | 8 | Pixel art 場景、動畫 |
| 動畫 | [GSAP](https://gsap.com/) + Intersection Observer | — | Scrollytelling 觸發、捲動進度追蹤 |
| 部署 | GitHub Pages + GitHub Actions | — | 自動化靜態網站部署 |

### 目錄結構

```
Chen-Wen-chen/
├── index.html                           ← 進入點（含 SEO、OG tags、JSON-LD）
├── vite.config.ts                       ← Vite 設定（含 base path、alias）
├── tsconfig.json                        ← TypeScript strict 設定
├── CLAUDE.md                            ← 開發規範與 AI 協作指引
├── PLAN.md                              ← 分階段實作計畫
├── LICENSE                              ← MIT License
│
├── docs/
│   ├── pdfs/                            ← 原始 PDF 文獻（已 gitignore）
│   ├── extracted/                       ← 從 PDF 提取的結構化資料
│   │   ├── 01-wecht-report.md           ← Wecht 法醫鑑定報告
│   │   ├── 02-tjc-report-part1.md       ← 促轉會調查報告（前半）
│   │   ├── 03-tjc-report-part2.md       ← 促轉會調查報告（後半）
│   │   ├── 04-cause-of-death.md         ← 死因分析
│   │   ├── 05-investigation-report.md   ← 黃怡、林世煜調查報告
│   │   ├── timeline.json                ← 整合事件時間線
│   │   ├── characters.json              ← 人物資料庫與關係
│   │   ├── narrative.md                 ← 整合敘事全文
│   │   ├── pixel-art-scenes.md          ← 場景設計規格
│   │   └── infographic-specs.md         ← 資訊圖表規格
│   └── narrative-structure.md           ← 章節結構設計
│
├── src/
│   ├── main.tsx                         ← 應用程式進入點
│   ├── App.tsx                          ← 根元件（章節串接、Afterword）
│   │
│   ├── chapters/                        ← 七章頁面元件
│   │   ├── index.ts
│   │   └── Chapter01.tsx ~ Chapter07.tsx
│   │
│   ├── components/
│   │   ├── narrative/                   ← 敘事元件
│   │   │   ├── ScrollSection.tsx        ← 捲動觸發容器
│   │   │   ├── ChapterTitle.tsx         ← 章節標題
│   │   │   ├── NarrativeParagraph.tsx   ← 段落（text/quote/note/list）
│   │   │   ├── Citation.tsx             ← 引用來源標註
│   │   │   ├── DialogueBox.tsx          ← 對話框（審訊場景用）
│   │   │   └── TypewriterText.tsx       ← 打字機動畫效果
│   │   │
│   │   ├── infographic/                 ← 資訊圖表（12 個元件）
│   │   │   ├── SurveillanceTimeline.tsx ← 監控時間線（Ch2）
│   │   │   ├── HourlyTimeline.tsx       ← 逐時時間線（Ch3–4）
│   │   │   ├── TimelineEvent.tsx        ← 時間線事件卡片
│   │   │   ├── TestimonyComparison.tsx  ← 證詞矛盾對照表（Ch4）
│   │   │   ├── LibraryBuilding.tsx      ← 建築剖面圖（Ch5）
│   │   │   ├── InjuryDiagram.tsx        ← 傷痕位置人體圖（Ch5）
│   │   │   ├── CrimeSceneMap.tsx        ← 現場平面圖（Ch5）
│   │   │   ├── SixDoubts.tsx            ← 六大疑點卡片（Ch5）
│   │   │   ├── InvestigationWaves.tsx   ← 七波調查比較表（Ch6）
│   │   │   ├── CharacterMap.tsx         ← 人物關係圖（全域）
│   │   │   └── CharacterCard.tsx        ← 人物資訊卡
│   │   │
│   │   ├── pixel/                       ← PixiJS pixel art 場景
│   │   │   ├── PixelScene.tsx           ← 場景容器（lazy load + viewport 偵測）
│   │   │   ├── PixiCanvas.tsx           ← Canvas 渲染器
│   │   │   ├── usePixiApp.ts            ← PixiJS 初始化 hook
│   │   │   └── scenes/                  ← 15 個場景元件
│   │   │       ├── CampusLifeScene.tsx          ← Ch1：CMU 校園
│   │   │       ├── LinkouChildhoodScene.tsx     ← Ch1：林口童年
│   │   │       ├── ReadingFormosaScene.tsx       ← Ch2：閱讀美麗島雜誌
│   │   │       ├── SurveillanceWebScene.tsx      ← Ch2：跨太平洋監控網
│   │   │       ├── AirportReturnScene.tsx        ← Ch3：松山機場返台
│   │   │       ├── LastFreeNightScene.tsx        ← Ch3：最後的自由夜晚
│   │   │       ├── MorningBasketballScene.tsx    ← Ch4：清晨籃球
│   │   │       ├── BeingTakenScene.tsx           ← Ch4：被帶走
│   │   │       ├── InterrogationRoomScene.tsx    ← Ch4：審訊室
│   │   │       ├── BlankHoursScene.tsx           ← Ch4：空白的六小時
│   │   │       ├── LibraryDawnScene.tsx          ← Ch5：清晨圖書館旁
│   │   │       ├── ForensicEvidenceScene.tsx     ← Ch5：法醫證據
│   │   │       ├── MemorialScene.tsx             ← Ch5：紀念
│   │   │       ├── WechtArrivalScene.tsx         ← Ch6：Wecht 抵台
│   │   │       └── SecretExperimentScene.tsx     ← Ch6：明園專案
│   │   │
│   │   └── ui/
│   │       └── ContentWarning.tsx       ← 內容警告閘門
│   │
│   ├── data/
│   │   ├── chapters/                    ← 各章敘事資料（JSON）
│   │   │   ├── types.ts                 ← TypeScript 型別定義
│   │   │   └── ch01.json ~ ch07.json
│   │   ├── testimonies.json             ← 證詞矛盾資料
│   │   └── investigations.json          ← 七波調查資料
│   │
│   ├── hooks/
│   │   └── useScrollProgress.ts         ← 捲動進度追蹤 hook
│   │
│   ├── styles/
│   │   └── globals.css                  ← 全域樣式、Tailwind 設定、字型
│   │
│   └── utils/
│       └── animation.ts                 ← 動畫工具（fadeIn、staggeredFadeIn 等）
│
├── public/
│   └── assets/
│       ├── sprites/                     ← Pixel art sprite sheets
│       └── fonts/                       ← 自訂字型
│
└── .github/
    └── workflows/
        └── deploy.yml                   ← GitHub Pages 自動部署
```

### 架構設計

```
                    ┌──────────────┐
                    │  index.html  │  SEO · OG · JSON-LD
                    └──────┬───────┘
                           │
                    ┌──────┴───────┐
                    │   App.tsx    │  章節串接 · 轉場 · Afterword
                    └──────┬───────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
   ┌──────┴──────┐  ┌─────┴──────┐  ┌──────┴──────┐
   │  chapters/  │  │ components │  │   data/     │
   │ Ch01 ~ Ch07 │  │            │  │ JSON + TS   │
   └──────┬──────┘  └─────┬──────┘  └──────┬──────┘
          │               │                │
          │    ┌──────────┼──────────┐     │
          │    │          │          │     │
          │  narrative  pixel   infographic│
          │  (文字敘事) (PixiJS)  (SVG圖表) │
          │    │          │          │     │
          └────┴──────────┴──────────┴─────┘
                          │
                   ┌──────┴──────┐
                   │   hooks/    │  useScrollProgress
                   │   utils/    │  animation helpers
                   └─────────────┘
```

**資料流向：**

1. **文獻層** (`docs/extracted/`) → 從原始 PDF 提取的結構化 Markdown 與 JSON
2. **資料層** (`src/data/`) → 章節敘事、證詞、調查資料，皆附文獻頁碼引用
3. **元件層** (`src/components/`) → 三類元件各司其職：
   - `narrative/`：文字敘事（段落、引言、對話、引用標註）
   - `pixel/`：PixiJS pixel art 場景（320×180 基礎解析度，捲動連動動畫）
   - `infographic/`：SVG 資訊圖表（時間線、人體圖、關係圖、對照表）
4. **頁面層** (`src/chapters/`) → 各章組合敘事、場景與圖表
5. **應用層** (`src/App.tsx`) → 線性捲動串接所有章節

**捲動機制：**

`useScrollProgress` hook 透過 Intersection Observer 追蹤每個 `ScrollSection` 在 viewport 中的進度（0–1），驅動：
- 文字段落的淡入動畫（`fadeIn`、`staggeredFadeIn`）
- PixiJS 場景的動畫進度
- 章節分隔線的繪製動畫（`lineDrawProgress`）

**PixiJS 場景原則：**
- 進入 viewport 才初始化（lazy load）
- 離開 viewport 後釋放資源
- 手機（< 640px）降級為靜態圖或簡化動畫
- 視覺風格參考 *Papers, Please* 的色調與人物比例

---

## 文獻來源

所有敘事內容基於以下歷史文獻，每段敘述皆標註出處頁碼：

| # | 文獻 | 說明 | 語言 | 連結 |
|---|------|------|------|------|
| 1 | Cyril Wecht, *Death in the Cause of Democracy* | 國際法醫權威 Wecht 受邀赴台鑑定之報告 | 英文 | [PDF](http://www.cwcmf.org.tw/the%20truth/wecht_1.pdf) |
| 2 | 促轉會《陳文成案調查報告》 | 促進轉型正義委員會官方調查報告 | 中文 | [PDF](https://drive.google.com/file/d/14OI0ySfF-_MbLUFyU-1THrdHUyfoTqdI/view?usp=sharing) |
| 3 | 《陳文成之死因》 | 死因分析專論 | 中文 | [PDF](http://www.cwcmf.org.tw/the%20truth/doubtful_1.pdf) |
| 4 | 黃怡、林世煜《陳文成事件調查報告》 | 獨立調查報告 | 中文 | [PDF](http://www.cwcmf.org.tw/the%20truth/report_1.pdf) |

以上文獻皆可透過[陳文成博士紀念基金會](http://www.cwcmf.org.tw/)取得。

引用格式範例：
- `（來源：促轉會調查報告，第 45 頁）`
- `（Source: Wecht Report, p. 12）`

---

## 開發

### 環境需求

- Node.js >= 20
- npm >= 10

### 快速開始

```bash
# 安裝依賴
npm install

# 啟動開發伺服器（http://localhost:5173）
npm run dev

# 型別檢查
npx tsc --noEmit

# Lint
npm run lint

# 建置
npm run build

# 預覽建置結果
npm run preview
```

### 部署

專案透過 GitHub Actions 自動部署至 GitHub Pages。每次推送至 `main` 分支即觸發：

1. `npm ci` → `npm run build`
2. 上傳 `dist/` 至 GitHub Pages
3. 部署至 `https://soanseng.github.io/Chen-Wen-chen/`

設定檔：[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)

---

## 無障礙與 SEO

- 語意化 HTML：`<article>`、`<section>`、`<header>`、`<main>`、`<footer>`
- ARIA labels 標註所有主要區塊
- 跳至主要內容連結（Skip navigation）
- 鍵盤可導航
- `prefers-reduced-motion` 支援
- 內容警告閘門（Content Warning）
- Open Graph + Twitter Card meta tags
- JSON-LD 結構化資料（Article + Event + Person schema）

---

## 歷史敘事原則

1. **嚴謹與事實** — 所有敘述必須有文獻依據，不臆測、不虛構
2. **不做政治判斷** — 呈現各方說法與證據，讓讀者自行判斷
3. **尊重受害者與家屬** — 避免煽情化、避免消費悲劇
4. **標註出處** — 每段敘述標明來自哪份文獻的哪個章節
5. **爭議處理** — 不同報告有矛盾時，並列呈現，不偏袒

---

## 授權

本專案以 [MIT License](LICENSE) 開源。

歷史不屬於任何人，它屬於所有人。如果你能讓這份記錄被更多人看見——翻譯、改作、引用——請自由取用。

---

## 作者

**陳璿丞 醫師**

- Web: [anatomind.com](https://anatomind.com)
- Facebook: [facebook.com/anatomind.com](https://facebook.com/anatomind.com)
