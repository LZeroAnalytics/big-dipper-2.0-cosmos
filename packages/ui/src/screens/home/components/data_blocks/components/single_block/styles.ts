import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    padding: theme.spacing(2),
    background: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    height: '110px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    color: theme.palette.custom.fonts.data_blocks,
    '& .label': {
      marginBottom: theme.spacing(2),
    },
    '& .content': {
      width: '100%',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
    '& .description': {
      display: 'block',
      color: theme.palette.primary.contrastText,
      fontSize: '1rem',
    },
    '& .flexContent': {
      display: 'flex',
      flexDirection: 'row',
      gap: theme.spacing(0.5),
    },
  },
}));

export default useStyles;
