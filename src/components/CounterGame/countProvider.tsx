import React, { createContext, useReducer, useContext, type Dispatch } from 'react'

const CountContext = createContext<number>(null!)
const CountDispatchContext = createContext<Dispatch<IAction>>(null!)

const initialCount: number = 0

interface IAction {
  type: 'increment' | 'decrement'
}

function countReducer(count: typeof initialCount, action: IAction): typeof initialCount {
  switch (action.type) {
    case 'increment': {
      return count + 1
    }
    case 'decrement': {
      return count - 1
    }
    default: {
      throw new Error('Invalid action')
    }
  }
}

const CountProvider = ({ children }: { children: React.ReactNode }) => {
  const [count, dispatch] = useReducer(countReducer, initialCount)

  return (
    <CountContext.Provider value={count}>
      <CountDispatchContext.Provider value={dispatch}>{children}</CountDispatchContext.Provider>
    </CountContext.Provider>
  )
}

function useCount() {
  return useContext(CountContext)
}

function useCountDispatch() {
  return useContext(CountDispatchContext)
}

function useCountDecrement() {
  const dispatch = useCountDispatch()

  return () => dispatch({ type: 'decrement' })
}

function useCountIncrement() {
  const dispatch = useCountDispatch()

  return () => dispatch({ type: 'increment' })
}

export default CountProvider
export { CountContext, CountDispatchContext, useCount, useCountDispatch, useCountIncrement, useCountDecrement }
