import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomPagination from "../CustomPagination";
import useBoundStore from "../../../store/useBoundStore";

jest.mock("../../../store/useBoundStore", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Unit test:CustomPagination Component", () => {
  const mockUseBoundStore = useBoundStore as unknown as jest.MockedFunction<
    <T>(selector: (state: { currentPage: number }) => T) => T
  >;
  const mockHandlePageClick = jest.fn();

  const defaultProps = {
    totalItems: 9,
    itemsPerPage: 3,
    handlePageClick: mockHandlePageClick,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseBoundStore.mockImplementation((selector) =>
      selector({ currentPage: 1 })
    );
  });

  test("renders correct number of pagination buttons", () => {
    render(<CustomPagination {...defaultProps} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3);

    buttons.forEach((button, index) => {
      expect(button).toHaveTextContent(`${index + 1}`);
    });
  });

  test("renders 3 pagination buttons for totalItems=9 and itemsPerPage=3", () => {
    render(
      <CustomPagination
        totalItems={9}
        itemsPerPage={3}
        handlePageClick={mockHandlePageClick}
      />
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3);
    expect(buttons[0]).toHaveTextContent("1");
    expect(buttons[1]).toHaveTextContent("2");
    expect(buttons[2]).toHaveTextContent("3");
  });

  test("applies selected class to current page button", () => {
    mockUseBoundStore.mockImplementation((selector) =>
      selector({ currentPage: 2 })
    );
    render(<CustomPagination {...defaultProps} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons[1]).toHaveClass("customPaginationButtonSelected");
    expect(buttons[0]).toHaveClass("customPaginationButtonUnSelected");
    expect(buttons[2]).toHaveClass("customPaginationButtonUnSelected");
  });

  test("calls handlePageClick with correct page number on button click", () => {
    render(<CustomPagination {...defaultProps} />);

    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[2]);
    expect(mockHandlePageClick).toHaveBeenCalledWith(3);
    expect(mockHandlePageClick).toHaveBeenCalledTimes(1);
  });

  test("renders single page correctly", () => {
    render(
      <CustomPagination
        totalItems={5}
        itemsPerPage={10}
        handlePageClick={mockHandlePageClick}
      />
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(1);
    expect(buttons[0]).toHaveTextContent("1");
  });

  test("handles zero totalItems gracefully", () => {
    render(
      <CustomPagination
        totalItems={0}
        itemsPerPage={10}
        handlePageClick={mockHandlePageClick}
      />
    );

    const buttons = screen.queryAllByRole("button");
    expect(buttons).toHaveLength(0);
  });

  test("handles non-integer totalPages correctly", () => {
    render(
      <CustomPagination
        totalItems={25}
        itemsPerPage={10}
        handlePageClick={mockHandlePageClick}
      />
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3);
  });

  test("applies container class correctly", () => {
    render(<CustomPagination {...defaultProps} />);

    const container = screen.getByTestId("custom-pagination-container");
    expect(container).toHaveClass("customPaginationContainer");
  });

  test("does not crash with invalid itemsPerPage", () => {
    render(
      <CustomPagination
        totalItems={50}
        itemsPerPage={0}
        handlePageClick={mockHandlePageClick}
      />
    );

    const buttons = screen.queryAllByRole("button");
    expect(buttons).toHaveLength(0);
  });
});
