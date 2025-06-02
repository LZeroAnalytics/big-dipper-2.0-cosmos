import Box from '@/components/box';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import useStyles from './styles';

type AssetFeaturesProps = {
  className?: string;
  asset: any;
};

const AssetFeatures: FC<AssetFeaturesProps> = ({ asset, className }) => {
  const { classes } = useStyles();
  const { t } = useTranslation('assets');
  const { features } = asset;

  const preDividerDataItems = [
    {
      key: 'features',
      name: (
        <Typography variant="h4" className="label">
          {t('features')}
        </Typography>
      ),
      value: (
        <Typography variant="body1" className="value links">
          {features?.map((feature: string) => (
            <span key={`feature-${feature}`} className={classes.linkRow}>
              <span className={classes.linkItem}>{feature}</span>
            </span>
          ))}
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
      </div>
    </Box>
  );
};

export default AssetFeatures;
