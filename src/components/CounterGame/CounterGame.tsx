import { FC, useContext } from 'react'
import IncreaseButton from './IncreaseButton'
import DecreaseButton from './DecreaseButton'
import CounterDisplay from './CounterDisplay'
import { ThemeContext } from './themeContext'
import CountProvider from './countProvider'

const COUNTER_NUM = 5

const CounterGame = () => {
  const theme = useContext(ThemeContext)

  const counters = Array(COUNTER_NUM)
    .fill(null)
    .map((_, i) => <CounterDisplay key={i} />)

  return (
    <div className="flex flex-col space-y-2">
      <h2
        style={{
          backgroundColor: theme,
          color: 'white',
          padding: '8px 16px',
        }}
      >
        Counter game
      </h2>
      <p>Example of useContext (injection of static context) and useContext + useReducer to create a global store</p>
      <p>When the context value changes, only components that use it will rerender</p>
      <p>Theme value: {theme}</p>
      <div className="flex space-x-2">
        <IncreaseButton />
        <DecreaseButton />
      </div>
      <div className="flex space-x-2">{counters}</div>
    </div>
  )
}

export default () => (
  <ThemeContext.Provider value={'rgb(34 197 94)'}>
    <CountProvider>
      <CounterGame />
    </CountProvider>
  </ThemeContext.Provider>
)
