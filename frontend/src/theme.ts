import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  colorSchemes: {
    dark: {
      palette: {
        mode: 'dark',
        primary: {
          main: '#fcba03',
        },
        secondary: {
          main: '#AAAAAA',
        },
        background: {
          paper: '#222222',
          default: '#151515',
        },
        divider: '#3b3a39',
      },
    },
    light: {
      palette: {
        mode: 'light',
        primary: {
          main: '#fcba03',
        },
        secondary: {
          main: '#AAAAAA',
        },
        background: {
          paper: '#f2f2f2',
          default: '#ffffff',
        },
        divider: '#e8e8e8',
      },
    }
  },
});

// https://coolors.co/151515-222222-aaaaaa-ffffff-f9f9f9-e8e8e8-fcba03

export default theme;