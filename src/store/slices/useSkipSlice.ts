import getElements from "../../services/api";
import SuccessResponseHandler from "../../services/SuccessResponseHandler";
const createSkipSlice = (set, get) => ({
  skipData: [],
  loading: false,
  skipDetailData: {},
  isCardSelected: null,
  currentSkipStep: 3,
  getSkipData: async () => {
    set({ loading: true });
    getElements("api/skips/by-location?postcode=NR32&area=Lowestoft")
      .then((response) => {
        if (response instanceof SuccessResponseHandler) {
          const proccessData =
            response.data.map((data) => {
              return {
                ...data,
                image:
                  "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/6-yarder-skip.jpg",
              };
            }) ?? [];

          set({
            skipData: proccessData.slice(0, 3),
            loading: false,
            skipDetailData: proccessData[0] ?? {},
            isCardSelected: proccessData[0].id ?? {},
          });
        }
      })
      .catch((error) => {});
  },
  selectSkip: (skipItem, id) => {
    set({ skipDetailData: skipItem, isCardSelected: id });
  },
});

export default createSkipSlice;
