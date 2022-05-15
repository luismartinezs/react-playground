import React, { useRef } from "react";

const ScrollToMe = () => {
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <button ref={ref} onClick={() => ref.current.scrollIntoView()}>
      Scroll to me
    </button>
  );
};

export default ScrollToMe;
