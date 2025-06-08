import currencyFormatter from "../currencyFormatter";

describe("currencyFormatter", () => {
  it("formats whole numbers in GBP (default)", () => {
    expect(currencyFormatter(100)).toBe("£100");
  });

  it("formats decimal numbers in GBP (default)", () => {
    expect(currencyFormatter(100.5)).toBe("£100.50");
  });
});
