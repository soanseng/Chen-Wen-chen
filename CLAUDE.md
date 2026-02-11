# 陳文成事件互動文字調查遊戲

## 專案概述

一款 Papers, Please 風格的網頁互動調查遊戲，以台灣 1981 年陳文成事件為題材。玩家扮演現代研究員，在研究桌上翻閱解密檔案，系統自動比對已讀文件中的矛盾——讀得越多、發現越多，但推理簿上永遠有填不完的空白，因為真相至今未明。

**設計靈感**：Papers, Please（桌面文件比對 + 印章判斷 + 像素風視覺）

## 技術規格

- **前端框架**：React 19 + Vite 7 + TailwindCSS 4
- **視覺引擎**：PixiJS 8（桌面場景、像素風資產、印章動畫、章節轉場）
- **設計**：手機優先（Mobile-first），觸控為主，電腦也能玩
- **UI 風格**：研究桌面隱喻——深色木紋桌面 + 散落的米色紙張檔案 + 紅色機密印章，像素風圖像增添年代感
- **存檔**：localStorage（預估 ~9KB）
- **部署**：GitHub Pages，純前端靜態資產。`base: '/Chen-Wen-chen/'`
- **語言**：繁體中文

## 專案結構

```
Chen-Wen-chen/
├── CLAUDE.md                 # 本檔案
├── .gitignore
├── README.md
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html                # Vite 入口
├── public/
│   └── assets/               # 像素風靜態資源
├── src/
│   ├── main.tsx              # React 入口
│   ├── App.tsx               # HashRouter 路由
│   ├── components/
│   │   ├── Opening.tsx              # 遊戲開場
│   │   ├── DiscoveryPanel.tsx       # 矛盾發現面板（核心 UI）
│   │   ├── ResearchDesk/            # 研究桌主畫面（Papers, Please 風格）
│   │   │   ├── ResearchDesk.tsx
│   │   │   └── DocumentCard.tsx
│   │   ├── DocumentSheet/           # Bottom Sheet 文件閱讀器
│   │   │   └── DocumentSheet.tsx
│   │   ├── DocumentReader/          # 文件內容渲染
│   │   │   └── DocumentReader.tsx
│   │   ├── Notebook/                # 推理簿（印章互動）
│   │   │   ├── Notebook.tsx
│   │   │   └── StampSelector.tsx
│   │   ├── Ending/                  # 終局場景
│   │   │   └── Ending.tsx
│   │   ├── ChapterTransition/       # 章節轉場（像素場景）
│   │   │   └── ChapterTransition.tsx
│   │   ├── common/
│   │   │   └── Layout.tsx           # 主佈局 + 底部導航
│   │   └── visual/                  # 視覺效果元件
│   │       ├── CategoryIcon.tsx
│   │       ├── PaperTexture.tsx
│   │       ├── StampOverlay.tsx
│   │       ├── ChapterDarkenEffect.tsx
│   │       └── TypewriterReader.tsx
│   ├── hooks/
│   │   ├── useSaveGame.ts
│   │   ├── useContradiction.ts      # 矛盾偵測（自動 + 手動）
│   │   ├── useChapterUnlock.ts
│   │   └── useGameOrchestrator.ts   # 遊戲流程編排 + 發現佇列
│   ├── context/
│   │   ├── GameContext.tsx
│   │   └── gameState.ts
│   ├── data/                        # 32 份文件 + 17 個矛盾
│   │   ├── index.ts
│   │   ├── chapters.ts
│   │   ├── contradictions.ts
│   │   ├── notebook.ts
│   │   ├── narratives.ts
│   │   └── documents/
│   │       ├── prologue.ts ~ finale.ts
│   │       └── hidden.ts
│   ├── pixi/                        # PixiJS 視覺場景
│   │   ├── index.ts
│   │   ├── PixiCanvas.tsx
│   │   ├── deskScene.ts             # 桌面背景
│   │   ├── stampAnimation.ts        # 印章動畫
│   │   └── chapterScenes.ts         # 章節轉場像素場景
│   └── styles/
├── docs/
│   ├── plans/                       # 實作計畫
│   │   └── 2026-02-11-v2-papers-please-redesign.md
│   ├── documents.md
│   ├── contradictions.md
│   ├── gameflow.md
│   ├── characters.md
│   └── savedata.md
└── .github/
    └── workflows/
        └── deploy.yml               # GitHub Pages 自動部署
```

## 核心遊戲機制（v2）

### 閱讀即發現（Auto-Discovery）

