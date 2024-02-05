import Spinner from '@/components/loadingSpinner';
import Name from '@/components/name';
import { MsgFundCommunityPool } from '@/models';
import { useProfileRecoil } from '@/recoil/profiles/hooks';
import { formatNumberWithThousandsSeparator } from '@/screens/account_details/components/other_tokens/components/desktop';
import { formatToken } from '@/utils/format_token';
import Typography from '@mui/material/Typography';
import Big from 'big.js';
import { Trans, useTranslation } from 'next-i18next';
import { FC } from 'react';

const Fund: FC<{ message: MsgFundCommunityPool; metadatas: any[]; metadataLoading: boolean }> = (
  props
) => {
  const { t } = useTranslation('transactions');
  const { message, metadatas } = props;

  const parsedAmount = message?.amount
    ?.map((x) => {
      const asset = metadatas.find((item) => item.base.toLowerCase() === x.denom.toLowerCase());
      let amount = formatToken(x.amount, x.denom).value;

      if (asset?.denom_units[1].exponent) {
        const availableValue = new Big(+x.amount)
          .div(Big(10).pow(asset?.denom_units[1].exponent))
          .toFixed(asset?.denom_units[1].exponent);

        amount = formatNumberWithThousandsSeparator(availableValue);
      }

      // Kept the "toUpperCase()" in order to show the token symbol in uppercase
      return `${amount} ${asset ? asset.display.toUpperCase() : x.denom.toUpperCase()}`;
    })
    .reduce(
      (text, value, i, array) => text + (i < array.length - 1 ? ', ' : ` ${t('and')} `) + value
    );

  const depositor = useProfileRecoil(message.depositor);
  const depositorMoniker = depositor ? depositor?.name : message.depositor;

  if (props.metadataLoading) {
    return <Spinner />;
  }

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txFundContent"
        components={[<Name address={message.depositor} name={depositorMoniker} />, <b />]}
        values={{
          amount: parsedAmount,
        }}
      />
    </Typography>
  );
};

export default Fund;
