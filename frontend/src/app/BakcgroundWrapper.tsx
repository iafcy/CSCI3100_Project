'use client';

import { useEffect  } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';

export default function BakcgroundWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = useTheme();

  return (
    <Box sx={{
      bgcolor: theme.palette.background.paper
    }}>
      {children}
    </Box>
  );
}
