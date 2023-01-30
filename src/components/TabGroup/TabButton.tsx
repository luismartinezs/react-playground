import type { ReactNode } from 'react'

type Props = {
  title: ReactNode
  content?: ReactNode
  automationId?: string
}

/**
 * A functional component to simply control what props we can pass into a tab button
 * and to pass off its props to the <TabRow> component.
 */
function TabButton(props: Props) {
  return <>{props.title}</> // Never rendered...
}

export default TabButton
