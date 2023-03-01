import Color from 'color';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    '& .MuiListItemIcon-root': {
      minWidth: '48px',
    },
    '&.MuiListItem-gutters': {
      padding: theme.spacing(2, 2.5),
    },
    '& .MuiListItemText-root': {
      color: theme.palette.custom.general.icon,
    },
    '&.active': {
      background: Color(theme.palette.primary.main).alpha(0.2).lighten(0.5).string(),
      '& .MuiListItemIcon-root': {
        '& svg': {
          fill: theme?.palette?.primary?.main,
          color: theme?.palette?.primary?.main,
        },
      },
      '& .MuiListItemText-root': {
        color: theme.palette.primary.main,
      },
    },
  },
  listItemIcon: {
    minWidth: 0,
    [theme.breakpoints.down(1025)]: {
      '&.active': {
        '& svg': {
          '& path': {
            fill: '#25D695',
          },
        },
      },
    },
  },
  listItemText: {
    '&& *': {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  },
}));

export default useStyles;
