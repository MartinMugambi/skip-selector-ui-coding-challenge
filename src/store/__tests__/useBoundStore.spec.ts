import { renderHook, act } from "@testing-library/react";
import { StoreApi } from "zustand";
import SuccessResponseHandler from "../../services/SuccessResponseHandler";
import getElements from "../../services/api";
import { SkipSlice, SkipItem } from "../slices/useSkipSlice/useSkip.types";

jest.mock("../slices/useSkipSlice/useSkipSlice", () => {
  const mockCreateSkipSlice = jest.fn(
    (set: any, get: any, store: StoreApi<SkipSlice>) => {
      return {
        skipData: [],
        loading: false,
        skipDetailData: {},
        isCardSelected: null,
        currentSkipStep: 3,
        currentPage: 1,
        selectPage: (page: number) => {
          set({ currentPage: page });
        },
        getSkipData: async () => {
          set({ loading: true });
          try {
            const response = await getElements(
              "api/skips/by-location?postcode=NR32&area=Lowestoft"
            );
            if (response instanceof SuccessResponseHandler) {
              const processedData = (response.data ?? []).map(
                (data: SkipItem) => ({
                  ...data,
                  image:
                    "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/6-yarder-skip.jpg",
                })
              );

              set({
                skipData: processedData,
                loading: false,
                skipDetailData: processedData[0] ?? {},
                isCardSelected: processedData[0]?.id.toString() ?? null,
              });
            }
          } catch (error) {
            set({ loading: false });
          }
        },
        selectSkip: (skipItem: SkipItem, id: string) => {
          set({ skipDetailData: skipItem, isCardSelected: id });
        },
      };
    }
  );
  return {
    __esModule: true,
    default: mockCreateSkipSlice,
  };
});

jest.mock("../../services/api");

import createSkipSlice from "../slices/useSkipSlice/useSkipSlice";
import useBoundStore from "../useBoundStore";

describe("useBoundStore", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should update currentPage with selectPage", () => {
    const { result } = renderHook(() => useBoundStore((state) => state));

    act(() => {
      result.current.selectPage(2);
    });

    expect(result.current.currentPage).toBe(2);
  });

  test("should fetch skip data and update state on success", async () => {
    const mockData: SkipItem[] = [
      {
        id: 17933,
        size: 4,
        hire_period_days: 14,
        price_before_vat: 278,
      },
    ];
    const mockResponse = new SuccessResponseHandler(true, 200, mockData);
    (getElements as jest.Mock).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useBoundStore((state) => state));

    await act(async () => {
      await result.current.getSkipData();
    });

    expect(getElements).toHaveBeenCalledWith(
      "api/skips/by-location?postcode=NR32&area=Lowestoft"
    );
    expect(result.current.loading).toBe(false);
    expect(result.current.skipData).toEqual(
      mockData.map((item) => ({
        ...item,
        image:
          "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/6-yarder-skip.jpg",
      }))
    );
    expect(result.current.skipDetailData).toEqual({
      ...mockData[0],
      image:
        "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/6-yarder-skip.jpg",
    });
    expect(result.current.isCardSelected).toBe("17933");
  });

  test("should handle empty API response", async () => {
    const mockResponse = new SuccessResponseHandler(true, 200, []);
    (getElements as jest.Mock).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useBoundStore((state) => state));

    await act(async () => {
      await result.current.getSkipData();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.skipData).toEqual([]);
    expect(result.current.skipDetailData).toEqual({});
    expect(result.current.isCardSelected).toBeNull();
  });

  test("should handle API error", async () => {
    (getElements as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

    const { result } = renderHook(() => useBoundStore((state) => state));

    await act(async () => {
      await result.current.getSkipData();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.skipData).toEqual([]);
    expect(result.current.skipDetailData).toEqual({});
    expect(result.current.isCardSelected).toBeNull();
  });

  test("should update skipDetailData and isCardSelected with selectSkip", () => {
    const { result } = renderHook(() => useBoundStore((state) => state));

    const skipItem: SkipItem = {
      id: 1,
      size: 6,
      hire_period_days: 7,
      price_before_vat: 300,
      image: "test.jpg",
    };
    act(() => {
      result.current.selectSkip(skipItem, 1);
    });

    expect(result.current.skipDetailData).toEqual(skipItem);
    expect(result.current.isCardSelected).toBe(1);
  });
});
