import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button";

describe("Unit test: Button component", () => {
  test("renders button  title", () => {
    render(<Button title="Click me" onClick={() => {}} />);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test("calls the onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button title="Click me" onClick={handleClick} />);
    const buttonElement = screen.getByRole("button", { name: /click me/i });

    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
