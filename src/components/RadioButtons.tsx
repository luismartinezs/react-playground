import React from "react";

const RadioButtons = () => {
  return (
    <>
      <h2>Radio buttons</h2>
      {/* default usage */}
      <fieldset>
        <legend>Choose your favorite color</legend>
        <input type="radio" id="red" name="color" value="red" />
        <label htmlFor="red">Red</label>
        <input type="radio" id="green" name="color" value="green" />
        <label htmlFor="green">Green</label>
        <input type="radio" id="blue" name="color" value="blue" />
        <label htmlFor="blue">Blue</label>
      </fieldset>
      {/* doesn't work */}
      <span id="legend">Choose your favorite animal</span>
      <fieldset>
        <legend aria-describedby="legend" aria-label=""></legend>
        <input type="radio" id="dog" name="animal" value="dog" />
        <label htmlFor="dog">Dog</label>
        <input type="radio" id="cat" name="animal" value="cat" />
        <label htmlFor="cat">Cat</label>
        <input type="radio" id="bird" name="animal" value="bird" />
        <label htmlFor="bird">Bird</label>
      </fieldset>
      {/* Works! */}
      <fieldset>
        <legend aria-label="Choose your favorite food"></legend>
        <input type="radio" id="pizza" name="food" value="pizza" />
        <label htmlFor="pizza">Pizza</label>
        <input type="radio" id="burger" name="food" value="burger" />
        <label htmlFor="burger">Burger</label>
        <input type="radio" id="salad" name="food" value="salad" />
        <label htmlFor="salad">Salad</label>
      </fieldset>
    </>
  );
};

export default RadioButtons;
