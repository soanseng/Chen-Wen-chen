# 存檔資料結構

> 本文件定義遊戲存檔的 JSON 結構，使用 localStorage 儲存。設計原則：
> - 最小化存檔大小（手機 localStorage 限制約 5MB）
> - 所有文件內容不存入存檔，存檔僅記錄狀態
> - 支援多個存檔插槽

---

## 完整 JSON 結構

```json
{
  "version": "1.0.0",
  "created": "2024-01-01T00:00:00.000Z",
  "lastSaved": "2024-01-01T01:30:00.000Z",
  "playTime": 3600,

  "chapter": {
    "current": 2,
    "unlocked": [0, 1, 2],
    "completed": [0, 1]
  },

  "documents": {
    "DOC-INT-01": { "unlocked": true, "read": true, "readAt": "2024-01-01T00:15:00.000Z" },
    "DOC-INT-02": { "unlocked": true, "read": false, "readAt": null },
    "DOC-SUR-01": { "unlocked": false, "read": false, "readAt": null }
  },

  "highlights": [
    {
      "id": "h001",
      "docId": "DOC-WIT-05",
      "paragraphIndex": 3,
      "text": "約22時安抵羅斯福路住處",
      "createdAt": "2024-01-01T00:20:00.000Z"
    },
    {
      "id": "h002",
      "docId": "DOC-FOR-01",
      "paragraphIndex": 7,
      "text": "死亡時間推定為7月3日凌晨4至6時",
      "createdAt": "2024-01-01T00:22:00.000Z"
    }
  ],

  "connections": [
    {
      "id": "C-01",
      "triggered": true,
      "triggeredAt": "2024-01-01T00:22:30.000Z",
      "highlightPair": ["h001", "h002"],
      "unlockedDocs": ["DOC-WIT-01"],
      "unlockedNotebookFields": []
    }
  ],

  "notebook": {
    "fields": {
      "arrest_method": {
        "unlocked": true,
        "value": "surprise",
        "options": ["voluntary", "surprise", "forced"],
        "labels": {
          "voluntary": "自願赴約",
          "surprise": "突襲帶人",
          "forced": "強制押解"
        }
      },
      "interrogation_purpose": {
        "unlocked": true,
        "value": null,
        "options": ["clarify", "recruit", "intimidate"],
        "labels": {
          "clarify": "澄清疑點",
          "recruit": "招募合作",
          "intimidate": "施壓恐嚇"
        }
      },
      "july2_evening": {
        "unlocked": true,
        "value": null,
        "locked": true,
        "lockedReason": "完整錄音帶已消失，鄧維祥證詞不可信，此欄無法填寫。"
      },
      "clothing_anomaly": {
        "unlocked": false,
        "value": null,
        "options": ["self_changed", "rearranged", "dragged"],
        "labels": {
          "self_changed": "自己更衣",
          "rearranged": "他人整理",
          "dragged": "搬運所致"
        }
      },
      "crime_scene": {
        "unlocked": false,
        "value": null,
        "autoFill": true,
        "autoValue": false,
        "label": "陳屍處是否為第一現場"
      },
      "death_manner": {
        "unlocked": false,
        "value": null,
        "options": ["suicide", "accident", "homicide"],
        "labels": {
          "suicide": "自殺",
          "accident": "意外",
          "homicide": "他殺"
        }
      },
      "witness_role": {
        "unlocked": false,
        "value": null,
        "options": ["honest", "manipulated", "collaborator"],
        "labels": {
          "honest": "誠實證人",
          "manipulated": "被利用的友人",
          "collaborator": "合作者"
        }
      },
      "full_recording": {
        "unlocked": false,
        "value": null,
        "locked": true,
        "lockedReason": "約談錄音帶自民國70年11月後完全消失，至今下落不明。"
      },
      "investigation_lead": {
        "unlocked": false,
        "value": null,
        "options": ["prosecutor", "garrison", "nsa"],
        "labels": {
          "prosecutor": "檢察官",
          "garrison": "警總",
          "nsa": "國安局"
        }
      },
      "coverup_chain": {
        "unlocked": false,
        "value": null,
        "autoFill": true,
        "autoValue": "garrison_nsa_president",
        "label": "掩蓋真相的決策鏈：警總→國安局→總統府"
      },
      "who_ordered": {
        "unlocked": false,
        "value": null,
        "locked": true,
        "lockedReason": "無直接證據指向特定下令者，此欄永遠空白。"
      },
      "true_death_location": {
        "unlocked": false,
        "value": null,
        "locked": true,
        "lockedReason": "陳屍處非第一現場，但真正的死亡地點無從得知。"
      }
    },
    "order": [
      "arrest_method",
      "interrogation_purpose",
      "july2_evening",
      "clothing_anomaly",
      "crime_scene",
      "death_manner",
      "witness_role",
      "full_recording",
      "investigation_lead",
      "coverup_chain",
      "who_ordered",
      "true_death_location"
    ]
  },

  "endings": {
    "reached": false,
    "reachedAt": null,
    "totalContradictions": 16,
    "triggeredContradictions": 0,
    "notebookCompletion": {
      "total": 12,
      "filled": 0,
      "autoFilled": 0,
      "permanentlyLocked": 4,
      "maxPossible": 8
    }
  },

  "settings": {
    "fontSize": "medium",
    "theme": "paper"
  }
}
```

