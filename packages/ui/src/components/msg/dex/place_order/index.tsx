import { FC, useMemo } from 'react';
import { useProfileRecoil } from '@/recoil/profiles';
import { Typography } from '@mui/material';
import { Trans } from 'react-i18next';
import Name from '@/components/name';
import { MsgPlaceOrder } from '@/models';
import Big from 'big.js';
import useStyles from './styles';

const PlaceOrder: FC<{ message: MsgPlaceOrder }> = (props) => {
  const { message } = props;
  const sender = useProfileRecoil(message.sender);
  const { classes } = useStyles();

  const price = useMemo(() => {
    try {
      return Big(message.price).toNumber();
    } catch (error) {
      return 0;
    }
  }, [message.price]);

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:msgPlaceOrder"
        components={[
          <Name address={message.sender} name={sender.name ?? message.sender} />,
          <b />,
          <span className={classes.root} />,
        ]}
        values={{
          sender: message.sender,
          id: message.id,
          base_denom: message.base_denom,
          quote_denom: message.quote_denom,
          price,
          quantity: message.quantity,
          side: message.side,
        }}
      />
    </Typography>
  );
};

export default PlaceOrder;
