import Box from '@/components/box';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import numeral from 'numeral';
import { FC, useMemo } from 'react';
import useStyles from './styles';

interface AssetDexSettingsProps {
  className?: string;
  asset: any;
  dex: any;
}

const AssetDexSettings: FC<AssetDexSettingsProps> = ({ asset, className, dex }) => {
  const { classes, cx } = useStyles();
  const { t } = useTranslation('assets');

  const { dexSettings } = asset;
  const { default_unified_ref_amount } = dex;

  const refAmount = dexSettings?.unified_ref_amount || default_unified_ref_amount;

  const unifiedRefAmount = useMemo(
    () => ({
      key: 'unified_ref_amount',
      name: (
        <Typography variant="h4" className="label">
          {t('unified_ref_amount')}
        </Typography>
      ),
      value: (
        <Typography variant="body1" className="value">
          {refAmount > 1 ? numeral(refAmount).format('0,0') : dexSettings.unified_ref_amount}
        </Typography>
      ),
    }),
    [dexSettings, t]
  );

  const whitelistedDenoms = useMemo(
    () => ({
      key: 'whitelisted_denoms',
      name: (
        <Typography variant="h4" className="label">
          {t('whitelisted_denoms')}
        </Typography>
      ),
      value: (
        <Typography variant="body1" className={cx('value', classes.denomsWrapper)}>
          {dexSettings?.whitelisted_denoms.length
            ? dexSettings?.whitelisted_denoms.map((item: string) => <p>{item}</p>)
            : 'ALL'}
        </Typography>
      ),
    }),
    [dexSettings, t]
  );

  const dataItems = useMemo(() => {
    const items = [];

    if (unifiedRefAmount) {
      items.push(unifiedRefAmount);
    }

    if (whitelistedDenoms) {
      items.push(whitelistedDenoms);
    }

    return items;
  }, [unifiedRefAmount, whitelistedDenoms]);

  return (
    <Box className={className}>
      <div className={classes.mainWrapper}>
        {dataItems.map((x) => (
          <div key={x.key} className={classes.dexSettingsItem}>
            {x.name}
            {x.value}
          </div>
        ))}
      </div>
    </Box>
  );
};

export default AssetDexSettings;
