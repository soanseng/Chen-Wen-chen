import type { ContradictionDef } from '../types/index.ts'

export const contradictions: ContradictionDef[] = [
  {
    id: 'C-01',
    name: '送返時間 vs 死亡時間',
    description:
      '警總聲稱22時將陳文成送返住處，但法醫推定死亡時間為凌晨4至6時。中間6-8小時發生了什麼？',
    resolvable: true,
    triggers: [
      { docId: 'DOC-WIT-05', paragraphIndex: 0, keywords: ['22時', '安抵'] },
      { docId: 'DOC-FOR-01', paragraphIndex: 0, keywords: ['凌晨4', '死亡時間'] },
    ],
    unlocks: {
      documents: ['DOC-WIT-01'],
      notebookFields: [],
      chapter: null,
    },
  },
  {
    id: 'C-02',
    name: '約談錄音帶「遺失」',
    description:
      '70年監察院委員曾「聆聽長達六小時左右之全部談話錄音」，但錄音帶此後消失無蹤。',
    resolvable: false,
    triggers: [
      { docId: 'DOC-INT-02', paragraphIndex: 0, keywords: ['錄音', '六小時'] },
      { docId: 'DOC-INT-03', paragraphIndex: 0, keywords: ['刪除', '敏感'] },
    ],
    unlocks: {
      documents: [],
      notebookFields: ['full_recording'],
      chapter: 3,
    },
  },
  {
    id: 'C-03',
    name: '境管局通知 vs 警總約談的共謀',
    description:
      '境管局7月1日通知陳文成「7月2日在家等電話」，但來的不是電話而是警總人員上門帶人。',
    resolvable: true,
    triggers: [
      { docId: 'DOC-OFF-01', paragraphIndex: 0, keywords: ['境管局', '等候電話'] },
      { docId: 'DOC-SUR-03', paragraphIndex: 0, keywords: ['假藉', '名義'] },
    ],
    unlocks: {
      documents: ['DOC-INT-04'],
      notebookFields: [],
      chapter: null,
    },
  },
  {
    id: 'C-04',
    name: '約談目的——「澄清疑點」vs 招募線人',
    description:
      '警總官方稱約談是「為予陳君出境前澄清疑點之機會」，但錄音譯文顯示訊問者試圖以出境換取合作。',
    resolvable: true,
    triggers: [
      { docId: 'DOC-SUR-03', paragraphIndex: 0, keywords: ['澄清', '疑點'] },
      { docId: 'DOC-INT-02', paragraphIndex: 0, keywords: ['回到美國', '接觸', '活動'] },
    ],
    unlocks: {
      documents: [],
      notebookFields: ['interrogation_purpose'],
      chapter: null,
    },
  },
  {
    id: 'C-05',
    name: '鄧維祥證詞 vs 物證',
    description:
      '鄧維祥聲稱陳文成7月2日深夜到訪其住處，但多項物證和旁證無法佐證。',
    resolvable: true,
    triggers: [
      { docId: 'DOC-WIT-01', paragraphIndex: 0, keywords: ['主動', '聯繫', '警總'] },
      { docId: 'DOC-WIT-01', paragraphIndex: 0, keywords: ['無法尋獲', '英文信'] },
    ],
    unlocks: {
      documents: [],
      notebookFields: ['witness_role'],
      chapter: null,
    },
  },
  {
    id: 'C-06',
    name: '約談是否「經同意」',
    description:
      '警總聲稱約談經陳文成本人同意，但多方證詞顯示完全相反。',
    resolvable: true,
    triggers: [
      { docId: 'DOC-SUR-03', paragraphIndex: 0, keywords: ['徵得', '同意'] },
      { docId: 'DOC-WIT-04-S', paragraphIndex: 0, keywords: ['毫無預備', '帶走'] },
    ],
    unlocks: {
      documents: ['DOC-WIT-04'],
      notebookFields: ['arrest_method'],
      chapter: null,
    },
  },
  {
    id: 'C-07',
    name: '衣著狀態——約談時 vs 屍體發現時',
    description:
      '陳文成約談時的穿著與屍體被發現時完全不同。',
    resolvable: true,
    triggers: [
      { docId: 'DOC-WIT-05', paragraphIndex: 0, keywords: ['運動襪', '穿著'] },
      { docId: 'DOC-FOR-05', paragraphIndex: 0, keywords: ['未穿襪', '皮帶', '襯衫外'] },
    ],
    unlocks: {
      documents: [],
      notebookFields: ['clothing_anomaly'],
      chapter: null,
    },
  },
  {
    id: 'C-08',
    name: '陳屍處是否為第一現場',
    description:
      '70年專案小組認定陳屍處為第一現場，但促轉會推翻此結論。',
    resolvable: true,
    triggers: [
      { docId: 'DOC-FOR-01', paragraphIndex: 0, keywords: ['第一現場'] },
      { docId: 'DOC-FOR-03', paragraphIndex: 0, keywords: ['傷痕', '垂直', '被移動'] },
    ],
    unlocks: {
      documents: [],
      notebookFields: ['crime_scene', 'true_death_location'],
      chapter: 4,
    },
  },
  {
    id: 'C-09',
    name: '落體實驗結果 vs 官方對外說法',
    description:
      '政府自己的實驗排除了自殺可能，卻刻意隱瞞、對外維持「自殺或意外」說法。',
    resolvable: true,
    triggers: [
      { docId: 'DOC-FOR-04', paragraphIndex: 0, keywords: ['自殺', '可能性小'] },
      { docId: 'DOC-NSA-01', paragraphIndex: 0, keywords: ['不公布', '政治性'] },
    ],
    unlocks: {
      documents: [],
      notebookFields: ['coverup_chain', 'death_manner'],
      chapter: 5,
    },
  },
  {
    id: 'C-10',
    name: '初步結論 vs 法醫鑑定時序',
    description:
      '「畏罪自殺」的結論早在法醫鑑定完成前11天就已定調。',
    resolvable: true,
    triggers: [
      { docId: 'DOC-OFF-03', paragraphIndex: 0, keywords: ['7月6日', '畏罪', '自殺'] },
      { docId: 'DOC-FOR-01', paragraphIndex: 0, keywords: ['7月17日', '鑑定'] },
    ],
    unlocks: {
      documents: ['DOC-OFF-04'],
      notebookFields: [],
      chapter: null,
    },
  },
  {
    id: 'C-11',
    name: '偵查報告初稿 vs 定稿',
    description:
      '偵查報告結論被主任檢察官指示修改。',
    resolvable: true,
    triggers: [
      { docId: 'DOC-OFF-04', paragraphIndex: 0, keywords: ['自殺', '可能性為大'] },
      { docId: 'DOC-OFF-04', paragraphIndex: 0, keywords: ['意外死亡', '均有可能'] },
    ],
    unlocks: {
      documents: [],
      notebookFields: [],
      chapter: null,
    },
  },
  {
    id: 'C-12',
    name: '護送人員身高矛盾',
    description:
      '護送人員的身高描述在不同紀錄中互相矛盾。',
    resolvable: true,
    triggers: [
      { docId: 'DOC-WIT-05', paragraphIndex: 0, keywords: ['167公分', '護送'] },
      { docId: 'DOC-WIT-02', paragraphIndex: 0, keywords: ['身高', '矛盾'] },
    ],
    unlocks: {
      documents: [],
      notebookFields: [],
      chapter: null,
    },
  },
  {
    id: 'C-13',
    name: '倪肇強證詞崩潰',
    description:
      '宣稱凌晨目擊太平梯上有人的證人，被實驗證明根本看不到。',
    resolvable: true,
    triggers: [
      { docId: 'DOC-WIT-03', paragraphIndex: 0, keywords: ['太平梯', '看到'] },
      { docId: 'DOC-WIT-03', paragraphIndex: 0, keywords: ['無法清楚看見', '模擬'] },
    ],
    unlocks: {
      documents: [],
      notebookFields: [],
      chapter: null,
    },
  },
  {
    id: 'C-14',
    name: '警總角色——嫌疑人卻主導辦案',
    description:
      '陳文成在遭警總帶走後死亡，警總邏輯上是第一嫌疑人，卻反過來主導偵辦。',
    resolvable: true,
    triggers: [
      { docId: 'DOC-OFF-02', paragraphIndex: 0, keywords: ['警總', '帶走', '死亡'] },
      { docId: 'DOC-OFF-02', paragraphIndex: 0, keywords: ['指揮', '督導', '偵辦'] },
    ],
    unlocks: {
      documents: [],
      notebookFields: ['investigation_lead'],
      chapter: null,
    },
  },
  {
    id: 'C-15',
    name: '國安局「沒有檔案」',
    description:
      '國安局局長公開宣稱沒有檔案，但促轉會後來找到了一案五卷。',
    resolvable: true,
    triggers: [
      { docId: 'DOC-NSA-01', paragraphIndex: 0, keywords: ['沒有檔案', '殷宗文'] },
      { docId: 'DOC-TJC-01', paragraphIndex: 0, keywords: ['一案五卷', '發現'] },
    ],
    unlocks: {
      documents: ['DOC-INT-03'],
      notebookFields: [],
      chapter: 5,
    },
  },
  {
    id: 'C-16',
    name: '汪敬煦的升遷 vs 問責',
    description:
      '案發時的警總總司令不但未被追究，反而升官。',
    resolvable: false,
    triggers: [
      { docId: 'DOC-OFF-05', paragraphIndex: 0, keywords: ['汪敬煦', '總司令'] },
      { docId: 'DOC-OFF-05', paragraphIndex: 0, keywords: ['升任', '國安局局長'] },
    ],
    unlocks: {
      documents: [],
      notebookFields: ['who_ordered'],
      chapter: null,
    },
  },
]
