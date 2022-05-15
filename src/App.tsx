import React from "react";
import CounterGame from "@/components/CounterGame";
import ThemeSelector from "@/components/ThemeSelector";
import { ThemeContext } from "@/context/theme";

function App(): JSX.Element {
  return (
    <>
      <ThemeSelector />
      <ThemeContext.Provider value={"green"}>
        <CounterGame />
      </ThemeContext.Provider>
    </>
  );
}

export default App;
