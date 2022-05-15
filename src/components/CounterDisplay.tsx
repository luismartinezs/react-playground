import React from "react";
import { useCount } from "@/providers/count";

const CounterDisplay = () => {
  const count = useCount();

  return <div className="counter">{count}</div>;
};

export default CounterDisplay;
