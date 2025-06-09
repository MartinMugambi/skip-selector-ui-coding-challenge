import styles from "./CustomPagination.module.css";
import useBoundStore from "../../store/useBoundStore";
import CustomPaginationProps from "./CustomPagination.types";
const CustomPagination = (props: CustomPaginationProps) => {
  const { totalItems, itemsPerPage, handlePageClick } = props;
  const totalPages =
    itemsPerPage > 0 ? Math.ceil(totalItems / itemsPerPage) : 0;
  const currentPage = useBoundStore((state) => state.currentPage);
  return (
    <section
      className={styles.customPaginationContainer}
      data-testid="custom-pagination-container"
    >
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
