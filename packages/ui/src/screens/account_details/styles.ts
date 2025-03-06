import { CSSObject } from '@emotion/react';
import Color from 'color';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    ...(theme.mixins.layout as CSSObject),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    '& a': {
      color: theme.palette.custom.fonts.highlight,
    },
    [theme.breakpoints.up('lg')]: {
      gap: theme.spacing(2),
      // gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
  topRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.5),

    [theme.breakpoints.up('lg')]: {
      flexDirection: 'row',
    },
  },
  balance: {
    [theme.breakpoints.up('lg')]: {
      // gridColumn: '1 / 3',
    },
  },
  otherTokens: {
    [theme.breakpoints.up('lg')]: {
      // gridColumn: '1 / 3',
    },
  },
  overview: {
    [theme.breakpoints.up('lg')]: {
      // gridColumn: '1 / 3',
    },
  },
  staking: {
    [theme.breakpoints.up('lg')]: {
      // gridColumn: '1 / 3',
    },
  },
  transactions: {
    [theme.breakpoints.up('lg')]: {
      // gridColumn: '1 / 3',
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
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    gap: theme.spacing(2),
  },
  reportButton: {
    backgroundColor: Color(theme.palette.custom.tags.five).alpha(0.15).string(),
    paddingTop: theme.spacing(0.75),
    paddingRight: theme.spacing(1.25),
    paddingBottom: theme.spacing(0.75),
    paddingLeft: theme.spacing(1.25),
    color: `${theme.palette.custom.tags.five} !important`,
    borderRadius: theme.spacing(1),
    fontSize: theme.spacing(2),
    cursor: 'pointer',
    textAlign: 'center',
  },
}));

export default useStyles;
