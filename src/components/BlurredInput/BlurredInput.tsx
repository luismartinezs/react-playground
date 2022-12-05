import React from "react";

import classnames from "classnames";

import Styles from "./BlurredInput.module.scss";

const BlurredInput = () => {
  return (
    <div>
      <h2>BlurredInput</h2>
      <label htmlFor="blurred-input">
        Date of birth
        <input
          className={classnames(Styles.blurredInput, "block")}
          type="date"
          id="blurred-input"
        />
      </label>
    </div>
  );
};

export default BlurredInput;
