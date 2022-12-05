import React, { useContext } from "react";
import { MyContext } from "./Context";

const Child = () => {
  const value = useContext(MyContext);
  return <div>Value from context: {value}</div>;
};

export default Child;
