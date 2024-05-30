import * as R from 'ramda';
import { useCallback, useEffect, useMemo, useState } from 'react';
import chainConfig from '@/chainConfig';
import { useTokenPriceHistoryQuery } from '@/graphql/types/general_types';
import type { HeroState } from '@/screens/home/components/hero/types';

const { primaryTokenUnit, tokenUnits, chainType } = chainConfig();

export const useHero = () => {
  const itemsToLoad = 7 * (chainType.toLowerCase() === 'testnet' ? 24 : 96); // Count of ticks for the last 7 days. This value is approximate

  const [state, setState] = useState<HeroState>({
    loading: true,
    exists: true,
    tokenPriceHistory: [],
    isAllDataLoaded: false,
    dataLoading: true,
  });

  const handleSetState = useCallback((stateChange: (prevState: HeroState) => HeroState) => {
    setState((prevState) => {
      const newState = stateChange(prevState);
      return R.equals(prevState, newState) ? prevState : newState;
    });
  }, []);

  const tokenPriceHistoryQuery = useTokenPriceHistoryQuery({
    variables: {
      limit: 100,
      denom: tokenUnits?.[primaryTokenUnit]?.display,
    },
    onCompleted: (data) => {
      handleSetState((prevState) => ({
        ...prevState,
        dataLoading: itemsToLoad <= data.tokenPrice.length,
        tokenPriceHistory: data.tokenPrice.map((x) => ({ price: x.price, timestamp: x.timestamp })),
      }));
    },
    onError: () => {
      handleSetState((prevState) => ({ ...prevState, dataLoading: false }));
    },
  });

  const loadMoreData = useCallback(async () => {
    const limit =
      itemsToLoad - state.tokenPriceHistory.length > 100
        ? 100
        : itemsToLoad - state.tokenPriceHistory.length;

    await tokenPriceHistoryQuery
      .fetchMore({
        variables: {
          offset: state.tokenPriceHistory.length,
          limit,
        },
      })
      .then(({ data }) => {
        handleSetState((prevState) => ({
          ...prevState,
          dataLoading: false,
          tokenPriceHistory: prevState.tokenPriceHistory.concat(
            data.tokenPrice.map((x) => ({ price: x.price, timestamp: x.timestamp }))
          ),
        }));
      });

    if (limit !== 100) {
      handleSetState((prevState) => ({
        ...prevState,
        loading: false,
        isAllDataLoaded: true,
      }));
    }
  }, [handleSetState, itemsToLoad, state.tokenPriceHistory.length, tokenPriceHistoryQuery]);

  useEffect(() => {
    if (!state.isAllDataLoaded && !state.dataLoading) {
      handleSetState((prevState) => ({ ...prevState, dataLoading: true }));
      loadMoreData();
    }
  }, [handleSetState, loadMoreData, state.dataLoading, state.isAllDataLoaded, state.loading]);

  const formattedData = useMemo(
    () =>
      state.tokenPriceHistory
        .sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))
        .map((x) => {
          const time = new Date(x.timestamp);

          return {
            value: x.price as number,
            time: Math.floor(time.getTime() / 1000),
          };
        }),
    [state.tokenPriceHistory]
  );

  return {
    state,
    tokenPriceHistory: formattedData,
  };
};
