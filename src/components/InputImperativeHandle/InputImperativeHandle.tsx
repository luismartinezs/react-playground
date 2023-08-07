import { FC, forwardRef, useImperativeHandle, useRef, useState } from 'react'

type InputRef = {
  focusInput: () => void
}

const CustomInput = forwardRef<
  InputRef,
  {
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  }
>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(
    ref,
    () => {
      return {
        focusInput() {
          inputRef.current?.focus()
        },
      }
    },
    []
  )

  return (
    <>
      <input type="text" className="input" value={props.value} onChange={props.onChange} ref={inputRef} />
    </>
  )
})

const InputImperativeHandle: FC = (): JSX.Element => {
  const [text, setText] = useState('')
  const inputRef = useRef<{
    focusInput: () => void
  }>(null)

  return (
    <div>
      <h2>InputImperativeHandle</h2>
      <CustomInput ref={inputRef} value={text} onChange={(e) => setText(e.target.value)} />
      <button
        className="button ml-2"
        onClick={() => {
          setText('')
          inputRef.current?.focusInput()
        }}
      >
        Clear Input
      </button>
    </div>
  )
}

export default InputImperativeHandle
