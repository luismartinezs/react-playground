import { PRIORITY_SORT_MAP } from './constants'

export type Priority = keyof typeof PRIORITY_SORT_MAP

export type DocumentTitlePayload = {
  priority?: Priority
  title?: string
}

export type DocumentTitleOptions = {
  priority?: Priority
  title?: string
  disableAnnounceTitle?: boolean
}

export type DocumentEntitlerItem = {
  priority: Priority
  title: string
  disableAnnounceTitle: boolean
  id: string
}

export type TDocumentTitleContext = Readonly<{
  // setters
  useDocumentEntitler: (args: DocumentTitleOptions) => void
  useAnnounceTitleDisabler: (args?: { priority?: Priority }) => void
  useUpdateDocumentTitle: (args: DocumentTitlePayload) => void
  // getters
  useDocumentTitle: () => string
  useAnnouncedTitle: () => string
}>

export type Context = Readonly<TDocumentTitleContext>
