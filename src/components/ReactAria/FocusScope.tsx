import React from 'react'
import { FocusScope } from 'react-aria'

function Example() {
  const [isOpen, setOpen] = React.useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      {isOpen && (
        <FocusScope contain restoreFocus autoFocus>
          <div className="p-2 m-2 border border-sky-500">
            <p>The text here is not selectable</p>
            <p>
              Sint sit duis ullamco minim anim ullamco dolore labore officia sint enim. Et irure non excepteur ipsum
              enim incididunt exercitation mollit cupidatat. Minim consequat esse ex qui voluptate commodo exercitation
              esse non quis sunt exercitation est. Ullamco ex esse occaecat elit voluptate cillum esse excepteur dolore.
              Anim cupidatat culpa ipsum in amet eu in sit labore mollit sint in laborum. Cupidatat non ad non cillum
              irure ullamco. Ea proident ullamco anim nostrud ea adipisicing non.
            </p>
            <label htmlFor="first-input">First Input</label>
            <input id="first-input" />
            <label htmlFor="second-input">Second Input</label>
            <input id="second-input" />
            <button onClick={() => setOpen(false)}>Close</button>
          </div>
        </FocusScope>
      )}
    </>
  )
}

const FocusScopeTest = () => {
  return (
    <div>
      <h2>FocusScope</h2>
      <Example />
    </div>
  )
}

export default FocusScopeTest
