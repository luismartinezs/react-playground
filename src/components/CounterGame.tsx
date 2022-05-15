import React, { useReducer, useContext } from "react";
import IncreaseButton from "@/components/IncreaseButton";
import DecreaseButton from "@/components/DecreaseButton";
import CounterDisplay from "@/components/CounterDisplay";
import { countReducer, initialState } from "@/store/counter";
import { ThemeContext } from "@/context/theme";

const COUNTER_NUM = 3;

const CounterGame = () => {
  const theme = useContext(ThemeContext);

  const counters = Array(COUNTER_NUM)
    .fill(null)
    .map((_, i) => <CounterDisplay key={i} />);

  return (
    <div className="flex flex-col space-y-2">
      <h2 className="text-3xl">Counter game ({theme})</h2>
      <div className="flex space-x-2">
        <IncreaseButton />
        <DecreaseButton />
      </div>
      <div className="flex space-x-2">{counters}</div>
    </div>
  );
};

export default CounterGame;
