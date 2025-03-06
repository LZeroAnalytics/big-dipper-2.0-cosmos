import Color from 'color';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    '& .MuiTypography-h2': {
      marginBottom: theme.spacing(2),
      fontSize: '20px',
      lineHeight: '30px',
      fontWeight: 600,
    },
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      flexDirection: 'column',
      width: '-webkit-fill-available',
    },
  },
  chart: {
    height: '300px',
    [theme.breakpoints.up('md')]: {
      height: '200px',
      width: '200px',
    },
    [theme.breakpoints.up('lg')]: {
      height: '150px',
      width: '150px',
    },
  },
  chartWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(2),

    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  legends: {
    color: theme.palette.custom.fonts.fontTwo,
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: theme.spacing(2),

    '& .legends__single--container': {
      gap: theme.spacing(0.5),
      [theme.breakpoints.up('md')]: {
        display: 'flex',
        flexDirection: 'column',
      },
    },
    '& .single__label--container': {
      display: 'flex',
      alignItems: 'center',

      '& .label': {
        textWrap: 'nowrap',
      },
    },
    '& .legend-color': {
      width: theme.spacing(1.75),
      height: theme.spacing(1.75),
      borderRadius: '50%',
      marginRight: theme.spacing(1),
    },
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  total: {
    '& .total__single--container': {
      margin: theme.spacing(1.5, 0),
      '& .label': {
        marginBottom: theme.spacing(0.5),
        color: theme.palette.custom.fonts.fontTwo,
        [theme.breakpoints.up('md')]: {
          color: theme.palette.custom.fonts.fontOne,
        },
      },
      [theme.breakpoints.up('md')]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
    },
    '& .total__secondary--container': {
      marginTop: theme.spacing(1.5),
      [theme.breakpoints.up('md')]: {
        color: theme.palette.custom.fonts.fontTwo,
      },
    },
  },
  balanceContainer: {
    display: 'grid',
    gap: theme.spacing(2),
    alignItems: 'flex-start',
    gridTemplateColumns: 'repeat(1, 1fr)',

    // [theme.breakpoints.up('sm')]: {
    //   gridTemplateColumns: 'repeat(2, 1fr)',
    // },

    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: '1fr 3fr',
    },
  },
  statsWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: theme.spacing(2),
    alignItems: 'baseline',

    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },

    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
  column: {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: theme.spacing(2),
    height: '100%',
  },
  chartContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 'auto',
  },
  statItem: {
    height: '100%',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  circleOut: {
    background: Color('#5E6773').alpha(0.25).toString(),
    padding: theme.spacing(1),
    borderRadius: '50%',
  },
  circleIn: {
    background: Color('#5E6773').alpha(0.25).toString(),
    borderRadius: '50%',
    height: '300px',
    width: '300px',

    [theme.breakpoints.up('md')]: {
      height: '200px',
      width: '200px',
    },
    [theme.breakpoints.up('lg')]: {
      height: '150px',
      width: '150px',
    },
  },
}));

export default useStyles;
