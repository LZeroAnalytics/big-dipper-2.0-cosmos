import Spinner from '@/components/loadingSpinner';
import Name from '@/components/name';
import { MsgSend } from '@/models';
import { useProfileRecoil } from '@/recoil/profiles/hooks';
import { formatNumberWithThousandsSeparator } from '@/screens/account_details/components/other_tokens/components/desktop';
import { Asset, convertHexToString } from '@/screens/assets/hooks';
import { formatToken } from '@/utils/format_token';
import Typography from '@mui/material/Typography';
import Big from 'big.js';
import { Trans, useTranslation } from 'next-i18next';
import { FC } from 'react';

const Send: FC<{
  message: MsgSend;
  metadatas: any[];
  metadataLoading: boolean;
  assets: Asset[];
}> = (props) => {
  const { t } = useTranslation('transactions');
  const { message, metadatas, assets } = props;

  const parsedAmount = message?.amount
    ?.map((x) => {
      const asset = metadatas.find((item) => item.base.toLowerCase() === x.denom.toLowerCase());
      const tokenInAssets = assets.find(
        (assetItem) => x.denom.toLowerCase() === assetItem.denom.toLowerCase()
      );

      let amount = formatToken(x.amount, x.denom).value;
      let displayDenom = asset ? asset.display.toUpperCase() : x.denom.toUpperCase();

      if (tokenInAssets && x.denom.includes('ibc')) {
        const tokenDenom = tokenInAssets.extra.ibc_info!.display_name;
        const availableValue = new Big(+x.amount)
          .div(Big(10).pow(tokenInAssets.extra.ibc_info!.precision))
          .toFixed(tokenInAssets.extra.ibc_info!.precision);
        amount = formatNumberWithThousandsSeparator(availableValue);

        return `${amount} ${tokenDenom}`;
      }

      if (
        tokenInAssets &&
        tokenInAssets.extra.xrpl_info &&
        tokenInAssets?.extra.xrpl_info.source_chain === 'XRPL'
      ) {
        displayDenom =
          tokenInAssets.extra.xrpl_info.currency.length === 40
            ? convertHexToString(tokenInAssets?.extra.xrpl_info.currency)
            : tokenInAssets?.extra.xrpl_info.currency;
      }

      if (asset?.denom_units[1]?.exponent) {
        const availableValue = new Big(+x.amount)
          .div(Big(10).pow(asset?.denom_units[1].exponent))
          .toFixed(asset?.denom_units[1].exponent);

        amount = formatNumberWithThousandsSeparator(availableValue);
      }

      // Kept the "toUpperCase()" in order to show the token symbol in uppercase
      return `${amount} ${displayDenom}`;
    })
    .reduce(
      (text, value, i, array) => text + (i < array.length - 1 ? ', ' : ` ${t('and')} `) + value
    );

  const from = useProfileRecoil(message.fromAddress);
  const fromMoniker = from ? from?.name : message.fromAddress;

  const to = useProfileRecoil(message.toAddress);
  const toMoniker = to ? to?.name : message.toAddress;

  if (props.metadataLoading) {
    return <Spinner />;
  }

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txSendContent"
        components={[
          <Name address={message.fromAddress} name={fromMoniker} />,
          <b />,
          <Name address={message.toAddress} name={toMoniker} />,
        ]}
        values={{
          amount: parsedAmount,
        }}
      />
    </Typography>
  );
};

export default Send;
