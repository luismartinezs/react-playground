import { FC, useEffect } from 'react'

import SROnly from '@/components/SROnly'

import { debug, useDebug, useToggle } from './util'
import { AccessibilityProvider, useA11y } from './provider'
import type { DocumentTitleOptions, Priority } from './types'
import { TITLE_LIVE_REGION_TIMEOUT } from './constants'
import { Button, Card } from './dumb'

function useSetDocumentTitle(title: string) {
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

function AnnouncedTitle() {
  const { useAnnouncedTitle } = useA11y()
  const announcedTitle = useAnnouncedTitle()

  return <>{announcedTitle}</>
}

function DocumentTitle() {
  const { useDocumentTitle } = useA11y()
  const documentTitle = useDocumentTitle()
  useSetDocumentTitle(documentTitle)

  return (
    <SROnly>
      <AnnouncedTitle />
    </SROnly>
  )
}

function AccessibleDocumentTitle() {
  return (
    <span role="alert" aria-live="assertive">
      <DocumentTitle />
    </span>
  )
}

function DocTitleCard(props: DocumentTitleOptions & { muted?: boolean }) {
  return (
    <Card muted={props.muted}>
      <span className="uppercase">Entitler</span>
      <span className="whitespace-nowrap">
        Title: <span className="font-bold">{props.title}</span>
      </span>
      <span className="whitespace-nowrap">
        Priority: <span className="font-bold">{props.priority || 'page'}</span>
      </span>
      <span className="whitespace-nowrap">
        Disable SR: <span className="font-bold">{props.disableAnnounceTitle ? 'true' : 'false'}</span>
      </span>
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
      <Button
        onClick={() => {
          toggle()
        }}
        enabled={enabled}
      />
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
        Title: <span className="font-bold">{title}</span>
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
      <Button
        onClick={() => {
          toggle()
        }}
        enabled={enabled}
      />
      {enabled ? <DocumentUpdater {...props} /> : <DocumentUpdaterStatic {...props} muted={true} />}
    </div>
  )
}

function ToggleableAnnounceTitleDisabler({ initialState }: { initialState?: boolean }) {
  const [enabled, toggle] = useToggle(initialState)

  return (
    <div className="relative">
      <Button
        onClick={() => {
          toggle()
        }}
        enabled={enabled}
      />
      {enabled ? <DocumentTitleDisabler /> : <DocumentTitleDisablerStatic muted={true} />}
    </div>
  )
}

function ContextStatus() {
  const { useDocumentTitle } = useA11y()
  const documentTitle = useDocumentTitle()

  // it's very strange but if this component tries to use the announced title, it won't work, it might have to do with rerenders, but I don't know

  return (
    <div className="flex flex-col p-4 m-2 border rounded-xl border-sky-500 ring-1 ring-offset-2 ring-sky-500 ring-offset-sky-100">
      <span className="uppercase">Status</span>
      <span>
        Document Title: <span className="font-bold">{documentTitle}</span>
      </span>
      <span>
        Live region content: <span className="font-bold">{<AnnouncedTitle />}</span>
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
      <p>An alert live region wraps the SROnly title.</p>
      <p>
        Title in SROnly label is set to an empty string after {TITLE_LIVE_REGION_TIMEOUT}ms, so that user navigating
        with SR doesn't read it.
      </p>
      <AccessibleDocumentTitle />
      <ContextStatus />
      <div className="flex flex-wrap">
        <ToggleableDocumentEntitler title="First title" priority="page" initialState={true} />
        <ToggleableDocumentEntitler title="Second title" priority="modal" disableAnnounceTitle initialState={false} />
        <ToggleableDocumentEntitler title="Third title" priority="modal" initialState={false} />
        <ToggleableDocumentEntitler title="" priority="modal" disableAnnounceTitle initialState={false} />
        <ToggleableUpdateDocumentTitle title="Updated title" priority="modal" initialState={false} />
        <ToggleableAnnounceTitleDisabler initialState={true} />
      </div>
    </AccessibilityProvider>
  )
}

export default DocTitle
export {
  useSetDocumentTitle as useUpdateDocumentTitle,
  AccessibilityProvider,
  DocumentTitle,
  AccessibleDocumentTitle,
  DocumentEntitler,
  DocumentEntitlerSkeleton,
  ToggleableDocumentEntitler,
  ContextStatus,
  DocTitle,
}
