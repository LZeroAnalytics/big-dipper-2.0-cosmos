import { FC } from 'react';
import { useProfileRecoil } from '@/recoil/profiles';
import { Typography } from '@mui/material';
import { Trans } from 'react-i18next';
import Name from '@/components/name';
import { MsgUpdateDEXWhitelistedDenoms } from '@/models';

const UpdateDEXWhitelistedDenoms: FC<{ message: MsgUpdateDEXWhitelistedDenoms }> = (props) => {
  const { message } = props;
  const sender = useProfileRecoil(message.sender);

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:msgUpdateDexWhitelistedDenoms"
        components={[<Name address={message.sender} name={sender.name ?? message.sender} />, <b />]}
        values={{
          sender: message.sender,
          denom: message.denom.toUpperCase(),
          whitelisted_denoms: message.whitelisted_denoms.toString(),
        }}
      />
    </Typography>
  );
};

export default UpdateDEXWhitelistedDenoms;
