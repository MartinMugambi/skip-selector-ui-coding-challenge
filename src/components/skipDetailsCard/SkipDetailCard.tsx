import React from "react";
import Button from "../button/Button";
import currencyFormatter from "../../utils/currencyFormatter";
import styles from "./SkipDetailCard.module.css";

const SkipCardDetails = () => {
  return (
    <section className={styles.skipDetailCardContainer}>
      <h1>4 Yard</h1>
      <img
        src={"https://picsum.photos/800/300"}
        alt="skip_image"
        loading="lazy"
      />
      <h6>14 day hire period</h6>
      <p>{currencyFormatter(411)}</p>
      <span>Perfect for small project</span>
      <Button title="Selected" />
    </section>
  );
};

export default SkipCardDetails;
