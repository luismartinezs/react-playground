import { useState, ReactElement, ComponentProps, KeyboardEvent } from 'react'
import classnames from 'classnames'

import TabButton from './TabButton'

type OnKeyDown = (e: KeyboardEvent) => void

export function handleButtonKeyDown(e: KeyboardEvent, onKeyDown: OnKeyDown, allowBubbling = false) {
  if (e.target !== e.currentTarget && !allowBubbling) {
    return
  }

  if (e.key === 'Enter' || e.key === ' ') {
    onKeyDown(e)
  }
}

type Props = {
  /** Should be <TabButton /> */
  children: ReactElement<ComponentProps<typeof TabButton>>[]
  initialTabIndex?: number
  className?: string
  onSelect?: (tabIndex: number) => void
  marginBottom?: boolean
  // DSP-34 to make label required
  ariaLabel?: string
}

/** Renders a row of "tabs" */
function TabRow({ children, initialTabIndex = 0, className, onSelect, marginBottom, ariaLabel }: Props) {
  const [tabIndex, setTabIndex] = useState(initialTabIndex)
  const tabList = classnames('flex gap-4', { ['mb-4']: marginBottom })
  return (
    <div className={className}>
      <div role="tablist" className={tabList} aria-label={ariaLabel}>
        {children.map(({ props }, index) => {
          const onClick = () => {
            setTabIndex(index)
            onSelect?.(index)
          }
          return (
            <button
              type="button"
              role="tab"
              key={index}
              onKeyDown={(e) => {
                handleButtonKeyDown(e, onClick)
              }}
              onClick={onClick}
              className={classnames('bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600', {
                selected: index === tabIndex,
              })}
              aria-selected={index === tabIndex}
            >
              {props.title}
            </button>
          )
        })}
      </div>
      {children[tabIndex].props.content}
    </div>
  )
}

export default TabRow
