import React from "react";
import SkipCard from "../../components/skipCard/SkipCard";
import SkipCardDetails from "../../components/skipDetailsCard/SkipDetailCard";
import styles from "./Home.module.css";
import ProgressBarComponent from "../../components/progressBar/progressBar";
const Home = () => {
  return (
    <main>
      <ProgressBarComponent />
      <section className={styles.homeContent}>
        <h1>Choose Your Skip Size</h1>
        <p>Select the skip size that best suites your needs</p>
      </section>
      <section className={styles.homeCardSection}>
        <SkipCard />
        <SkipCardDetails />
      </section>
    </main>
  );
};

export default Home;
