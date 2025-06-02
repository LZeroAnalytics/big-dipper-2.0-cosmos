import Box from '@/components/box';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import numeral from 'numeral';
import { Divider } from '@mui/material';
import chainConfig from '@/chainConfig';
import useStyles from './styles';

const { primaryTokenUnit } = chainConfig();

type AssetDetailsOverviewProps = {
  className?: string;
  asset: any;
};

const AssetDetailsOverview: FC<AssetDetailsOverviewProps> = ({ asset, className }) => {
  const { classes } = useStyles();
  const { t } = useTranslation('assets');
  const {
    denom,
    exponent,
    mintingEnabled,
    burningEnabled,
    freezingEnabled,
    whitelistingEnabled,
    issuer,
    sendCommissionRate,
    burnRate,
  } = asset;

  const holders = numeral(asset.holders).format('0,0');

  const preDividerDataItems = [
    {
      key: 'denom',
      name: (
        <Typography variant="h4" className="label">
          {t('denom')}
        </Typography>
      ),
      value: (
        <Typography variant="body1" className="value">
          {denom}
        </Typography>
      ),
    },
    {
      key: 'precision',
      name: (
        <Typography variant="h4" className="label">
          {t('precision')}
        </Typography>
      ),
      value: (
        <Typography variant="body1" className="value">
          {exponent}
        </Typography>
      ),
    },
    {
      key: 'holders',
      name: (
        <Typography variant="h4" className="label">
          {t('holders')}
        </Typography>
      ),
      value: (
        <Typography variant="body1" className="value">
          {holders}
        </Typography>
      ),
    },
  ];

  if (denom !== primaryTokenUnit) {
    preDividerDataItems.splice(1, 0, {
      key: 'issuer',
      name: (
        <Typography variant="h4" className="label">
          {t('issuer')}
        </Typography>
      ),
      value: (
        <Typography variant="body1" className="value">
          {issuer}
        </Typography>
      ),
    });
  }

  const postDividerDataItems = [
    {
      key: 'minting_enabled',
      name: (
        <Typography variant="h4" className="label">
          {t('minting')}
        </Typography>
      ),
      value: (
        <Typography variant="body1" className="value">
          {mintingEnabled ? t('enabled') : t('disabled')}
        </Typography>
      ),
    },
    {
      key: 'burning_enabled',
      name: (
        <Typography variant="h4" className="label">
          {t('burning')}
        </Typography>
      ),
      value: (
        <Typography variant="body1" className="value">
          {burningEnabled ? t('enabled') : t('disabled')}
        </Typography>
      ),
    },
    {
      key: 'freezing_enabled',
      name: (
        <Typography variant="h4" className="label">
          {t('freezing')}
        </Typography>
      ),
      value: (
        <Typography variant="body1" className="value">
          {freezingEnabled ? t('enabled') : t('disabled')}
        </Typography>
      ),
    },
    {
      key: 'whitelisting_enabled',
      name: (
        <Typography variant="h4" className="label">
          {t('whitelisting')}
        </Typography>
      ),
      value: (
        <Typography variant="body1" className="value">
          {whitelistingEnabled ? t('enabled') : t('disabled')}
        </Typography>
      ),
    },
    {
      key: 'burn_rate',
      name: (
        <Typography variant="h4" className="label">
          {t('burn_rate')}
        </Typography>
      ),
      value: (
        <Typography variant="body1" className="value">
          {burnRate}
        </Typography>
      ),
    },
    {
      key: 'send_commission_rate',
      name: (
        <Typography variant="h4" className="label">
          {t('send_commission_rate')}
        </Typography>
      ),
      value: (
        <Typography variant="body1" className="value">
          {sendCommissionRate}
        </Typography>
      ),
    },
  ];

  return (
    <Box className={className}>
      <div className={classes.assetOverviewRoot}>
        <div className={classes.statusRoot}>
          {preDividerDataItems.map((x) => (
            <div key={x.key} className={classes.statusItem}>
              {x.name}
              {x.value}
            </div>
          ))}
        </div>
        {denom !== primaryTokenUnit && (
          <>
            <Divider className={classes.divider} />
            <div className={classes.statusRoot}>
              {postDividerDataItems.map((x) => (
                <div key={x.key} className={classes.statusItem}>
                  {x.name}
                  {x.value}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Box>
  );
};

export default AssetDetailsOverview;
