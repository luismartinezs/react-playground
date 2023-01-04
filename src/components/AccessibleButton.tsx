import React from 'react'

type Props = {
  onClick: () => void
  ariaLabel?: string
  ariaPressed?: boolean
  ariaDisabled?: boolean
  tabIndex?: number
  title?: string
  children: React.ReactNode
  className?: string
}

function AccessibleButton(props: Props) {
  return (
    <button
      onClick={props.onClick}
      aria-label={props.ariaLabel}
      aria-pressed={props.ariaPressed}
      aria-disabled={props.ariaDisabled}
      role="button"
      tabIndex={props.tabIndex}
      title={props.title}
      className={props.className || 'button'}
    >
      {props.children}
    </button>
  )
}

export default AccessibleButton
