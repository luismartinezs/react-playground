import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  BehaviorSubject,
  map,
  distinctUntilChanged,
  debounce,
  timer,
  Observable,
  debounceTime,
  switchMap,
  of,
  merge,
  tap,
} from 'rxjs'

import { useId, debug } from './util'
import type { Context, DocumentEntitlerItem, DocumentTitleOptions, Priority } from './types'
import {
  PRIORITY_SORT_MAP,
  ANNOUNCE_TITLE_ON_UNMOUNT_TIMEOUT,
  TITLE_DEBOUNCE_TIME,
  TITLE_LIVE_REGION_TIMEOUT,
} from './constants'

function useDocumentTitleObservable() {
  return useMemo(() => {
    const documentEntitlerItems$ = new BehaviorSubject<DocumentEntitlerItem[]>([])
    const announceTitleOnUnmount$ = new BehaviorSubject<boolean>(false)

    const log$ = documentEntitlerItems$.pipe(tap((value) => debug('$$$', 'documentEntitlerItems$', value)))

    function addEntitler(item: DocumentEntitlerItem) {
      debug('addEntitler', item)
      return documentEntitlerItems$.next([...documentEntitlerItems$.getValue(), item])
    }

    function removeEntitler(id: string) {
      debug('removeEntitler')
      documentEntitlerItems$.next(documentEntitlerItems$.getValue().filter((item) => item.id !== id))
    }

    // function addDisableAnnounceTitle() {
    //   debug('addDisableAnnounceTitle')
    //   announceTitleOnUnmount$.next(true)
    //   setTimeout(() => {
    //     announceTitleOnUnmount$.next(false)
    //   }, ANNOUNCE_TITLE_ON_UNMOUNT_TIMEOUT)
    // }

    function pipeDocumentEntitlerItems<Value>(
      mappingFn: (items: DocumentEntitlerItem[]) => Value,
      debounceTime: number
    ): Observable<Value> {
      return documentEntitlerItems$.pipe(
        map(mappingFn),
        distinctUntilChanged(),
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
        // set a debounce time so that page title being announced is less likely to happen while modal is rendering
      }, TITLE_DEBOUNCE_TIME)
      const sub = documentTitle$.subscribe(callback)

      return () => sub.unsubscribe()
    }

    function subscribeToAnnouncedTitle(callback: (value: string) => void) {
      log$.subscribe()

      const announcedTitle$ = pipeDocumentEntitlerItems<string>((state) => {
        const top = state.filter((item) => item.title).sort(sortByPriority)[0]
        debug('top', top)
        if (top?.disableAnnounceTitle) {
          return ''
        }
        return top?.title || ''
      }, TITLE_DEBOUNCE_TIME)

      const sub = merge(announcedTitle$, emitAfterTimeout(announcedTitle$, TITLE_LIVE_REGION_TIMEOUT, ''))
        .pipe(tap((val) => debug('announcedTitleValue', val)))
        .subscribe(callback)

      return () => sub.unsubscribe()
    }

    function subscribeToDisableAnnounceTitle(callback: (value: boolean) => void) {
      const disableSRAnnounce$ = pipeDocumentEntitlerItems<boolean>((state) => {
        // alternatively check whether any entitler set disableSRAnnounce to true, but either way should work with our main use case (modal with higher priority disabling SR announce)
        return Boolean(state.sort(sortByPriority)[0]?.disableAnnounceTitle)
      }, 0)
      // debounce time to 0 so that the SR announce is disabled before any title change happens, so page title gets announced after a modal closes (context change)
      const sub = disableSRAnnounce$.subscribe(callback)

      return () => sub.unsubscribe()
    }

    function subscribeToAnnounceTitleEvent(callback: (value: boolean) => void) {
      const sub = announceTitleOnUnmount$.subscribe(callback)

      return () => sub.unsubscribe()
    }

    return {
      useDocumentEntitler: ({
        // by default set to the lowest priority
        priority = 'page',
        title = '',
        disableAnnounceTitle = false,
        announceTitleOnUnmount = false,
      }: Partial<DocumentTitleOptions>) => {
        const id = useId()

        useEffect(() => {
          addEntitler({ id, priority, title, disableAnnounceTitle })
          return () => {
            // if (announceTitleOnUnmount) {
            //   addDisableAnnounceTitle()
            // }
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
      // useAnnounceTitleOnUnmount: () => {
      // useEffect(() => {
      //   return addDisableAnnounceTitle
      // })
      // },
      useUpdateDocumentTitle: ({ priority = 'page', title = '' }: Partial<DocumentTitleOptions>) => {
        const id = useId()

        useEffect(() => {
          addEntitler({ id, priority, title, disableAnnounceTitle: false })
          return () => {
            removeEntitler(id)
          }
        }, [priority, title])
      },
      useDocumentTitle: () => {
        const [title, setTitle] = useState<string>('')

        useEffect(() => {
          return subscribeToDocumentTitle((newTitle) => {
            // debug('document title', newTitle)
            setTitle(newTitle)
          })
        }, [])

        return title
      },
      useAnnouncedTitle: () => {
        const [title, setTitle] = useState<string>('')

        useEffect(() => {
          return subscribeToAnnouncedTitle((newTitle) => {
            // debug('announced title', newTitle)
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
      useAnnounceTitleEvent: () => {
        const [announceTitleEvent, setAnnounceTitleEvent] = useState<boolean>(false)

        useEffect(() => {
          return subscribeToAnnounceTitleEvent(setAnnounceTitleEvent)
        }, [])

        return announceTitleEvent
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
  useAnnounceTitleOnUnmount: developerWarning,
  useUpdateDocumentTitle: developerWarning,
  useDocumentTitle: developerWarning,
  useAnnouncedTitle: developerWarning,
  useDisableAnnounceTitle: developerWarning,
  useAnnounceTitleEvent: developerWarning,
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
