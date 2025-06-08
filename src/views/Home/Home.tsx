import React, { useEffect } from "react";
import SkipCard from "../../components/skipCard/SkipCard";
import SkipCardDetails from "../../components/skipDetailsCard/SkipDetailCard";
import styles from "./Home.module.css";
import ProgressBarComponent from "../../components/progressBar/progressBar";
import SpacingWrapper from "../../components/spacingWrapper/SpacingWrapper";
import useBoundStore from "../../store/useBoundStore";
const Home = () => {
  const skipData = useBoundStore((state) => state.skipData);

  const getSkipData = useBoundStore((state) => state.getSkipData);

  const selectSkip = useBoundStore((state) => state.selectSkip);

  const skipDetailData = useBoundStore((state) => state.skipDetailData);

  const isCardSelected = useBoundStore((state) => state.isCardSelected);

  const handleSelect = (skipItem) => {
    selectSkip(skipItem, skipItem.id);

    if (skipItem.id === isCardSelected) {
      selectSkip({}, null);
    }
  };

  useEffect(() => {
    getSkipData();
  }, []);

  return (
    <main>
      <SpacingWrapper>
        <ProgressBarComponent />
        <section className={styles.homeContent}>
          <h1>Choose Your Skip Size</h1>
          <p>Select the skip size that best suites your needs</p>
        </section>
        <section className={styles.homeCardContainer}>
          <section className={styles.homeCardSection}>
            {skipData.map((skipItem) => {
              return (
                <SkipCard
                  key={skipItem?.id}
                  size={skipItem?.size}
                  hire_period_days={skipItem?.hire_period_days}
                  price_before_vat={skipItem?.price_before_vat}
                  onClick={() => handleSelect(skipItem)}
                  id={skipItem?.id}
                />
              );
            })}
          </section>
          {isCardSelected ? (
            <section>
              <SkipCardDetails
                size={skipDetailData?.size}
                hire_period_days={skipDetailData?.hire_period_days}
                price_before_vat={skipDetailData?.price_before_vat}
                image={skipDetailData?.image}
                id={skipDetailData?.id}
              />
            </section>
          ) : (
            <section className={styles.homeCardSectionHidePreview}>
              <p>Select Skip Size to preview</p>
            </section>
          )}
        </section>
      </SpacingWrapper>
    </main>
  );
};

export default Home;
