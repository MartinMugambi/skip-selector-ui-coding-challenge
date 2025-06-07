import React from "react";
import styles from "./SpacingWrapper.module.css";
const SpacingWrapper = ({ children }) => {
  return (
    <section className={styles.spacingWrapperContainer}>{children}</section>
  );
};

export default SpacingWrapper;
