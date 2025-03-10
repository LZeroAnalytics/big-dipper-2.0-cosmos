import Typography from '@mui/material/Typography';
import { Trans } from 'next-i18next';
import { FC } from 'react';
import useStyles from '@/components/msg/unknown/styles';
import { type MsgUnknown } from '@/models';
import { useProfileRecoil } from '@/recoil/profiles';
import Name from '@/components/name';

const Unknown: FC<{ message: MsgUnknown; failedStatus?: string; viewRaw: boolean }> = (props) => {
  const { message, failedStatus, viewRaw } = props;
  const { classes } = useStyles();

  const executor = useProfileRecoil((message.json as any).executor || '');

  if (!viewRaw && failedStatus?.length && message.type === '/cosmos.group.v1.MsgExec') {
    const { proposal_id } = message.json as any;

    return (
      <Typography>
        <Trans
          i18nKey="message_contents:msgFailedProposal"
          components={[
            <Name
              address={(message.json as any).executor}
              name={executor.name ?? (message.json as any).executor}
            />,
            <b />,
            <b />,
          ]}
          values={{
            executor: (message.json as any).executor,
            proposal_id,
            result: failedStatus,
          }}
        />
      </Typography>
    );
  }

  return (
    <pre className={classes.root}>
      <code>{JSON.stringify(message.json, null, '\t')}</code>
    </pre>
  );
};

export default Unknown;
