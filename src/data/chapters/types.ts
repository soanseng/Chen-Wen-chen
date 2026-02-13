export interface Paragraph {
  text: string
  citation?: string
  type?: 'text' | 'quote' | 'note' | 'list'
  speaker?: string
  items?: string[]
}

export interface DialogueLine {
  speaker: string
  text: string
  role?: 'interrogator' | 'subject' | 'narrator'
}

export interface Section {
  id: string
  subtitle?: string
  paragraphs: Paragraph[]
  dialogue?: DialogueLine[]
  sceneId?: string | null
  infographicId?: string | null
}

export interface ChapterData {
  chapter: number
  title: string
  timeRange: string
  mood: string
  sections: Section[]
}
