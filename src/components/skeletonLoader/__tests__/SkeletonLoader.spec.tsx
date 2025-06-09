import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import SkeletonLoader from "../SkeletonLoader";

jest.mock("../SkeletonLoader.module.css", () => ({
  skeleton: "skeleton-mock-class",
}));
describe("SkeletonLoader", () => {
  it("renders with default props", () => {
    const { container } = render(<SkeletonLoader />);
    const span = container.querySelector("span");
    expect(span).toBeInTheDocument();
    expect(span).toHaveClass("skeleton-mock-class");
    expect(span).toHaveStyle({
      width: "100%",
      height: "24px",
      borderRadius: "4px",
      display: "block",
    });
  });

  it("renders with custom width, height, and className", () => {
    const { container } = render(
      <SkeletonLoader width={200} height={40} className="custom-class" />
    );
    const span = container.querySelector("span");
    expect(span).toHaveClass("skeleton-mock-class");
    expect(span).toHaveClass("custom-class");
    expect(span).toHaveStyle({
      width: "200px",
      height: "40px",
      borderRadius: "4px",
      display: "block",
    });
  });

  it("applies custom style prop", () => {
    const { container } = render(
      <SkeletonLoader style={{ backgroundColor: "red", borderRadius: 10 }} />
    );
    const span = container.querySelector("span");
    expect(span).toHaveStyle(
      "background-color: rgb(255, 0, 0); border-radius: 10px;"
    );
  });
});
