import { FC } from 'react';
import useStyles from '@/components/nav/components/desktop/components/action_bar/styles';
import SearchBar from '@/components/nav/components/search_bar';
import { useGetComponentDimension } from '@/hooks/use_get_component_dimension';
import NetworkSelector from '@/components/network_selector';
import { useDesktop } from '@/components/nav/components/desktop/hooks';

type ActionBarProps = {
  className?: string;
};

const ActionBar: FC<ActionBarProps> = ({ className }) => {
  const { ref: heightRef } = useGetComponentDimension();
  const { classes, cx } = useStyles();
  const { isNetwork } = useDesktop();

  return (
    <div className={cx(classes.root, className)} ref={heightRef}>
      <div className={classes.actions}>
        <SearchBar className={cx(classes.searchBar, { open: isNetwork })} />
        <NetworkSelector />
      </div>
    </div>
  );
};

export default ActionBar;
