import { FC } from 'react';
import { useProfileRecoil } from '@/recoil/profiles';
import { Typography } from '@mui/material';
import { Trans } from 'react-i18next';
import Name from '@/components/name';
import { MsgClearAdmin } from '@/models';
import { Asset, convertHexToString } from '@/screens/assets/hooks';
import Spinner from '@/components/loadingSpinner';

const ClearAdmin: FC<{
  message: MsgClearAdmin;
  assets: Asset[];
  metadatas: any[];
  assetsLoading: boolean;
  metadataLoading: boolean;
}> = (props) => {
  const { message, assets, metadatas, assetsLoading, metadataLoading } = props;
  const sender = useProfileRecoil(message.sender);

  const asset = metadatas.find((item) => item.base.toLowerCase() === message.denom.toLowerCase());

  const tokenInAssets = assets.find(
    (assetItem) => message.denom.toLowerCase() === assetItem.denom.toLowerCase()
  );
  let displayDenom = asset?.display.toUpperCase() || message.denom.toLowerCase();
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

  if (tokenInAssets) {
    if (message.denom.includes('ibc')) {
      displayDenom = tokenInAssets.extra.ibc_info!.display_name;
    }
  }

  if (assetsLoading || metadataLoading) {
    return <Spinner />;
  }

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:msgClearAdmin"
        components={[<Name address={message.sender} name={sender.name ?? message.sender} />, <b />]}
        values={{
          sender: message.sender,
          denom: displayDenom,
        }}
      />
    </Typography>
  );
};

export default ClearAdmin;
