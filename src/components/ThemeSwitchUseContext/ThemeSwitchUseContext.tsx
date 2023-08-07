import { FC, useState, createContext, useContext } from 'react'

const ThemeContext = createContext<{
  checked: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}>({
  checked: true,
  onChange: () => null,
})

function ThemeSwitch() {
  const { checked, onChange } = useContext(ThemeContext)

  return (
    <div>
      <input
        type="checkbox"
        id="theme"
        name="theme"
        checked={checked}
        onChange={onChange}
        className="rounded-xl w-[100px] h-[50px]"
        aria-label="theme"
      />
    </div>
  )
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [checked, setChecked] = useState(false)

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setChecked(event.target.checked)
  }

  return (
    <ThemeContext.Provider
      value={{
        checked,
        onChange,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

function ThemeLabel() {
  const { checked } = useContext(ThemeContext)

  return <div className="uppercase text-3xl font-semibold">{checked ? 'light' : 'dark'}</div>
}

const ThemeSwitchUseContext: FC = (): JSX.Element => {
  return (
    <div>
      <h2>ThemeSwitchUseContext</h2>
      <p>Checkbox state controlled by useContext</p>
      <ThemeProvider>
        <ThemeSwitch />
        <ThemeLabel />
      </ThemeProvider>
    </div>
  )
}

export default ThemeSwitchUseContext
