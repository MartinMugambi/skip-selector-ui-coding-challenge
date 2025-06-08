import { render, screen, fireEvent } from "@testing-library/react";
import CustomPagination from "../CustomPagination";

describe("CustomPagination", () => {
  const totalItems = 25;
  const itemsPerPage = 5;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  it("renders the correct number of page buttons", () => {
    render(
      <CustomPagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        handlePageClick={jest.fn()}
      />
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(totalPages);
    buttons.forEach((button, idx) => {
      expect(button).toHaveTextContent((idx + 1).toString());
    });
  });

  it("calls handlePageClick with the correct page number when a button is clicked", () => {
    const handlePageClick = jest.fn();
    render(
      <CustomPagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        handlePageClick={handlePageClick}
      />
    );
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[2]); // Click page 3
    expect(handlePageClick).toHaveBeenCalledWith(3);
  });
});
