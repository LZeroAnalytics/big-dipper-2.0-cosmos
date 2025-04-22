import Box from '@/components/box';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { FC, useMemo } from 'react';
import useStyles from './styles';

interface AssetDexSettingsProps {
  className?: string;
  asset: any;
}

const AssetDexSettings: FC<AssetDexSettingsProps> = ({ asset, className }) => {
  const { classes, cx } = useStyles();
  const { t } = useTranslation('assets');

  const { dexSettings } = asset;

  const unifiedRefAmount = useMemo(() => {
    if (dexSettings && dexSettings.unified_ref_amount) {
      return {
        key: 'unified_ref_amount',
        name: (
          <Typography variant="h4" className="label">
            {t('unified_ref_amount')}
          </Typography>
        ),
        value: (
          <Typography variant="body1" className="value">
            {dexSettings.unified_ref_amount}
          </Typography>
        ),
      };
    }

    return null;
  }, [dexSettings, t]);

  const whitelistedDenoms = useMemo(() => {
    if (dexSettings && dexSettings.whitelisted_denoms?.length) {
      return {
        key: 'whitelisted_denoms',
        name: (
          <Typography variant="h4" className="label">
            {t('whitelisted_denoms')}
          </Typography>
        ),
        value: (
          <Typography variant="body1" className={cx('value', classes.denomsWrapper)}>
            {dexSettings.whitelisted_denoms.map((item: string) => (
              <p>{item}</p>
            ))}
          </Typography>
        ),
      };
    }

    return null;
  }, [dexSettings, t]);

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
