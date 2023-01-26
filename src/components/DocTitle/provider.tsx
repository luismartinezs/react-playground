import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  BehaviorSubject,
  map,
  distinctUntilChanged,
  debounce,
  timer,
  Observable,
  debounceTime,
  merge,
  tap,
  distinctUntilKeyChanged,
  scan,
} from 'rxjs'

import { debug, useId } from './util'
import type { Context, DocumentEntitlerItem, DocumentTitleOptions, Priority } from './types'
import { PRIORITY_SORT_MAP, TITLE_DEBOUNCE_TIME, TITLE_LIVE_REGION_TIMEOUT } from './constants'

function useDocumentTitleObservable() {
  return useMemo(() => {
    const documentEntitlerItems$ = new BehaviorSubject<DocumentEntitlerItem[]>([])
    const announcedIds = new Set()
    const announcedTitle$ = documentEntitlerItems$.pipe(
      map((state) => {
        return state.sort(sortByPriority)[0] || { id: 'null' }
      }),
      distinctUntilKeyChanged('id'),
      debounce(() => timer(TITLE_DEBOUNCE_TIME)),
      scan((history: DocumentEntitlerItem[], item: DocumentEntitlerItem) => {
        if (!item) {
          return history
        }
        if (item.disableAnnounceTitle) {
          if (item.title) {
            return [{ ...item, title: '' }]
          }
          return [...history, { ...item, title: '' }]
        }
        if (item.title) {
          if (history.find((el) => el.id === item.id)) {
            return [{ ...item, title: '' }]
          }
          return [item]
        }
        return [...history, item]
      }, []),
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

    function pipeDocumentEntitlerItems<Value>(
      mappingFn: (items: DocumentEntitlerItem[]) => Value,
      debounceTime: number,
      comparator: (previous: Value, current: Value) => boolean = (previous, current) => previous === current
    ): Observable<Value> {
      return documentEntitlerItems$.pipe(
        map(mappingFn),
        distinctUntilChanged(comparator),
        debounce(() => timer(debounceTime))
      )
    }

    function sortByPriority(a: DocumentEntitlerItem, b: DocumentEntitlerItem) {
      return PRIORITY_SORT_MAP[b.priority] <= PRIORITY_SORT_MAP[a.priority] ? -1 : 1
    }

    function emitAfterTimeout<T>(source$: Observable<T>, timeout: number, value: T) {
      return source$.pipe(
        debounceTime(timeout),
        map(() => value)
      )
    }

    function subscribeToDocumentTitle(callback: (value: string) => void) {
      const documentTitle$ = pipeDocumentEntitlerItems<string>((state) => {
        return state.filter((item) => item.title).sort(sortByPriority)[0]?.title || ''
        // set a debounce time to ignore multiple titles in quick succession
      }, TITLE_DEBOUNCE_TIME)
      const sub = documentTitle$.subscribe(callback)

      return () => sub.unsubscribe()
    }

    function subscribeToAnnouncedTitle(callback: (value: string) => void) {
      const sub = announcedTitleWithTimeout$.subscribe(callback)

      return () => sub.unsubscribe()
    }

    function subscribeToDisableAnnounceTitle(callback: (value: boolean) => void) {
      const disableSRAnnounce$ = pipeDocumentEntitlerItems<boolean>((state) => {
        return Boolean(state.sort(sortByPriority)[0]?.disableAnnounceTitle)
      }, 0)
      const sub = disableSRAnnounce$.subscribe(callback)

      return () => sub.unsubscribe()
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
            // debug('useAnnouncedTitle', newTitle)
            setTitle(newTitle)
          })
        }, [])

        return title
      },
      useDisableAnnounceTitle: () => {
        const [disableAnnounceTitle, setDisableAnnounceTitle] = useState<boolean>(false)

        useEffect(() => {
          return subscribeToDisableAnnounceTitle(setDisableAnnounceTitle)
        }, [])

        return disableAnnounceTitle
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
  useDisableAnnounceTitle: developerWarning,
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
