// ===== 文件 ID 與分類 =====

export type DocumentCategory = 'INT' | 'SUR' | 'FOR' | 'WIT' | 'OFF' | 'EXT' | 'NEWS' | 'NSA' | 'TJC'

export type DocumentId =
  // 序章 (chapter 0)
  | 'DOC-EXT-04' | 'DOC-OFF-01' | 'DOC-NEWS-01'
  // 第一章 (chapter 1)
  | 'DOC-SUR-01-1' | 'DOC-SUR-02' | 'DOC-SUR-04' | 'DOC-SUR-03' | 'DOC-SUR-01-5'
  // 第二章 (chapter 2)
  | 'DOC-INT-04' | 'DOC-INT-01' | 'DOC-INT-02' | 'DOC-WIT-04-S' | 'DOC-WIT-05'
  // 第三章 (chapter 3)
  | 'DOC-FOR-01' | 'DOC-FOR-05' | 'DOC-WIT-01' | 'DOC-WIT-02' | 'DOC-WIT-03' | 'DOC-FOR-02' | 'DOC-FOR-03'
  // 第四章 (chapter 4)
  | 'DOC-FOR-04' | 'DOC-OFF-05' | 'DOC-NSA-01' | 'DOC-OFF-04' | 'DOC-OFF-02'
  | 'DOC-SUR-05' | 'DOC-OFF-06' | 'DOC-OFF-07' | 'DOC-EXT-03' | 'DOC-EXT-05'
  // 終章 (chapter 5)
  | 'DOC-OFF-03' | 'DOC-TJC-01' | 'DOC-EXT-01' | 'DOC-EXT-02'
  // 隱藏 (由矛盾解鎖, 不直接出現在章節中)
  | 'DOC-INT-03' | 'DOC-WIT-04'

export type ContradictionId =
  | 'C-01' | 'C-02' | 'C-03' | 'C-04' | 'C-05' | 'C-06' | 'C-07' | 'C-08'
  | 'C-09' | 'C-10' | 'C-11' | 'C-12' | 'C-13' | 'C-14' | 'C-15' | 'C-16'

// ===== 文件定義（靜態資料） =====

export interface Paragraph {
  index: number
  text: string
  isKeyClue?: boolean
}

export interface DocumentDef {
  id: DocumentId
  title: string
  category: DocumentCategory
  chapter: number
  content: Paragraph[]
  presentation: string
  keyClues: string[]
  crossRefs: DocumentId[]
  /** 需要由矛盾解鎖才顯示的文件，不在章節初始文件列表中 */
  hiddenUntilUnlocked?: boolean
}

// ===== 矛盾定義 =====

export interface ContradictionTrigger {
  docId: DocumentId
  paragraphIndex: number
  keywords: string[]
}

export interface ContradictionUnlocks {
  documents: DocumentId[]
  notebookFields: NotebookFieldId[]
  chapter: number | null
}

export interface ContradictionDef {
  id: ContradictionId
  name: string
  description: string
  resolvable: boolean
  triggers: [ContradictionTrigger, ContradictionTrigger]
  unlocks: ContradictionUnlocks
}

// ===== 推理簿 =====

export type NotebookFieldId =
  | 'arrest_method'
  | 'interrogation_purpose'
  | 'july2_evening'
  | 'clothing_anomaly'
  | 'crime_scene'
  | 'death_manner'
  | 'witness_role'
  | 'full_recording'
  | 'investigation_lead'
  | 'coverup_chain'
  | 'who_ordered'
  | 'true_death_location'

export interface NotebookFieldOption {
  value: string
  label: string
}

export interface NotebookFieldDef {
  id: NotebookFieldId
  label: string
  type: 'choice' | 'auto' | 'locked'
  options?: NotebookFieldOption[]
  autoValue?: string
  lockedReason?: string
}

// ===== 遊戲狀態（存檔用） =====

export interface ChapterState {
  current: number
  unlocked: number[]
  completed: number[]
}

export interface DocumentState {
  unlocked: boolean
  read: boolean
  readAt: string | null
}

export interface Highlight {
  id: string
  docId: DocumentId
  paragraphIndex: number
  text: string
  createdAt: string
}

export interface Connection {
  id: ContradictionId
  triggered: boolean
  triggeredAt: string | null
  highlightPair: [string, string]
  unlockedDocs: DocumentId[]
  unlockedNotebookFields: NotebookFieldId[]
}

export interface NotebookFieldState {
  unlocked: boolean
  value: string | null
}

export interface NotebookState {
  fields: Partial<Record<NotebookFieldId, NotebookFieldState>>
  order: NotebookFieldId[]
}

export interface EndingState {
  reached: boolean
  reachedAt: string | null
  totalContradictions: number
  triggeredContradictions: number
  notebookCompletion: {
    total: number
    filled: number
    autoFilled: number
    permanentlyLocked: number
    maxPossible: number
  }
}

export interface GameSettings {
  fontSize: 'small' | 'medium' | 'large'
  theme: 'paper' | 'terminal'
}

export interface GameState {
  version: string
  created: string
  lastSaved: string
  playTime: number
  chapter: ChapterState
  documents: Partial<Record<DocumentId, DocumentState>>
  highlights: Highlight[]
  connections: Connection[]
  notebook: NotebookState
  endings: EndingState
  settings: GameSettings
}

// ===== 章節定義 =====

export interface ChapterDef {
  id: number
  key: string
  title: string
  subtitle: string
  documentIds: DocumentId[]
  mood: string
}
