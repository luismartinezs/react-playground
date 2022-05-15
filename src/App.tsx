import React, { useReducer } from "react";
import CounterGame from "@/components/CounterGame";
import ThemeSelector from "@/components/ThemeSelector";
import { ThemeContext } from "@/context/theme";
import { CounterContext, CounterDispatchContext } from "@/context/counter";
import { countReducer, initialState } from "@/store/counter";

function App(): JSX.Element {
  const [count, dispatch] = useReducer(countReducer, initialState);

  return (
    <>
      <ThemeSelector />
      <ThemeContext.Provider value={"green"}>
        <CounterContext.Provider value={count}>
          <CounterDispatchContext.Provider value={dispatch}>
            <CounterGame />
          </CounterDispatchContext.Provider>
        </CounterContext.Provider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
