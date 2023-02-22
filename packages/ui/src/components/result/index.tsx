import useStyles from '@/components/result/styles';
// import CancelIcon from '@mui/icons-material/Cancel';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Typography from '@mui/material/Typography';
import useAppTranslation from '@/hooks/useAppTranslation';
import { FC } from 'react';
import Check from '@/assets/icon-check.svg';
import Cross from '@/assets/icon-cross.svg';

type ResultProps = {
  className?: string;
  success?: boolean;
};

const Result: FC<ResultProps> = ({ className, success }) => {
  const { t } = useAppTranslation('common');
  const { classes, cx } = useStyles();

  return (
    <span
      className={cx(classes.root, className, {
        [classes.success]: success,
        [classes.fail]: !success,
      })}
    >
      {success ? (
        <>
          <Check />
          <Typography component="span" variant="body1">
            {t('success')}
          </Typography>
        </>
      ) : (
        <>
          <Cross />
          <Typography component="span" variant="body1">
            {t('fail')}
          </Typography>
        </>
      )}
    </span>
  );
};

export default Result;
