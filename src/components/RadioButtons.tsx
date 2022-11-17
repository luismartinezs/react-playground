import React from "react";

const RadioButtons = () => {
  return (
    <>
      <h2>Radio buttons</h2>
      <fieldset>
        <legend>Choose your favorite color</legend>
        <input type="radio" id="red" name="color" value="red" />
        <label htmlFor="red">Red</label>
        <input type="radio" id="green" name="color" value="green" />
        <label htmlFor="green">Green</label>
        <input type="radio" id="blue" name="color" value="blue" />
        <label htmlFor="blue">Blue</label>
      </fieldset>
    </>
  );
};

export default RadioButtons;
