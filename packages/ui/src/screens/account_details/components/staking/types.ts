import { ApolloError } from '@apollo/client';

export type StakingType<T> = {
  data: T[];
  count: number | undefined;
  loading: boolean;
  error: ApolloError | undefined;
};

export interface DelegationType {
  validator: string;
  amount: TokenUnit;
  reward: TokenUnit;
  commission?: number;
  name?: string;
  address?: string;
  imageUrl?: string;
  overview?: {
    moniker?: string;
    avatarUrl?: string;
  };
}

export interface RedelegationType {
  from: string;
  to: string;
  amount: TokenUnit;
  completionTime: string;
  overviewFrom?: {
    moniker?: string;
    avatarUrl?: string;
  };
  overviewTo?: {
    moniker?: string;
    avatarUrl?: string;
  };
}

export interface UnbondingType {
  validator: string;
  amount: TokenUnit;
  completionTime: string;
  overview?: {
    moniker?: string;
    avatarUrl?: string;
  };
}

export type DelegationsType = StakingType<DelegationType>;
export type RedelegationsType = StakingType<RedelegationType>;
export type UnbondingsType = StakingType<UnbondingType>;

export interface StakingState {
  tab: number;
}
