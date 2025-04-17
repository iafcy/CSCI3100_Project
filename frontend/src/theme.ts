import { createTheme } from '@mui/material/styles';

const getTheme = ({
  fontSize
} : {
  fontSize: number
}) => {
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
    typography: {
      fontSize: fontSize
    }
  });

  return theme;
};

export const lightScrollbar = {
  scrollbarColor: "#c2c2c2 #e8e8e8",
  "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
    backgroundColor: "#e8e8e8",
  },
  "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
    borderRadius: 6,
    backgroundColor: "#c2c2c2",
    minHeight: 24,
    border: "3px solid #e8e8e8",
  },
  "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
    backgroundColor: "#aaaaaa",
  },
  "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
    backgroundColor: "#aaaaaa",
  },
  "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#aaaaaa",
  },
  "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
    backgroundColor: "#e8e8e8",
  },
};

export const darkScrollbar = {
  scrollbarColor: "#5b5b5b #3b3a39",
  "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
    backgroundColor: "#3b3a39",
  },
  "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
    borderRadius: 6,
    backgroundColor: "#5b5b5b",
    minHeight: 24,
    border: "3px solid #3b3a39",
  },
  "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
    backgroundColor: "#aaaaaa",
  },
  "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
    backgroundColor: "#aaaaaa",
  },
  "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#aaaaaa",
  },
  "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
    backgroundColor: "#3b3a39",
  },
};

export default getTheme;