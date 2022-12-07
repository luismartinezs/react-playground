import classnames from "classnames";
import React from "react";

import Styles from "./DelayedTooltip.module.scss";

const Step = ({ stepNumber }) => {
  return (
    <div className="flex items-center justify-center w-20 h-10 font-bold rounded-full bg-primary-500 text-primary-50">
      Step {stepNumber}
    </div>
  );
};

const Tooltip = ({ target, children }) => {
  return (
    <div className={classnames("relative", Styles.wrapper)}>
      <div className={classnames(Styles.target)}>{target}</div>
      <div
        className={classnames(
          "absolute left-0 z-10  p-1 text-center text-white bg-black top-[45px]",
          Styles.tooltip
        )}
      >
        {children}
      </div>
    </div>
  );
};

const FloatingDelayGroupContext = React.createContext({
  closeDelay: 1000,
  currentId: null,
  setCurrentId: () => {},
});

const TooltipGroup = ({ children, closeDelay }) => {
  const [state, setState] = React.useState({
    closeDelay,
    currentId: null,
  });

  const setCurrentId = React.useCallback((currentId: any) => {
    setState((state) => ({ ...state, currentId }));
  }, []);

  return (
    <FloatingDelayGroupContext.Provider
      value={React.useMemo(
        () => ({
          ...state,
          setState,
          setCurrentId,
        }),
        [state, setState, setCurrentId]
      )}
    >
      <div className="flex space-x-2">{children}</div>
    </FloatingDelayGroupContext.Provider>
  );
};

const DelayedTooltip = () => {
  return (
    <div>
      <h2>DelayedTooltip</h2>
      <TooltipGroup closeDelay={200}>
        <Tooltip target={<Step stepNumber={1} />}>This is step 1</Tooltip>
        <Tooltip target={<Step stepNumber={2} />}>This is step 2</Tooltip>
        <Tooltip target={<Step stepNumber={3} />}>This is step 3</Tooltip>
      </TooltipGroup>
    </div>
  );
};

export default DelayedTooltip;
