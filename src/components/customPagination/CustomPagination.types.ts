export default interface CustomPaginationProps {
  totalItems: number;
  itemsPerPage: number;
  handlePageClick: (page: number) => void;
}
