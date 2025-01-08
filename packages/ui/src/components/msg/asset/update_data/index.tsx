import { FC } from 'react';
import { useProfileRecoil } from '@/recoil/profiles';
import { Typography } from '@mui/material';
import { Trans } from 'react-i18next';
import Name from '@/components/name';
import { MsgUpdateData } from '@/models';

const UpdateData: FC<{ message: MsgUpdateData }> = (props) => {
  const { message } = props;
  const sender = useProfileRecoil(message.sender);

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:msgUpdateData"
        components={[<Name address={message.sender} name={sender.name ?? message.sender} />, <b />]}
        values={{
          sender: message.sender,
          class_id: message.class_id,
          id: message.id,
        }}
      />
    </Typography>
  );
};

export default UpdateData;
