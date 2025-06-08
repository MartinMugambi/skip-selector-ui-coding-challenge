import { renderHook, act, waitFor } from "@testing-library/react";
import useResponsive from "../useResponssive";
import getDeviceType from "../../utils/getDeviceType";

jest.mock("../../utils/getDeviceType");

const mockResizeEvent = new Event("resize");
const setWindowWidth = (width: number) => {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: width,
  });
};

describe("useResponsive", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    setWindowWidth(1024);
  });

  it("should initialize with correct device type", () => {
    (getDeviceType as jest.Mock).mockReturnValue("desktop");
    const { result } = renderHook(() => useResponsive());

    expect(getDeviceType).toHaveBeenCalledWith(1024);
    expect(result.current).toEqual({
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    });
  });

  it("should update device type on window resize to mobile", async () => {
    (getDeviceType as jest.Mock)
      .mockReturnValueOnce("desktop")
      .mockReturnValueOnce("mobile");

    const { result } = renderHook(() => useResponsive());

    await act(async () => {
      setWindowWidth(500);
      window.dispatchEvent(mockResizeEvent);
    });

    await waitFor(() => {
      expect(getDeviceType).toHaveBeenCalledWith(500);
      expect(result.current).toEqual({
        isMobile: true,
        isTablet: false,
        isDesktop: false,
      });
    });
  });

  it("should update device type on window resize to tablet", async () => {
    (getDeviceType as jest.Mock)
      .mockReturnValueOnce("desktop")
      .mockReturnValueOnce("tablet");

    const { result } = renderHook(() => useResponsive());

    await act(async () => {
      setWindowWidth(768);
      window.dispatchEvent(mockResizeEvent);
    });

    await waitFor(() => {
      expect(getDeviceType).toHaveBeenCalledWith(768);
      expect(result.current).toEqual({
        isMobile: false,
        isTablet: true,
        isDesktop: false,
      });
    });
  });

  it("should clean up event listener on unmount", () => {
    const addEventListenerSpy = jest.spyOn(window, "addEventListener");
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
    (getDeviceType as jest.Mock).mockReturnValue("desktop");

    const { unmount } = renderHook(() => useResponsive());

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    );
  });
});
