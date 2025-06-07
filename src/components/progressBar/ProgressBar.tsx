import React from "react";
import styles from "./ProgressBar.module.css";
import progressBarData from "./ProgressData";
// import useFetchHook from "../../hooks/useFetch";
const ProgressBarComponent = () => {
  // const { data } = useFetchHook(
  //   "api/skips/by-location?postcode=NR32&area=Lowestoft"
  // );

  return (
    <main className={styles.progressContainer}>
      <progress max={100} value="64" className={styles.progressBar}></progress>
      <section className={styles.progressBarItems}>
        {progressBarData.map((progressData) => {
          return (
            <section key={progressData.id}>
              <p className={styles.progressCount}>{progressData.id}</p>
              <span className={styles.progressTitle}>{progressData.title}</span>
            </section>
          );
        })}
      </section>
    </main>
  );
};

export default ProgressBarComponent;
