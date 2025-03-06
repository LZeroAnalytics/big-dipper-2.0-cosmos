import ConditionExplanation from '@/components/condition_explanation';
import InfoPopover from '@/components/info_popover';
import Tag from '@/components/tag';
import useStyles from '@/screens/validator_details/components/validator_overview/styles';
import { getCondition } from '@/screens/validator_details/components/validator_overview/utils';
import type { StatusType } from '@/screens/validator_details/types';
import { getValidatorStatus } from '@/utils/get_validator_status';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Big from 'big.js';
import { useTranslation } from 'next-i18next';
import numeral from 'numeral';
import { FC } from 'react';

type ValidatorOverviewProps = {
  status: StatusType;
};

const ValidatorOverview: FC<ValidatorOverviewProps> = ({ status }) => {
  const { classes } = useStyles();
  const { t } = useTranslation('validators');

  const statusTheme = getValidatorStatus(status.status, status.jailed, status.tombstoned);
  const condition = getCondition(status.condition, status.status);

  const statusItems = [
    {
      key: 'status',
      name: (
        <Typography variant="h4" className="label">
          {t('status')}
        </Typography>
      ),
      value: (
        <Tag
          value={t(statusTheme.status)}
          theme={statusTheme.theme}
          className={classes.statusTag}
        />
      ),
    },
    {
      key: 'commission',
      name: (
        <Typography variant="h4" className="label">
          {t('commission')}
        </Typography>
      ),
      value: (
        <Typography variant="body1" className="value">
          {`${numeral(status.commission * 100).format('0.00')}%`}
        </Typography>
      ),
    },
    {
      key: 'condition',
      name: (
        <Typography variant="h4" className="label condition">
          {t('condition')}
          <InfoPopover content={<ConditionExplanation />} />
        </Typography>
      ),
      value:
        status.status === 3 ? (
          <div className="condition__body">
            <InfoPopover
              content={
                <>
                  <Typography variant="body1">
                    {t('missedBlockCounter', {
                      amount: numeral(status.missedBlockCounter).format('0,0'),
                    })}
                  </Typography>
                  <Typography variant="body1">
                    {t('signedBlockWindow', {
                      amount: numeral(status.signedBlockWindow).format('0,0'),
                    })}
                  </Typography>
                </>
              }
              display={
                <Tag value={t(condition)} theme={statusTheme.theme} className={classes.statusTag} />
              }
            />
          </div>
        ) : (
          <Tag value={t(condition)} theme={statusTheme.theme} className={classes.statusTag} />
        ),
    },
    {
      key: 'maxRate',
      name: (
        <Typography variant="h4" className="label">
          {t('maxRate')}
        </Typography>
      ),
      value: (
        <Typography variant="body1" className="value">
          {Big(status.maxRate)?.times(100).toFixed(2)}%
        </Typography>
      ),
    },
  ];

  return (
    <>
      <Divider className={classes.divider} />
      <div className={classes.statusRoot}>
        {statusItems.map((x) => (
          <div key={x.key} className={classes.statusItem}>
            {x.name}
            {x.value}
          </div>
        ))}
      </div>
    </>
  );
};

export default ValidatorOverview;
