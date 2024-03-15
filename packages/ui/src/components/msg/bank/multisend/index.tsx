import Spinner from '@/components/loadingSpinner';
import useStyles from '@/components/msg/bank/multisend/styles';
import Name from '@/components/name';
import { MsgMultiSend } from '@/models';
import { useProfileRecoil } from '@/recoil/profiles/hooks';
import { formatNumberWithThousandsSeparator } from '@/screens/account_details/components/other_tokens/components/desktop';
import { Asset, convertHexToString } from '@/screens/assets/hooks';
import { formatToken } from '@/utils/format_token';
import Typography from '@mui/material/Typography';
import Big from 'big.js';
import { Trans, useTranslation } from 'next-i18next';
import { FC } from 'react';

const RecieverName: FC<{
  address: string;
  coins: MsgCoin[];
  metadatas: any[];
  assets: Asset[];
}> = (props) => {
  const { address: theAddress, coins, metadatas, assets } = props;
  const { t } = useTranslation('transactions');
  const { address, name } = useProfileRecoil(theAddress);
  const recieverMoniker = name || theAddress;

  const parsedAmount = coins
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

      if (tokenInAssets && tokenInAssets.extra.xrpl_info) {
        displayDenom =
          tokenInAssets.extra.xrpl_info.currency.length === 40
            ? convertHexToString(tokenInAssets?.extra.xrpl_info.currency)
            : tokenInAssets?.extra.xrpl_info.currency;
      }

      if (asset?.denom_units[1].exponent) {
        const availableValue = new Big(+x.amount)
          .div(Big(10).pow(asset?.denom_units[1].exponent))
          .toFixed(asset?.denom_units[1].exponent);

        amount = formatNumberWithThousandsSeparator(availableValue);
      }

      // Kept the "toUpperCase()" in order to show the token symbol in uppercase
      return `${amount} ${displayDenom}`;
    })
    .reduce(
      (text, value, j, array) => text + (j < array.length - 1 ? ', ' : ` ${t('and')} `) + value
    );
  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txMultisendContentTwo"
        components={[<Name address={address} name={recieverMoniker} />, <b />]}
        values={{
          amount: parsedAmount,
        }}
      />
    </Typography>
  );
};

const Multisend: FC<{
  message: MsgMultiSend;
  metadatas: any[];
  metadataLoading: boolean;
  assets: Asset[];
}> = (props) => {
  const { t } = useTranslation('transactions');
  const { classes } = useStyles();

  const { message, metadatas, assets } = props;

  const sender = message.inputs[0];
  const senderAmount = sender?.coins
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

      if (tokenInAssets && tokenInAssets.extra.xrpl_info) {
        displayDenom =
          tokenInAssets.extra.xrpl_info.currency.length === 40
            ? convertHexToString(tokenInAssets?.extra.xrpl_info.currency)
            : tokenInAssets?.extra.xrpl_info.currency;
      }

      if (asset?.denom_units[1].exponent) {
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

  const { address, name } = useProfileRecoil(sender?.address);
  const validatorMoniker = name || sender?.address;

  if (props.metadataLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <Typography>
        <Trans
          i18nKey="message_contents:txMultisendContentOne"
          components={[<Name address={address} name={validatorMoniker} />, <b />]}
          values={{
            amount: senderAmount,
          }}
        />
      </Typography>
      <div className={classes.multisend}>
        {message?.outputs
          ?.filter((x) => x)
          ?.map((x) => (
            <RecieverName
              key={x.address}
              address={x.address}
              coins={x.coins}
              metadatas={metadatas}
              assets={assets}
            />
          ))}
      </div>
    </div>
  );
};

export default Multisend;
