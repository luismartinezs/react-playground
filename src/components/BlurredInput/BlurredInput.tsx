import React from "react";

import classnames from "classnames";

import Styles from "./BlurredInput.module.scss";

const BlurredInput = () => {
  const mask = "**/**/****";

  return (
    <div>
      <h2>BlurredInput</h2>
      <label htmlFor="blurred-input">
        Date of birth
        <div className={Styles.inputWrapper}>
          <input
            className={classnames(Styles.input, "block")}
            type="date"
            id="blurred-input"
          />
          <span aria-hidden="true" className={classnames(Styles.inputMask)}>
            {mask}
          </span>
        </div>
      </label>
    </div>
  );
};

export default BlurredInput;
