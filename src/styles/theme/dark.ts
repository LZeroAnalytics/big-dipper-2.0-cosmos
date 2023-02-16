const backgroundDefault = '#17191E';
const surfaceOne = '#1B1D23';
const surfaceTwo = '#19191D';
const fontOne = '#E6E6E6';
const fontTwo = '#C4C4C4';
const fontThree = '#818181';

/** Custom theme overrides for dark mode */
export const darkThemeOverride = {
  mixins: {
    tableCell: {
      background: surfaceOne, // surface one
      borderBottom: '1px solid #23272E',
      // '&.odd': {
      //   background: surfaceTwo, // surface two
      // },
    },
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#25D695',
      contrastText: '#fff',
    },
    background: {
      default: backgroundDefault,
      paper: surfaceOne,
    },
    divider: '#363A51',
    text: {
      primary: '#F3F3F3',
      secondary: '#868991',
    },
    custom: {
      general: {
        background: backgroundDefault, // same as background default
        surfaceOne, // same as background paper
        surfaceTwo, // striped tables
        single_block:
          'linear-gradient(110.16deg, rgba(37, 214, 149, 0.15) 0%, rgba(37, 214, 149, 0.05) 100%)',
        nav_drawer: '#2B3138',
        modal_header: '#1D222C',
        search: '#2B3138',
      },
      fonts: {
        fontOne,
        fontTwo,
        fontThree,
        fontFour: '#999999',
        highlight: '#F1C34E',
        settings_label: '#868991',
        table_headers: '#6C6F78',
        data_blocks: '#25D695',
      },
      primaryData: {
        one: '#AE73F8',
        two: '#6B9EFF',
        three: '#5ACF78',
        four: '#E3AB55',
      },
      tokenomics: {
        one: '#004DC2',
        two: '#E3AB55',
        three: '#25D695',
      },
      results: {
        pass: '#1EC490',
        fail: '#FD3B4C',
      },
      condition: {
        zero: '#E8E8E8',
        one: '#1EC490',
        two: '#FF9338',
        three: '#FF608A',
      },
      charts: {
        zero: '#E8E8E8',
        one: '#5ACF78',
        two: '#5E94FF',
        three: '#AE73F8',
        four: '#E3AB55',
        five: '#C25396',
      },
    },
  },
  overrides: {
    MuiTableBody: {
      root: {
        '& .MuiTableRow-root': {
          '&:nth-child(odd)': {
            // backgroundColor: surfaceTwo, // surface two
          },
        },
        '& .MuiTableCell-root': {
          color: fontTwo, // font two
          borderBottom: '1px solid #23272E',
        },
      },
    },
    MuiTabs: {
      root: {
        '& .MuiTab-textColorInherit': {
          color: fontThree, // font three
        },
        '& .MuiTab-textColorInherit.Mui-selected': {
          color: fontOne, // font one
        },
        '& .MuiTabs-indicator': {
          backgroundColor: fontOne, // font one (?)
        },
      },
    },
  },
};
