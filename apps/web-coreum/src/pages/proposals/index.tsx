import withGetStaticProps from '@/pages/withGetStaticProps';
import Proposals from '@/screens/proposals';
import type { NextPage } from 'next';
import nextI18NextConfig from '../../../next-i18next.config';

const ProposalsPage: NextPage = () => <Proposals />;

export const getStaticProps = withGetStaticProps(nextI18NextConfig, 'common', 'proposals');

export default ProposalsPage;
