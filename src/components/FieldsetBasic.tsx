import React from "react";

const FieldsetBasic = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log([...e.target.elements].find((el) => el.checked).value);
  };
  return (
    <>
      <h2>Fieldset Basic</h2>
      <p>basic usage of fieldset</p>
      <form
        aria-labelledby="fieldset-basic-title"
        onSubmit={handleSubmit}
        className="p-1 border border-sky-500"
      >
        <h3 id="fieldset-basic-title" className="font-semibold">
          Fieldset basic
        </h3>
        <fieldset>
          <legend>Are you a pirate?</legend>
          <div>
            <input type="radio" id="yes" name="pirate" value="yes" />
            <label htmlFor="yes">Yes</label>
          </div>
          <div>
            <input type="radio" id="no" name="pirate" value="no" />
            <label htmlFor="no">No</label>
          </div>
          <button type="submit" className="button">
            Submit
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default FieldsetBasic;