---

## 欄位說明

### `version`
- 存檔格式版本號，用於未來升級時的遷移

### `chapter`
- `current`：當前所在章節（0=序章, 1-4=第一至四章, 5=終章）
- `unlocked`：已解鎖的章節陣列
- `completed`：已完成的章節陣列（所有可觸發矛盾都已觸發）

### `documents`
- 以文件 ID 為 key 的物件
- `unlocked`：是否已解鎖（可閱讀）
- `read`：是否已閱讀過
- `readAt`：首次閱讀時間

### `highlights`
- 玩家在文件中標記的段落陣列
- `docId`：所屬文件 ID
- `paragraphIndex`：段落索引（文件內容按段落分割）
- `text`：標記的文字內容（用於 UI 顯示）

### `connections`
- 已觸發的矛盾連結陣列
- `id`：對應 contradictions.md 中的矛盾編號
- `highlightPair`：觸發此矛盾的兩個標記 ID
- `unlockedDocs`：觸發後解鎖的新文件
- `unlockedNotebookFields`：觸發後解鎖的推理簿欄位

### `notebook`
- `fields`：推理簿各欄位的狀態
  - `unlocked`：是否已解鎖顯示
  - `value`：玩家選擇的值（null = 尚未填寫）
  - `options`/`labels`：可選項目
  - `locked`：若 true，此欄永遠無法填寫（設計為空白）
  - `lockedReason`：無法填寫的原因文字
  - `autoFill`/`autoValue`：若 true，在觸發對應矛盾時自動填入
- `order`：欄位顯示順序

### `endings`
- `reached`：是否已到達結局
- `triggeredContradictions`：已觸發的矛盾數量
- `notebookCompletion`：推理簿完成度統計
  - `permanentlyLocked`：永遠鎖定（空白）的欄位數——4個
  - `maxPossible`：理論上可填寫的最大欄位數——8個

---

## 文件 ID 清單

文件內容本身不存入 localStorage，而是打包在遊戲的靜態資源中。以下為所有文件 ID 及其所屬章節：

```
序章（chapter 0）：
  DOC-EXT-04    陳素貞家書
  DOC-OFF-01    出境申請表
  DOC-NEWS-01   70年7月4日新聞剪報

第一章（chapter 1）：
  DOC-SUR-01-1  彩虹資料第0487號
  DOC-SUR-02    信件攔查紀錄
  DOC-SUR-04    校園安定小組登記表
  DOC-SUR-03    警總報告表
  DOC-SUR-01-5  特種資料（康明昌通話）

第二章（chapter 2）：
  DOC-INT-04    第一次約談紀錄
  DOC-INT-01    調查筆錄
  DOC-INT-02    錄音譯文節錄
  DOC-WIT-04-S  陳素貞偵訊筆錄
  DOC-WIT-05    鄒小韓答覆表

第三章（chapter 3）：
  DOC-FOR-01    法醫鑑定書
  DOC-FOR-05    現場勘查紀錄
  DOC-WIT-01    鄧維祥證詞
  DOC-WIT-02    五名目擊證人筆錄
  DOC-WIT-03    倪肇強證詞
  DOC-FOR-02    魏契鑑定意見
  DOC-FOR-03    李俊億鑑定報告

第四章（chapter 4）：
  DOC-FOR-04    落體實驗報告
  DOC-OFF-05    汪敬煦呈蔣經國簽呈
  DOC-NSA-01    國安局「不公布」決定
  DOC-OFF-04    偵查報告初稿與定稿
  DOC-OFF-02    專案會議紀錄
  DOC-SUR-05    家屬監控檔案
  DOC-OFF-06    國安局撥發工作費
  DOC-OFF-07    查禁書籍紀錄
  DOC-EXT-03    美聯社記者事件
  DOC-EXT-05    外交部投書運動

終章（chapter 5）：
  DOC-OFF-03    歷次調查結論演變
  DOC-TJC-01    促轉會最終結論摘要
  DOC-EXT-01    美國眾議院聽證會
  DOC-EXT-02    狄格魯《台灣之行》報告
```

