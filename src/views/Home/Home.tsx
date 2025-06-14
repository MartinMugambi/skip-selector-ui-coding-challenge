import { useEffect, useMemo } from "react";
import SkipCard from "../../components/skipCard/SkipCard";
import SkipCardDetails from "../../components/skipDetailsCard/SkipDetailCard";
import styles from "./Home.module.css";
import ProgressBar from "../../components/progressBar/ProgressBar";
import SpacingWrapper from "../../components/spacingWrapper/SpacingWrapper";
import useBoundStore from "../../store/useBoundStore";
import CustomPagination from "../../components/customPagination/CustomPagination";
import { SkipItem } from "../../store/slices/useSkipSlice/useSkip.types";
import SkeletonLoader from "../../components/skeletonLoader/SkeletonLoader";
import MobileSkipCard from "../../components/skipCard/MobileSkipCard";
import useResponsive from "../../hooks/useResponssive";
const Home = () => {
  const skipData = useBoundStore((state) => state.skipData);

  const { isDesktop } = useResponsive();

  const getSkipData = useBoundStore((state) => state.getSkipData);

  const selectSkip = useBoundStore((state) => state.selectSkip);

  const skipDetailData = useBoundStore((state) => state.skipDetailData);

  const isCardSelected = useBoundStore((state) => state.isCardSelected);

  const selectPage = useBoundStore((state) => state.selectPage);

  const currentPage = useBoundStore((state) => state.currentPage);
  const itemsPerPage = 3;

  const startIndex = (currentPage - 1) * itemsPerPage;

  const endIndex = startIndex + itemsPerPage;

  const isLoading = useBoundStore((state) => state.loading);

  const handleSelect = (skipItem: SkipItem) => {
    selectSkip(skipItem, skipItem.id);

    if (skipItem.id === isCardSelected) {
      selectSkip(null, null);
    }
  };

  const handlePageClick = (page: number) => {
    selectPage(page);
  };

  const availableSkipData = useMemo(() => {
    if (isDesktop) {
      const skip = skipData.slice(startIndex, endIndex);
      selectSkip(skipData[startIndex], skipData[startIndex]?.id);
      return skip;
    }
    return skipData;
  }, [skipData, startIndex, endIndex, isDesktop]);

  useEffect(() => {
    getSkipData();
  }, []);

  return (
    <main>
      <SpacingWrapper>
        <ProgressBar />
        <section className={styles.homeContent}>
          <h1>Choose Your Skip Size</h1>
          <p>Select the skip size that best suites your needs</p>
        </section>
        <section className={styles.homeCardContainer}>
          <section className={styles.homeCardSection}>
            {isLoading
              ? Array(itemsPerPage)
                  .fill(0)
                  .map((_, idx) => (
                    <div
                      key={idx}
                      style={{ width: 400, height: 120, margin: 8 }}
                    >
                      <SkeletonLoader
                        height={72}
                        style={{ marginBottom: 12 }}
                      />
                      <SkeletonLoader
                        height={16}
                        width="80%"
                        style={{ marginBottom: 8 }}
                      />
                      <SkeletonLoader height={16} width="60%" />
                    </div>
                  ))
              : availableSkipData.map((skipItem) => (
                  <>
                    {!isDesktop ? (
                      <section>
                        <MobileSkipCard
                          key={skipItem?.id}
                          size={skipItem?.size}
                          hire_period_days={skipItem?.hire_period_days}
                          price_before_vat={skipItem?.price_before_vat}
                          onClick={() => handleSelect(skipItem)}
                          id={skipItem?.id}
                          image={skipItem.image}
                        />
                      </section>
                    ) : (
                      <SkipCard
                        key={skipItem?.id}
                        size={skipItem?.size}
                        hire_period_days={skipItem?.hire_period_days}
                        price_before_vat={skipItem?.price_before_vat}
                        onClick={() => handleSelect(skipItem)}
                        id={skipItem?.id}
                      />
                    )}
                  </>
                ))}
          </section>
          {isCardSelected ? (
            <section>
              {isLoading ? (
                <div style={{ padding: 16, width: 550 }}>
                  <SkeletonLoader
                    height={250}
                    width={550}
                    style={{ marginBottom: 16 }}
                  />
                </div>
              ) : (
                <SkipCardDetails
                  size={skipDetailData?.size}
                  hire_period_days={skipDetailData?.hire_period_days}
                  price_before_vat={skipDetailData?.price_before_vat}
                  image={skipDetailData?.image}
                  id={skipDetailData?.id}
                />
              )}
            </section>
          ) : (
            <section className={styles.homeCardSectionHidePreview}>
              <p>Select Skip Size to preview</p>
            </section>
          )}
        </section>
        {isDesktop && (
          <section className={styles.homeCustomPagination}>
            <CustomPagination
              totalItems={skipData.length}
              itemsPerPage={itemsPerPage}
              handlePageClick={handlePageClick}
            />
          </section>
        )}
      </SpacingWrapper>
    </main>
  );
};

export default Home;
