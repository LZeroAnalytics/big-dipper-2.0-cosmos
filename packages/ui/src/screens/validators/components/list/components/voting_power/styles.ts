import { makeStyles } from 'tss-react/mui';
import Color from 'color';

const useStyles = makeStyles<{ percentage: number; topVotingPower: boolean }>()(
  (theme, { percentage, topVotingPower }) => ({
    root: {
      '& .MuiTypography-body1': {
        color: topVotingPower
          ? theme.palette.custom.fonts.fontTwo
          : theme.palette.custom.fonts.fontFour,
      },
    },
    chart: {
      display: 'flex',
      height: '2px',
      borderRadius: theme.shape.borderRadius,
      background: topVotingPower
        ? Color(theme.palette.custom.primaryData.three).alpha(0.2).string()
        : Color(theme.palette.custom.fonts.fontFour).alpha(0.2).string(),
      overflow: 'hidden',
    },
    active: {
      width: `${percentage}%`,
      background: topVotingPower
        ? theme.palette.custom.primaryData.three
        : theme.palette.custom.fonts.fontFour,
    },
    content: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: theme.spacing(1),
      '& .percentage': {
        color: topVotingPower
          ? theme.palette.custom.primaryData.three
          : theme.palette.custom.fonts.fontFour,
      },
      [theme.breakpoints.up('lg')]: {
        marginBottom: 0,
      },
    },
  })
);

export default useStyles;
