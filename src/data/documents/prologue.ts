import type { DocumentDef } from '../../types/index.ts'

/** 序章：歸鄉（chapter 0） */

export const DOC_EXT_04: DocumentDef = {
  id: 'DOC-EXT-04',
  title: '陳素貞家書',
  category: 'EXT',
  chapter: 0,
  content: [],
  presentation: '被拆開重封的信封，附情治單位批註',
  keyClues: [
    '陳文成可能返臺任教',
    '最私密的家庭書信被攔截',
  ],
  crossRefs: ['DOC-SUR-02'],
}

export const DOC_OFF_01: DocumentDef = {
  id: 'DOC-OFF-01',
  title: '出境管制相關文件',
  category: 'OFF',
  chapter: 0,
  content: [],
  presentation: '出入境申請表及內部簽呈',
  keyClues: [
    '抵臺即申辦出境，警總協調境管局暫不核發',
    '限制出境作為施壓工具',
    '7月1日境管局通知「7月2日上午8時在家等候電話」——實為警總安排',
  ],
  crossRefs: ['DOC-INT-04'],
}

export const DOC_NEWS_01: DocumentDef = {
  id: 'DOC-NEWS-01',
  title: '70年7月4日新聞剪報',
  category: 'NEWS',
  chapter: 0,
  content: [],
  presentation: '報紙剪報掃描件',
  keyClues: [
    '「台大發生離奇命案」',
    '歸國學人陳屍校園',
  ],
  crossRefs: [],
}

export const prologueDocuments: DocumentDef[] = [
  DOC_EXT_04,
  DOC_OFF_01,
  DOC_NEWS_01,
]
