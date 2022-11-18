import React from "react";

type Props = {
  id: string;
  label: string;
  value: string;
};

const RadioRole = ({ id, label, value }: Props) => {
  return (
    <div className="flex items-center justify-center mb-1 border w-14 border-sky-500 focus-within:bg-sky-500 focus-within:border-sky-700 focus-within:text-white">
      <span
        role="radio"
        aria-checked="false"
        tabIndex={0}
        aria-labelledby={id}
        data-value={value}
      ></span>
      <label id={id}>{label}</label>
    </div>
  );
};

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
        <RadioRole id="q25_radio1" label="True" value="True" />
        <RadioRole id="q25_radio2" label="False" value="False" />
        <RadioRole id="q25_radio3" label="Maybe" value="Maybe" />
      </fieldset>
    </>
  );
};

export default FieldsetExperiments;
