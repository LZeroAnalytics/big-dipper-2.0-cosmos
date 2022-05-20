const backgroundDefault = '#17191E';
const surfaceOne = '#1B1D23';
const surfaceTwo = '#19191D';
const fontOne = '#E6E6E6';
const fontTwo = '#AAAAAB';
const fontThree = '#818181';

/** Custom theme overrides for dark mode */
export const darkThemeOverride = {
  mixins: {
    tableCell: {
      background: surfaceOne, // surface one
      '&.odd': {
        background: surfaceTwo, // surface two
      },
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
    divider: '#3D3D43',
    text: {
      primary: '#F3F3F3',
      secondary: '#868991',
    },
    custom: {
      general: {
        background: backgroundDefault, // same as background default
        surfaceOne, // same as background paper
        surfaceTwo, // striped tables
        single_block: 'linear-gradient(110.16deg, rgba(37, 214, 149, 0.15) 0%, rgba(37, 214, 149, 0.05) 100%)',
        nav_drawer: '#2B3138',
      },
      fonts: {
        fontOne,
        fontTwo,
        fontThree,
        fontFour: '#999999',
      },
      primaryData: {
        one: '#af2929',
        two: '#b44516',
        three: '#b14237',
        four: '#b16919',
      },
      results: {
        pass: '#198a65',
        fail: '#b12a34',
      },
    },
  },
  overrides: {
    MuiTableBody: {
      root: {
        '& .MuiTableRow-root': {
          '&:nth-child(odd)': {
            backgroundColor: surfaceTwo, // surface two
          },
        },
        '& .MuiTableCell-root': {
          color: fontTwo, // font two
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
