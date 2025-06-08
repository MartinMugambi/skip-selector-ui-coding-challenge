import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BottomSheet from "../BottomSheet";

describe("unit test: BottomSheet", () => {
  it("renders Back and Continue buttons", () => {
    render(<BottomSheet />);
    expect(screen.getByRole("button", { name: /back/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /continue/i })
    ).toBeInTheDocument();
  });
});
