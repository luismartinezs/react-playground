import React from "react";

import { MyContextProvider } from "./Context";
import Child from "./Child";

const Parent = () => {
  return (
    <div>
      <MyContextProvider>
        <Child />
      </MyContextProvider>
    </div>
  );
};

export default Parent;
