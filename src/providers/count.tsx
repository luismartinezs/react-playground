import React, { createContext, useReducer, useContext } from "react";

const CountContext = createContext(null);
const CountDispatchContext = createContext(null);

const initialCount: number = 0;

interface IAction {
  type: "increment" | "decrement";
}

function countReducer(
  count: typeof initialCount,
  action: IAction
): typeof initialCount {
  switch (action.type) {
    case "increment": {
      return count + 1;
    }
    case "decrement": {
      return count - 1;
    }
    default: {
      throw new Error("Invalid action");
    }
  }
}

const CountProvider = ({ children }) => {
  const [count, dispatch] = useReducer(countReducer, initialCount);

  return (
    <CountContext.Provider value={count}>
      <CountDispatchContext.Provider value={dispatch}>
        {children}
      </CountDispatchContext.Provider>
    </CountContext.Provider>
  );
};

function useCount() {
  return useContext(CountContext);
}

function useCountDispatch() {
  return useContext(CountDispatchContext);
}

export default CountProvider;
export { CountContext, CountDispatchContext, useCount, useCountDispatch };
