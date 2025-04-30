export interface OverviewType {
  height: number;
  hash: string;
  txs: number;
  timestamp: string;
  proposer: string;
  moniker?: string;
  // votingPower: number;
}

export interface BlockDetailState {
  loading: boolean;
  exists: boolean;
  overview: OverviewType;
  signatures: { address: string; moniker: string }[];
  transactions: Transactions[];
}
