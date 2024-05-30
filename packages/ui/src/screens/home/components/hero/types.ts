export interface TokenPriceType {
  time: string;
  value: number;
}

export interface HeroState {
  loading: boolean;
  exists: boolean;
  tokenPriceHistory: any[];
  isAllDataLoaded: boolean;
  dataLoading: boolean;
}
