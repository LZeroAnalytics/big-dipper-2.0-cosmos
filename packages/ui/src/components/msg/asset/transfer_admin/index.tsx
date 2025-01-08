import { FC } from 'react';
import { useProfileRecoil } from '@/recoil/profiles';
import { Typography } from '@mui/material';
import { Trans } from 'react-i18next';
import Name from '@/components/name';
import { MsgTransferAdmin } from '@/models';

const TransferAdmin: FC<{ message: MsgTransferAdmin }> = (props) => {
  const { message } = props;
  const sender = useProfileRecoil(message.sender);

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:msgTransferAdmin"
        components={[<Name address={message.sender} name={sender.name ?? message.sender} />, <b />]}
        values={{
          sender: message.sender,
          denom: message.denom.toUpperCase(),
          account: message.account,
        }}
      />
    </Typography>
  );
};

export default TransferAdmin;
