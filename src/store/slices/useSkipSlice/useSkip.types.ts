export interface SkipItem {
  id: number;
  size: number;
  hire_period_days: number;
  price_before_vat: number;
  image?: string;
}

export interface SkipSlice {
  skipData: SkipItem[];
  loading: boolean;
  skipDetailData: SkipItem | null;
  isCardSelected: number | null;
  currentSkipStep: number;
  currentPage: number;
  selectPage: (page: number) => void;
  getSkipData: () => Promise<void>;
  selectSkip: (skipItem: SkipItem | null, id: number | null) => void;
}
