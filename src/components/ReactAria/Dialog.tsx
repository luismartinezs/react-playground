import React from 'react'
import { useDialog } from 'react-aria'

function Dialog({ title, children, ...props }) {
  let ref = React.useRef<HTMLDivElement>(null!)
  let { dialogProps, titleProps } = useDialog(props, ref)

  return (
    <div {...dialogProps} ref={ref} style={{ padding: 30 }}>
      <h3 {...titleProps} style={{ marginTop: 0 }}>
        {title}
      </h3>
      {children}
    </div>
  )
}

const ReactAriaDialog = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div>
      <h2>Dialog</h2>
      {isOpen ? (
        <Dialog title="Dialog">
          <form style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="first-name">First Name:</label>
            <input id="first-name" />
            <label htmlFor="last-name">Last Name:</label>
            <input id="last-name" />
            <button className="mt-4 button" onClick={() => setIsOpen(false)}>
              Close dialog
            </button>
          </form>
        </Dialog>
      ) : (
        <button className="button" onClick={() => setIsOpen(true)}>
          Open Dialog
        </button>
      )}
    </div>
  )
}

export default ReactAriaDialog
