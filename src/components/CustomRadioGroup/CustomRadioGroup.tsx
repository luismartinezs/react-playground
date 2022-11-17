// base on this: https://www.w3.org/WAI/ARIA/apg/patterns/radiobutton
// too complicated, not finished

import React, { useState } from "react";

import Styles from "./CustomRadioGroup.module.scss";

type ValueType = string | number | boolean | null | undefined;
type RadioButtonProps<T extends ValueType> = {
  label: string;
  id: string;
  name: string;
  groupValue?: T;
  onChange: (newValue: NonNullable<T>) => void;
  radioValue: NonNullable<T>;
  automationId?: string;
  index?: number;
  disabled?: boolean;
  prevValue: NonNullable<T>;
  nextValue: NonNullable<T>;
};

function RadioButton<T extends ValueType = string | undefined | null>({
  label,
  groupValue,
  id,
  onChange,
  radioValue,
  name,
  disabled,
  prevValue,
  nextValue,
  index = 0,
}: RadioButtonProps<T>) {
  const handleChange = () => {
    if (disabled) {
      return;
    }
    onChange(radioValue);
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      // prevents the space bar scrolling the page
      e.preventDefault();
      handleChange();
    }
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      onChange(nextValue);
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      onChange(prevValue);
    }
  };
  return (
    <div className="flex items-center">
      <span
        id={id}
        name={name}
        role="radio"
        tabIndex={index}
        aria-checked={radioValue === groupValue}
        onClick={handleChange}
        onKeyDown={handleKeydown}
      ></span>
      <span>{label}</span>
    </div>
  );
}

const CustomRadioGroup = () => {
  const [radioValue, setRadioValue] = useState<string | null>(null);

  return (
    <>
      <h2>CustomRadioGroup</h2>
      <fieldset className={Styles.customRadioGroup}>
        <legend>Choose your favorite color</legend>
        <RadioButton
          label="red"
          groupValue={radioValue}
          radioValue="red"
          id="red"
          onChange={setRadioValue}
          name="color"
          nextValue="green"
          prevValue="blue"
        />
        <RadioButton
          label="green"
          groupValue={radioValue}
          radioValue="green"
          id="green"
          onChange={setRadioValue}
          name="color"
          nextValue="blue"
          prevValue="red"
        />
        <RadioButton
          label="blue"
          groupValue={radioValue}
          radioValue="blue"
          id="blue"
          onChange={setRadioValue}
          name="color"
          nextValue="red"
          prevValue="green"
        />
      </fieldset>
    </>
  );
};

export default CustomRadioGroup;
