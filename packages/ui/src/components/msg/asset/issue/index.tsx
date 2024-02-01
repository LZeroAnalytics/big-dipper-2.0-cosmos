import { FC } from 'react';
import { useProfileRecoil } from '@/recoil/profiles';
import { Typography } from '@mui/material';
import { Trans } from 'react-i18next';
import Name from '@/components/name';
import { MsgIssue } from '@/models';
import { formatToken } from '@/utils';

const Issue: FC<{ message: MsgIssue }> = (props) => {
  const { message } = props;
  const issuer = useProfileRecoil(message.issuer);

  const amount = formatToken(String(+message.initial_amount / 10 ** message.precision));

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:msgIssueContent"
        components={[<Name address={message.issuer} name={issuer.name ?? message.issuer} />, <b />]}
        values={{
          issuer: message.issuer,
          amount: amount.value,
          subunit: message.symbol.toUpperCase(),
        }}
      />
    </Typography>
  );
};

export default Issue;
