import { PRIORITY_SORT_MAP } from './constants'

export type TDocumentTitleContext = Readonly<{
  useDocumentEntitler: ({ priority, title }: DocumentTitleOptions) => void
  useDocumentTitle: () => string
  useDisableSRAnnounce: () => boolean
  useSRFlicker: () => boolean
}>

export type Context = Readonly<TDocumentTitleContext>

export type Priority = keyof typeof PRIORITY_SORT_MAP

export type DocumentTitleOptions = { priority?: Priority; title?: string; disableSRAnnounce?: boolean; srFlicker?: boolean }

export type DocumentEntitlerItem = Required<DocumentTitleOptions> & {
  id: string
}