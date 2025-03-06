import chainConfig from '@/chainConfig';
import Box from '@/components/box';
import useShallowMemo from '@/hooks/useShallowMemo';
import { readMarket } from '@/recoil/market';
import useStyles from '@/screens/account_details/components/balance/styles';
import { formatBalanceData } from '@/screens/account_details/components/balance/utils';
import { formatNumber } from '@/utils/format_token';
import Typography from '@mui/material/Typography';
import Big from 'big.js';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import numeral from 'numeral';
import { FC, useMemo } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { useRecoilValue } from 'recoil';

const DynamicPieChart = dynamic(() => Promise.resolve(PieChart), { ssr: false });
const { primaryTokenUnit, tokenUnits } = chainConfig();

type BalanceProps = Parameters<typeof formatBalanceData>[0] & {
  className?: string;
  total: TokenUnit;
};

const Balance: FC<BalanceProps> = (props) => {
  const { t } = useTranslation('accounts');
  const { classes, cx, theme } = useStyles();
  const market = useRecoilValue(readMarket);
  const formattedChartData = formatBalanceData(props);
  const empty = {
    key: 'empty',
    value: 2400,
    background: theme.palette.custom.charts.zero,
    display: '',
  };
  const backgrounds = [
    theme.palette.custom.charts.one,
    theme.palette.custom.charts.two,
    theme.palette.custom.charts.three,
    theme.palette.custom.charts.four,
    theme.palette.custom.charts.five,
  ];
  const formatData = formattedChartData.map((x, i) => ({
    ...x,
    value: numeral(x.value).value() as string | number | null,
    background: backgrounds[i],
  }));
  const notEmpty = formatData.some((x) => x.value && Big(x.value).gt(0));
  const dataMemo = useShallowMemo(notEmpty ? formatData : [...formatData, empty]);

  const dataCount = formatData.filter((x) => x.value && Big(x.value).gt(0)).length;
  let totalAmount = '';

  const totalAmountValue = Big(market.price || 0)
    .times(props.total.value)
    .toPrecision()
    .valueOf();

  if (Number(totalAmountValue) < 0.0001) {
    totalAmount = `< 0.00001$`;
  } else {
    totalAmount = `$${numeral(totalAmountValue).format('0,0.0000')}`;
  }

  // format
  const totalDisplay = formatNumber(props.total.value, props.total.exponent);
  const totalTitle = useMemo(
    () =>
      t('total', {
        // Kept the "toUpperCase()" in order to show the token symbol in uppercase
        unit: props.total.displayDenom.toUpperCase(),
      }),
    [props.total.displayDenom, t]
  );

  const coreumTitle = useMemo(
    () =>
      `$${numeral(market.price).format('0,0.0000', Math.floor)} / ${(tokenUnits?.[primaryTokenUnit]?.display ?? '').toUpperCase()}`,
    [market.price]
  );

  const packedMemoData = useMemo(() => {
    const newMemoData = [...dataMemo];
    newMemoData.splice(2, 0, {
      value: totalDisplay,
      display: totalTitle,
      key: 'total',
      background: '',
    });
    newMemoData.push({
      value: totalAmount,
      display: coreumTitle,
      key: 'total-coreum',
      background: '',
    });

    return newMemoData;
  }, [market.price]);

  return (
    <Box className={cx(classes.root, props.className)}>
      <Typography variant="h2">{t('balance')}</Typography>
      <div className={classes.balanceContainer}>
        <div className={classes.chartContainer}>
          <div className={classes.content}>
            <div className={classes.circleOut}>
              <div className={classes.circleIn}>
                <ResponsiveContainer width="100%">
                  <DynamicPieChart>
                    <Pie
                      dataKey="value"
                      data={dataMemo}
                      isAnimationActive={false}
                      innerRadius="0%"
                      outerRadius="100%"
                      cornerRadius={40}
                      paddingAngle={dataCount > 1 ? 5 : 0}
                      fill="#82ca9d"
                      stroke="none"
                    >
                      {dataMemo.map((entry) => (
                        <Cell key={entry.key} fill={entry.background} stroke={entry.background} />
                      ))}
                    </Pie>
                  </DynamicPieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        <div className={cx(classes.statsWrapper, classes.legends)}>
          {packedMemoData.map((x) => {
            if (x.key.toLowerCase() === 'empty') {
              return null;
            }

            if (x.key === 'total' || x.key === 'total-coreum') {
              return (
                <div className={cx(classes.statItem, 'legends__single--container')}>
                  <div className="single__label--container">
                    <Typography variant="body1" className="label">
                      {x.display}
                    </Typography>
                  </div>
                  <Typography variant="body1">{x.value}</Typography>
                </div>
              );
            }

            return (
              <div className="legends__single--container">
                <div className="single__label--container">
                  <div className="legend-color" style={{ background: x.background }} />
                  <Typography variant="body1">{t(x.key)}</Typography>
                </div>
                <Typography variant="body1">{x.display}</Typography>
              </div>
            );
          })}
        </div>
      </div>
    </Box>
  );
};

export default Balance;
