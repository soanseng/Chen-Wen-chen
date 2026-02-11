import type {
  ChapterDef,
  ContradictionDef,
  ContradictionId,
  DocumentDef,
  DocumentId,
  NotebookFieldDef,
} from '../types/index.ts'

import { chapters } from './chapters.ts'
import { contradictions } from './contradictions.ts'
import { prologueDocuments } from './documents/prologue.ts'
import { chapter1Documents } from './documents/chapter1.ts'
import { chapter2Documents } from './documents/chapter2.ts'
import { chapter3Documents } from './documents/chapter3.ts'
import { chapter4Documents } from './documents/chapter4.ts'
import { finaleDocuments } from './documents/finale.ts'
import { hiddenDocuments } from './documents/hidden.ts'
import { notebookFields } from './notebook.ts'

// ===== Documents =====

const allDocumentsList: DocumentDef[] = [
  ...prologueDocuments,
  ...chapter1Documents,
  ...chapter2Documents,
  ...chapter3Documents,
  ...chapter4Documents,
  ...finaleDocuments,
  ...hiddenDocuments,
]

function buildDocumentMap(documents: DocumentDef[]): Record<DocumentId, DocumentDef> {
  const map = {} as Record<DocumentId, DocumentDef>
  for (const doc of documents) {
    map[doc.id] = doc
  }
  return map
}

function buildDocumentsByChapter(documents: DocumentDef[]): Record<number, DocumentDef[]> {
  const map: Record<number, DocumentDef[]> = {}
  for (const doc of documents) {
    if (doc.hiddenUntilUnlocked) continue
    const list = map[doc.chapter] ?? []
    list.push(doc)
    map[doc.chapter] = list
  }
  return map
}

function buildContradictionMap(items: ContradictionDef[]): Record<ContradictionId, ContradictionDef> {
  const map = {} as Record<ContradictionId, ContradictionDef>
  for (const item of items) {
    map[item.id] = item
  }
  return map
}

export const ALL_DOCUMENTS: Record<DocumentId, DocumentDef> = buildDocumentMap(allDocumentsList)

export const DOCUMENTS_BY_CHAPTER: Record<number, DocumentDef[]> = buildDocumentsByChapter(allDocumentsList)

export const CONTRADICTIONS: Record<ContradictionId, ContradictionDef> = buildContradictionMap(contradictions)

export const CHAPTERS: ChapterDef[] = chapters

export const NOTEBOOK_FIELDS: NotebookFieldDef[] = notebookFields
