import type { DocumentDef } from '../../types/index.ts'

/** 第三章：證據（chapter 3） */

export const DOC_FOR_01: DocumentDef = {
  id: 'DOC-FOR-01',
  title: '70年法醫鑑定書',
  category: 'FOR',
  chapter: 3,
  content: [],
  presentation: '法醫鑑定書正式格式',
  keyClues: [
    '「多處鈍傷骨折內臟裂傷內出血休克致死」',
    '死亡時間推定為7月3日凌晨4至6時',
    '死亡時間與警總聲稱22時送返之間的時間差',
  ],
  crossRefs: ['DOC-FOR-02'],
}

export const DOC_FOR_05: DocumentDef = {
  id: 'DOC-FOR-05',
  title: '現場勘查紀錄與屍體狀態',
  category: 'FOR',
  chapter: 3,
  content: [],
  presentation: '現場勘查報告附照片描述',
  keyClues: [
    '屍體「頭朝東、腳朝西仰臥，兩手肘向上彎曲成舉重狀」',
    '襯衫露於長褲外、皮帶繫在襯衫外肚臍上方、雙腳均未穿襪',
    '「皮帶扣在上衣外面，像是拖屍體用的」',
    '衣著狀態與約談時完全不符',
  ],
  crossRefs: ['DOC-FOR-01'],
}

export const DOC_WIT_01: DocumentDef = {
  id: 'DOC-WIT-01',
  title: '鄧維祥證詞',
  category: 'WIT',
  chapter: 3,
  content: [],
  presentation: '訊問筆錄格式',
  keyClues: [
    '聲稱陳文成深夜來訪，留下「TO WHOM」英文信',
    '英文信「幾經清查，仍無法尋獲」',
    '鄧維祥稱7月4日「主動」聯繫警總——與鄧維楨證詞矛盾',
    '促轉會結論：「鄧維祥說詞難以遽信」',
  ],
  crossRefs: ['DOC-FOR-01'],
}

export const DOC_WIT_02: DocumentDef = {
  id: 'DOC-WIT-02',
  title: '五名目擊證人筆錄',
  category: 'WIT',
  chapter: 3,
  content: [],
  presentation: '查訪紀錄',
  keyClues: [
    '目擊對象身高差距與警總說法及王憶華證詞有明顯矛盾',
    '警總先行訪談五人，再交給警方，且拒絕提供原始筆錄',
    '目擊證人可能是被引導或虛構的',
  ],
  crossRefs: [],
}

export const DOC_WIT_03: DocumentDef = {
  id: 'DOC-WIT-03',
  title: '倪肇強證詞',
  category: 'WIT',
  chapter: 3,
  content: [],
  presentation: '訊問筆錄',
  keyClues: [
    '聲稱凌晨在太平梯上看到疑似陳文成的人',
    '歷次證詞前後歧異、出入甚大',
    '模擬實驗證明：「根本無法清楚看見研究圖書館太平梯上的狀況」',
  ],
  crossRefs: [],
}

export const DOC_FOR_02: DocumentDef = {
  id: 'DOC-FOR-02',
  title: '魏契（Cyril Wecht）鑑定意見',
  category: 'FOR',
  chapter: 3,
  content: [],
  presentation: '英文學術報告翻譯件',
  keyClues: [
    '右膝挫傷僅為表面傷——「可能是攻擊者要把陳文成舉高時膝部碰撞到護欄所致」',
    '「不論跳樓自殺或意外墜落，通常會造成手臂或腿部明顯的傷」',
    '結論：死於他殺，「在無知覺的情形下被人從樓上逃生梯拋下」',
  ],
  crossRefs: ['DOC-FOR-01', 'DOC-FOR-03'],
}

export const DOC_FOR_03: DocumentDef = {
  id: 'DOC-FOR-03',
  title: '李俊億鑑定報告（108年）',
  category: 'FOR',
  chapter: 3,
  content: [],
  presentation: '鑑識科學報告格式',
  keyClues: [
    '背部傷痕方向與水溝垂直——若仰臥墜地撞擊水溝，應平行',
    '襯衫血跡位於破裂痕下方——顯示受傷後身體曾被移動',
    '結論：「陳屍處並非第一現場」、「死亡方式極可能為他殺」',
  ],
  crossRefs: ['DOC-FOR-01', 'DOC-FOR-04'],
}

export const chapter3Documents: DocumentDef[] = [
  DOC_FOR_01,
  DOC_FOR_05,
  DOC_WIT_01,
  DOC_WIT_02,
  DOC_WIT_03,
  DOC_FOR_02,
  DOC_FOR_03,
]
