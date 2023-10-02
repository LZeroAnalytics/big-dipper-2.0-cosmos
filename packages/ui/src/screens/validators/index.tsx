import { NextSeo } from 'next-seo';
import { Typography } from '@mui/material';
import Layout from '@/components/layout';
import List from '@/screens/validators/components/list';
import useStyles from '@/screens/validators/styles';
import useAppTranslation from '@/hooks/useAppTranslation';

const Validators = () => {
  const { t } = useAppTranslation('validators');
  const { classes } = useStyles();
  return (
    <>
      <NextSeo
        title={t('validators') ?? undefined}
        openGraph={{
          title: t('validators') ?? undefined,
        }}
      />
      <Layout navTitle={t('validators') ?? undefined} className={classes.root}>
        <Typography variant="h1">{t('validators')}</Typography>
        <List />
      </Layout>
    </>
  );
};

export default Validators;
