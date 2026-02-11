import type { DocumentDef } from '../../types/index.ts'

/** 第一章：監視之網（chapter 1） */

export const DOC_SUR_01_1: DocumentDef = {
  id: 'DOC-SUR-01-1',
  title: '彩虹資料第0487號——電話監聽紀錄',
  category: 'SUR',
  chapter: 1,
  content: [],
  presentation: '紅色機密戳記的公文紙，監聽人員手寫摘要',
  keyClues: [
    '最早與陳文成相關的官方檔案（68年10月2日）',
    '致電施明德的監聽紀錄',
    '監控從一通電話擴展到整個家族',
  ],
  crossRefs: ['DOC-SUR-02', 'DOC-SUR-03'],
}

export const DOC_SUR_02: DocumentDef = {
  id: 'DOC-SUR-02',
  title: '信件攔查紀錄',
  category: 'SUR',
  chapter: 1,
  content: [],
  presentation: '被拆開重封的信封影本，附有情治單位的摘要批註',
  keyClues: [
    '私人家書被攔截檢查',
    '國安局據此向境管局調閱出入境資料',
  ],
  crossRefs: ['DOC-SUR-01-1', 'DOC-OFF-01'],
}

export const DOC_SUR_04: DocumentDef = {
  id: 'DOC-SUR-04',
  title: '校園安定小組文件',
  category: 'SUR',
  chapter: 1,
  content: [],
  presentation: '機關內部登記表格',
  keyClues: [
    '大學人事室主任同時是安定小組執行秘書',
    '監控以陳文成為核心擴及全部親友',
  ],
  crossRefs: ['DOC-WIT-04'],
}

export const DOC_SUR_03: DocumentDef = {
  id: 'DOC-SUR-03',
  title: '警總〈報告表〉',
  category: 'SUR',
  chapter: 1,
  content: [],
  presentation: '表格式公文，詳列偵防手段與成果',
  keyClues: [
    '陳文成返臺後日常行蹤全被掌握',
    '「假藉境管局人員名義進行約談」',
    '切結書的存在與否是關鍵謎團',
  ],
  crossRefs: ['DOC-INT-01'],
}

export const DOC_SUR_01_5: DocumentDef = {
  id: 'DOC-SUR-01-5',
  title: '特種資料——康明昌通話監聽',
  category: 'SUR',
  chapter: 1,
  content: [],
  presentation: '紅色機密戳記的公文紙，監聽人員手寫摘要',
  keyClues: [
    '公文以「陰謀份子」稱呼康明昌',
    '陳文成返臺前夕仍遭監聽',
  ],
  crossRefs: ['DOC-SUR-01-1'],
}

export const chapter1Documents: DocumentDef[] = [
  DOC_SUR_01_1,
  DOC_SUR_02,
  DOC_SUR_04,
  DOC_SUR_03,
  DOC_SUR_01_5,
]
