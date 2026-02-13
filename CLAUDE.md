# 陳文成事件 — 互動式歷史紀錄網站

## 專案目標與定位

以「文字電影」（scrollytelling documentary）的形式，呈現 1981 年陳文成事件的歷史脈絡。網站讓使用者像觀看紀錄片一樣，透過捲動頁面逐步進入事件的時間線、人物、證據與爭議，搭配 PixiJS pixel art 場景重現關鍵時刻。

**核心定位：** 歷史紀錄，非政治評論。讓事實與文獻自己說話。

---

## 技術棧

| 層級 | 技術 | 用途 |
|------|------|------|
| 建置工具 | Vite | 快速 dev server、HMR、production build |
| 框架 | React 18+ | UI 元件、狀態管理 |
| 語言 | TypeScript (strict) | 型別安全 |
| 樣式 | TailwindCSS v4 | 工具類 CSS、自訂暗色主題 |
| 場景渲染 | PixiJS v8 | Pixel art 場景、動畫 |
| 捲動敘事 | GSAP ScrollTrigger 或 Intersection Observer | Scrollytelling 觸發 |
| 部署 | Vercel / Netlify | 靜態網站部署 |

---

## 目錄結構

```
Chen-Wen-chen/
├── CLAUDE.md                    ← 本檔案（專案規範）
├── PLAN.md                      ← 實作計畫
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── index.html
├── docs/
│   ├── pdfs/                    ← 原始 PDF 文件（已 gitignore）
│   └── extracted/               ← 提取的結構化資料
│       ├── 01-wecht-report.md
│       ├── 02-tjc-report-part1.md
│       ├── 03-tjc-report-part2.md
│       ├── 04-cause-of-death.md
│       ├── 05-investigation-report.md
│       ├── timeline.json        ← 整合後的事件時間線
│       ├── characters.json      ← 人物資料庫
│       └── narrative.md         ← 整合後的完整敘事
├── src/
│   ├── main.tsx                 ← 應用程式進入點
│   ├── App.tsx                  ← 根元件、路由
│   ├── chapters/                ← 各章節頁面元件
│   │   ├── index.ts
│   │   ├── Chapter01.tsx
│   │   └── ...
│   ├── components/
│   │   ├── ui/                  ← 通用 UI 元件（按鈕、卡片、Modal）
│   │   ├── infographic/         ← 資訊圖表（Timeline、關係圖、流程圖）
│   │   ├── pixel/               ← PixiJS pixel art 場景元件
│   │   └── narrative/           ← 敘事元件（TypewriterText、ScrollSection、Citation）
│   ├── data/                    ← 結構化資料（從 docs/extracted/ 匯入）
│   ├── hooks/                   ← 自訂 React hooks
│   ├── styles/                  ← 全域樣式、字型宣告
│   └── utils/                   ← 工具函式
└── public/
    └── assets/
        ├── sprites/             ← Pixel art sprite sheets
        └── fonts/               ← 自訂字型（打字機體、報紙風格）
```

---

## 開發規範

### 命名慣例

- **元件：** PascalCase（`TimelineBar.tsx`、`PixelScene.tsx`）
- **hooks：** camelCase 以 `use` 開頭（`useScrollProgress.ts`）
- **工具函式：** camelCase（`formatDate.ts`）
- **資料檔：** kebab-case（`timeline.json`、`characters.json`）
- **CSS 類：** TailwindCSS 工具類為主，自訂類用 kebab-case

### 元件拆分原則

- 每個章節（Chapter）一個獨立元件檔
- 可重用的敘事元素抽為 `narrative/` 下的元件
- PixiJS 場景封裝在 `pixel/` 下，透過 React wrapper 呈現
- 資訊圖表各自獨立於 `infographic/`

### i18n 考量

- 主要語言：**繁體中文**
- 英文作為次要語言（尤其 Wecht 報告相關內容）
- 文字內容集中在 `data/` 資料夾，方便日後抽換為多語系
- 元件中不硬編碼長文字，改從資料層引入

### TypeScript 規範

- 啟用 `strict` 模式
- 所有元件 props 定義 interface
- 避免 `any`，必要時用 `unknown` 加 type guard

---

## PixiJS 使用原則

### 適用場景（用 pixel art）

1. **陳文成在美國的學術生活** — 校園場景（Carnegie Mellon 意象）
2. **返台與被約談** — 警備總部場景、審訊室
3. **7月2日當天** — 從被帶走到陳屍台大研究生圖書館旁的時間線場景
4. **關鍵證據呈現** — 傷痕位置示意圖、現場鳥瞰圖

### 不用 PixiJS 的場景

- 純文字敘事段落
- Timeline、人物關係圖（用 SVG 或 CSS）
- 引用文獻區塊
- 照片 / 文件影像展示

### 技術原則

- 使用 sprite sheet 管理像素圖
- 每個場景是獨立的 React 元件，內嵌 PixiJS canvas
- 場景在進入 viewport 時才初始化（lazy load）
- 手機上降級為靜態圖片或簡化動畫
- 像素風格參考：Papers, Please 的色調、人物比例

---

## 資料來源

所有敘事內容必須基於以下 5 份文獻，位於 `docs/pdfs/`：

| # | 檔名 | 說明 | 語言 |
|---|------|------|------|
| 1 | `Wecht-為民主而死（Death in the Cause of Democracy）.pdf` | Cyril Wecht 法醫鑑定報告 | 英文 |
| 2 | `促轉會《陳文成案調查報告》001-072.pdf` | 促轉會調查報告（前半） | 中文 |
| 3 | `促轉會《陳文成案調查報告》073-170.pdf` | 促轉會調查報告（後半） | 中文 |
| 4 | `陳文成之死因.pdf` | 死因分析 | 中文 |
| 5 | `陳文成事件調查報告-黃怡_林世煜.pdf` | 黃怡、林世煜調查報告 | 中文 |

---

## 分階段開發流程

| 階段 | 內容 | 產出 |
|------|------|------|
| Phase 1 | 資料提取與整理 | `docs/extracted/` 下的 5 份 MD + JSON |
| Phase 2 | 敘事結構設計 | 章節大綱、場景清單 |
| Phase 3 | 技術架構建立 | 可執行的 Vite + React 專案 |
| Phase 4 | 核心頁面開發 | 各章節、Timeline、人物圖、pixel art |
| Phase 5 | 打磨與部署 | 動畫、SEO、上線 |

---

## 重要注意事項

### 歷史敘事原則

1. **嚴謹與事實** — 所有敘述必須有文獻依據，不臆測、不虛構
2. **不做政治判斷** — 呈現各方說法與證據，讓讀者自行判斷
3. **尊重受害者與家屬** — 避免煽情化、避免消費悲劇
4. **標註出處** — 每段敘述標明來自哪份文獻的哪個章節
5. **爭議處理** — 不同報告有矛盾時，並列呈現，不偏袒

### 引用格式

在敘事中引用來源時，使用以下格式：

```
（來源：促轉會調查報告，第 XX 頁）
（Source: Wecht Report, p. XX）
```

### 敏感內容處理

- 死亡細節以客觀法醫語言描述，不誇張渲染
- 提供內容警告（content warning）給讀者
- 照片或影像需標注來源與使用授權

---

## 開發指令

```bash
# 安裝依賴
npm install

# 開發模式
npm run dev

# 建置
npm run build

# 預覽建置結果
npm run preview

# 型別檢查
npx tsc --noEmit

# Lint
npm run lint
```
