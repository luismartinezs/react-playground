import React from "react";

const Dialog = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <h2>Dialog</h2>
      <p>Dialog title gets announced when focus is placed inside the dialog</p>

      {isOpen ? (
        <div
          role="dialog"
          aria-labelledby="dialog-title"
          className="p-2 border border-sky-500 my-2"
        >
          <h1 id="dialog-title">My dialog</h1>
          <button onClick={() => setIsOpen(false)} className="button" autoFocus>
            Close
          </button>
        </div>
      ) : (
        <button className="button" onClick={() => setIsOpen(true)}>
          Open Dialog
        </button>
      )}
    </div>
  );
};

export default Dialog;
