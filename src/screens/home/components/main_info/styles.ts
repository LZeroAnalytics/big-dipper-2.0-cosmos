import { makeStyles } from '@material-ui/core/styles';

export const useStyles = () => {
  const styles = makeStyles(
    (theme) => {
      return {
        root: {
          height: '100%',
          display: 'grid',
          gridTemplateRows: '1fr auto 1fr',
          gap: 16,
          [theme.breakpoints.up('md')]: {
            gridTemplateColumns: '1.5fr auto 1fr',
            gridTemplateRows: 'unset',
          },
        },
        label: {
          marginBottom: theme.spacing(2),
        },
        chart: {
          display: 'grid',
          placeItems: 'stretch',
        },
        container: {
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
        },
        divider: {
          height: '90%',
          placeSelf: 'end',
        },
      };
    },
    { index: 1 },
  )();

  return styles;
};
