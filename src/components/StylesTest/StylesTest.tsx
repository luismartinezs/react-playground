import React, { type FC } from "react";
import classnames from "classnames";

import Styles from "./StylesTest.module.css";

type Props = {
  useAccessibleStyles?: boolean;
};

const StylesTest: FC<Props> = ({ useAccessibleStyles }) => {
  const heading = classnames(
    useAccessibleStyles && Styles.accessibleStyles,
    Styles.heading
  );
  const paragraph1 = classnames(
    Styles.paragraph,
    useAccessibleStyles && Styles.accessibleStyles
  );
  const list = classnames(
    Styles.list,
    {
      [Styles.accessibleStyles]: useAccessibleStyles,
    },
    "hello"
  );
  const paragraph2 = classnames(
    useAccessibleStyles ? Styles.accessibleStyles : Styles.paragraph
  );
  return (
    <>
      <h1 className={heading}>Styles test</h1>
      <p className={paragraph1}>
        Proident non incididunt nostrud pariatur excepteur eiusmod commodo
        aliquip eu deserunt proident occaecat commodo tempor. Aliqua aliquip
        esse commodo aliqua et ea magna. Voluptate deserunt reprehenderit irure
        sunt quis qui ex minim aliquip officia adipisicing nisi. Ea occaecat
        sunt fugiat quis excepteur. Ipsum aliquip ex nisi velit aute et anim
        consequat deserunt amet.
      </p>
      <ul>
        <li className={list}>Item 1</li>
      </ul>
      <p className={paragraph2}>
        In proident deserunt mollit sit nostrud. Minim dolor do ut in incididunt
        dolore. Enim ad aliqua magna anim officia dolore ea esse.
      </p>
    </>
  );
};

export default StylesTest;
