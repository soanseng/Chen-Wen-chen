import type { NotebookFieldDef } from '../types/index.ts'

export const notebookFields: NotebookFieldDef[] = [
  {
    id: 'arrest_method',
    label: '被帶走的方式',
    type: 'choice',
    options: [
      { value: 'voluntary', label: '自願赴約' },
      { value: 'surprise', label: '突襲帶人' },
      { value: 'forced', label: '強制押解' },
    ],
  },
  {
    id: 'interrogation_purpose',
    label: '約談真實目的',
    type: 'choice',
    options: [
      { value: 'clarify', label: '澄清疑點' },
      { value: 'recruit', label: '招募合作' },
      { value: 'intimidate', label: '施壓恐嚇' },
    ],
  },
  {
    id: 'july2_evening',
    label: '7月2日晚間行蹤',
    type: 'locked',
    lockedReason: '完整錄音帶已消失，鄧維祥證詞不可信，此欄無法填寫。',
  },
  {
    id: 'clothing_anomaly',
    label: '衣著異常意味什麼？',
    type: 'choice',
    options: [
      { value: 'self_changed', label: '自己更衣' },
      { value: 'rearranged', label: '他人整理' },
      { value: 'dragged', label: '搬運所致' },
    ],
  },
  {
    id: 'crime_scene',
    label: '陳屍處是否為第一現場',
    type: 'auto',
    autoValue: '否——陳屍處並非第一現場',
  },
  {
    id: 'death_manner',
    label: '死亡方式',
    type: 'choice',
    options: [
      { value: 'suicide', label: '自殺' },
      { value: 'accident', label: '意外' },
      { value: 'homicide', label: '他殺' },
    ],
  },
  {
    id: 'witness_role',
    label: '鄧維祥的角色',
    type: 'choice',
    options: [
      { value: 'honest', label: '誠實證人' },
      { value: 'manipulated', label: '被利用的友人' },
      { value: 'collaborator', label: '警總合作者' },
    ],
  },
  {
    id: 'full_recording',
    label: '完整錄音帶內容',
    type: 'locked',
    lockedReason: '約談錄音帶自民國70年11月後完全消失，至今下落不明。',
  },
  {
    id: 'investigation_lead',
    label: '偵查方向由誰主導',
    type: 'choice',
    options: [
      { value: 'prosecutor', label: '檢察官' },
      { value: 'garrison', label: '警總' },
      { value: 'nsa', label: '國安局' },
    ],
  },
  {
    id: 'coverup_chain',
    label: '掩蓋真相的決策鏈',
    type: 'auto',
    autoValue: '警總→國安局→總統府',
  },
  {
    id: 'who_ordered',
    label: '是誰下令？',
    type: 'locked',
    lockedReason: '無直接證據指向特定下令者，此欄永遠空白。',
  },
  {
    id: 'true_death_location',
    label: '真正的死亡地點',
    type: 'locked',
    lockedReason: '陳屍處非第一現場，但真正的死亡地點無從得知。',
  },
]
