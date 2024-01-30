import { makeStyles } from 'tss-react/mui';
import { alpha } from '@mui/material';

const useStyles = makeStyles()((theme) => ({
  tableRow: {
    '&:hover': {
      opacity: 0.5,
    },
  },
  tableRegisteredAsset: {
    cursor: 'pointer',
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
  },
  denom: {
    color: theme.palette.text.secondary,
    fontWeight: 400,
    fontSize: theme.spacing(1.5),
    marginBottom: theme.spacing(0.25),
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
