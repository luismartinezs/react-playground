import React, { useEffect } from "react";

const DateInput = () => {
  const input = React.useRef<HTMLInputElement>(null);
  const [showInput, setShowInput] = React.useState(true);

  const maskedProps = {
    type: "text",
    value: "**/**/****",
    // onFocus: () => setShowInput(true),
  };

  const unmaskedProps = {
    type: "date",
    // onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
    //   setShowInput(false);
    // },
  };

  return (
    <div>
      <h2>Toggle Date Input</h2>

      <label htmlFor="dob" className="block">
        Date of birth
      </label>
      <input
        ref={input}
        id="dob"
        name="dob"
        autoComplete="bday"
        {...(showInput ? unmaskedProps : maskedProps)}
      />
    </div>
  );
};

export default DateInput;
