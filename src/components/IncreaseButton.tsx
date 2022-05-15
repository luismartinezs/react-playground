import React, { useContext } from "react";
import { CounterDispatchContext } from "@/context/counter";

const IncreaseButton = () => {
  const dispatch = useContext(CounterDispatchContext);

  return (
    <button className="button" onClick={() => dispatch({ type: "increment" })}>
      Increase
    </button>
  );
};

export default IncreaseButton;
