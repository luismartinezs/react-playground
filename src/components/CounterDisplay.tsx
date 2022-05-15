import React, { useContext } from "react";
import { CounterContext } from "@/context/counter";

const CounterDisplay = () => {
  const count = useContext(CounterContext);

  return <div className="counter">{count}</div>;
};

export default CounterDisplay;
