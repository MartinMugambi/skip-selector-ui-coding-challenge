import { create } from "zustand";
import { SkipSlice } from "./slices/useSkipSlice/useSkip.types";
import createSkipSlice from "./slices/useSkipSlice/useSkipSlice";
const useBoundStore = create<SkipSlice>((set, get, store) => ({
  ...createSkipSlice(set, get, store),
}));

export default useBoundStore;
