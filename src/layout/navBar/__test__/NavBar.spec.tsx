import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import NavBar from "../NavBar";

describe(" Unit test: NavBar Component", () => {
  it("renders the title prop", () => {
    const title = "Test Title";
    render(<NavBar title={title} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(title);
  });
});
