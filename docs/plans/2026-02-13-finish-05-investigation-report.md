# Finish 05 — 黃怡、林世煜《陳文成事件調查報告》抽取稿 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 完成 `docs/extracted/05-investigation-report.md`，把所有「（待補）」替換成可引用的摘要/JSON/引述/疑點/視覺化建議，並以 `[[PDF_PAGE:x]]` 精確標註來源頁。

**Architecture:**
- 以 `/tmp/cwc-05/page-XX.txt`（由原始 PDF 逐頁轉出的純文字）作為唯一內容依據。
- 每個摘要段落與引述都要能對應到至少一個 `[[PDF_PAGE:x]]`。
- `## 時間線事件` 與 `## 人物資料` 必須是可 parse 的 **合法 JSON**。

**Tech Stack:** Markdown、JSON；資料來源：`/tmp/cwc-05/page-01.txt` ~ `page-42.txt`

---

## Preconditions / Context

- 目標檔案（要編輯 / 新增）：`docs/extracted/05-investigation-report.md`
- 來源（只讀）：`/tmp/cwc-05/page-01.txt` … `/tmp/cwc-05/page-42.txt`
- 風格參考（只讀）：`docs/extracted/01-wecht-report.md`、`02-tjc-report-part1.md`、`03-tjc-report-part2.md`、`04-cause-of-death.md`

## Definition of Done

- [ ] `docs/extracted/05-investigation-report.md` 內不再出現「（待補）」
- [ ] `## 時間線事件` 下的 JSON array 可被 JSON parser 解析
- [ ] `## 人物資料` 下的 JSON array 可被 JSON parser 解析
- [ ] 所有主張/摘要/引述/疑點至少各自帶有對應的 `[[PDF_PAGE:x]]`

> Note: 本 repo 目前有未提交的變更；除非使用者明確要求，**不要 commit**。

---

### Task 1: 在 repo 內新增抽取稿檔案骨架

**Files:**
- Create: `docs/extracted/05-investigation-report.md`
- Create (if missing): `docs/extracted/`

**Step 1:** 建立與既有 extracted 檔一致的章節結構（包含 JSON code fences）。

**Step 2:** 先保留 `## 基本資訊` 與 `## 範圍與結構說明`（已存在內容），其餘先放空段落（不要用「（待補）」）。

---

### Task 2: 擬定主文摘要（PDF 1–30）

**Files:**
- Modify: `docs/extracted/05-investigation-report.md`（`### 主要內容（主文）`）

**Step 1:** 快速掃描 `/tmp/cwc-05/page-01.txt`~`page-30.txt`，列出主文大綱（例如背景、返台、約談、死亡發現、官方說法、家屬與外界質疑、後續）。

**Step 2:** 將大綱寫成 8–12 個條列（或 3–6 段短段落 + 小標），每點都附 `[[PDF_PAGE:x]]`。

**Step 3:** 另外在主文摘要末端補一段「本主文重點特徵」：
- 文件屬性（研討會報告、整理/轉述、含註腳與引述）
- 與附錄的關係（附錄是檢方偵查報告原文）

---

### Task 3: 擬定附錄摘要（PDF 31–42）

**Files:**
- Modify: `docs/extracted/05-investigation-report.md`（`### 附錄重點（台北地檢處偵查報告原文）`）

**Step 1:** 掃描 `/tmp/cwc-05/page-31.txt`~`page-42.txt`，整理附錄涵蓋項目（例如現場勘查、測繪採證、送驗結果、證人摘要、警總說明、法醫鑑定、檢方研判）。

**Step 2:** 用 6–10 個條列寫成附錄摘要，每點附 `[[PDF_PAGE:x]]`。

---

### Task 4: 產出「時間線事件」JSON

**Files:**
- Modify: `docs/extracted/05-investigation-report.md`（`## 時間線事件`）

**Step 1:** 從主文與附錄挑出最小但覆蓋關鍵流程的一組事件（建議 10–25 筆）。

**Step 2:** 用以下 JSON schema（與既有資料風格一致即可；若 repo 另有 schema，以現有為準）：

```json
[
  {
    "date": "1981-07-02",
    "time": "HH:mm" ,
    "title": "...",
    "description": "... [[PDF_PAGE:x]]",
    "location": "...",
    "participants": ["..."],
    "sources": ["05-investigation-report [[PDF_PAGE:x]]"]
  }
]
```

**Step 3:** 驗證 JSON 可 parse（用簡單 node/python 解析即可）。

---

### Task 5: 產出「人物資料」JSON

**Files:**
- Modify: `docs/extracted/05-investigation-report.md`（`## 人物資料`）

**Step 1:** 從主文/附錄抽取人物（建議 10–30 位，先以事件核心者為主）。

**Step 2:** 用以下 JSON schema（可依既有 extracted 檔調整欄位，但要一致）：

```json
[
  {
    "name": "...",
    "nameEn": null,
    "role": "...",
    "affiliation": "...",
    "involvement": "...",
    "source": "05-investigation-report [[PDF_PAGE:x]]"
  }
]
```

**Step 3:** 驗證 JSON 可 parse。

---

### Task 6: 補上關鍵引述（verbatim）

**Files:**
- Modify: `docs/extracted/05-investigation-report.md`（`## 關鍵引述`）

**Step 1:** 從 `/tmp/cwc-05/` 找 6–12 段短引文（每段 1–3 句），優先：
- 官方對外說法/聲明
- 檢方偵查報告中的關鍵判斷句
- 關鍵證人陳述（若為轉述要標明）

**Step 2:** 每段引述後附 `[[PDF_PAGE:x]]`。

---

### Task 7: 補上爭議點與疑點、視覺化建議

**Files:**
- Modify: `docs/extracted/05-investigation-report.md`（`## 爭議點與疑點`、`## 適合視覺化呈現的內容`）

**Step 1:** 只列出「文件內部自己提出/呈現的矛盾與疑點」，避免加入外部推測。

**Step 2:** 每一點都要附 `[[PDF_PAGE:x]]`。

**Step 3:** 視覺化建議以「可視覺化的材料」為主（例如：時間線、人物關係、現場平面/動線、證詞矛盾對照表）。

---

### Task 8: Final checks

**Step 1:** 全文搜尋「（待補）」= 0。

**Step 2:** 解析兩段 JSON code fence（時間線/人物）確認無語法錯誤。

**Step 3:** 快速人工抽查 5–10 個 `[[PDF_PAGE:x]]` 是否存在且落在 1–42。
