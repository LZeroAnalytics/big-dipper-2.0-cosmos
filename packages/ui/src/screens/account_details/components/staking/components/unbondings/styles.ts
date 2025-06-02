import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  paginate: {
    marginTop: theme.spacing(3),
  },
  errorMessage: {
    overflow: 'hidden',
    maxWidth: '100%',
    wordBreak: 'break-word',
  },
}));

export default useStyles;
