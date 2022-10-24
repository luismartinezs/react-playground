import React, { useReducer } from "react";
import CounterGame from "@/components/CounterGame";
import ThemeSelector from "@/components/ThemeSelector";
import { ThemeContext } from "@/context/theme";
import { countReducer, initialState } from "@/store/counter";
import CountProvider from "@/providers/count";
import TheThing from "@/components/TheThing";
import ScrollToMe from "@/components/ScrollToMe";
import SwApi from "@/components/SwApi";
import MapTest from "@/components/MapTest";
import TransformEffect from "@/components/TransformEffect";
import LiveAnnouncer from "@/components/Announcer";


function App(): JSX.Element {
  const [count, dispatch] = useReducer(countReducer, initialState);

  return (
    <>
      <ThemeSelector />
      <LiveAnnouncer />
      <ThemeContext.Provider value={"green"}>
        <CountProvider>
          <CounterGame />
        </CountProvider>
      </ThemeContext.Provider>
      <TransformEffect />
      <TheThing />
      <SwApi />
      <MapTest />
      <div className="h-80"></div>
      <ScrollToMe />
    </>
  );
}

export default App;
