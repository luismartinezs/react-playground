import { FC, useRef, useState } from 'react'

const FocusUseRef: FC = (): JSX.Element => {
  const [text, setText] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  function handleClick() {
    setText('')
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }
  return (
    <div>
      <h2>FocusUseRef</h2>
      <div className="flex flex-col gap-2">
        <label>
          Type something
          <input ref={inputRef} className="ml-2 input" value={text} onChange={(e) => setText(e.target.value)} />
        </label>
        <button className="button max-w-min text-xl" onClick={handleClick}>
          Reset
        </button>
      </div>
    </div>
  )
}

export default FocusUseRef
