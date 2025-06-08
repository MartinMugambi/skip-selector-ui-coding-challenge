import React from "react";
import styles from "./ProgressBar.module.css";
import progressBarData from "./ProgressData";
import useBoundStore from "../../store/useBoundStore";

const ProgressBarComponent = () => {
  const currentSkipStep = useBoundStore((state) => state.currentSkipStep);

  return (
    <main className={styles.progressContainer}>
      <progress max={100} value="38" className={styles.progressBar}></progress>
      <section className={styles.progressBarItems}>
        {progressBarData.map((progressData, index) => {
          return (
            <section key={progressData.id}>
              <p
                className={`${styles.progressCount} ${
                  currentSkipStep === index + 1
                    ? styles.progressBarSelected
                    : styles.progressBarUnSelected
                }`}
              >
                {progressData.id}
              </p>
              <p className={styles.progressTitle}>{progressData.title}</p>
            </section>
          );
        })}
      </section>
    </main>
  );
};

export default ProgressBarComponent;
