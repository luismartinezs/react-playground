import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  BehaviorSubject,
  map,
  distinctUntilChanged,
  debounce,
  timer,
  Observable,
  debounceTime,
  merge,
  distinctUntilKeyChanged,
  scan,
} from 'rxjs'

import { useId } from './util'
import type { Context, DocumentEntitlerItem, DocumentTitleOptions, Priority } from './types'
import { PRIORITY_SORT_MAP, TITLE_DEBOUNCE_TIME, TITLE_LIVE_REGION_TIMEOUT } from './constants'

function handleHistory(history: DocumentEntitlerItem[], item: DocumentEntitlerItem) {
  if (!item) {
    return history
  }
  const { disableAnnounceTitle, title, id } = item
  const isIdInHistory = history.find((el) => el.id === id)

  if (title) {
    if (disableAnnounceTitle || isIdInHistory) {
      return [{ ...item, title: '' }]
    }
    return [item]
  }
  if (disableAnnounceTitle) {
    return [...history, { ...item, title: '' }]
  }
  return history
}

function emitAfterTimeout<T>(source$: Observable<T>, timeout: number, value: T) {
  return source$.pipe(
    debounceTime(timeout),
    map(() => value)
  )
}

function sortByPriority(a: DocumentEntitlerItem, b: DocumentEntitlerItem) {
  return PRIORITY_SORT_MAP[b.priority] <= PRIORITY_SORT_MAP[a.priority] ? -1 : 1
}

function useDocumentTitleObservable() {
  return useMemo(() => {
    const documentEntitlerItems$ = new BehaviorSubject<DocumentEntitlerItem[]>([])

    const documentTitle$ = documentEntitlerItems$.pipe(
      map((state) => {
        return state.filter((item) => item.title).sort(sortByPriority)[0]?.title || ''
        // set a debounce time to ignore multiple titles in quick succession
      }),
      distinctUntilChanged(),
      debounce(() => timer(TITLE_DEBOUNCE_TIME))
    )

    const announcedTitle$ = documentEntitlerItems$.pipe(
      map((state) => {
        return state.sort(sortByPriority)[0] || { id: 'null' }
      }),
      distinctUntilKeyChanged('id'),
      debounce(() => timer(TITLE_DEBOUNCE_TIME)),
      scan(handleHistory, []),
      map((history) => (history.length > 0 ? history.at(-1)?.title || '' : ''))
    )

    const announcedTitleWithTimeout$ = merge(
      announcedTitle$,
      emitAfterTimeout(announcedTitle$, TITLE_LIVE_REGION_TIMEOUT, '')
    )

    function addEntitler(item: DocumentEntitlerItem) {
      return documentEntitlerItems$.next([...documentEntitlerItems$.getValue(), item])
    }

    function removeEntitler(id: string) {
      documentEntitlerItems$.next(documentEntitlerItems$.getValue().filter((item) => item.id !== id))
    }

    function subscribeToDocumentTitle(callback: (value: string) => void) {
      return documentTitle$.subscribe(callback).unsubscribe
    }

    function subscribeToAnnouncedTitle(callback: (value: string) => void) {
      return announcedTitleWithTimeout$.subscribe(callback).unsubscribe
    }

    return {
      useDocumentEntitler: ({
        // by default set to the lowest priority
        priority = 'page',
        title = '',
        disableAnnounceTitle = false,
      }: Partial<DocumentTitleOptions>) => {
        const id = useId()

        useEffect(() => {
          addEntitler({ id, priority, title, disableAnnounceTitle })
          return () => {
            removeEntitler(id)
          }
        }, [priority, title])
      },
      useAnnounceTitleDisabler: ({
        priority,
      }: {
        priority?: Priority
      } = {}) => {
        const id = useId()

        useEffect(() => {
          addEntitler({ id, priority: priority || 'max', title: '', disableAnnounceTitle: true })
          return () => removeEntitler(id)
        }, [priority])
      },
      useUpdateDocumentTitle: ({ priority = 'page', title = '' }: Partial<DocumentTitleOptions>) => {
        const id = useId()

        useEffect(() => {
          addEntitler({ id, priority, title, disableAnnounceTitle: true })
          return () => {
            removeEntitler(id)
          }
        }, [priority, title])
      },
      useDocumentTitle: () => {
        const [title, setTitle] = useState<string>('')

        useEffect(() => {
          return subscribeToDocumentTitle((newTitle) => {
            setTitle(newTitle)
          })
        }, [])

        return title
      },
      useAnnouncedTitle: () => {
        const [title, setTitle] = useState<string>('')

        useEffect(() => {
          return subscribeToAnnouncedTitle((newTitle) => {
            setTitle(newTitle)
          })
        }, [])

        return title
      },
    }
  }, [])
}

function developerWarning(): never {
  throw new Error("Don't use a11y outside of accessibility provider")
}

const DocumentTitleContext = {
  useDocumentEntitler: developerWarning,
  useAnnounceTitleDisabler: developerWarning,
  useUpdateDocumentTitle: developerWarning,
  useDocumentTitle: developerWarning,
  useAnnouncedTitle: developerWarning,
}

const AccessibilityContext = createContext<Context>({
  ...DocumentTitleContext,
})

function useA11y() {
  return useContext(AccessibilityContext)
}

function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const documentTitleObservable = useDocumentTitleObservable()

  const context = useMemo(() => {
    return {
      ...documentTitleObservable,
    }
  }, [])

  return <AccessibilityContext.Provider value={context}>{children}</AccessibilityContext.Provider>
}

export { AccessibilityProvider, useA11y }
