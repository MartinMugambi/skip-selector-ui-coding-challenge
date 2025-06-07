import React from "react";
import styles from "./SkipCard.module.css";
const SkipCard = () => {
  return (
    <section
      className={`${styles.skipCardContainer}  ${styles.skipCardContainerSelected}`}
    >
      <section className={styles.skipCardContent}>
        <h1>4 Yard</h1>
        <h4>$ 211</h4>
        <p>14 day hire period</p>
      </section>
      <p>Selected</p>
    </section>
  );
};

export default SkipCard;
