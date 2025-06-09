import { StateCreator } from "zustand";
import getElements from "../../../services/api";
import SuccessResponseHandler from "../../../services/SuccessResponseHandler";
import { SkipSlice, SkipItem } from "./useSkip.types";
const createSkipSlice: StateCreator<SkipSlice> = (set) => ({
  skipData: [],
  loading: false,
  skipDetailData: {
    id: 1,
    size: 8,
    hire_period_days: 14,
    price_before_vat: 200,
    image: "",
  },
  isCardSelected: null,
  currentSkipStep: 3,
  currentPage: 1,
  selectPage: (page: number) => {
    set({ currentPage: page });
  },
  getSkipData: async () => {
    set({ loading: true });
    getElements("api/skips/by-location?postcode=NR32&area=Lowestoft")
      .then((response) => {
        if (response instanceof SuccessResponseHandler) {
          const proccessData =
            response.data.map((data: SkipItem) => {
              return {
                ...data,
                image:
                  "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/6-yarder-skip.jpg",
              };
            }) ?? [];

          set({
            skipData: proccessData,
            loading: false,
            skipDetailData: proccessData[0] ?? {},
            isCardSelected: proccessData[0].id ?? "",
          });
        }
      })
      .catch((error) => {
        set({
          loading: false,
          skipData: [],
          skipDetailData: null,
          isCardSelected: undefined,
        });
      });
  },
  selectSkip: (skipItem: SkipItem | null, id?: number | null) => {
    set({ skipDetailData: skipItem, isCardSelected: id });
  },
});

export default createSkipSlice;
