import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';
import Layout from '@/components/layout';
import LoadAndExist from '@/components/load_and_exist';
import Deposits from '@/screens/proposal_details/components/deposits';
import Overview from '@/screens/proposal_details/components/overview';
import Votes from '@/screens/proposal_details/components/votes';
import VotesGraph from '@/screens/proposal_details/components/votes_graph';
import { useProposalDetails } from '@/screens/proposal_details/hooks';
import useStyles from '@/screens/proposal_details/styles';
import { shouldShowData } from '@/screens/proposal_details/utils';
import Link from 'next/link';

const ProposalDetails = () => {
  const { t } = useTranslation('proposals');
  const { classes } = useStyles();
  const { state } = useProposalDetails();
  const { overview } = state;

  return (
    <>
      <NextSeo
        title={t('proposalDetails') ?? undefined}
        openGraph={{
          title: t('proposalDetails') ?? undefined,
        }}
      />
      <Layout navTitle={t('proposalDetails') ?? undefined}>
        <LoadAndExist exists={state.exists} loading={state.loading}>
          <span className={classes.root}>
            <div className={classes.block}>
              <Link href="/proposals" className={classes.breadcrumb}>
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.5 13.5L5.5 8.5L10.5 3.5" stroke="#25D695" strokeWidth="1.5" />
                </svg>
                Back to all proposals
              </Link>
              <div className={classes.title}>{t('proposalDetails')}</div>
            </div>
            <Overview className={classes.overview} overview={overview} />
            {shouldShowData(overview.status) && <VotesGraph className={classes.votesGraph} />}
            {shouldShowData(overview.status) && <Votes className={classes.votes} />}
            <Deposits className={classes.deposits} />
          </span>
        </LoadAndExist>
      </Layout>
    </>
  );
};

export default ProposalDetails;
