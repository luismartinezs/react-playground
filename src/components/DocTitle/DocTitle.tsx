import { FC, useEffect, useState } from 'react'
import classnames from 'classnames'

import SROnly, { useToast } from '@/components/SROnly'

import { useFlicker, SRFlicker, debug, useToggle } from './util'
import { AccessibilityProvider, useA11y } from './provider'
import type { DocumentTitleOptions, Priority } from './types'
import { TITLE_LIVE_REGION_TIMEOUT } from './constants'

const useDebug = (args: unknown[], deps: unknown[]) => {
  useEffect(() => {
    debug(...args)
  }, deps)
}

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
  const { useDocumentTitle, useDisableAnnounceTitle, useAnnounceTitleEvent } = useA11y()
  const documentTitle = useDocumentTitle()
  const disableAnnounceTitle = useDisableAnnounceTitle()
  useUpdateDocumentTitle(documentTitle)
  const announceTitleEvent = useAnnounceTitleEvent()
  const showToast = useToast(TITLE_LIVE_REGION_TIMEOUT, toastDeps(documentTitle, disableAnnounceTitle))

  useDebug(['Sanity', 'check'], [])
  useDebug(['====> title changed', documentTitle], [documentTitle])
  useDebug(['====> disabledSRAnnounce changed', disableAnnounceTitle], [disableAnnounceTitle])
  useDebug(
    [`<SROnlyToast>${disableAnnounceTitle ? '' : documentTitle}</SROnlyToast>`],
    [documentTitle, disableAnnounceTitle]
  )

  return (
    <SROnly>
      <SRFlicker condition={announceTitleEvent}>{liveRegionContent(showToast, documentTitle)}</SRFlicker>
    </SROnly>
  )
}

function AccessibleDocumentTitle() {
  const { useDisableAnnounceTitle } = useA11y()
  const disableAnnounceTitle = useDisableAnnounceTitle()

  useDebug([`aria-live=${disableAnnounceTitle ? 'off' : 'assertive'}`], [disableAnnounceTitle])

  return (
    <span aria-live={liveRegion(disableAnnounceTitle)}>
      <DocumentTitle />
    </span>
  )
}

function Card({ children, muted = false }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <div
      className={classnames(
        'flex flex-col p-4 m-2 border rounded-xl border-sky-500',
        muted && 'text-zinc-500 border-zinc-400'
      )}
    >
      {children}
    </div>
  )
}

function DocTitleCard(props: DocumentTitleOptions & { muted?: boolean }) {
  return (
    <Card muted={props.muted}>
      <span className="uppercase">Entitler</span>
      <span className="whitespace-nowrap">
        Title: <span className="font-bold">{props.title || '--'}</span>
      </span>
      <span className="whitespace-nowrap">
        Priority: <span className="font-bold">{props.priority || 'page'}</span>
      </span>
      <span className="whitespace-nowrap">
        Disable SR: <span className="font-bold">{props.disableAnnounceTitle ? 'true' : 'false'}</span>
      </span>
      <span className="whitespace-nowrap">
        @unmount: <span className="font-bold">{props.announceTitleOnUnmount ? 'true' : 'false'}</span>
      </span>
    </Card>
  )
}

function AnnounceTitleOnUnmount() {
  const { useAnnounceTitleOnUnmount } = useA11y()
  useAnnounceTitleOnUnmount()

  return (
    <Card>
      <span className="uppercase">Toggler</span>
      <span>Announce title on unmount</span>
    </Card>
  )
}

function DocumentTitleUpdater() {
  const { useUpdateDocumentTitle } = useA11y()
  useUpdateDocumentTitle({
    priority: 'modal',
    title: 'Document title updated',
  })

  return (
    <Card>
      <span className="uppercase">Toggler</span>
      <span>Document title updater</span>
    </Card>
  )
}

function DocumentTitleDisablerStatic({ muted = false }: { muted?: boolean }) {
  return (
    <Card muted={muted}>
      <span className="uppercase">Toggler</span>
      <span>Document title disabler</span>
    </Card>
  )
}

function DocumentTitleDisabler() {
  const { useAnnounceTitleDisabler } = useA11y()
  useAnnounceTitleDisabler()

  return <DocumentTitleDisablerStatic />
}

function DocumentEntitler(props: DocumentTitleOptions) {
  useA11y().useDocumentEntitler({
    priority: props.priority || 'page',
    title: props.title,
    disableAnnounceTitle: props.disableAnnounceTitle,
    announceTitleOnUnmount: props.announceTitleOnUnmount,
  })

  return <DocTitleCard {...props} />
}

function DocumentEntitlerSkeleton(props: DocumentTitleOptions) {
  return <DocTitleCard {...props} muted />
}

