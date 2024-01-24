import Typography from '@mui/material/Typography';
import { Trans } from 'next-i18next';
import { FC } from 'react';
import Name from '@/components/name';
import { type MsgDelegate } from '@/models';
import { useProfileRecoil } from '@/recoil/profiles/hooks';
import { formatNumber, formatToken } from '@/utils/format_token';
import { Asset } from '@/screens/assets/hooks';

const Delegate: FC<{ message: MsgDelegate; assets: Asset[] }> = (props) => {
  const { message, assets } = props;
  const delegator = useProfileRecoil(message.delegatorAddress);
  const delegatorMoniker = delegator ? delegator?.name : message.delegatorAddress;

  const validator = useProfileRecoil(message.validatorAddress);
  const validatorMoniker = validator ? validator?.name : message.validatorAddress;
  const amount = formatToken(message.amount?.amount, message.amount?.denom);

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
        i18nKey="message_contents:txDelegateContent"
        components={[
          <Name address={message.delegatorAddress} name={delegatorMoniker} />,
          <b />,
          <Name address={message.validatorAddress} name={validatorMoniker} />,
        ]}
        values={{
          amount: parsedAmount,
        }}
      />
    </Typography>
  );
};

export default Delegate;
