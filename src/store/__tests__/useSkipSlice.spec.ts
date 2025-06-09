import { act } from "@testing-library/react";
import { create } from "zustand";
import createSkipSlice from "../slices/useSkipSlice/useSkipSlice";
import { SkipSlice, SkipItem } from "../slices/useSkipSlice/useSkip.types";
import getElements from "../../services/api";
import SuccessResponseHandler from "../../services/SuccessResponseHandler";

jest.mock("../../services/api");

const createTestStore = () =>
  create<SkipSlice>((set, get, store) => ({
    ...createSkipSlice(set, get, store),
  }));

describe("useSkipSlice", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should have the correct initial state", () => {
    const store = createTestStore();
    expect(store.getState().skipData).toEqual([]);
    expect(store.getState().loading).toBe(false);
    expect(store.getState().skipDetailData).toEqual({
      id: 1,
      size: 8,
      hire_period_days: 14,
      price_before_vat: 200,
      image: "",
    });
    expect(store.getState().isCardSelected).toBeNull();
    expect(store.getState().currentSkipStep).toBe(3);
    expect(store.getState().currentPage).toBe(1);
  });

  it("should update currentPage with selectPage", () => {
    const store = createTestStore();
    act(() => {
      store.getState().selectPage(5);
    });
    expect(store.getState().currentPage).toBe(5);
  });

  it("should update skipDetailData and isCardSelected with selectSkip", () => {
    const store = createTestStore();
    const skipItem: SkipItem = {
      id: 2,
      size: 10,
      hire_period_days: 7,
      price_before_vat: 500,
      image: "test.jpg",
    };
    act(() => {
      store.getState().selectSkip(skipItem, 2);
    });
    expect(store.getState().skipDetailData).toEqual(skipItem);
    expect(store.getState().isCardSelected).toBe(2);
  });

  it("should fetch skip data and update state on success", async () => {
    const store = createTestStore();
    const mockData: SkipItem[] = [
      {
        id: 3,
        size: 6,
        hire_period_days: 10,
        price_before_vat: 300,
      },
    ];
    const mockResponse = new SuccessResponseHandler(true, 200, mockData);
    (getElements as jest.Mock).mockResolvedValueOnce(mockResponse);

    await act(async () => {
      await store.getState().getSkipData();
    });

    expect(getElements).toHaveBeenCalledWith(
      "api/skips/by-location?postcode=NR32&area=Lowestoft"
    );
    expect(store.getState().loading).toBe(false);
    expect(store.getState().skipData).toEqual(
      mockData.map((item) => ({
        ...item,
        image:
          "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/6-yarder-skip.jpg",
      }))
    );
    expect(store.getState().skipDetailData).toEqual({
      ...mockData[0],
      image:
        "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/6-yarder-skip.jpg",
    });
    expect(store.getState().isCardSelected).toBe(3);
  });

  it("should handle empty API response", async () => {
    const store = createTestStore();
    const mockResponse = new SuccessResponseHandler(true, 200, []);
    (getElements as jest.Mock).mockResolvedValueOnce(mockResponse);

    await act(async () => {
      await store.getState().getSkipData();
    });

    expect(store.getState().loading).toBe(false);
    expect(store.getState().skipData).toEqual([]);
    expect(store.getState().skipDetailData).toBeNull();
    expect(store.getState().isCardSelected).toBeUndefined();
  });

  it("should handle API error", async () => {
    const store = createTestStore();
    (getElements as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

    await act(async () => {
      await store.getState().getSkipData();
    });

    expect(store.getState().loading).toBe(false);
    expect(store.getState().skipData).toEqual([]);
    expect(store.getState().skipDetailData).toBeNull();
    expect(store.getState().isCardSelected).toBeUndefined();
  });
});
