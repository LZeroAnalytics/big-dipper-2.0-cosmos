import { FC } from 'react';
import { useProfileRecoil } from '@/recoil/profiles';
import { Typography } from '@mui/material';
import { Trans } from 'react-i18next';
import Name from '@/components/name';
import { MsgCancelOrder } from '@/models';

const CancelOrder: FC<{ message: MsgCancelOrder }> = (props) => {
  const { message } = props;
  const sender = useProfileRecoil(message.sender);

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:msgCancelOrder"
        components={[<Name address={message.sender} name={sender.name ?? message.sender} />, <b />]}
        values={{
          sender: message.sender,
          id: message.id,
        }}
      />
    </Typography>
  );
};

export default CancelOrder;
