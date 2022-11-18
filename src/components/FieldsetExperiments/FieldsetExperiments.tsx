import React from "react";

const FieldsetExperiments = () => {
  return (
    <>
      <h2>FieldsetExperiments</h2>
      <p>
        Fieldset with role="radio", announced exactly the same as native radio
        inputs
      </p>
      <fieldset>
        <legend>Ipsum and lorem?</legend>
        <div className="focus-within:font-bold">
          <span
            role="radio"
            aria-checked="false"
            tabIndex={0}
            aria-labelledby="q25_radio1-label"
            data-value="True"
          ></span>
          <label id="q25_radio1-label">True</label>
        </div>
        <div className="focus-within:font-bold">
          <span
            role="radio"
            aria-checked="false"
            tabIndex={0}
            aria-labelledby="q25_radio2-label"
            data-value="False"
          ></span>
          <label id="q25_radio2-label">False</label>
        </div>
        <div className="focus-within:font-bold">
          <span
            role="radio"
            aria-checked="true"
            tabIndex={0}
            aria-labelledby="q25_radio3-label"
            data-value="huh?"
          ></span>
          <label id="q25_radio3-label">What is the question?</label>
        </div>
      </fieldset>
    </>
  );
};

export default FieldsetExperiments;
