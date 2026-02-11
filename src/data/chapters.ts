import type { ChapterDef } from '../types/index.ts'

export const chapters: ChapterDef[] = [
  {
    id: 0,
    key: 'prologue',
    title: '序章',
    subtitle: '歸鄉',
    documentIds: ['DOC-EXT-04', 'DOC-OFF-01', 'DOC-NEWS-01'],
    mood: '溫暖→不安',
  },
  {
    id: 1,
    key: 'ch1',
    title: '第一章',
    subtitle: '監視之網',
    documentIds: ['DOC-SUR-01-1', 'DOC-SUR-02', 'DOC-SUR-04', 'DOC-SUR-03', 'DOC-SUR-01-5'],
    mood: '壓迫、窒息',
  },
  {
    id: 2,
    key: 'ch2',
    title: '第二章',
    subtitle: '約談',
    documentIds: ['DOC-INT-04', 'DOC-INT-01', 'DOC-INT-02', 'DOC-WIT-04-S', 'DOC-WIT-05'],
    mood: '緊張、封閉',
  },
  {
    id: 3,
    key: 'ch3',
    title: '第三章',
    subtitle: '證據',
    documentIds: [
      'DOC-FOR-01', 'DOC-FOR-05', 'DOC-WIT-01', 'DOC-WIT-02',
      'DOC-WIT-03', 'DOC-FOR-02', 'DOC-FOR-03',
    ],
    mood: '震驚、困惑',
  },
  {
    id: 4,
    key: 'ch4',
    title: '第四章',
    subtitle: '掩蓋',
    documentIds: [
      'DOC-FOR-04', 'DOC-OFF-05', 'DOC-NSA-01', 'DOC-OFF-04', 'DOC-OFF-02',
      'DOC-SUR-05', 'DOC-OFF-06', 'DOC-OFF-07', 'DOC-EXT-03', 'DOC-EXT-05',
    ],
    mood: '官僚體系的恐怖',
  },
  {
    id: 5,
    key: 'finale',
    title: '終章',
    subtitle: '未完的檔案',
    documentIds: ['DOC-OFF-03', 'DOC-TJC-01', 'DOC-EXT-01', 'DOC-EXT-02'],
    mood: '留白、沉重',
  },
]
