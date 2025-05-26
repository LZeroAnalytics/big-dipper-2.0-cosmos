import LinearProgress from '@mui/material/LinearProgress';
import useStyles from '@/screens/initial_load/styles';
import LogoFull from '@/assets/logo-full.svg';
import LogoFullLight from '@/assets/logo-full-light.svg';
import { useSettingList } from '@/components/nav/components/desktop/components/action_bar/components/settings_list/hooks';

const InitialLoad = () => {
  const { classes } = useStyles();
  const { theme } = useSettingList();

  const isDarkTheme = theme === 'dark';

  return (
    <div className={classes.root}>
      <div>
        <div className={classes.logo}>{isDarkTheme ? <LogoFull /> : <LogoFullLight />}</div>
        <LinearProgress className={classes.divider} />
      </div>
    </div>
  );
};

export default InitialLoad;
