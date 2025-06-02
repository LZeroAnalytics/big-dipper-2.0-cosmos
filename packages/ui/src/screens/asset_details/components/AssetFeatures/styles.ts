import { alpha } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  assetOverviewRoot: {
    display: 'flex',
    flexDirection: 'column',
  },
  assetProfile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  assetProfileLogo: {
    marginRight: theme.spacing(1.5),
  },
  assetLogo: {
    width: '40px',
    height: '40px',
    minHeight: '40px',
    minWidth: '40px',
  },
  assetProfileData: {},
  assetName: {
    fontSize: theme.spacing(4),
    fontWeight: 600,
    lineHeight: theme.spacing(6),
    color: theme.palette.text.primary,
  },
  assetChain: {
    fontSize: theme.spacing(1.75),
    fontWeight: 400,
    color: '#5E6773',
    textTransform: 'uppercase',
  },
  assetDescription: {
    fontSize: theme.spacing(2),
    fontWeight: 400,
    lineHeight: theme.spacing(3),
    color: theme.palette.custom.tags.six,
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  statusRoot: {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
  statusItem: {
    '& .label': {
      marginBottom: theme.spacing(1),
      color: theme.palette.custom.fonts.fontThree,
      fontSize: theme.spacing(1.75),
      '&.condition': {
        display: 'flex',
        alignItems: 'center',
      },
    },
    '& p.value': {
      display: 'inline-flex',
      gap: theme.spacing(2),
      fontSize: theme.spacing(2),
      color: theme.palette.custom.fonts.fontTwo,
      fontWeight: 500,
      wordBreak: 'keep-all',
      cursor: 'default',

      // '&.links': {
      //   display: 'inline-flex',
      //   gridTemplateColumns: 'repeat(1, 1fr)',
      //   gap: theme.spacing(1),
      //   width: '100%',
      //   wordWrap: 'no-break',
      //   // [theme.breakpoints.up('md')]: {
      //   //   display: 'flex',
      //   //   gap: theme.spacing(2),
      //   //   minWidth: '50%',
      //   //   marginRight: theme.spacing(6),
      //   // },
      // },
    },
    '& a': {
      color: theme.palette.custom.fonts.highlight,
    },
  },
  linkRow: {
    display: 'flex',
    alignItems: 'center',
    color: `${theme.palette.custom.fonts.netSelector_label} !important`,
  },
  linkItem: {
    display: 'flex',
    alignItems: 'center',
    fontSize: theme.spacing(1.75),
    padding: theme.spacing(0.5, 1),
    background: alpha('#868991', 0.25),
    borderRadius: 2,
    minWidth: 'min-content',

    '&:hover': {
      background: alpha('#C3C3C3', 0.25),
    },
  },
}));

export default useStyles;
