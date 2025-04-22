import * as R from 'ramda';
import { useCallback, useEffect, useState } from 'react';
import { AssetsQuery, useAssetsQuery } from '@/graphql/types/general_types';
import axios from 'axios';

import chainConfig from '@/chainConfig';
import { useRouter } from 'next/router';
import { Asset, convertHexToString } from '../assets/hooks';

const { chainType, primaryTokenUnit, tokenUnits } = chainConfig();

interface AssetDetailsState {
  assetsLoading: boolean;
  metadataLoading: boolean;
  assetInfoLoading: boolean;
  loading: boolean;
  exists: boolean;
  data: {
    tokenHolderCount: any[];
    accountAggregate: any;
    supply: any;
  };
  assetsListItem: Asset | null;
  metadata: any;
  asset: any;
  assetInfo: any;
}

const formatAsset = ({
  metadata,
  asset,
  additionalData,
  assetInfo,
}: {
  metadata: any;
  asset: Asset;
  additionalData: any;
  assetInfo: any;
}) => {
  let holders = '0';
  let tokenType = 'native';
  let chain = 'Coreum';

  const assetInTotalSupply = additionalData?.supply?.coins?.find(
    (coin: any) => coin.denom === asset.denom
  );

  const exponent = metadata?.denom_units?.[1]?.exponent ?? 0;
  const descriptionValue = asset.description.length ? asset.description : metadata?.description;
  let display = metadata?.display ?? '';
  const symbol = metadata?.symbol ?? '';
  const supply = assetInTotalSupply?.amount ?? '0';

  if (asset.denom === primaryTokenUnit) {
    holders = additionalData?.accountAggregate?.aggregate?.count ?? 0;
    display = tokenUnits[primaryTokenUnit]?.display;
  } else {
    const assetInHolders = additionalData?.tokenHolderCount.find(
      (tokenHolderCount: any) => tokenHolderCount.denom === asset.denom
    );
    holders = String(assetInHolders?.holders) ?? '0';
  }

  if (asset.extra.xrpl_info && asset.extra.xrpl_info.source_chain === 'XRPL') {
    chain = 'XRP Ledger';
    tokenType = 'bridged';
    display =
      asset.extra.xrpl_info.currency.length === 40
        ? convertHexToString(asset.extra.xrpl_info.currency)
        : asset.extra.xrpl_info.currency;
  }

  return {
    ...asset,
    description: descriptionValue,
    exponent,
    display,
    symbol,
    holders,
    supply,
    tokenType,
    chain,
    dexSettings: assetInfo?.dex_settings,
  };
};

const formatAssetsQueryResponse = (data: any) => {
  const tokenHolderCount = data?.token_holder_count ?? [];
  const accountAggregate = data?.account_aggregate ?? { aggregate: { count: 0 } };
  const supply = data?.supply[0] ?? { coins: [], height: 0 };

  return {
    tokenHolderCount,
    accountAggregate,
    supply,
  };
};

export const useAssetDetails = () => {
  const router = useRouter();
  const [state, setState] = useState<AssetDetailsState>({
    assetsLoading: true,
    metadataLoading: true,
    assetInfoLoading: true,
    loading: true,
    exists: true,
    data: {
      supply: {
        coins: [],
        height: 0,
      },
      tokenHolderCount: [],
      accountAggregate: {
        aggregate: {
          count: 0,
        },
      },
    },
    metadata: null,
    assetsListItem: null,
    asset: null,
    assetInfo: null,
  });

  const handleSetState = useCallback(
    (stateChange: (prevState: AssetDetailsState) => AssetDetailsState) => {
      setState((prevState) => {
        const newState = stateChange(prevState);
        return R.equals(prevState, newState) ? prevState : newState;
      });
    },
    []
  );

  const getAssetsList = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://raw.githubusercontent.com/CoreumFoundation/token-registry/test/features/${chainType.toLowerCase()}/assets.json`
      );
      const selectedAssets = response.data.assets.filter(
        (item: any) => item.denom === router.query.address
      );

      handleSetState((prevState) => ({
        ...prevState,
        assetsLoading: false,
        assetsListItem: selectedAssets[0],
      }));
    } catch (error) {
      handleSetState((prevState) => ({
        ...prevState,
        assetsLoading: false,
        exists: false,
      }));
    }
  }, [router.query.address]);

  const getDenomMetadatas = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `https://full-node.${chainType.toLowerCase()}-1.coreum.dev:1317/cosmos/bank/v1beta1/denoms_metadata/${
          router.query.address
        }`
      );

      handleSetState((prevState) => ({
        ...prevState,
        metadataLoading: false,
        metadata: data.metadata,
      }));
    } catch (error) {
      handleSetState((prevState) => ({
        ...prevState,
        metadataLoading: false,
      }));
    }
  }, [router.query.address, chainType]);

  const getAssetFTInfo = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `https://full-node.${chainType.toLowerCase()}-1.coreum.dev:1317/coreum/asset/ft/v1/tokens/${
          router.query.address
        }`
      );

      handleSetState((prevState) => ({
        ...prevState,
        assetInfoLoading: false,
        assetInfo: data.token,
      }));
    } catch (error) {
      handleSetState((prevState) => ({
        ...prevState,
        assetInfoLoading: false,
      }));
    }
  }, [router.query.address]);

  useEffect(() => {
    getAssetsList();
    getDenomMetadatas();
    getAssetFTInfo();
  }, [router]);

  useAssetsQuery({
    onCompleted: (data: AssetsQuery) => {
      handleSetState((prevState) => ({
        ...prevState,
        loading: false,
        data: formatAssetsQueryResponse(data),
      }));
    },
    onError: () => {
      handleSetState((prevState) => ({
        ...prevState,
        loading: false,
      }));
    },
  });

  useEffect(() => {
    const {
      assetsListItem,
      assetsLoading,
      metadataLoading,
      loading,
      data,
      metadata,
      assetInfo,
      assetInfoLoading,
    } = state;

    if (!assetsListItem && !assetsLoading && !metadataLoading && !loading) {
      handleSetState((prevState) => ({
        ...prevState,
        exists: false,
      }));
    } else if (
      !assetsLoading &&
      !metadataLoading &&
      !assetInfoLoading &&
      !loading &&
      assetsListItem
    ) {
      handleSetState((prevState) => ({
        ...prevState,
        asset: formatAsset({
          metadata,
          asset: assetsListItem,
          additionalData: data,
          assetInfo,
        }),
      }));
    }
  }, [state]);

  return {
    state,
  };
};
