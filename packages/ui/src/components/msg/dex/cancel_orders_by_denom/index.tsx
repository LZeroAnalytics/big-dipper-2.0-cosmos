import { FC } from 'react';
import { useProfileRecoil } from '@/recoil/profiles';
import { Typography } from '@mui/material';
import { Trans } from 'react-i18next';
import Name from '@/components/name';
import { MsgCancelOrdersByDenom } from '@/models';

const CancelOrdersByDenom: FC<{ message: MsgCancelOrdersByDenom }> = (props) => {
  const { message } = props;
  const sender = useProfileRecoil(message.sender);

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:msgCancelOrdersByDenom"
        components={[<Name address={message.sender} name={sender.name ?? message.sender} />, <b />]}
        values={{
          sender: message.sender,
          denom: message.denom,
        }}
      />
    </Typography>
  );
};

export default CancelOrdersByDenom;
