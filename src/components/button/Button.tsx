import styles from "./Button.module.css";
import ButtonProps from "./ButtonProps.types";
const Button = (props: ButtonProps) => {
  const { title, onClick, bgColor = "#0d9488" } = props;

  return (
    <button
      className={`${styles.button} `}
      style={{
        background: bgColor,
      }}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
