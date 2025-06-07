import { create } from "zustand";
import createSkipSlice from "./slices/useSkipSlice";
const useBoundStore = create((set, get) => ({
  ...createSkipSlice(set, get),
}));

export default useBoundStore;
