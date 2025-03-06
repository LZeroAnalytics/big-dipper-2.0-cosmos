import { CSSObject } from '@emotion/react';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    ...(theme.mixins.layout as CSSObject),
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto',
    gap: theme.spacing(1),
    '& a': {
      color: theme.palette.custom.fonts.highlight,
    },
    [theme.breakpoints.up('lg')]: {
      gap: theme.spacing(2),
      gridTemplateColumns: 'repeat(2, 1fr) 500px',
    },
  },
  address: {
    [theme.breakpoints.up('lg')]: {
      gridColumn: '1 / 4',
    },
  },
  status: {
    [theme.breakpoints.up('lg')]: {
      gridColumn: '1 / 4',
    },
  },
  profile: {
    [theme.breakpoints.up('lg')]: {
      gridColumn: '1 / 4',
    },
  },
  votingPower: {
    // background: '#ffc93c',
    // [theme.breakpoints.up('lg')]: {
    //   gridColumn: '1 / 2',
    // },
  },
  blocks: {
    // background: '#dbf6e9',
    // [theme.breakpoints.up('lg')]: {
    //   gridColumn: '2 / 4',
    // },
  },
  staking: {
    // background: '#9ddfd3',
    [theme.breakpoints.up('lg')]: {
      gridColumn: '1 / 4',
    },
  },
  transactions: {
    padding: `0 !important`,
    // background: '#31326f',
    [theme.breakpoints.up('lg')]: {
      gridColumn: '1 / 4',
    },
  },
  block: {
    [theme.breakpoints.up('lg')]: {
      gridColumn: '1 / 4',
    },
  },
  breadcrumb: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: theme.spacing(1.75),
    fontWeight: 500,
    color: `${theme.palette.primary.main} !important`,
    '& svg': {
      fill: 'transparent',
    },
  },
  title: {
    fontSize: theme.spacing(3.5),
    fontWeight: 600,
    color: theme.palette.primary.contrastText,
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
  },
  overviewBox: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  overviewProfile: {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: theme.spacing(5),
    alignItems: 'center',

    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
  votingPowerBlocks: {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: theme.spacing(2),
    width: '100%',
    gridColumn: '1 / 4',
    height: '100%',

    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
  addresses: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: theme.spacing(2),
  },
  bio: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    justifyContent: 'flex-start',
    '& .bio__header': {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      flexDirection: 'column',
    },
    '& .bio__content': {
      marginTop: theme.spacing(2),
      color: theme.palette.custom.fonts.fontTwo,
      [theme.breakpoints.up('lg')]: {
        marginTop: theme.spacing(1),
      },
    },
  },
  avatar: {
    width: '60px',
    height: '60px',
    minHeight: '60px',
    minWidth: '60px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    '& .header__content': {
      marginLeft: theme.spacing(2),
    },
    '& .MuiTypography-h2': {
      marginBottom: theme.spacing(1),
    },
    [theme.breakpoints.up('lg')]: {
      '& .header__content': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: 0,
        '& .MuiTypography-h2': {
          marginRight: theme.spacing(2),
          marginBottom: 0,
        },
      },
    },
  },
  copyText: {
    '& .detail': {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row-reverse',
      justifyContent: 'flex-end',
      '& svg': {
        width: '1rem',
        marginLeft: theme.spacing(1),
      },
    },
  },
  item: {
    padding: theme.spacing(2, 0),
    color: theme.palette.custom.fonts.fontTwo,
    '&:first-of-type': {
      paddingTop: 0,
    },
    '&:last-child': {
      paddingBottom: 0,
    },
    '&:not(:last-child)': {
      borderBottom: `solid 1px ${theme.palette.divider}`,
    },
    '& .label': {
      marginBottom: theme.spacing(1),
      color: theme.palette.custom.fonts.fontThree,
    },
    '& .detail': {
      '&.MuiTypography-body1': {
        wordWrap: 'break-word',
      },
    },
    '& a': {
      color: theme.palette.custom.fonts.highlight,
    },
    [theme.breakpoints.up('md')]: {
      padding: 0,
      '&:not(:last-child)': {
        borderBottom: 'none',
      },
      '& .label': {
        marginBottom: 0,
      },
    },
  },
  actionIcons: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

export default useStyles;
