import React, { useReducer } from "react";
import CounterGame from "@/components/CounterGame";
import ThemeSelector from "@/components/ThemeSelector";
import { ThemeContext } from "@/context/theme";
import { countReducer, initialState } from "@/store/counter";
import CountProvider from "@/providers/count";
import TheThing from '@/components/TheThing'
import ScrollToMe from '@/components/ScrollToMe'
import SwApi from '@/components/SwApi'

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
      <TheThing />
      <SwApi />
      <div className="h-80"></div>
      <ScrollToMe />
    </>
  );
}

export default App;
