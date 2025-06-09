import Button from "../button/Button";
import SkipDetailCardProps from "./SkipDetailCard.types";
import currencyFormatter from "../../utils/currencyFormatter";
import styles from "./SkipDetailCard.module.css";
const SkipCardDetails = (props: SkipDetailCardProps) => {
  const { size, hire_period_days, price_before_vat, image } = props;

  return (
    <section className={styles.skipDetailCardContainer}>
      <h1>{size} Yard</h1>
      {image ? (
        <img
          src={image}
          alt="skip_image"
          loading="lazy"
          width={"550"}
          height="160"
        />
      ) : null}
      <span>{hire_period_days} day hire period</span>
      <p>{currencyFormatter(price_before_vat ?? 0)}</p>
      <span>Perfect for small project</span>
      <Button title="Selected" />
    </section>
  );
};

export default SkipCardDetails;
