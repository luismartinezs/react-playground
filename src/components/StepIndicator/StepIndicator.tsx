import classnames from "classnames";
import React from "react";

import Style from "./StepIndicator.module.scss";

const StepNumber = ({ stepNumber }) => (
  <div aria-hidden="true" className={Style.stepNumber}>
    <span>{stepNumber}</span>
  </div>
);

const Tooltip = ({ target, children }) => {
  return (
    <div className={Style.container}>
      <button tabIndex={-1} className={Style.target}>
        {target}
      </button>
      <div
        role="tooltip"
        className={classnames(Style.overlay, Style.default, Style.bottom)}
      >
        <span>{children}</span>
      </div>
    </div>
  );
};

const Divider = () => <div className={Style.border}></div>;

const Step = ({ stepNumber, step }) => {
  return (
    <div className={Style.step}>
      <span aria-hidden="true" className="flex items-center">
        <Tooltip target={<StepNumber stepNumber={stepNumber} />}>
          {step}
        </Tooltip>
      </span>
    </div>
  );
};

const StepIndicator = () => {
  return (
    <div>
      <h2>StepIndicator</h2>
      <div className="flex items-center justify-center">
        <Step stepNumber={1} step="Review" />
        <Divider />
        <Step stepNumber={2} step="Tech check" />
        <Divider />
        <Step stepNumber={3} step="Verify identity" />
      </div>
    </div>
  );
};

export default StepIndicator;
