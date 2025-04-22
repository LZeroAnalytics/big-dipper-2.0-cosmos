import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';
import { useRecoilValue } from 'recoil';
import { Switch, Typography } from '@mui/material';
import Box from '@/components/box';
import Layout from '@/components/layout';
import LoadAndExist from '@/components/load_and_exist';
import { readTx } from '@/recoil/settings';
import { useSettingList } from '@/components/nav/components/desktop/components/action_bar/components/settings_list/hooks';
import { useTransactions } from '@/screens/transactions_bridge/hooks';
import useStyles from '@/screens/transactions/styles';
import { useCallback, useMemo } from 'react';
import Tabs from '@/screens/transactions_bridge/components/tabs';
import TransactionsListBridge from '@/components/transactions_list_bridge';
import TransactionsListBridgeDetails from '@/components/transactions_list_bridge_details';

const Transactions = () => {
  const txListFormat = useRecoilValue(readTx);
  const { t } = useTranslation('transactions');
  const { classes, cx } = useStyles();
  const { state, loadBridgeNextPage, handleTabChange } = useTransactions();
  const { updateTxFormat } = useSettingList();

  const loadMoreBridgeItems = useMemo(
    () => (state.isBridgeNextPageLoading ? () => null : loadBridgeNextPage),
    [state.isBridgeNextPageLoading, loadBridgeNextPage]
  );
  const isBridgeItemLoaded = useCallback(
    (index: number) => !state.bridgeHasNextPage || index < state.bridgeItems.length,
    [state.bridgeItems.length, state.bridgeHasNextPage]
  );
  const bridgeItemCount = useMemo(
    () => (state.bridgeHasNextPage ? state.bridgeItems.length + 1 : state.bridgeItems.length),
    [state.bridgeHasNextPage, state.bridgeItems.length]
  );

  const renderTable = useMemo(
    () =>
      txListFormat === 'compact' ? (
        <TransactionsListBridge
          transactions={state.bridgeItems}
          itemCount={bridgeItemCount}
          hasNextPage={state.bridgeHasNextPage}
          isNextPageLoading={state.isBridgeNextPageLoading}
          loadNextPage={loadBridgeNextPage}
          loadMoreItems={loadMoreBridgeItems}
          isItemLoaded={isBridgeItemLoaded}
          assets={state.assets}
          metadatas={state.metadatas}
        />
      ) : (
        <TransactionsListBridgeDetails
          transactions={state.bridgeItems}
          itemCount={bridgeItemCount}
          hasNextPage={state.bridgeHasNextPage}
          isNextPageLoading={state.isBridgeNextPageLoading}
          loadNextPage={loadBridgeNextPage}
          loadMoreItems={loadMoreBridgeItems}
          isItemLoaded={isBridgeItemLoaded}
          assets={state.assets}
          metadatas={state.metadatas}
        />
      ),
    [
      bridgeItemCount,
      isBridgeItemLoaded,
      loadBridgeNextPage,
      loadMoreBridgeItems,
      state,
      txListFormat,
    ]
  );

  return (
    <>
      <NextSeo
        title={t('transactions') ?? undefined}
        openGraph={{
          title: t('transactions') ?? undefined,
        }}
      />
      <Layout
        navTitle={t('transactions') ?? undefined}
        className={classes.root}
        rootClassName={classes.layoutRoot}
        contentWrapperClassName={classes.layoutContentWrapper}
      >
        <LoadAndExist
          className={classes.contentWrapper}
          exists={state.exists}
          loading={state.bridgeLoading}
        >
          <div className={classes.header}>
            <Typography variant="h1">{t('transactions')}</Typography>
            <div className={classes.header}>
              <Typography variant="h4">{t('showDetails')}</Typography>
              <Switch
                color="primary"
                checked={txListFormat === 'detailed'}
                onChange={updateTxFormat}
              />
            </div>
          </div>
          <Tabs tab={1} handleTabChange={handleTabChange} />
          <Box className={cx(classes.box, 'scrollbar')}>{renderTable}</Box>
        </LoadAndExist>
      </Layout>
    </>
  );
};

export default Transactions;
