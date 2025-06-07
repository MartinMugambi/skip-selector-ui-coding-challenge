import React from "react";
import styles from "./Button.module.css";
import ButtonProps from "./ButtonProps.types";
const Button = (props: ButtonProps) => {
  const { title, onClick } = props;

  return (
    <button className={`${styles.button}`} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
