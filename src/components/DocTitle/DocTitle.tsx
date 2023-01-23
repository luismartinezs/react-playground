import { createContext, FC, useContext, useEffect, useMemo, useState } from 'react'
import { BehaviorSubject, map, distinctUntilChanged, debounce, timer, Observable } from 'rxjs'
import { v4 } from 'uuid'

import SROnly, { useToast } from '@/components/SROnly'
import classnames from 'classnames'

const TIMEOUT = 5_000

export type TDocumentTitleContext = Readonly<{
  useDocumentEntitler: ({ priority, title }: DocumentTitleOptions) => void
  useDocumentTitle: () => string
  useDisableSRAnnounce: () => boolean
}>

type Context = Readonly<TDocumentTitleContext>

export function useId(): string {
  return useMemo(() => v4(), [])
}

const PRIORITY_SORT_MAP = Object.freeze({
  page: 0,
  modal: 1,
  stackedModal: 2, // for a modal stacked on top of another modal
  topModal: 3, // modal that shows on top of any other modal
})
export type Priority = keyof typeof PRIORITY_SORT_MAP
type DocumentTitleOptions = { priority?: Priority; title?: string; disableSRAnnounce?: boolean }
type DocumentEntitlerItem = Required<DocumentTitleOptions> & {
  id: string
}

export function useDocumentTitleObservable() {
  return useMemo(() => {
    const documentEntitlerItems$ = new BehaviorSubject<DocumentEntitlerItem[]>([])

    function addEntitler(item: DocumentEntitlerItem) {
      console.debug('addEntitler', item)
      return documentEntitlerItems$.next([...documentEntitlerItems$.getValue(), item])
    }

    function removeEntitler(id: string) {
      console.debug('removeEntitler')
      documentEntitlerItems$.next(documentEntitlerItems$.getValue().filter((item) => item.id !== id))
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

    return {
      useDocumentEntitler: ({
        // by default set to the lowest priority
        priority = 'page',
        title = '',
        disableSRAnnounce = false,
      }: DocumentTitleOptions) => {
        const id = useId()

        useEffect(() => {
          addEntitler({ id, priority, title, disableSRAnnounce })
          return () => removeEntitler(id)
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
    }
  }, [])
}

function useUpdateDocumentTitle(title: string) {
  useEffect(() => {
    const oldTitle = document.title
    if (title) {
      document.title = title
    }
    return () => {
      document.title = oldTitle
    }
  }, [title])
}

export function developerWarning(): never {
  throw new Error("Don't use a11y outside of accessibility provider")
}

export const DocumentTitleContext = {
  useDocumentEntitler: developerWarning,
  useDocumentTitle: developerWarning,
  useDisableSRAnnounce: developerWarning,
}

const AccessibilityContext = createContext<Context>({
  ...DocumentTitleContext,
})

export function useA11y() {
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

function DocumentTitle() {
  const { useDocumentTitle, useDisableSRAnnounce } = useA11y()
  const title = useDocumentTitle()
  const disabledSRAnnounce = useDisableSRAnnounce()
  useUpdateDocumentTitle(title)
  const showToast = useToast(TIMEOUT, [title])

  useEffect(() => {
    console.debug('sanity check')
  }, [])

  useEffect(() => {
    console.debug('====> title changed', title)
  }, [title])

  useEffect(() => {
    console.debug('====> disabledSRAnnounce changed', disabledSRAnnounce)
  }, [disabledSRAnnounce])

  useEffect(() => {
    console.debug(`<SROnlyToast>${disabledSRAnnounce ? '' : title}</SROnlyToast>`)
  })

  return <SROnly>{!showToast ? '' : title}</SROnly>
}

export function AccessibleDocumentTitle() {
  const { useDisableSRAnnounce } = useA11y()
  const disabledSRAnnounce = useDisableSRAnnounce()

  useEffect(() => {
    console.debug(`aria-live=${disabledSRAnnounce ? 'off' : 'assertive'}`)
  }, [disabledSRAnnounce])

  return (
    <span aria-live={disabledSRAnnounce ? 'off' : 'assertive'}>
      <DocumentTitle />
    </span>
  )
}

function DocTitleCard(props: DocumentTitleOptions & { muted?: boolean }) {
  return (
    <div
      className={classnames(
        'flex flex-col p-4 m-2 border rounded-xl border-sky-500',
        props.muted && 'text-zinc-500 border-zinc-400'
      )}
    >
      <span className="uppercase">Entitler</span>
      <span>
        Title: <span className="font-bold">{props.title || '--'}</span>
      </span>
      <span>
        Priority: <span className="font-bold">{props.priority || 'page'}</span>
      </span>
      <span>
        DisableSR: <span className="font-bold">{props.disableSRAnnounce ? 'true' : 'false'}</span>
      </span>
    </div>
  )
}

export function DocumentEntitler(props: DocumentTitleOptions) {
  useA11y().useDocumentEntitler({
    priority: props.priority || 'page',
    title: props.title,
    disableSRAnnounce: props.disableSRAnnounce,
  })

  return <DocTitleCard {...props} />
}

function DocumentEntitlerSkeleton(props: DocumentTitleOptions) {
  return <DocTitleCard {...props} muted />
}

function ToggleableDocumentEntitler(props: DocumentTitleOptions & { initialState?: boolean }) {
  const [enabled, setEnabled] = useState<boolean>(props.initialState === undefined ? true : props.initialState)

  return (
    <div className="relative">
      <button
        className={classnames(
          'absolute top-1 right-1 p-2 m-2 text-sm font-bold text-white rounded-full',
          enabled ? 'bg-green-400' : 'bg-red-400'
        )}
        onClick={() => {
          console.log('toggle')
          setEnabled(!enabled)
        }}
      >
        {enabled ? 'ON' : 'OFF'}
      </button>
      {enabled ? <DocumentEntitler {...props} /> : <DocumentEntitlerSkeleton {...props} />}
    </div>
  )
}

function ContextStatus() {
  const { useDocumentTitle, useDisableSRAnnounce } = useA11y()
  const title = useDocumentTitle()
  const disabledSRAnnounce = useDisableSRAnnounce()
  const showToast = useToast(TIMEOUT, [title])

  return (
    <div className="flex flex-col p-4 m-2 border rounded-xl border-sky-500 ring-1 ring-offset-2 ring-sky-500 ring-offset-sky-100">
      <span className="uppercase">Status</span>
      <span>
        Document Title: <span className="font-bold">{title}</span>
      </span>
      <span>
        Live region: <span className="font-bold">{disabledSRAnnounce ? 'off' : 'assertive'}</span>
      </span>
      <span>
        Live region content: <span className="font-bold">{!showToast ? '--' : title}</span>
      </span>
    </div>
  )
}

const DocTitle: FC = (): JSX.Element => {
  return (
    <AccessibilityProvider>
      <h2>DocTitle</h2>
      <p>Toggle the modals on / off to mount / unmount them and see the values change in the status panel.</p>
      <p>Document title changes with a delay of 500ms to avoid flickering.</p>
      <p>A live region wraps the SROnly title.</p>
      <p>Title in SROnly label is set to an empty string after {TIMEOUT}ms.</p>
      <AccessibleDocumentTitle />
      <ContextStatus />
      <div className="flex">
        <ToggleableDocumentEntitler title="First title" priority="page" initialState={true} />
        <ToggleableDocumentEntitler title="Second title" priority="modal" disableSRAnnounce initialState={false} />
        <ToggleableDocumentEntitler title="" priority="modal" disableSRAnnounce initialState={false} />
      </div>
    </AccessibilityProvider>
  )
}

export default DocTitle
