import React, { useContext } from "react";
import { useCountDispatch } from "@/providers/count";

const DecreaseButton = () => {
  const dispatch = useCountDispatch();

  return (
    <button className="button" onClick={() => dispatch({ type: "decrement" })}>
      Decrease
    </button>
  );
};

export default DecreaseButton;
