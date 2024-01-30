export const columns: {
  key: string;
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  width: number;
}[] = [
  {
    key: 'token',
    width: 35,
  },
  {
    key: 'available',
    width: 55,
    align: 'right',
  },
  {
    key: 'reward',
    width: 10,
    align: 'right',
  },
  // {
  //   key: 'commission',
  //   width: 25,
  //   align: 'right',
  // },
];