1. **研究桌**：玩家在 Papers, Please 風格的桌面上瀏覽檔案卡片
2. **閱讀文件**：點擊卡片開啟文件（底部滑入 sheet）
3. **自動偵測**：系統比對已讀文件，當兩份相關文件都已讀 → 自動觸發矛盾
4. **發現面板**：全螢幕 DiscoveryPanel 呈現矛盾引文＋歷史解讀
5. **記入推理簿**：玩家確認發現 → 解鎖新文件 / 新推論 / 推理簿欄位
6. **推理簿**：12 個欄位，choice 類用印章蓋章，4 個永遠鎖定（真相不可得）

### 選配機制

- **段落標記**：進階玩家可手動標記段落（原始觸發方式保留為 power-user 功能）
- **文件交叉參照**：文件中的 crossRefs 可快速跳轉相關檔案

## 文件 ID 命名規則

- `DOC-INT-xx`：偵訊紀錄（Interrogation）
- `DOC-SUR-xx`：監控檔案（Surveillance）
- `DOC-FOR-xx`：鑑識報告（Forensic）
- `DOC-WIT-xx`：證人陳述（Witness）
- `DOC-OFF-xx`：官方文件（Official）
- `DOC-EXT-xx`：外部資料（External）

矛盾編號：`C-01` ~ `C-17`（🔓 可解決 15 個、🔒 永遠無解 2 個）

## 章節結構

| 章節 | 名稱 | 文件數 | 情緒基調 |
|------|------|--------|----------|
| 序章 | 歸鄉 | 3 | 溫暖→不安 |
| 第一章 | 監視之網 | 5 | 壓迫、窒息 |
| 第二章 | 約談 | 5 | 緊張、封閉 |
| 第三章 | 證據 | 7 | 震驚、困惑 |
| 第四章 | 掩蓋 | 10 | 官僚體系的恐怖 |
| 終章 | 未完的檔案 | 4 + 推理簿結算 | 留白、沉重 |

## 歷史敏感度處理

- 🟢 **實名**：陳文成本人、已公開學術專家（Wecht、DeGroot）
- 🟡 **半虛構**：家屬（以關係稱呼為主）、促轉會鑑定人
- 🔴 **虛構化**：加害體系（警總人員以職稱代替）、目擊者、情治系統

**原則**：不預設立場、不做道德審判、讓證據自己說話。保持克制的敘事語調。

## 開發指引

### 已完成（v1）

- [x] Phase 0-1：專案初始化、遊戲引擎
- [x] Phase 2：核心 UI 元件
- [x] Phase 3：遊戲機制整合
- [x] Phase 4：文件內容撰寫
- [x] Phase 5：PixiJS 像素風視覺層
- [x] Phase 6：GitHub Pages 部署

### 進行中（v2 重新設計）

詳見 `docs/plans/2026-02-11-v2-papers-please-redesign.md`

- [ ] Phase A：自動發現系統（閱讀即觸發矛盾 + DiscoveryPanel）
- [ ] Phase B：研究桌 UI（ResearchDesk + DocumentSheet + 底部導航）
- [ ] Phase C：像素風視覺強化（桌面場景、印章動畫、章節轉場像素畫）
- [ ] Phase D：互動推理簿（印章蓋章機制）
- [ ] Phase E：手機觸控優化（滑動手勢、響應式佈局、效能）

### 設計約束

- 不使用背景音樂、音效
- 像素風視覺服務敘事，不追求華麗特效
- PixiJS 負責場景渲染（桌面、印章、轉場），React 負責文字與互動
- 字體：Noto Serif TC（Google Fonts）
- 調色盤：米色（paper）、深灰（ink）、暗紅（stamp）+ 木紋桌面深棕
- 所有遊戲文件內容以 `src/data/` 下的結構化資料模組儲存
- 觸控目標最小 44x44px

### 存檔結構

完整 JSON schema 見 `docs/savedata.md`。關鍵欄位：
- `chapter`：當前/已解鎖/已完成章節
- `documents`：各文件解鎖與已讀狀態
- `highlights`：玩家標記的段落（選配功能保留）
- `connections`：已觸發的矛盾連結
- `notebook`：推理簿 12 欄位的值與鎖定狀態

## 參考資料

- 促轉會《陳文成案調查報告》（2020）
- `docs/` 目錄下的 5 份規劃文件為本遊戲設計的唯一權威來源
- Papers, Please（Lucas Pope, 2013）——遊戲機制設計靈感
- Lucas Pope 的手機移植開發日誌——觸控適配參考
