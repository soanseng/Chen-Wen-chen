import type { DocumentDef } from '../../types/index.ts'

/** 第四章：掩蓋（chapter 4） */

export const DOC_FOR_04: DocumentDef = {
  id: 'DOC-FOR-04',
  title: '落體實驗報告（73年）',
  category: 'FOR',
  chapter: 4,
  content: [],
  presentation: '封面蓋有「機密」戳記的實驗報告',
  keyClues: [
    '「陳文成有意自殺之可能性小」',
    '「以意外死亡之可能性最大」',
    '實驗結果被列為機密不公布',
    '國安局理由：「本案政治性大於法律性」',
  ],
  crossRefs: ['DOC-OFF-05'],
}

export const DOC_OFF_05: DocumentDef = {
  id: 'DOC-OFF-05',
  title: '汪敬煦呈蔣經國簽呈',
  category: 'OFF',
  chapter: 4,
  content: [],
  presentation: '簽呈格式，有總統府戳章',
  keyClues: [
    '批示欄蓋有「71.7.11 已報總統」戳章',
    '蔣經國本人已知自殺可能性被排除，但未下令公開或追訴',
    '最高權力者知情不作為',
  ],
  crossRefs: ['DOC-FOR-04'],
}

export const DOC_NSA_01: DocumentDef = {
  id: 'DOC-NSA-01',
  title: '國安局「不公布」決定',
  category: 'NSA',
  chapter: 4,
  content: [],
  presentation: '國安局內部簽文',
  keyClues: [
    '「本案政治性大於法律性」',
    '「以免再引起不良反應」——決定不公布實驗結果',
  ],
  crossRefs: ['DOC-FOR-04', 'DOC-OFF-05'],
}

export const DOC_OFF_04: DocumentDef = {
  id: 'DOC-OFF-04',
  title: '〈檢警偵查報告〉初稿與定稿比較',
  category: 'OFF',
  chapter: 4,
  content: [],
  presentation: '兩版報告並排，修改處以紅字標記',
  keyClues: [
    '初稿：「自殺較意外死亡之可能性為大」',
    '定稿（經主任檢察官指示修改）：「意外死亡或自殺均有可能」',
    '結論被刻意軟化',
  ],
  crossRefs: [],
}

export const DOC_OFF_02: DocumentDef = {
  id: 'DOC-OFF-02',
  title: '7月4日警總專案會議紀錄',
  category: 'OFF',
  chapter: 4,
  content: [],
  presentation: '會議紀錄格式',
  keyClues: [
    '于振宇指示：「陳某在臺家屬及交密者應即全面清查，嚴密監控」',
    '案發後第一天，首要動作不是追兇而是監控家屬',
  ],
  crossRefs: ['DOC-SUR-05'],
}

export const DOC_SUR_05: DocumentDef = {
  id: 'DOC-SUR-05',
  title: '案發後家屬監控檔案',
  category: 'SUR',
  chapter: 4,
  content: [],
  presentation: '多份電監紀錄與內部分析報告',
  keyClues: [
    '家屬得知死訊前情治單位便已密切監控',
    '監控持續數年——陳庭茂出身分析、申訴活動研究、防制赴美對策',
    '北檢函請國安局監聽陳家電話「以防家屬串供」',
  ],
  crossRefs: [],
}

export const DOC_OFF_06: DocumentDef = {
  id: 'DOC-OFF-06',
  title: '國安局撥發工作費',
  category: 'OFF',
  chapter: 4,
  content: [],
  presentation: '預算簽核單',
  keyClues: [
    '撥發警總偵辦陳文成案工作費30萬元',
    '從「匪、間諜案件偵破預算」支出',
    '死因真相劣位於政治偵防目標',
  ],
  crossRefs: ['DOC-OFF-02'],
}

export const DOC_OFF_07: DocumentDef = {
  id: 'DOC-OFF-07',
  title: '查禁書籍紀錄',
  category: 'OFF',
  chapter: 4,
  content: [],
  presentation: '查禁公文',
  keyClues: [
    '《陳文成教授紀念專集》遭查禁',
    '理由：「混淆視聽」「誣栽警總謀害陳文成」「詆毀國家元首」',
  ],
  crossRefs: ['DOC-EXT-04'],
}

export const DOC_EXT_03: DocumentDef = {
  id: 'DOC-EXT-03',
  title: '美聯社記者周清月事件',
  category: 'EXT',
  chapter: 4,
  content: [],
  presentation: '新聞局公文與新聞稿',
  keyClues: [
    '記者因使用「驗屍」(autopsy)一詞被取消記者登記證',
    '政府連用詞都要管控',
  ],
  crossRefs: ['DOC-FOR-02'],
}

export const DOC_EXT_05: DocumentDef = {
  id: 'DOC-EXT-05',
  title: '外交部投書運動',
  category: 'EXT',
  chapter: 4,
  content: [],
  presentation: '投書小組工作紀錄',
  keyClues: [
    '成立投書小組「澄清陳文成命案及防止中共和平統戰」',
    '至10月底已發出300餘封投書',
  ],
  crossRefs: ['DOC-EXT-03'],
}

export const chapter4Documents: DocumentDef[] = [
  DOC_FOR_04,
  DOC_OFF_05,
  DOC_NSA_01,
  DOC_OFF_04,
  DOC_OFF_02,
  DOC_SUR_05,
  DOC_OFF_06,
  DOC_OFF_07,
  DOC_EXT_03,
  DOC_EXT_05,
]
