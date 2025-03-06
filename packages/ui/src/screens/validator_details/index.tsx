import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';
import Layout from '@/components/layout';
import LoadAndExist from '@/components/load_and_exist';
import Blocks from '@/screens/validator_details/components/blocks';
import Staking from '@/screens/validator_details/components/staking';
import Transactions from '@/screens/validator_details/components/transactions';
import ValidatorOverview from '@/screens/validator_details/components/validator_overview';
import VotingPower from '@/screens/validator_details/components/voting_power';
import { useValidatorDetails } from '@/screens/validator_details/hooks';
import useStyles from '@/screens/validator_details/styles';
import Link from 'next/link';
import Box from '@/components/box';
import Markdown from '@/components/markdown';
import { Typography } from '@mui/material';
import Avatar from '@/components/avatar';
import { useProfileRecoil } from '@/recoil/profiles';
import { useDisplayStyles } from '@/styles/useSharedStyles';
import CopyIcon from 'shared-utils/assets/icon-copy.svg';
import { getMiddleEllipsis } from '@/utils/get_middle_ellipsis';
import { ACCOUNT_DETAILS } from '@/utils';
import { useAddress } from './components/validator_overview/hooks';

const ValidatorDetails = () => {
  const { t } = useTranslation('validators');
  const { classes, cx } = useStyles();
  const { state, loading } = useValidatorDetails();
  const display = useDisplayStyles().classes;
  const { exists, overview, status, votingPower } = state;

  const { imageUrl, name } = useProfileRecoil(overview.validator);
  const { handleCopyToClipboard } = useAddress(t);

  // const pattern = /^((http|https|ftp):\/\/)/;
  // let { website } = overview;

  // if (!pattern.test(overview.website)) {
  //   website = `//${overview.website}`;
  // }

  return (
    <>
      <NextSeo
        title={t('validatorDetails') ?? undefined}
        openGraph={{
          title: t('validatorDetails') ?? undefined,
        }}
      />
      <Layout navTitle={t('validatorDetails') ?? undefined}>
        <LoadAndExist exists={exists} loading={loading}>
          <div className={classes.root}>
            <div className={classes.block}>
              <Link href="/validators" className={classes.breadcrumb}>
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.5 13.5L5.5 8.5L10.5 3.5" stroke="#25D695" strokeWidth="1.5" />
                </svg>
                Back to all validators
              </Link>
              <div className={classes.title}>{t('validatorDetails')}</div>
            </div>
            <Box className={cx(classes.overviewBox, classes.profile)}>
              <Typography variant="h2">{t('overview')}</Typography>
              <div className={classes.overviewProfile}>
                <div className={classes.bio}>
                  <Avatar
                    address={overview.operatorAddress}
                    imageUrl={imageUrl ?? undefined}
                    className={cx(classes.avatar, display.hiddenUntilLg)}
                  />
                  <div>
                    <div className="bio__header">
                      {/* ======================== */}
                      {/* hiddenWhenLg header */}
                      {/* ======================== */}
                      <div className={classes.header}>
                        <Avatar
                          address={overview.operatorAddress}
                          imageUrl={imageUrl ?? undefined}
                          className={cx(classes.avatar, display.hiddenWhenLg)}
                        />
                        <div className="header__content">
                          <Typography variant="h2">{overview.moniker || name}</Typography>
                        </div>
                      </div>
                    </div>
                    {/* ======================== */}
                    {/* bio */}
                    {/* ======================== */}
                    {overview.description && (
                      <div className="bio__content">
                        <Markdown markdown={overview.description} />
                      </div>
                    )}
                  </div>
                </div>
                <div className={classes.addresses}>
                  <div className={cx(classes.copyText, classes.item)}>
                    <Typography variant="body1" className="label">
                      {t('operatorAddress')}
                    </Typography>
                    <div className="detail">
                      <CopyIcon
                        onClick={() => handleCopyToClipboard(overview.operatorAddress)}
                        className={classes.actionIcons}
                      />
                      <Typography variant="body1" className="value">
                        <span className={display.hiddenUntilLg}>{overview.operatorAddress}</span>
                        <span className={display.hiddenWhenLg}>
                          {getMiddleEllipsis(overview.operatorAddress, {
                            beginning: 15,
                            ending: 5,
                          })}
                        </span>
                      </Typography>
                    </div>
                  </div>

                  <div className={cx(classes.copyText, classes.item)}>
                    <Typography variant="body1" className="label">
                      {t('selfDelegateAddress')}
                    </Typography>
                    <div className="detail">
                      <CopyIcon
                        className={classes.actionIcons}
                        onClick={() => handleCopyToClipboard(overview.selfDelegateAddress)}
                      />
                      <Link
                        shallow
                        prefetch={false}
                        href={ACCOUNT_DETAILS(overview.selfDelegateAddress)}
                        className="value"
                      >
                        <span className={display.hiddenUntilLg}>
                          {overview.selfDelegateAddress}
                        </span>
                        <span className={display.hiddenWhenLg}>
                          {getMiddleEllipsis(overview.selfDelegateAddress, {
                            beginning: 15,
                            ending: 5,
                          })}
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <ValidatorOverview status={status} />
            </Box>
            <div className={classes.votingPowerBlocks}>
              <VotingPower
                className={classes.votingPower}
                data={votingPower}
                status={status.status}
              />
              <Blocks className={classes.blocks} />
            </div>
            <Staking className={classes.staking} />
            <Transactions className={classes.transactions} />
          </div>
        </LoadAndExist>
      </Layout>
    </>
  );
};

export default ValidatorDetails;
