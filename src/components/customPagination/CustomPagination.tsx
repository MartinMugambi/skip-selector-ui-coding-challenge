import React from "react";
import styles from "./CustomPagination.module.css";
import useBoundStore from "../../store/useBoundStore";
const CustomPagination = ({ totalItems, itemsPerPage, handlePageClick }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentPage = useBoundStore((state) => state.currentPage);
  return (
    <section className={styles.customPaginationContainer}>
      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            className={` ${styles.customPaginationButton} ${
              currentPage === page
                ? styles.customPaginationButtonSelected
                : styles.customPaginationButtonUnSelected
            }`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        );
      })}
    </section>
  );
};

export default CustomPagination;
