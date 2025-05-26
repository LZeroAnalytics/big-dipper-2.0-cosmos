import withGetStaticProps from '@/pages/withGetStaticProps';
import type { NextPage } from 'next';
import AssetIBCDetails from '@/screens/asset_ibc_details';
import nextI18NextConfig from '../../../../next-i18next.config';

const AssetIBCDetailsPage: NextPage = () => <AssetIBCDetails />;

export const getStaticPaths = () => ({ paths: [], fallback: 'blocking' });
export const getStaticProps = withGetStaticProps(
  nextI18NextConfig,
  'assets',
  'common',
  'message_labels',
  'message_contents'
);

export default AssetIBCDetailsPage;
