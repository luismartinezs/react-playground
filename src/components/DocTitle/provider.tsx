import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { BehaviorSubject, map, distinctUntilChanged, debounce, timer, Observable } from 'rxjs'

import { useId, debug } from './util'
import type { Context, DocumentEntitlerItem, DocumentTitleOptions, WithSrFlicker } from './types'
import { PRIORITY_SORT_MAP } from './constants'

function useDocumentTitleObservable() {
  return useMemo(() => {
    const documentEntitlerItems$ = new BehaviorSubject<DocumentEntitlerItem[]>([])
    const srFlicker$ = new BehaviorSubject<boolean>(false)

    function addEntitler(item: DocumentEntitlerItem) {
      debug('addEntitler', item)
      return documentEntitlerItems$.next([...documentEntitlerItems$.getValue(), item])
    }

    function removeEntitler(id: string) {
      debug('removeEntitler')
      documentEntitlerItems$.next(documentEntitlerItems$.getValue().filter((item) => item.id !== id))
    }

    function addSRFlicker() {
      debug('addSRFlicker')
      srFlicker$.next(true)
      setTimeout(() => {
        srFlicker$.next(false)
      }, 500)
    }

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

    function subscribeToDocumentTitle(callback: (value: string) => void) {
      const documentTitle$ = pipeDocumentEntitlerItems<string>((state) => {
        return state.filter((item) => item.title).sort(sortByPriority)[0]?.title || ''
        // set a debounce time so that page title being announced is less likely to happen while modal is rendering
      }, 500)
      const sub = documentTitle$.subscribe(callback)

      return () => sub.unsubscribe()
    }

    function subscribeToDisableSRAnnounce(callback: (value: boolean) => void) {
      const disableSRAnnounce$ = pipeDocumentEntitlerItems<boolean>((state) => {
        // alternatively check whether any entitler set disableSRAnnounce to true, but either way should work with our main use case (modal with higher priority disabling SR announce)
        return Boolean(state.sort(sortByPriority)[0]?.disableSRAnnounce)
      }, 0)
      // debounce time to 0 so that the SR announce is disabled before any title change happens, so page title gets announced after a modal closes (context change)
      const sub = disableSRAnnounce$.subscribe(callback)

      return () => sub.unsubscribe()
    }

    function subscribeToSRFlicker(callback: (value: boolean) => void) {
      const sub = srFlicker$.subscribe(callback)

      return () => sub.unsubscribe()
    }

    return {
      useDocumentEntitler: ({
        // by default set to the lowest priority
        priority = 'page',
        title = '',
        disableSRAnnounce = false,
        srFlicker = false,
      }: WithSrFlicker<DocumentTitleOptions>) => {
        const id = useId()

        useEffect(() => {
          addEntitler({ id, priority, title, disableSRAnnounce })
          return () => {
            if (srFlicker) {
              addSRFlicker()
            }
            removeEntitler(id)
          }
        }, [priority, title])
      },
      useDocumentTitle: () => {
        const [title, setTitle] = useState<string>('')

        useEffect(() => {
          return subscribeToDocumentTitle(setTitle)
        }, [])

        return title
      },
      useDisableSRAnnounce: () => {
        const [disableSRAnnounce, setDisableSRAnnounce] = useState<boolean>(false)

        useEffect(() => {
          return subscribeToDisableSRAnnounce(setDisableSRAnnounce)
        }, [])

        return disableSRAnnounce
      },
      useSRFlicker: () => {
        const [srFlicker, setSRFlicker] = useState<boolean>(false)

        useEffect(() => {
          return subscribeToSRFlicker(setSRFlicker)
        }, [])

        return srFlicker
      },
    }
  }, [])
}

function developerWarning(): never {
  throw new Error("Don't use a11y outside of accessibility provider")
}

const DocumentTitleContext = {
  useDocumentEntitler: developerWarning,
  useDocumentTitle: developerWarning,
  useDisableSRAnnounce: developerWarning,
  useSRFlicker: developerWarning,
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
