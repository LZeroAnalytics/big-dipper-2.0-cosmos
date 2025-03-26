import Box from '@/components/box';
import { useWindowOrigin } from '@/hooks/use_window';
import { useOverview } from '@/screens/account_details/components/overview/hooks';
import useStyles from '@/screens/account_details/components/overview/styles';
import { useDisplayStyles } from '@/styles/useSharedStyles';
import { getMiddleEllipsis } from '@/utils/get_middle_ellipsis';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { QRCodeSVG } from 'qrcode.react';
import { FC } from 'react';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import CopyIcon from 'shared-utils/assets/icon-copy.svg';
import ShareIcon from 'shared-utils/assets/icon-share.svg';
import CloseButton from '@/assets/close-share-modal.svg';
import dynamic from 'next/dynamic';

const GaugeComponent = dynamic(() => import('react-gauge-component'), { ssr: false });

type OverviewProps = {
  className?: string;
  withdrawalAddress: string;
  address: string;
  domain: string;
  riskScoreData: {
    isAddressValid: boolean;
    level: number;
    score: number;
    verdict_time: number;
  } | null;
};

const Overview: FC<OverviewProps> = ({
  className,
  address,
  withdrawalAddress,
  domain,
  riskScoreData,
}) => {
  const { location } = useWindowOrigin();
  const { classes, cx } = useStyles();
  const display = useDisplayStyles().classes;
  const { t } = useTranslation('accounts');
  const { open, handleClose, handleOpen, handleCopyToClipboard } = useOverview(t);

  const url = `${location}/coreum/accounts/${address}`;
  const hashTags = ['coreumexplorer', 'coreum'];

  return (
    <>
      <Dialog
        classes={{ paper: classes.rootDialog }}
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <Box className={classes.dialog}>
          <div className="modal-header">
            <Typography variant="h3" align="center">
              {t('shareAddress')}
            </Typography>
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div onClick={handleClose} className="close-btn">
              <CloseButton />
            </div>
          </div>
          <div className="qrWrapper">
            <div className="qrWrapperContent">
              <Typography variant="body1" align="center">
                {t('scanForAddress')}
              </Typography>
              <QRCodeSVG value={address} size={200} bgColor="#ffffff" fgColor="#000000" />
            </div>
          </div>
          <div className="divider">
            <div className="divider-line" />
            <div className="divider-text">{t('or')}</div>
          </div>
          <div className="dialog__share--wrapper">
            <Typography variant="body1">{t('shareTo')}</Typography>
            <div className={classes.icons}>
              <EmailShareButton
                url={url}
                subject="address"
                body={address}
                separator=":: "
                className="share-buttons email"
              >
                <EmailIcon round />
              </EmailShareButton>
              <FacebookShareButton
                url={url}
                quote={address}
                hashtag={hashTags[0]}
                className="share-buttons"
              >
                <FacebookIcon round />
              </FacebookShareButton>
              <TwitterShareButton
                url={url}
                title={address}
                hashtags={hashTags}
                className="share-buttons"
              >
                <TwitterIcon round />
              </TwitterShareButton>
              <TelegramShareButton url={url} title={address} className="share-buttons">
                <TelegramIcon round />
              </TelegramShareButton>
              <WhatsappShareButton
                url={url}
                title={address}
                separator=":: "
                className="share-buttons"
              >
                <WhatsappIcon round />
              </WhatsappShareButton>
            </div>
          </div>
        </Box>
      </Dialog>
      <div className={classes.overviewRoot}>
        <Box className={cx(classes.root, className)}>
          <Typography variant="h2" align="left">
            {t('account_overview')}
          </Typography>
          <div className={classes.flex}>
            <div className={cx(classes.copyText, classes.item)}>
              <Typography variant="body1" className="label">
                {t('address')}
              </Typography>
              <div className="detail">
                <CopyIcon
                  onClick={() => handleCopyToClipboard(address)}
                  className={classes.actionIcons}
                />
                <ShareIcon onClick={handleOpen} className={classes.actionIcons} />
                <Typography variant="body1" className="value">
                  {getMiddleEllipsis(address, {
                    beginning: 15,
                    ending: 5,
                  })}
                </Typography>
              </div>
            </div>

            <div className={cx(classes.copyText, classes.item)}>
              <Typography variant="body1" className="label">
                {t('rewardAddress')}
              </Typography>
              <div className="detail">
                <CopyIcon
                  className={classes.actionIcons}
                  onClick={() => handleCopyToClipboard(withdrawalAddress)}
                />
                <Typography variant="body1" className="value">
                  {getMiddleEllipsis(withdrawalAddress, {
                    beginning: 15,
                    ending: 5,
                  })}
                </Typography>
              </div>
            </div>
          </div>

          {!!domain.length && (
            <div className={cx(classes.copyText, classes.item)}>
              <Typography variant="body1" className="label">
                {t('domain')}
              </Typography>
              <div className="detail">
                <CopyIcon
                  className={classes.actionIcons}
                  onClick={() => handleCopyToClipboard(domain)}
                />
                <Typography variant="body1" className="value">
                  <span className={display.hiddenUntilLg}>{domain}</span>
                  <span className={display.hiddenWhenLg}>
                    {getMiddleEllipsis(domain, {
                      beginning: 15,
                      ending: 5,
                    })}
                  </span>
                </Typography>
              </div>
            </div>
          )}
        </Box>

        {!!riskScoreData && riskScoreData.isAddressValid && (
          <Box className={cx(classes.root, className)}>
            <Typography variant="h2" align="left">
              {t('account_risk_score')}
            </Typography>
            <div className={classes.flex}>
              <GaugeComponent
                type="radial"
                arc={{
                  padding: 0,
                  width: 0.2,
                  subArcs: [
                    {
                      limit: 29,
                      color: '#179B69',
                      showTick: false,
                      tooltip: {
                        text: t('risk_level_1') || '',
                        style: {
                          maxWidth: '300px',
                          textShadow: 'none',
                        },
                      },
                    },
                    {
                      limit: 50,
                      color: '#004DC2',
                      showTick: false,
                      tooltip: {
                        text: t('risk_level_2') || '',
                        style: {
                          maxWidth: '300px',
                          textShadow: 'none',
                        },
                      },
                    },
                    {
                      limit: 79,
                      color: '#FF9900',
                      showTick: false,
                      tooltip: {
                        text: t('risk_level_3') || '',
                        style: {
                          maxWidth: '300px',
                          textShadow: 'none',
                        },
                      },
                    },
                    {
                      limit: 100,
                      color: '#C67070',
                      showTick: false,
                      tooltip: {
                        text: t('risk_level_4') || '',
                        style: {
                          maxWidth: '300px',
                          textShadow: 'none',
                        },
                      },
                    },
                  ],
                }}
                labels={{
                  valueLabel: {
                    style: {
                      fontSize: 36,
                      fontWeight: 600,
                      // eslint-disable-next-line no-nested-ternary
                      fill:
                        riskScoreData?.score < 30
                          ? '#179B69'
                          : riskScoreData?.score <= 50
                            ? '#004DC2'
                            : riskScoreData?.score < 80
                              ? '#FF9900'
                              : '#C67070',
                      marginTop: '-50px',
                    },
                    formatTextValue: () => String(riskScoreData?.score),
                  },
                  tickLabels: {
                    type: 'inner',
                    // hideMinMax: true,
                    ticks: [{ value: 30 }, { value: 50 }, { value: 80 }],
                    defaultTickValueConfig: {
                      formatTextValue: (value: number) => String(value),
                    },
                  },
                }}
                value={riskScoreData?.score}
                pointer={{
                  type: 'arrow',
                  length: 0.7,
                  width: 20,
                  color: '#a7a7a7',
                }}
              />
            </div>
          </Box>
        )}
      </div>
    </>
  );
};

export default Overview;
