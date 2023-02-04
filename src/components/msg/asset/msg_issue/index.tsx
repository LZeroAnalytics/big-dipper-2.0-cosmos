import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { useProfileRecoil } from '@recoil/profiles';
import { MsgIssue } from '@src/models';

const Issue = (props: {
  message: MsgIssue;
}) => {
  const { message } = props;

  const issuer = useProfileRecoil(message.issuer);

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:msgIssueContent"
        components={[
          (
            <Name
              address={message.issuer}
              name={issuer.name ?? message.issuer}
            />
          ),
          <b />,
          // (
          //   <Proposal />
          // ),
        ]}
        values={{
          issuer: message.issuer,
          amount: message.initial_amount,
          symbol: message.symbol,
        }}
      />
    </Typography>
  );
};

export default Issue;
