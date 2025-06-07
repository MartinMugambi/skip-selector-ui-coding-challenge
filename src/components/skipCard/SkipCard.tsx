import React from "react";
import SkipCardProps from "./SkipCard.types";
import currencyFormatter from "../../utils/currencyFormatter";
import styles from "./SkipCard.module.css";
import useBoundStore from "../../store/useBoundStore";
const SkipCard = (props: SkipCardProps) => {
  const { id, size, price_before_vat, hire_period_days, onClick } = props;
  const isCardSelected = useBoundStore((state) => state.isCardSelected);

  const isSelected = id === isCardSelected;
  return (
    <section
      className={`${styles.skipCardContainer} ${
        isSelected && styles.skipCardContainerSelected
      }`}
      onClick={onClick}
      role="button"
    >
      <section className={styles.skipCardContent}>
        <h1>{size} Yard</h1>
        <h4>{currencyFormatter(price_before_vat)}</h4>
        <p>{hire_period_days} day hire period</p>
      </section>
      <p
        className={` ${
          isSelected
            ? styles.skipCardContainerTextSelected
            : styles.skipCardTextUnselcted
        }`}
      >
        {isSelected ? "Selected" : "Select"}
      </p>
    </section>
  );
};

export default SkipCard;
