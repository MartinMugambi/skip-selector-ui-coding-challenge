import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ProgressBar from "../ProgressBar";
import useBoundStore from "../../../store/useBoundStore";

jest.mock("../../../store/useBoundStore", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../ProgressData", () => ({
  __esModule: true,
  default: [
    { id: 1, title: "Postcode" },
    { id: 2, title: "Waste Type" },
    { id: 3, title: "Select Skip" },
    { id: 4, title: "Permit Check" },
    { id: 5, title: "Choose Date" },
    { id: 6, title: "Confirm Date" },
  ],
}));

describe("unit test ProgressBar Component", () => {
  const mockUseBoundStore = useBoundStore as unknown as jest.MockedFunction<
    <T>(selector: (state: { currentSkipStep: number }) => T) => T
  >;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseBoundStore.mockImplementation((selector) =>
      selector({ currentSkipStep: 1 })
    );
  });

  test("renders progress bar with correct attributes", () => {
    render(<ProgressBar />);

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveAttribute("max", "100");
    expect(progressBar).toHaveAttribute("value", "38");
    expect(progressBar).toHaveClass("progressBar");
  });

  test("renders correct number of progress items", () => {
    render(<ProgressBar />);

    const progressItems = screen.getAllByText(/^\d$/);
    expect(progressItems).toHaveLength(6);

    expect(screen.getByText("Postcode")).toBeInTheDocument();
    expect(screen.getByText("Waste Type")).toBeInTheDocument();
    expect(screen.getByText("Select Skip")).toBeInTheDocument();
    expect(screen.getByText("Permit Check")).toBeInTheDocument();
    expect(screen.getByText("Choose Date")).toBeInTheDocument();
    expect(screen.getByText("Confirm Date")).toBeInTheDocument();
  });

  test("applies selected class to current step", () => {
    mockUseBoundStore.mockImplementation((selector) =>
      selector({ currentSkipStep: 2 })
    );
    render(<ProgressBar />);

    const progressCounts = screen.getAllByText(/^\d$/);
    expect(progressCounts[1]).toHaveClass("progressBarSelected"); // Step 2
    expect(progressCounts[0]).toHaveClass("progressBarUnSelected"); // Step 1
    expect(progressCounts[2]).toHaveClass("progressBarUnSelected"); // Step 3
  });

  test("applies container and items classes correctly", () => {
    render(<ProgressBar />);

    const container = screen.getByRole("main");
    expect(container).toHaveClass("progressContainer");

    const itemsContainer = screen.getByRole("region");
    expect(itemsContainer).toHaveClass("progressBarItems");

    const titles = screen.getAllByText(
      /Postcode|Waste Type|Select Skip|Permit Check|Choose Date|Confirm Date/
    );
    titles.forEach((title) => {
      expect(title).toHaveClass("progressTitle");
    });
  });

  test("renders correctly with invalid currentSkipStep", () => {
    mockUseBoundStore.mockImplementation((selector) =>
      selector({ currentSkipStep: 999 })
    );
    render(<ProgressBar />);

    const progressCounts = screen.getAllByText(/^\d$/);
    expect(progressCounts).toHaveLength(6);
    progressCounts.forEach((count) => {
      expect(count).toHaveClass("progressBarUnSelected");
    });
  });
});
