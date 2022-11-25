import React from "react";

const DateInput = () => {
  return (
    <div>
      <h2>DateInput</h2>

      <label htmlFor="dob" className="block">
        Date of birth
      </label>
      <input type="date" id="dob" name="dob" autoComplete="bday" />
    </div>
  );
};

export default DateInput;
