import React, { useContext } from "react";
import { CounterDispatchContext } from "@/context/counter";

const DecreaseButton = () => {
  const dispatch = useContext(CounterDispatchContext);

  return (
    <button className="button" onClick={() => dispatch({ type: "decrement" })}>
      Decrease
    </button>
  );
};

export default DecreaseButton;
