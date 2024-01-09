import { ReactNode } from 'react';

export const fetchColumns = (): {
  key: string;
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  width: number;
  component?: ReactNode;
  sortKey?: string;
  sort?: boolean;
}[] => [
  {
    key: 'id',
    width: 5,
  },
  {
    key: 'name',
    sortKey: 'denom',
    width: 20,
    sort: true,
  },
  {
    key: 'token_type',
    sortKey: 'token_type',
    width: 15,
  },
  {
    key: 'supply',
    sortKey: 'supply',
    width: 30,
    sort: true,
    align: 'right',
  },
  {
    key: 'holders',
    sortKey: 'holders',
    width: 30,
    sort: true,
    align: 'right',
  },
];
