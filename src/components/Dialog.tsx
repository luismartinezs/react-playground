import React from "react";
import { SROnlyToast } from "./ScreenReader";

const Dialog = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [timeout, setTimeout] = React.useState(5000);

  return (
    <div>
      <h2>Dialog</h2>
      <p>Dialog title gets announced when focus is placed inside the dialog</p>
      <p>the dialog contains a live assertive toast</p>

      <div>
        <label>
          Timeout for alert:&nbsp;
          <input
            type="number"
            value={timeout}
            onChange={(e) => setTimeout(+e.target.value)}
          />
        </label>
      </div>

      {isOpen ? (
        <div
          role="dialog"
          aria-labelledby="dialog-title"
          className="p-2 my-2 border border-sky-500"
        >
          <SROnlyToast timeout={timeout}>
            <div aria-live="assertive">
              Chuck Norris is the most powerful man in the universe
            </div>
          </SROnlyToast>
          <h1 id="dialog-title">My dialog</h1>
          <p>
            This text should not be read by screen readers unless highlighted
          </p>
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
