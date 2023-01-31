import React, { createContext, useContext, useState } from 'react'

const RadioGroupContext = createContext<{
  value: string | null
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  name: string
  setName: (name: string) => void
}>({
  value: null,
  onChange: () => {},
  name: '',
  setName: () => {},
})

function RadioGroupProvider({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useState<string | null>(null)
  const [name, setName] = useState<string>('')

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
  }

  return <RadioGroupContext.Provider value={{ value, onChange, setName, name }}>{children}</RadioGroupContext.Provider>
}

function useRadioGroupContext() {
  const ctx = useContext(RadioGroupContext)
  if (ctx === undefined) {
    throw new Error('useRadioGroupContext must be used within a RadioGroupProvider')
  }
  return ctx
}

function RadioGroup({ legend, name, children }: { legend: string; name: string; children: React.ReactNode }) {
  const ctx = useRadioGroupContext()
  ctx.setName(name)
  return (
    <fieldset>
      <legend>{legend}</legend>
      {children}
    </fieldset>
  )
}

function RadioButton({ value, label }: { value: string; label: string }) {
  const ctx = useRadioGroupContext()

  return (
    <>
      <input
        type="radio"
        id={value}
        name={ctx.name}
        value={value}
        checked={value === ctx.value}
        onChange={ctx.onChange}
      />
      <label htmlFor={value} className="ml-2">
        {label}
      </label>
    </>
  )
}

const App = () => {
  return (
    <RadioGroupProvider>
      <RadioGroup legend="Choose your favorite flavor" name="flavor">
        <RadioButton value="vanilla" label="Vanilla" />
        <RadioButton value="chocolate" label="Chocolate" />
        <RadioButton value="strawberry" label="Strawberry" />
      </RadioGroup>
    </RadioGroupProvider>
  )
}

export default App
