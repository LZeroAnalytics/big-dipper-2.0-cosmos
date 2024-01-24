import { FC } from 'react';
import { useProfileRecoil } from '@/recoil/profiles';
import { Typography } from '@mui/material';
import { Trans } from 'react-i18next';
import Name from '@/components/name';
import { MsgFreeze } from '@/models';
import { formatToken, formatNumber } from '@/utils';
import { Asset } from '@/screens/assets/hooks';

const Freeze: FC<{ message: MsgFreeze; assets: Asset[] }> = (props) => {
  const { message, assets } = props;

  const sender = useProfileRecoil(message.sender);
  const account = useProfileRecoil(message.account);

  const amount = formatToken(message.coin.amount, message.coin.denom);

  let parsedAmount = `${formatNumber(
    amount.value,
    amount.exponent
    // Kept the "toUpperCase()" in order to show the token symbol in uppercase
  )} ${amount.displayDenom.toUpperCase()}`;

  const tokenInAssets = assets.find(
    (assetItem) => amount.displayDenom.toLowerCase() === assetItem.denom.toLowerCase()
  );
  if (tokenInAssets) {
    if (amount.displayDenom.includes('ibc')) {
      const tokenDenom = tokenInAssets.ibc_info.display_name;
      parsedAmount = `${formatNumber(
        String(+amount.value / 10 ** tokenInAssets.ibc_info.precision),
        tokenInAssets.ibc_info.precision
        // Kept the "toUpperCase()" in order to show the token symbol in uppercase
      )} ${tokenDenom}`;
    }
  }

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:msgFreezeContent"
        components={[
          <Name address={message.sender} name={sender.name ?? message.sender} />,
          <b />,
          <Name address={message.account} name={account.name ?? message.account} />,
        ]}
        values={{
          amount: parsedAmount,
        }}
      />
    </Typography>
  );
};

export default Freeze;
