import { makeStyles } from '@material-ui/core/styles';

export const useStyles = () => {
  const styles = makeStyles(
    (theme) => {
      return ({
        root: {
          display: 'grid',
          gap: theme.spacing(3),
        },
        details: {
          display: 'grid',
          gridTemplateColumns: 'repeat(1, 1fr)',
          gap: theme.spacing(3),
          [theme.breakpoints.up('md')]: {
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
          [theme.breakpoints.up('lg')]: {
            gap: theme.spacing(1),
            gridTemplateColumns: 'repeat(4, 1fr)',
          },
        },
        item: {
          display: 'grid',
          gap: theme.spacing(0.5),
          '& .label': {
            fontSize: theme.typography.body1,
            color: theme.palette.text.secondary,
          },
          '& .value': {
            fontSize: theme.typography.body1,
            color: theme.palette.text.primary,
          },
        },
      });
    },
  )();

  return styles;
};
