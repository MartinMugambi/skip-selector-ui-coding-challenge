import SpaceWrapper from "./SpacingWrapper.types";
import styles from "./SpacingWrapper.module.css";
const SpacingWrapper = (props: SpaceWrapper) => {
  const { children } = props;
  return (
    <section className={styles.spacingWrapperContainer}>{children}</section>
  );
};

export default SpacingWrapper;
