import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SkipCardDetails from "../SkipDetailCard";
import currencyFormatter from "../../../utils/currencyFormatter";
import SkipDetailCardProps from "../SkipDetailCard.types";

jest.mock("../../../utils/currencyFormatter", () => ({
  __esModule: true,
  default: jest.fn((value: number) => `£${value.toFixed(2)}`),
}));

jest.mock("../../button/Button", () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => <button>{title}</button>,
}));

describe(" unit tesSkipCardDetails Component", () => {
  const defaultProps: SkipDetailCardProps = {
    id: 1,
    size: 6,
    hire_period_days: 7,
    price_before_vat: 150,
    image: "https://example.com/skip.jpg",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (currencyFormatter as jest.Mock).mockImplementation(
      (value: number) => `£${value.toFixed(2)}`
    );
  });

  test("renders skip card details with correct content", () => {
    render(<SkipCardDetails {...defaultProps} />);

    expect(screen.getByText("6 Yard")).toBeInTheDocument();
    expect(screen.getByText("7 day hire period")).toBeInTheDocument();
    expect(screen.getByText("£150.00")).toBeInTheDocument();
    expect(screen.getByText("Perfect for small project")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Selected" })
    ).toBeInTheDocument();
  });

  test("renders image with correct attributes", () => {
    render(<SkipCardDetails {...defaultProps} />);

    const image = screen.getByRole("img", { name: "skip_image" });
    expect(image).toHaveAttribute("src", "https://example.com/skip.jpg");
    expect(image).toHaveAttribute("alt", "skip_image");
    expect(image).toHaveAttribute("loading", "lazy");
    expect(image).toHaveAttribute("width", "550");
    expect(image).toHaveAttribute("height", "160");
  });

  test("applies container class", () => {
    render(<SkipCardDetails {...defaultProps} />);

    const container = screen.getByText("6 Yard").closest("section");
    expect(container).toHaveClass("skipDetailCardContainer");
  });

  test("renders correct currency format", () => {
    render(<SkipCardDetails {...defaultProps} />);

    expect(currencyFormatter).toHaveBeenCalledWith(150);
    expect(screen.getByText("£150.00")).toBeInTheDocument();
  });

  test("handles zero values gracefully", () => {
    const propsWithZeroValues: SkipDetailCardProps = {
      ...defaultProps,
      size: 0,
      hire_period_days: 0,
      price_before_vat: 0,
    };
    render(<SkipCardDetails {...propsWithZeroValues} />);

    expect(screen.getByText("0 Yard")).toBeInTheDocument();
    expect(screen.getByText("0 day hire period")).toBeInTheDocument();
    expect(screen.getByText("£0.00")).toBeInTheDocument();
    expect(screen.getByText("Perfect for small project")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Selected" })
    ).toBeInTheDocument();
  });

  test("handles negative values gracefully", () => {
    const propsWithNegativeValues: SkipDetailCardProps = {
      ...defaultProps,
      size: -1,
      hire_period_days: -7,
      price_before_vat: -150,
    };
    render(<SkipCardDetails {...propsWithNegativeValues} />);

    expect(screen.getByText("-1 Yard")).toBeInTheDocument();
    expect(screen.getByText("-7 day hire period")).toBeInTheDocument();
    expect(screen.getByText("£-150.00")).toBeInTheDocument();
    expect(screen.getByText("Perfect for small project")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Selected" })
    ).toBeInTheDocument();
  });

  test("handles empty image prop", () => {
    const propsWithEmptyImage: SkipDetailCardProps = {
      ...defaultProps,
      image: "",
    };
    render(<SkipCardDetails {...propsWithEmptyImage} />);

    const image = screen.queryByRole("img", { name: "skip_image" });
    expect(image).not.toBeInTheDocument();
  });

  test("is accessible with button and image roles", () => {
    render(<SkipCardDetails {...defaultProps} />);

    expect(
      screen.getByRole("button", { name: "Selected" })
    ).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "skip_image" })).toBeInTheDocument();
  });
});
