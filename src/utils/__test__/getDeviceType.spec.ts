import getDeviceType from "../getDeviceType";

describe("getDeviceType", () => {
  test("returns 'mobile' for width less than 768", () => {
    expect(getDeviceType(0)).toBe("mobile");
    expect(getDeviceType(500)).toBe("mobile");
    expect(getDeviceType(767)).toBe("mobile");
  });

  test("returns 'tablet' for width between 768 and 1278 inclusive", () => {
    expect(getDeviceType(768)).toBe("tablet");
    expect(getDeviceType(1000)).toBe("tablet");
    expect(getDeviceType(1278)).toBe("tablet");
  });

  test("returns 'desktop' for width greater than or equal to 1279", () => {
    expect(getDeviceType(1279)).toBe("desktop");
    expect(getDeviceType(1280)).toBe("desktop");
    expect(getDeviceType(1920)).toBe("desktop");
  });
});
