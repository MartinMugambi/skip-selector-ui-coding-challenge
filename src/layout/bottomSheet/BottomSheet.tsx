import React from "react";
import Button from "../../components/button/Button";
import styles from "./BottomSheet.module.css";
const BottomSheet = () => {
  return (
    <section className={styles.bottomSheetContainer}>
      <Button title="Back" bgColor="#59606b" />
      <Button title="Continue" />
    </section>
  );
};

export default BottomSheet;
