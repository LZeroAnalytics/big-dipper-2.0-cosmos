import withGetStaticProps from '@/pages/withGetStaticProps';
import TransactionsBridge from '@/screens/transactions_bridge';
import type { NextPage } from 'next';
import nextI18NextConfig from '../../../next-i18next.config';

const TransactionsBridgePage: NextPage = () => <TransactionsBridge />;

export const getStaticProps = withGetStaticProps(
  nextI18NextConfig,
  'common',
  'transactions',
  'message_labels',
  'message_contents'
);

export default TransactionsBridgePage;
