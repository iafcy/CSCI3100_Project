import { createContext, useEffect, useState, useMemo } from 'react';
import getTheme,  { lightScrollbar, darkScrollbar } from '../theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';

type SettingsContextType = {
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>
}

const SettingsContext = createContext<SettingsContextType>({
  fontSize: 14,
  setFontSize: () => {},
});

function SettingsProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [fontSize, setFontSize] = useState<number>(() => {
    const saved = localStorage.getItem('CUHKG:fontSize');
    return saved ? parseInt(saved, 10) : 14;
  });

  useEffect(() => {
    localStorage.setItem('CUHKG:fontSize', fontSize.toString());
  }, [fontSize]);

  const theme = useMemo(() => getTheme({ fontSize }), [fontSize]);

  return (
    <SettingsContext.Provider
      value={{ fontSize, setFontSize }}
    >
      <ThemeProvider theme={theme} defaultMode="system">
        <CssBaseline />
        <GlobalStyles
          styles={(theme) => theme.palette.mode == 'dark' ? darkScrollbar : lightScrollbar}
        />
        {children}
      </ThemeProvider>
    </SettingsContext.Provider>
  );
}

export { SettingsProvider, SettingsContext };