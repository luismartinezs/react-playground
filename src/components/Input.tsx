import React from "react";

const Input = () => {
  return (
    <>
      <label htmlFor="input">
        Input
        <input id="input" type="text" aria-describedby="descriptor" />
      </label>
      <div id="descriptor">Fill the input</div>
    </>
  );
};

export default Input;
