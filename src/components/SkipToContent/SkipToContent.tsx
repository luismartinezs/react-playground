import React from 'react'
import Styles from './skipToContent.module.scss'

type Props = {
  mainContentRef: React.MutableRefObject<HTMLElement | null>
}

const SkipToContent: React.FC<Props> = ({ mainContentRef }) => {
  const handleClick = () => {
    if (mainContentRef.current) {
      mainContentRef.current.focus()
    }
  }

  return (
    <>
      <button className={Styles.skipToContent} aria-label="Skip to main content" onClick={handleClick}>
        Skip to Content
      </button>
    </>
  )
}

export default SkipToContent
