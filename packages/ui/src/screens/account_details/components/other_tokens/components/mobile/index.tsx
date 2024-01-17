import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { FC, Fragment } from 'react';
import { formatNumber } from '@/utils/format_token';
import type { OtherTokenType } from '@/screens/account_details/types';
import useStyles from '@/screens/account_details/components/other_tokens/components/mobile/styles';
import Image from 'next/image';

type MobileProps = {
  className?: string;
  items?: OtherTokenType[];
};

const Mobile: FC<MobileProps> = ({ className, items }) => {
  const { classes } = useStyles();
  const { t } = useTranslation('accounts');
  return (
    <div className={className}>
      {items?.map((x, i) => {
        const { logoURL, displayName, chain } = x;
        const available = formatNumber(x.available.value, x.available.exponent);
        const reward = x.reward ? formatNumber(x.reward.value, x.reward.exponent) : '';
        const isLast = !items || i === items.length - 1;

        return (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={`votes-mobile-${i}`}>
            <div className={classes.list}>
              <div className={classes.item}>
                <Typography variant="h4" className="label">
                  {t('token')}
                </Typography>
                <Typography variant="body1" className="value">
                  {logoURL && displayName && chain ? (
                    <div className={classes.nameBlock}>
                      <div className={classes.assetLogo}>
                        <Image src={logoURL} alt={x.denom} width={24} height={24} />
                      </div>
                      <div className={classes.nameColumn}>
                        <div className={classes.name}>{displayName}</div>
                        <div className={classes.chainRow}>
                          <div className={classes.nameChain}>Chain: {chain}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    x.denom
                  )}
                </Typography>
              </div>
              <div className={classes.item}>
                <Typography variant="h4" className="label">
                  {t('available')}
                </Typography>
                <Typography variant="body1" className="value">
                  {available}
                </Typography>
              </div>
              <div className={classes.item}>
                <Typography variant="h4" className="label">
                  {t('reward')}
                </Typography>
                <Typography variant="body1" className="value">
                  {reward}
                </Typography>
              </div>
            </div>
            {!isLast && <Divider />}
          </Fragment>
        );
      })}
    </div>
  );
};

export default Mobile;
