import currencyFormatter from "../../utils/currencyFormatter";
import Button from "../button/Button";
import SkipCardProps from "./SkipCard.types";
import styles from "./MobileSkipCard.module.css";
import useBoundStore from "../../store/useBoundStore";
const MobileSkipCard = (props: SkipCardProps) => {
  const { id, size, hire_period_days, price_before_vat, image, onClick } =
    props;
  const isCardSelected = useBoundStore((state) => state.isCardSelected);

  const isSelected = id === isCardSelected;
  return (
    <section
      className={`${styles.skipDetailCardContainer} ${
        isSelected && styles.skipDetailCardSeleceted
      }`}
      onClick={onClick}
    >
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
      <Button
        title={isSelected ? "Selected" : "Select"}
        bgColor={isSelected ? "#0d9488" : ""}
      />
    </section>
  );
};

export default MobileSkipCard;
