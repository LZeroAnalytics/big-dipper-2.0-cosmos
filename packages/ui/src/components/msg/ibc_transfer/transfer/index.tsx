import Typography from '@mui/material/Typography';
import { Trans } from 'next-i18next';
import { FC } from 'react';
import Name from '@/components/name';
import { MsgTransfer } from '@/models';
import { useProfileRecoil } from '@/recoil/profiles/hooks';
import { formatToken } from '@/utils/format_token';
import { Asset, convertHexToString } from '@/screens/assets/hooks';
import { formatNumberWithThousandsSeparator } from '@/screens/account_details/components/other_tokens/components/desktop';
import Big from 'big.js';

const Transfer: FC<{ message: MsgTransfer; assets: Asset[]; metadatas: any[] }> = (props) => {
  const { message, assets, metadatas } = props;

  const sender = useProfileRecoil(message.sender);
  const senderMoniker = sender ? sender?.name : message.sender;
  const receiver = useProfileRecoil(message.receiver);
  const receiverMoniker = receiver ? receiver?.name : message.receiver;
  const tokenFormatDenom = formatToken(message.token?.amount, message.token?.denom);

  const asset = metadatas.find(
    (item) => item.base.toLowerCase() === tokenFormatDenom.displayDenom.toLowerCase()
  );
  const tokenInAssets = assets.find(
    (assetItem) => tokenFormatDenom.displayDenom.toLowerCase() === assetItem.denom.toLowerCase()
  );
  let amount = formatToken(message.token?.amount, message.token?.denom).value;
  let displayDenom = asset
    ? asset.display.toUpperCase()
    : tokenFormatDenom.displayDenom.toUpperCase();

  if (asset?.denom_units[1].exponent) {
    const availableValue = new Big(+(message.token?.amount || '0'))
      .div(Big(10).pow(asset?.denom_units[1].exponent))
      .toFixed(asset?.denom_units[1].exponent);

    amount = formatNumberWithThousandsSeparator(availableValue);
  }

  if (
    tokenInAssets &&
    tokenInAssets?.extra.xrpl_info &&
    tokenInAssets?.extra.xrpl_info.source_chain === 'XRPL'
  ) {
    displayDenom =
      tokenInAssets?.extra.xrpl_info.currency.length === 40
        ? convertHexToString(tokenInAssets?.extra.xrpl_info.currency)
        : tokenInAssets?.extra.xrpl_info.currency;
  }

  let parsedAmount = `${amount} ${displayDenom}`;

  if (tokenInAssets) {
    if (tokenFormatDenom.displayDenom.includes('ibc')) {
      const tokenDenom = tokenInAssets.extra.ibc_info!.display_name;
      const availableValue = new Big(+(message.token?.amount || '0'))
        .div(Big(10).pow(tokenInAssets.extra.ibc_info!.precision))
        .toFixed(tokenInAssets.extra.ibc_info!.precision);
      amount = formatNumberWithThousandsSeparator(availableValue);

      parsedAmount = `${amount} ${tokenDenom}`;
    }
  }

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txTransferContent"
        components={[
          <Name address={message.sender} name={senderMoniker} />,
          <Name address={message.receiver} name={receiverMoniker} />,
          <b />,
        ]}
        values={{
          token: parsedAmount,
          sourceChannel: message.sourceChannel,
        }}
      />
    </Typography>
  );
};

export default Transfer;
