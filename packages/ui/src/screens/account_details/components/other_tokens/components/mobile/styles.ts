import { alpha } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  list: {
    margin: theme.spacing(2, 0),
    width: '100%',
  },
  item: {
    marginBottom: theme.spacing(2),
    '& .label': {
      marginBottom: theme.spacing(1),
      color: theme.palette.custom.fonts.fontThree,
    },
    '& p.value': {
      color: theme.palette.custom.fonts.fontTwo,
      wordBreak: 'break-all',
    },
    '& a': {
      color: theme.palette.custom.fonts.highlight,
    },
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    '& > div': {
      width: '50%',
    },
  },
  nameBlock: {
    display: 'flex',
    alignItems: 'center',
  },
  assetLogo: {
    marginRight: theme.spacing(1.5),
  },
  nameColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  name: {
    color: theme.palette.text.primary,
    fontWeight: 400,
    fontSize: theme.spacing(1.75),
    marginBottom: theme.spacing(0.25),
    textTransform: 'capitalize',
    wordBreak: 'break-all',
  },
  denom: {
    color: theme.palette.text.secondary,
    fontWeight: 400,
    fontSize: theme.spacing(1.5),
    marginBottom: theme.spacing(0.25),
    wordBreak: 'break-all',
  },
  chainRow: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.custom.fonts.table_headers,
    fontSize: theme.spacing(1.5),
    textTransform: 'uppercase',
  },
  nameChain: {
    color: theme.palette.custom.tags.six,
    background: alpha(theme.palette.text.secondary, 0.25),
    textTransform: 'capitalize',
    fontSize: theme.spacing(1.5),
    padding: `${theme.spacing(0.25)} ${theme.spacing(0.5)}`,
    borderRadius: '2px',
  },
}));

export default useStyles;
