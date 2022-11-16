import React from "react";

const AriaDescribedby = () => {
  return (
    <>
      <h2>AriaDescribedby</h2>
      <div>
        <label htmlFor="input">My input</label>
        <input id="input" type="text" aria-describedby="my-description" />
        <p id="my-description">This is an input description</p>
      </div>
      <div>
        <button type="button" className="button" aria-describedby="my-button">
          My button
        </button>
        <p id="my-button">This is a button description</p>
      </div>
    </>
  );
};

export default AriaDescribedby;
