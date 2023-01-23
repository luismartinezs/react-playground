import { PRIORITY_SORT_MAP } from './constants'

export type Priority = keyof typeof PRIORITY_SORT_MAP

export type DocumentTitleOptions = { priority?: Priority; title?: string; disableSRAnnounce?: boolean }

export type DocumentEntitlerItem = Required<DocumentTitleOptions> & {
  id: string
}

export type WithSrFlicker<T> = T & { srFlicker?: boolean }

export type TDocumentTitleContext = Readonly<{
  useDocumentEntitler: (args: WithSrFlicker<DocumentTitleOptions>) => void
  useDocumentTitle: () => string
  useDisableSRAnnounce: () => boolean
  useSRFlicker: () => boolean
}>

export type Context = Readonly<TDocumentTitleContext>
