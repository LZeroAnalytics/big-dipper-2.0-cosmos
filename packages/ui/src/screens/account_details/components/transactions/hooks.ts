import { useRouter } from 'next/router';
import * as R from 'ramda';
import { useEffect, useState } from 'react';
import { convertMsgsToModels } from '@/components/msg/utils';
import {
  GetMessagesByAddressQuery,
  useGetMessagesByAddressQuery,
} from '@/graphql/types/general_types';
import type { TransactionState } from '@/screens/account_details/components/transactions/types';
import { convertMsgType } from '@/utils/convert_msg_type';
import { formatToken } from '@/utils/format_token';

const LIMIT = 100;
const LIMITPlusOne = LIMIT + 1;

const getSender = (messages: any[]) => {
  const senderKeys = [
    'executor',
    'sender',
    'from_address',
    'issuer',
    'grantee',
    'granter',
    'depositor',
    'submitter',
    'proposer',
    'voter',
    'delegator_address',
    'admin',
    'address',
  ];

  const getPrimarySender = (message: any) => senderKeys.find((key) => message[key]) || '';

  let firstSender = messages[0][getPrimarySender(messages[0])];

  if (firstSender === '' && messages[0].inputs?.length) {
    firstSender = messages[0].inputs[0].from_address;
  }

  if (messages.length > 1) {
    // eslint-disable-next-line no-restricted-syntax
    for (const message of messages) {
      const currentSender = message[getPrimarySender(message) as string];
      if (currentSender && currentSender !== firstSender) {
        return 'Multiple';
      }

      if (message.inputs?.length) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const senderInInputs = message.inputs.find((item: any) => item.address !== firstSender);

        if (senderInInputs) {
          return 'Multiple';
        }
      }
    }
  }

  return firstSender || '-';
};

const formatSpenderAndReceiver = (messages: any[], transactionLogs: any[], denom: string) => {
  let attributes: any = [];

  if (transactionLogs) {
    // eslint-disable-next-line no-restricted-syntax
    for (const transactionLog of transactionLogs) {
      const { events } = transactionLog;

      if (events.filter((event: any) => event.attributes.length > 1).length) {
        attributes = [...attributes, ...events.filter((event: any) => event.attributes.length > 1)];
      }
    }
  }

  const sender = getSender(messages);
  const receivers = attributes
    ?.map((e: any) => {
      const receiverItems = e.attributes.filter((attr: any) => attr.key === 'receiver');

      return receiverItems;
    })
    .filter((item: any) => item.length);

  let receiver = '-';

  if (receivers?.length) {
    receiver = receivers.length === 1 ? receivers[0][0].value : 'Multiple';
  }

  let amount = '';
  const coinReceivedEvents = attributes?.filter((item: any) => item.type === 'coin_received');

  if (coinReceivedEvents?.length === 1) {
    const amountAttribute = coinReceivedEvents[0].attributes.find(
      (item: any) => item.key === 'amount' && item.value?.includes(denom)
    );

    if (amountAttribute) {
      amount = amountAttribute.value;
    }
  }

  return {
    sender,
    receiver: receiver.replaceAll('"', ''),
    amount,
  };
};

const formatTransactions = (data: GetMessagesByAddressQuery): Transactions[] => {
  let formattedData = data.messagesByAddress;
  if (data.messagesByAddress.length === LIMITPlusOne) {
    formattedData = data.messagesByAddress.slice(0, LIMITPlusOne);
  }
  return formattedData.map((x) => {
    const { transaction } = x;
    const { fee, logs, messages: txMessages } = transaction as any;
    const feeAmount = fee?.amount?.[0] ?? {
      denom: '',
      amount: 0,
    };

    const { sender, receiver, amount } = formatSpenderAndReceiver(
      txMessages,
      logs,
      feeAmount.denom
    );
    const formatedAmount =
      amount !== '' && amount !== '-'
        ? formatToken(amount.replace(feeAmount.denom, ''), feeAmount.denom)
        : amount;

    // =============================
    // messages
    // =============================
    const messages = convertMsgsToModels(transaction);
    const msgType = messages.map((eachMsg) => {
      const eachMsgType = eachMsg?.type ?? 'none type';
      return eachMsgType ?? '';
    });
    const convertedMsgType = convertMsgType(msgType);
    return {
      height: transaction?.height,
      hash: transaction?.hash ?? '',
      type: convertedMsgType,
      messages: {
        count: messages.length,
        items: messages,
      },
      success: transaction?.success ?? false,
      timestamp: transaction?.block.timestamp,
      fee: formatToken(feeAmount.amount, feeAmount.denom),
      amount: formatedAmount,
      sender,
      receiver,
    };
  });
};

export function useTransactions() {
  const router = useRouter();
  const [state, setState] = useState<TransactionState>({
    data: [],
    hasNextPage: false,
    isNextPageLoading: true,
    offsetCount: 0,
  });

  const handleSetState = (stateChange: (prevState: TransactionState) => TransactionState) => {
    setState((prevState) => {
      const newState = stateChange(prevState);
      return R.equals(prevState, newState) ? prevState : newState;
    });
  };

  const transactionQuery = useGetMessagesByAddressQuery({
    variables: {
      limit: LIMIT + 1, // to check if more exist
      offset: 0,
      address: `{${router?.query?.address ?? ''}}`,
    },
    onCompleted: (data) => {
      const itemsLength = data.messagesByAddress.length;
      // Previously joining together ...state.data and ...formatTransactions(data) was causing duplicate transactions to be displayed
      const newItems = R.uniq([...formatTransactions(data)]);

      const stateChange: TransactionState = {
        data: newItems,
        hasNextPage: itemsLength === LIMITPlusOne,
        isNextPageLoading: false,
        offsetCount: state.offsetCount + LIMIT,
      };

      handleSetState((prevState) => ({ ...prevState, ...stateChange }));
    },
  });

  useEffect(() => {
    setState({
      data: [],
      hasNextPage: false,
      isNextPageLoading: true,
      offsetCount: 0,
    });
  }, [router?.query?.address]);

  const loadNextPage = async () => {
    handleSetState((prevState) => ({ ...prevState, isNextPageLoading: true }));
    // refetch query
    await transactionQuery
      .fetchMore({
        variables: {
          offset: state.offsetCount,
          limit: LIMITPlusOne,
        },
      })
      .then(({ data }) => {
        const itemsLength = data.messagesByAddress.length;
        const newItems = R.uniq([...state.data, ...formatTransactions(data)]);
        const stateChange: TransactionState = {
          data: newItems,
          hasNextPage: itemsLength === LIMITPlusOne,
          isNextPageLoading: false,
          offsetCount: state.offsetCount + LIMIT,
        };
        handleSetState((prevState) => ({ ...prevState, ...stateChange }));
      });
  };

  return {
    state,
    loadNextPage,
  };
}
