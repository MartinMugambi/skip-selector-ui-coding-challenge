import NavBarProps from "./NavBar.types";
import styles from "./NavBar.module.css";
const NavBar = (props: NavBarProps) => {
  const { title } = props;

  return (
    <section className={styles.navBarContainer}>
      <h1>{title}</h1>
    </section>
  );
};

export default NavBar;
