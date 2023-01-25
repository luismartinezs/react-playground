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
        // debug('subscribeToAnnouncedTitle', state)
        return state.sort(sortByPriority)[0] || { id: 'null' }
      }),
      tap((item) => debug('item', item)),
      distinctUntilKeyChanged('id'),
      debounce(() => timer(TITLE_DEBOUNCE_TIME)),
      tap((item) => {
        debug('debouncedAnnouncedTitleItem$.pipe', item)
        debug('--- announcedIds', announcedIds)
      }),
      map((item) => {
        if (!item) {
          return ''
        }
        // if title announce is disabled, then we do not announce it
        if (item.disableAnnounceTitle) {
          if (item.title) {
            // case where announce title is disabled, but context changes, when context changes, we clear all announced ids
            clearAnnouncedIds()
          }
          return ''
        }
        // context = some document title was set, that defines one context. If doc title was not set, then the context is the same
        // e.g.
        // if modal did not set doc title, that means it didn't change whatever the context was, so we do not reset it, that also means the current item does not set any context and thus it is not necessary to add it to the context
        if (!item.title) {
          return ''
        }
        // if modal (or something else) set doc title, that defines a new context
        // it's possible that the previous item did not set any context, so we need to check whether this new item was already announced or not

        // if it was not announced, then we announce it
        if (!wasIdAnnounced(item.id)) {
          clearAnnouncedIds() // clear context
          addAnnouncedId(item.id) // add the announced title to new context
          // FIX this part doesn't work if the pipeline runs multiple times with the same, e.g. component rerender
          return item.title
        } else {
          // if it was already announced, then we do not announce it, it's as if nothing happened
          return ''
        }
      }),
      tap((val) => {
        debug('announced title', val)
        debug('===============')
      })
    )

    const announcedTitleWithTimeout$ = merge(
      announcedTitle$,
      emitAfterTimeout(announcedTitle$, TITLE_LIVE_REGION_TIMEOUT, '')
    )

    function addAnnouncedId(id: string) {
      if (id) {
        announcedIds.add(id)
      }
    }

    function removeAnnouncedId(id: string) {
      if (id) {
        announcedIds.delete(id)
      }
    }

    function wasIdAnnounced(id: string) {
      if (id) {
        return announcedIds.has(id)
      }
    }

    function clearAnnouncedIds() {
      announcedIds.clear()
    }

    function addEntitler(item: DocumentEntitlerItem) {
      debug('addEntitler', item)
      return documentEntitlerItems$.next([...documentEntitlerItems$.getValue(), item])
    }

    function removeEntitler(id: string) {
      removeAnnouncedId(id)
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
