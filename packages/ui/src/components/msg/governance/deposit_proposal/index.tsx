import Spinner from '@/components/loadingSpinner';
import Name from '@/components/name';
import { MsgDeposit } from '@/models';
import { useProfileRecoil } from '@/recoil/profiles/hooks';
import { formatNumberWithThousandsSeparator } from '@/screens/account_details/components/other_tokens/components/desktop';
import { formatToken } from '@/utils/format_token';
import { PROPOSAL_DETAILS } from '@/utils/go_to_page';
import Typography from '@mui/material/Typography';
import Big from 'big.js';
import { Trans, useTranslation } from 'next-i18next';
import Link from 'next/link';
import { FC, useMemo } from 'react';

const DepositProposal: FC<{ message: MsgDeposit; metadatas: any[]; metadataLoading: boolean }> = (
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

  const Proposal = useMemo(
    () => (
      <Link shallow href={PROPOSAL_DETAILS(message.proposalId)}>
        #{message.proposalId}
      </Link>
    ),
    [message.proposalId]
  );

  if (props.metadataLoading) {
    return <Spinner />;
  }

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txDepositContent"
        components={[<Name address={message.depositor} name={depositorMoniker} />, <b />, Proposal]}
        values={{
          amount: parsedAmount,
          proposal: `#${message.proposalId}`,
        }}
      />
    </Typography>
  );
};

export default DepositProposal;
