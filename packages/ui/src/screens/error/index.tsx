import useStyles from '@/screens/error/styles';
import { HOME } from '@/utils/go_to_page';
import Typography from '@mui/material/Typography';
import { Trans, useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { FC, useCallback } from 'react';
import generalConfig from 'shared-utils/configs/general.json';
import Image from 'next/image';

const Error: FC = () => {
  const { classes } = useStyles();
  const { t } = useTranslation();
  const router = useRouter();
  const handleHomeClick = useCallback(() => {
    router.replace(HOME);
  }, [router]);

  return (
    <div className={classes.root}>
      <Image src="/coreum/images/error.svg" alt="Error" width={240} height={240} />
      <div className="container">
        <Typography variant="h3">{t('common:errorTitle')}</Typography>
        <Typography className="details">
          <Trans
            i18nKey="common:errorDetails"
            components={[
              // eslint-disable-next-line
              <a target="_blank" rel="noreferrer" href={generalConfig.github.reportIssue} />,
            ]}
            values={{
              issue: generalConfig.github.reportIssue,
            }}
          />
        </Typography>
        <Typography component="a" onClick={handleHomeClick}>
          {t('common:errorHome')}
        </Typography>
      </div>
    </div>
  );
};

export default Error;
