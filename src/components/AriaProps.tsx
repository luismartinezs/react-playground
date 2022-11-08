import React, { type FC } from "react";

type Props = {
  "aria-label": string;
};

const Child: FC<Props> = ({ "aria-label": ariaLabel }) => {
  return (
    <button className="button" aria-label={ariaLabel}>
      X
    </button>
  );
};

const AriaProps = () => {
  return <Child aria-label="the button" />;
};

export default AriaProps;
