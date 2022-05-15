import React, { useReducer } from "react";
import CounterGame from "@/components/CounterGame";
import ThemeSelector from "@/components/ThemeSelector";
import { ThemeContext } from "@/context/theme";
import { countReducer, initialState } from "@/store/counter";
import CountProvider from "@/providers/count";

function App(): JSX.Element {
  const [count, dispatch] = useReducer(countReducer, initialState);

  return (
    <>
      <ThemeSelector />
      <ThemeContext.Provider value={"green"}>
        <CountProvider>
          <CounterGame />
        </CountProvider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
