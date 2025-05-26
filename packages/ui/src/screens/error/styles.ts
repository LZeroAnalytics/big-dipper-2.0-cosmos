import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
    padding: theme.spacing(6),

    '& .MuiTypography-h3': {
      marginBottom: theme.spacing(2),
      color: theme.palette.custom.tags.six,
    },
    '& .details': {
      marginBottom: theme.spacing(5),
      color: theme.palette.custom.tags.six,
    },
    '& .container': {
      maxWidth: '460px',
      width: '100%',

      a: {
        cursor: 'pointer',
        color: theme.palette.custom.tags.two,
        wordBreak: 'break-word',
      },
    },
  },
}));

export default useStyles;
