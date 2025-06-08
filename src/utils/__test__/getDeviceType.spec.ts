import getDeviceType from "../getDeviceType";

describe("getDeviceType", () => {
  it("returns 'mobile' for widths less than 768", () => {
    expect(getDeviceType(320)).toBe("mobile");
    expect(getDeviceType(767)).toBe("mobile");
  });

  it("returns 'tablet' for widths between 768 and 1023", () => {
    expect(getDeviceType(768)).toBe("tablet");
    expect(getDeviceType(1023)).toBe("tablet");
  });

  it("returns 'desktop' for widths 1024 and above", () => {
    expect(getDeviceType(1024)).toBe("desktop");
    expect(getDeviceType(1440)).toBe("desktop");
  });
});
