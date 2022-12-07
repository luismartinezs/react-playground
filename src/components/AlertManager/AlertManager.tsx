import classnames from "classnames";
import React from "react";

import Style from "./AlertManager.module.scss";

const Divider = () => (
  <div className="w-full my-2 border-t border-sky-500"></div>
);

type AlertProps = {
  code: string;
  role?: "alert";
  ariaLive?: "off" | "polite" | "assertive";
};

const Alert = ({ code, role, ariaLive }: AlertProps) => {
  const [toggleAlert, setToggleAlert] = React.useState(false);
  const [toggleMessage, setToggleMessage] = React.useState(false);

  return (
    <>
      {toggleAlert && (
        <div role={role} aria-live={ariaLive}>
          {toggleMessage && "Hello world"}
        </div>
      )}
      <code>{code}</code>
      <div className="flex space-x-1">
        <button className="button" onClick={() => setToggleAlert(!toggleAlert)}>
          {toggleAlert ? "Hide alert" : "Show alert"}
        </button>
        {toggleAlert && (
          <button
            className="button"
            onClick={() => setToggleMessage(!toggleMessage)}
          >
            {toggleMessage ? "Hide message" : "Show message"}
          </button>
        )}
      </div>
    </>
  );
};

const Widget = () => {
  return (
    <div className="w-full">
      <Alert role="alert" code={`<div role="alert">Hello world</div>`} />
      <Divider />
      <Alert
        ariaLive="assertive"
        code={`<div aria-live="assertive">Hello world</div>`}
      />
      <Divider />
      <Alert
        role="alert"
        ariaLive="assertive"
        code={`<div role="alert" aria-live="assertive">Hello world</div>`}
      />
      <Divider />
      <Alert
        ariaLive="polite"
        code={`<div aria-live="polite">Hello world</div>`}
      />
      <Divider />
      <Alert
        role="alert"
        ariaLive="polite"
        code={`<div role="alert" aria-live="polite">Hello world</div>`}
      />
    </div>
  );
};

const Dialog = ({
  children,
  openBtnLabel = "Open dialog",
  closeBtnLabel = "Close dialog",
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {isOpen && (
        <>
          <div className={Style.overlay}></div>
          <div
            className={classnames(
              Style.dialog,
              "bg-sky-50 m-20 p-10 flex flex-col items-center justify-center shadow-xl"
            )}
          >
            <div className="w-full">{children}</div>
            <footer className="w-full pt-10 mt-10 border-t border-sky-500">
              <button className="button" onClick={() => setIsOpen(false)}>
                {closeBtnLabel}
              </button>
            </footer>
          </div>
        </>
      )}
      <button className="button" onClick={() => setIsOpen(true)}>
        {openBtnLabel}
      </button>
    </>
  );
};

const AlertManager = () => {
  return (
    <div>
      <h2>AlertManager</h2>
      <Dialog
        openBtnLabel="Open alert manager"
        closeBtnLabel="Close alert manager"
      >
        <Widget />
      </Dialog>
    </div>
  );
};

export default AlertManager;
