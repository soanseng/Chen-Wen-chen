import type { DocumentDef } from '../../types/index.ts'

/** 終章：未完的檔案（chapter 5） */

export const DOC_OFF_03: DocumentDef = {
  id: 'DOC-OFF-03',
  title: '歷次調查結論演變',
  category: 'OFF',
  chapter: 5,
  content: [],
  presentation: '並排呈現各報告結論頁',
  keyClues: [
    '70年：「畏罪跳樓自殺」→「意外死亡或自殺均有可能」',
    '73年落體實驗：「自殺可能性小」（列機密不公布）',
    '109年促轉會：「他殺之可能性顯高於自殺或意外死亡」',
    '40年結論演變的軌跡本身即是遊戲核心主題',
  ],
  crossRefs: [],
}

export const DOC_TJC_01: DocumentDef = {
  id: 'DOC-TJC-01',
  title: '促轉會最終結論摘要',
  category: 'TJC',
  chapter: 5,
  content: [],
  presentation: '促轉會調查報告摘要格式',
  keyClues: [
    '「他殺之可能性顯高於自殺或意外死亡」',
    '在國安局檔案中發現大量相關檔案（一案五卷）',
  ],
  crossRefs: [],
}

export const DOC_EXT_01: DocumentDef = {
  id: 'DOC-EXT-01',
  title: '美國眾議院聽證會紀錄',
  category: 'EXT',
  chapter: 5,
  content: [],
  presentation: '聽證會紀錄節錄',
  keyClues: [
    '陳素貞於10月6日出席作證',
    '海外留學生戴面具抗議',
  ],
  crossRefs: ['DOC-WIT-04'],
}

export const DOC_EXT_02: DocumentDef = {
  id: 'DOC-EXT-02',
  title: '狄格魯《台灣之行》報告',
  category: 'EXT',
  chapter: 5,
  content: [],
  presentation: '英文報告',
  keyClues: [
    '呼籲公布所有資料',
    '「strong doubt and suspicions will remain in the minds of many observers」',
  ],
  crossRefs: ['DOC-FOR-02'],
}

export const finaleDocuments: DocumentDef[] = [
  DOC_OFF_03,
  DOC_TJC_01,
  DOC_EXT_01,
  DOC_EXT_02,
]
