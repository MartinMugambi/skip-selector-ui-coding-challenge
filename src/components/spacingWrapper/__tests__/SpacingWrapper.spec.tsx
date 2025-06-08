import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SpacingWrapper from "../SpacingWrapper";

describe("SpacingWrapper", () => {
  it("should render children correctly", () => {
    const testContent = "Test Content";
    render(
      <SpacingWrapper>
        <div>{testContent}</div>
      </SpacingWrapper>
    );

    expect(screen.getByText(testContent)).toBeInTheDocument();
  });
});
