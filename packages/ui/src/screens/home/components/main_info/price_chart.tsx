import { readTheme } from '@/recoil/settings';
import { createChart, IChartApi } from 'lightweight-charts';
import React, { useEffect, useMemo, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import Spinner from '@/components/loadingSpinner';
import { readMarket } from '@/recoil/market';
import useStyles from './styles';
import { useHero } from '../hero/hooks';

const PriceChart: React.FC = () => {
  const { classes } = useStyles();
  const chartRef = useRef<IChartApi>();
  const theme = useRecoilValue(readTheme);
  const { state } = useHero();
  const marketState = useRecoilValue(readMarket);

  const currentTime = useMemo(() => {
    const time = new Date(Date.now());

    return Math.floor(time.getTime() / 1000);
  }, []);

  const formattedData = useMemo(
    () =>
      state.tokenPriceHistory.map((item: any) => {
        const time = new Date(item.time);

        return {
          value: item.value as number,
          time: Math.floor(time.getTime() / 1000),
        };
      }),
    [state.tokenPriceHistory]
  );

  const finalChartData = useMemo(() => {
    const newArray = formattedData;

    if (marketState.price) {
      newArray.push({
        value: marketState.price,
        time: currentTime,
      });

      return newArray;
    }

    return newArray;
  }, [formattedData, currentTime, marketState]);

  useEffect(() => {
    if (typeof window !== 'undefined' && !chartRef.current && finalChartData.length > 1) {
      const chartOptions = {
        layout: {
          textColor: theme === 'dark' ? 'white' : 'black',
          background: {
            color: theme === 'dark' ? '#1B1D23' : 'white',
          },
        },
        grid: {
          vertLines: {
            color: theme === 'dark' ? '#1B1D23' : 'white',
          },
          horzLines: {
            color: theme === 'dark' ? '#1B1D23' : 'white',
          },
        },
        // disable scaling and panning since we aren't implementing a scrollback-refetch
        handleScroll: false,
        handleScale: false,
      };
      const chartPrice = document.getElementById('price-chart')!;
      chartRef.current = createChart(chartPrice, chartOptions);
      const baselineSeries = chartRef.current.addBaselineSeries({
        baseValue: {
          type: 'price',
          price: finalChartData[0].value,
        },
        priceFormat: {
          type: 'price',
          precision: 4,
          minMove: 0.0001,
        },
        topLineColor: 'rgba( 38, 166, 154, 1)',
        topFillColor1: 'rgba( 38, 166, 154, 0.28)',
        topFillColor2: 'rgba( 38, 166, 154, 0.05)',
        bottomLineColor: 'rgba( 239, 83, 80, 1)',
        bottomFillColor1: 'rgba( 239, 83, 80, 0.05)',
        bottomFillColor2: 'rgba( 239, 83, 80, 0.28)',
      });

      baselineSeries.setData(finalChartData as any);

      chartRef.current.timeScale().fitContent();
    }
  }, [finalChartData]);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.applyOptions({
        layout: {
          textColor: theme === 'dark' ? 'white' : 'black',
          background: {
            color: theme === 'dark' ? '#1B1D23' : 'white',
          },
        },
        grid: {
          vertLines: {
            color: theme === 'dark' ? '#1B1D23' : 'white',
          },
          horzLines: {
            color: theme === 'dark' ? '#1B1D23' : 'white',
          },
        },
      });
    }
  }, [theme]);

  useEffect(() => {
    const handle = () => {
      const container: any = document.getElementById('price-chart');
      const dimensions = {
        width: container.clientWidth * (container.clientWidth > 767 ? 0.5 : 0.9),
        height: container.clientHeight,
      };
      chartRef.current?.applyOptions(dimensions);
    };
    window.addEventListener('resize', handle);
    return () => {
      window.removeEventListener('resize', handle);
    };
  }, []);

  return state.loading ? (
    <Spinner customStyle={{ justifyContent: 'center' }} />
  ) : (
    <div className={classes.chart} id="price-chart" />
  );
};

export default PriceChart;
