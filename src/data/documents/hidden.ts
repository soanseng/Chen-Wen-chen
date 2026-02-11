import type { DocumentDef } from '../../types/index.ts'

/** 隱藏文件：由矛盾解鎖，不直接出現在章節中 */

export const DOC_INT_03: DocumentDef = {
  id: 'DOC-INT-03',
  title: '錄音帶最後蹤跡',
  category: 'INT',
  chapter: 2,
  content: [],
  presentation: '內部簽呈格式，有批示印章與手寫批註',
  keyClues: [
    '「刪除敏感部分」——暗示錄音帶內容對警總不利',
    '11月2日批註「已協調辦理」，此後錄音帶再無蹤跡',
  ],
  crossRefs: ['DOC-INT-02'],
  hiddenUntilUnlocked: true,
}

export const DOC_WIT_04: DocumentDef = {
  id: 'DOC-WIT-04',
  title: '家屬偵訊筆錄系列',
  category: 'WIT',
  chapter: 3,
  content: [],
  presentation: '偵訊筆錄掃描件',
  keyClues: [
    '陳素貞穿著細節——推斷被帶走的倉促與非自願',
    '陳庭茂在筆錄上親筆寫下兩點聲明',
    '陳文華證實警總透過師大職員聯繫',
    '孫理證實警總兩度透過人事室聯繫',
  ],
  crossRefs: ['DOC-SUR-04'],
  hiddenUntilUnlocked: true,
}

export const hiddenDocuments: DocumentDef[] = [
  DOC_INT_03,
  DOC_WIT_04,
]
