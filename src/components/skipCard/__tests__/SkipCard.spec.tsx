import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import SkipCard from "../SkipCard";
import useBoundStore from "../../../store/useBoundStore";
import currencyFormatter from "../../../utils/currencyFormatter";
import SkipCardProps from "../SkipCard.types";
jest.mock("../../../store/useBoundStore", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../../utils/currencyFormatter", () => ({
  __esModule: true,
  default: jest.fn((value: number) => `£${value.toFixed(2)}`),
}));

describe("SkipCard Component", () => {
  const mockUseBoundStore = useBoundStore as unknown as jest.MockedFunction<
    <T>(selector: (state: { isCardSelected: number | string | null }) => T) => T
  >;
  const mockOnClick = jest.fn();

  const defaultProps: SkipCardProps = {
    id: 1,
    size: 6,
    price_before_vat: 150,
    hire_period_days: 7,
    onClick: mockOnClick,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseBoundStore.mockImplementation((selector) =>
      selector({ isCardSelected: null })
    );
    (currencyFormatter as jest.Mock).mockImplementation(
      (value: number) => `£${value.toFixed(2)}`
    );
  });

  test("renders skip card with correct content", () => {
    render(<SkipCard {...defaultProps} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("6 Yard")).toBeInTheDocument();
    expect(screen.getByText("£150.00")).toBeInTheDocument();
    expect(screen.getByText("7 day hire period")).toBeInTheDocument();
    expect(screen.getByText("Select")).toBeInTheDocument();
  });

  test("applies selected styles when card is selected", () => {
    mockUseBoundStore.mockImplementation((selector) =>
      selector({ isCardSelected: 1 })
    );
    render(<SkipCard {...defaultProps} />);

    const container = screen.getByRole("button");
    expect(container).toHaveClass("skipCardContainer");
    expect(container).toHaveClass("skipCardContainerSelected");

    const selectText = screen.getByText("Selected");
    expect(selectText).toHaveClass("skipCardContainerTextSelected");
  });

  test("applies unselected styles when card is not selected", () => {
    render(<SkipCard {...defaultProps} />);

    const container = screen.getByRole("button");
    expect(container).toHaveClass("skipCardContainer");
    expect(container).not.toHaveClass("skipCardContainerSelected");

    const selectText = screen.getByText("Select");
    expect(selectText).toHaveClass("skipCardTextUnselcted");
  });

  test("calls onClick when card is clicked", () => {
    render(<SkipCard {...defaultProps} />);

    const container = screen.getByRole("button");
    fireEvent.click(container);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test("renders correct currency format", () => {
    render(<SkipCard {...defaultProps} />);

    expect(currencyFormatter).toHaveBeenCalledWith(150);
    expect(screen.getByText("£150.00")).toBeInTheDocument();
  });

  test("applies content container class", () => {
    render(<SkipCard {...defaultProps} />);

    const contentSection = screen.getByText("6 Yard").closest("section");
    expect(contentSection).toHaveClass("skipCardContent");
  });

  test("handles different id types", () => {
    const propsWithNumberId = { ...defaultProps, id: 2 };
    mockUseBoundStore.mockImplementation((selector) =>
      selector({ isCardSelected: 2 })
    );
    render(<SkipCard {...propsWithNumberId} />);

    expect(screen.getByText("Selected")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveClass("skipCardContainerSelected");
  });

  test("handles zero values gracefully", () => {
    const propsWithZeroValues = {
      ...defaultProps,
      size: 0,
      price_before_vat: 0,
      hire_period_days: 0,
    };
    render(<SkipCard {...propsWithZeroValues} />);

    expect(screen.getByText("0 Yard")).toBeInTheDocument();
    expect(screen.getByText("£0.00")).toBeInTheDocument();
    expect(screen.getByText("0 day hire period")).toBeInTheDocument();
  });

  test("is accessible with role button", () => {
    render(<SkipCard {...defaultProps} />);

    const container = screen.getByRole("button");
    expect(container).toHaveAttribute("role", "button");
    expect(container).toBeInTheDocument();
  });
});
