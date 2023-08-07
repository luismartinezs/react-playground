import { type FC, useReducer } from 'react'

const actions = {
  increment: 'INCREMENT',
  decrement: 'DECREMENT',
  reset: 'RESET',
} as const

type Action = {
  type: (typeof actions)[keyof typeof actions]
}

const initialState: number = 0

function counterReducer(state: typeof initialState, action: Action) {
  switch (action.type) {
    case actions.increment: {
      return state + 1
    }
    case actions.decrement: {
      return state - 1
    }
    case actions.reset: {
      return initialState
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const CounterUseReducer: FC = (): JSX.Element => {
  const [count, dispatch] = useReducer(counterReducer, initialState)

  function increment() {
    dispatch({
      type: actions.increment,
    })
  }

  function decrement() {
    dispatch({
      type: actions.decrement,
    })
  }

  function reset() {
    dispatch({
      type: actions.reset,
    })
  }

  return (
    <div>
      <h2>CounterUseReducer</h2>
      <div className="flex gap-2 mt-4">
        <button className="button" onClick={increment}>
          Increment
        </button>
        <button className="button" onClick={decrement}>
          Decrement
        </button>
        <button className="button" onClick={reset}>
          Reset
        </button>
      </div>
      <div className="mt-4 text-4xl font-bold px-4 py-2 bg-sky-50 max-w-min border border-sky-500 rounded-lg">
        {count}
      </div>
    </div>
  )
}

export default CounterUseReducer
