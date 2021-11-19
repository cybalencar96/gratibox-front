import { createTheme } from '@material-ui/core';

const theme = createTheme({
  palette: {
    primary: {
      dark: '#6d7ce4', // background
      main: '#8C97EA', // button
      light: '#e0d1ed', // input pink
      contrastText: '#fff',
    },
    secondary: {
      main: '#e63c80', // redish infos
      contrastText: '#e5cdb3',
    },
  },
});

export default theme;
