import React from "react";

import { MyContext } from "./Context";
import Child from "./Child";

const Parent = () => {
  return (
    <div>
      <MyContext.Provider value={10}>
        <Child />
      </MyContext.Provider>
    </div>
  );
};

export default Parent;