function ToggleableDocumentEntitler(props: DocumentTitleOptions & { initialState?: boolean }) {
  const [enabled, toggle] = useToggle(props.initialState)

  return (
    <div className="relative">
      <button
        className={classnames(
          'absolute top-1 right-1 p-2 m-2 text-sm font-bold text-white rounded-full',
          enabled ? 'bg-green-400' : 'bg-red-400'
        )}
        onClick={() => {
          console.log('toggle')
          toggle()
        }}
      >
        {enabled ? 'ON' : 'OFF'}
      </button>
      {enabled ? <DocumentEntitler {...props} /> : <DocumentEntitlerSkeleton {...props} />}
    </div>
  )
}

function DocumentUpdaterStatic({
  muted = false,
  title,
  priority,
}: {
  title: string
  priority?: Priority
  muted?: boolean
}) {
  return (
    <Card muted={muted}>
      <span className="uppercase">Updater</span>
      <span className="whitespace-nowrap">
        Title: <span className="font-bold">{title || '--'}</span>
      </span>
      <span className="whitespace-nowrap">
        Priority: <span className="font-bold">{priority || 'page'}</span>
      </span>
    </Card>
  )
}

function DocumentUpdater(props: { title: string; priority?: Priority }) {
  useA11y().useUpdateDocumentTitle({
    priority: props.priority || 'page',
    title: props.title,
  })

  return <DocumentUpdaterStatic priority={props.priority || 'page'} title={props.title} />
}

function ToggleableUpdateDocumentTitle(props: { title: string; priority?: Priority; initialState?: boolean }) {
  const [enabled, toggle] = useToggle(props.initialState)

  return (
    <div className="relative">
      <button
        className={classnames(
          'absolute top-1 right-1 p-2 m-2 text-sm font-bold text-white rounded-full',
          enabled ? 'bg-green-400' : 'bg-red-400'
        )}
        onClick={() => {
          console.log('toggle')
          toggle()
        }}
      >
        {enabled ? 'ON' : 'OFF'}
      </button>
      {enabled ? <DocumentUpdater {...props} /> : <DocumentUpdaterStatic {...props} muted={true} />}
    </div>
  )
}

function ToggleableAnnounceTitleDisabler({ initialState }: { initialState?: boolean }) {
  const [enabled, toggle] = useToggle(initialState)

  return (
    <div className="relative">
      <button
        className={classnames(
          'absolute top-1 right-1 p-2 m-2 text-sm font-bold text-white rounded-full',
          enabled ? 'bg-green-400' : 'bg-red-400'
        )}
        onClick={() => {
          console.log('toggle')
          toggle()
        }}
      >
        {enabled ? 'ON' : 'OFF'}
      </button>
      {enabled ? <DocumentTitleDisabler /> : <DocumentTitleDisablerStatic muted={true} />}
    </div>
  )
}

function ContextStatus() {
  const { useDocumentTitle, useDisableAnnounceTitle, useAnnounceTitleEvent } = useA11y()
  const title = useDocumentTitle()
  const disableAnnounceTitle = useDisableAnnounceTitle()
  const showToast = useToast(TITLE_LIVE_REGION_TIMEOUT, toastDeps(title, disableAnnounceTitle))
  const announceTitleEvent = useAnnounceTitleEvent()
  const announceTitleFlicker = useFlicker(announceTitleEvent)

  return (
    <div className="flex flex-col p-4 m-2 border rounded-xl border-sky-500 ring-1 ring-offset-2 ring-sky-500 ring-offset-sky-100">
      <span className="uppercase">Status</span>
      <span>
        Document Title: <span className="font-bold">{title}</span>
      </span>
      <span>
        Live region aria-live: <span className="font-bold">{liveRegion(disableAnnounceTitle)}</span>
      </span>
      <span>
        Live region aria-hidden: <span className="font-bold">{announceTitleFlicker ? 'true' : 'false'}</span>
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
      <p>Title in SROnly label is set to an empty string after {TITLE_LIVE_REGION_TIMEOUT}ms.</p>
      <p>Live region content SR visibility can be "flickered" to force the SR to read the contents</p>
      <AccessibleDocumentTitle />
      <ContextStatus />
      <div className="flex flex-wrap">
        <ToggleableDocumentEntitler title="First title" priority="page" initialState={true} />
        <ToggleableDocumentEntitler title="Second title" priority="modal" disableAnnounceTitle initialState={false} />
        <ToggleableDocumentEntitler title="" priority="modal" disableAnnounceTitle initialState={false} />
        <ToggleableDocumentEntitler
          title=""
          priority="modal"
          disableAnnounceTitle
          announceTitleOnUnmount
          initialState={false}
        />
        <ToggleableUpdateDocumentTitle title="Updated title" priority="modal" initialState={false} />
        <ToggleableAnnounceTitleDisabler initialState={false} />
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