---

## 矛盾觸發邏輯

矛盾觸發需要玩家標記特定的段落對。實作上，每個矛盾定義為一組觸發條件：

```json
{
  "contradictions": {
    "C-01": {
      "name": "送返時間 vs 死亡時間",
      "triggers": [
        { "docId": "DOC-WIT-05", "keywords": ["22時", "安抵"] },
        { "docId": "DOC-FOR-01", "keywords": ["凌晨4", "死亡時間"] }
      ],
      "unlocks": {
        "docs": ["DOC-WIT-01"],
        "notebookFields": [],
        "chapter": null
      }
    },
    "C-02": {
      "name": "錄音帶遺失",
      "triggers": [
        { "docId": "DOC-INT-02", "keywords": ["錄音", "六小時"] },
        { "docId": "DOC-INT-03", "keywords": ["刪除", "敏感"] }
      ],
      "unlocks": {
        "docs": [],
        "notebookFields": ["full_recording"],
        "chapter": 3
      }
    }
  }
}
```

觸發邏輯：
1. 玩家標記一個段落時，系統檢查該段落是否匹配任何矛盾的 trigger keywords
2. 若匹配，檢查該矛盾的另一個 trigger 是否已有對應的標記
3. 若兩個 trigger 都被滿足，觸發矛盾 → 執行 unlocks

---

## localStorage 使用估算

| 項目 | 預估大小 |
|------|---------|
| 基本狀態（chapter, settings） | ~200 bytes |
| 文件狀態（32份 × 50 bytes） | ~1.6 KB |
| 標記紀錄（平均30個 × 150 bytes） | ~4.5 KB |
| 矛盾觸發（16個 × 100 bytes） | ~1.6 KB |
| 推理簿（12欄 × 100 bytes） | ~1.2 KB |
| **合計** | **~9 KB** |

遠低於 localStorage 5MB 限制，無需擔心空間問題。

---

## 存檔操作

```javascript
// 存檔 key 格式
const SAVE_KEY = 'cwc_game_save_v1';

// 儲存
function save(state) {
  state.lastSaved = new Date().toISOString();
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

// 讀取
function load() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return null;
  const state = JSON.parse(raw);
  // 版本遷移檢查
  if (state.version !== '1.0.0') {
    return migrate(state);
  }
  return state;
}

// 自動存檔觸發時機
// 1. 每次解鎖新文件
// 2. 每次觸發矛盾連結
// 3. 每次填寫推理簿
// 4. 每次切換章節
// 5. 頁面失焦 (visibilitychange)
```

---

## 初始狀態

遊戲開始時的存檔初始狀態：

```json
{
  "version": "1.0.0",
  "chapter": { "current": 0, "unlocked": [0], "completed": [] },
  "documents": {
    "DOC-EXT-04": { "unlocked": true, "read": false, "readAt": null },
    "DOC-OFF-01": { "unlocked": true, "read": false, "readAt": null },
    "DOC-NEWS-01": { "unlocked": true, "read": false, "readAt": null }
  },
  "highlights": [],
  "connections": [],
  "notebook": { "fields": {}, "order": [] },
  "endings": { "reached": false, "triggeredContradictions": 0 }
}
```

序章僅解鎖3份文件，推理簿完全空白。一切從一封家書開始。
