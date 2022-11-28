import { memo, ReactNode, RefObject, useEffect, useRef, useState } from "react";

import Styles from "./index.module.scss";

type Props = {
  children: ReactNode;
};

function SROnly({ children }: Props) {
  return <div className={Styles.srOnly}>{children}</div>;
}

type ToastProps = {
  children: ReactNode;
  /** time in ms to keep the DOM connected */
  timeout?: number;
};

function useToast(ref: RefObject<HTMLElement>, timeout: ToastProps["timeout"]) {
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    ref.current?.focus();
    const timer = setTimeout(() => {
      if (timeout && timeout > 0) {
        setShowToast(false);
      }
    }, timeout);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return showToast;
}

function SROnlyToast({ children, timeout = 5_000 }: ToastProps) {
  const SROnlyRef = useRef<HTMLDivElement>(null);
  const showToast = useToast(SROnlyRef, timeout);

  if (showToast) {
    return (
      <div ref={SROnlyRef}>
        <SROnly>{children}</SROnly>
      </div>
    );
  }

  return null;
}

const Container = memo(SROnlyToast);

/**
 * Use this component to announce a label to screen readers on mount. After a timeout, the label will be removed from the
 * DOM, to prevent the screen reader from navigating to it.
 */
export { Container as SROnlyToast };

export default memo(SROnly);
