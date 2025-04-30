import { FC } from 'react';
import AvatarName from '@/components/avatar_name';
import { useProfileRecoil } from '@/recoil/profiles/hooks';

export const columns: {
  key: string;
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  width: number;
}[] = [
  {
    key: 'validator',
    width: 100,
  },
];

const FormatRow: FC<{ rowAddress: string; moniker: string }> = ({ rowAddress, moniker }) => {
  const { name, address, imageUrl } = useProfileRecoil(rowAddress);

  return <AvatarName address={address} imageUrl={imageUrl} name={moniker || name} />;
};

export const formatRows = (data: { address: string; moniker: string }[]) =>
  data.map((x) => ({
    validator: <FormatRow key={x.address} rowAddress={x.address} moniker={x.moniker} />,
  }));
