import { FC } from 'react';
import { useProfileRecoil } from '@/recoil/profiles';
import { Typography } from '@mui/material';
import { Trans } from 'react-i18next';
import Name from '@/components/name';
import { MsgUpdateDEXUnifiedRefAmount } from '@/models';

const UpdateDEXWUnifiedRefAmount: FC<{ message: MsgUpdateDEXUnifiedRefAmount }> = (props) => {
  const { message } = props;
  const sender = useProfileRecoil(message.sender);

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:msgUpdateDEXUnifiedRefAmount"
        components={[<Name address={message.sender} name={sender.name ?? message.sender} />, <b />]}
        values={{
          sender: message.sender,
          denom: message.denom.toUpperCase(),
          unified_ref_amount: message.unified_ref_amount,
        }}
      />
    </Typography>
  );
};

export default UpdateDEXWUnifiedRefAmount;
