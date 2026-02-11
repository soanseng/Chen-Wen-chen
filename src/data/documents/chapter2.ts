import type { DocumentDef } from '../../types/index.ts'

/** 第二章：約談（chapter 2） */

export const DOC_INT_04: DocumentDef = {
  id: 'DOC-INT-04',
  title: '第一次約談紀錄（70年6月30日）',
  category: 'INT',
  chapter: 2,
  content: [],
  presentation: '調查紀錄摘要',
  keyClues: [
    '警總「假藉境管局人員名義」進行約談',
    '從「公關室」移交到「保安處」——先軟後硬',
  ],
  crossRefs: ['DOC-OFF-02'],
}

export const DOC_INT_01: DocumentDef = {
  id: 'DOC-INT-01',
  title: '警總調查筆錄（70年7月2日）',
  category: 'INT',
  chapter: 2,
  content: [],
  presentation: '泛黃的手寫筆錄掃描件，部分欄位有手寫修改痕跡',
  keyClues: [
    '約談自9時至17時，晚餐後繼續完成筆錄',
    '陳文成就資助《美麗島》雜誌一事「認錯」',
    '警總仍判斷其「避重就輕」',
  ],
  crossRefs: ['DOC-INT-02', 'DOC-SUR-03'],
}

export const DOC_INT_02: DocumentDef = {
  id: 'DOC-INT-02',
  title: '約談錄音譯文（節錄）',
  category: 'INT',
  chapter: 2,
  content: [],
  presentation: '打字機字體的譯文，有部分「〔略〕」標記，暗示內容被刪節',
  keyClues: [
    '譯文不完整——原始錄音帶已「遺失」',
    '暗示警總試圖招募陳文成為線人',
    '警總對陳文成返臺後行蹤「瞭若指掌」',
  ],
  crossRefs: ['DOC-INT-03', 'DOC-SUR-04'],
}

export const DOC_WIT_04_S: DocumentDef = {
  id: 'DOC-WIT-04-S',
  title: '陳素貞偵訊筆錄',
  category: 'WIT',
  chapter: 2,
  content: [],
  presentation: '偵訊筆錄掃描件',
  keyClues: [
    '描述被帶走時穿著細節——「穿內褲、游泳褲，躺在沙發上等候電話」',
    '「殯儀館看到丈夫遺體的一瞬間，就知道那不是一樁意外事件」',
  ],
  crossRefs: ['DOC-SUR-04'],
}

export const DOC_WIT_05: DocumentDef = {
  id: 'DOC-WIT-05',
  title: '鄒小韓答覆明園專案提問',
  category: 'WIT',
  chapter: 2,
  content: [],
  presentation: '雙欄式問答表格',
  keyClues: [
    '護送人員身高167公分',
    '送返時間約22時',
    '鄒小韓已移居美國、無法聯繫——關鍵證人「消失」',
  ],
  crossRefs: [],
}

export const chapter2Documents: DocumentDef[] = [
  DOC_INT_04,
  DOC_INT_01,
  DOC_INT_02,
  DOC_WIT_04_S,
  DOC_WIT_05,
]
