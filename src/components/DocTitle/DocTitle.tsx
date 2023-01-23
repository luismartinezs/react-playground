import { FC, useEffect, useState } from 'react'
import classnames from 'classnames'

import { useFlicker, SRFlicker } from './util'

import SROnly, { useToast } from '@/components/SROnly'

import { AccessibilityProvider, useA11y } from './provider'
import type { DocumentTitleOptions } from './types'

const TIMEOUT = 3_000

const liveRegion = (disabledSRAnnounce: boolean) => (disabledSRAnnounce ? 'off' : 'assertive')

const liveRegionContent = (showToast: boolean, title: string) => (!showToast ? '--' : title)

const toastDeps = (title: string, disableSRAnnounce: boolean) => [title, disableSRAnnounce]

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

function DocumentTitle() {
  const { useDocumentTitle, useDisableSRAnnounce, useSRFlicker } = useA11y()
  const title = useDocumentTitle()
  const disabledSRAnnounce = useDisableSRAnnounce()
  useUpdateDocumentTitle(title)
  const srFlicker = useSRFlicker()
  const showToast = useToast(TIMEOUT, toastDeps(title, disabledSRAnnounce))

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

  return (
    <SROnly>
      <SRFlicker condition={srFlicker}>{liveRegionContent(showToast, title)}</SRFlicker>
    </SROnly>
  )
}

function AccessibleDocumentTitle() {
  const { useDisableSRAnnounce } = useA11y()
  const disabledSRAnnounce = useDisableSRAnnounce()

  useEffect(() => {
    console.debug(`aria-live=${disabledSRAnnounce ? 'off' : 'assertive'}`)
  }, [disabledSRAnnounce])

  return (
    <span aria-live={liveRegion(disabledSRAnnounce)}>
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
      <span>
        SR Flicker: <span className="font-bold">{props.srFlicker ? 'true' : 'false'}</span>
      </span>
    </div>
  )
}

function DocumentEntitler(props: DocumentTitleOptions) {
  useA11y().useDocumentEntitler({
    priority: props.priority || 'page',
    title: props.title,
    disableSRAnnounce: props.disableSRAnnounce,
    srFlicker: props.srFlicker,
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
  const { useDocumentTitle, useDisableSRAnnounce, useSRFlicker } = useA11y()
  const title = useDocumentTitle()
  const disabledSRAnnounce = useDisableSRAnnounce()
  const showToast = useToast(TIMEOUT, toastDeps(title, disabledSRAnnounce))
  const srFlicker = useSRFlicker()
  const flicker = useFlicker(srFlicker)

  return (
    <div className="flex flex-col p-4 m-2 border rounded-xl border-sky-500 ring-1 ring-offset-2 ring-sky-500 ring-offset-sky-100">
      <span className="uppercase">Status</span>
      <span>
        Document Title: <span className="font-bold">{title}</span>
      </span>
      <span>
        Live region aria-live: <span className="font-bold">{liveRegion(disabledSRAnnounce)}</span>
      </span>
      <span>
        Live region aria-hidden: <span className="font-bold">{flicker ? 'true' : 'false'}</span>
      </span>
      <span>
        Live region content: <span className="font-bold">{liveRegionContent(showToast, title)}</span>
      </span>
    </div>
  )
}

const DocTitle: FC = (): JSX.Element => {
  return (
    <AccessibilityProvider>
      <h2>DocTitle</h2>
      <p>Toggle the modals on / off to mount / unmount them and see the values change in the status panel.</p>
      <p>Document title changes with a delay of 500ms to avoid quick successive title changes.</p>
      <p>A live region wraps the SROnly title, which can be toggled off.</p>
      <p>Title in SROnly label is set to an empty string after {TIMEOUT}ms.</p>
      <p>Live region content SR visibility can be "flickered" to force the SR to read the contents</p>
      <AccessibleDocumentTitle />
      <ContextStatus />
      <div className="flex">
        <ToggleableDocumentEntitler title="First title" priority="page" initialState={true} />
        <ToggleableDocumentEntitler title="Second title" priority="modal" disableSRAnnounce initialState={false} />
        <ToggleableDocumentEntitler title="" priority="modal" disableSRAnnounce initialState={false} />
        <ToggleableDocumentEntitler title="" priority="modal" disableSRAnnounce srFlicker initialState={false} />
      </div>
    </AccessibilityProvider>
  )
}

export default DocTitle
export {
  useUpdateDocumentTitle,
  AccessibilityProvider,
  DocumentTitle,
  AccessibleDocumentTitle,
  DocumentEntitler,
  DocumentEntitlerSkeleton,
  ToggleableDocumentEntitler,
  ContextStatus,
  DocTitle,
}
