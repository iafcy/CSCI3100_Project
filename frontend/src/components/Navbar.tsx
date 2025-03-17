'use client';

import * as React from 'react';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DrawerMenu from '@/components/DrawerMenu';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useActiveThreadId } from '@/hooks/useActiveThreadId';
import { useRouter } from 'next/navigation';

export default function Navbar({
  title, categoryId
}: {
  title: string;
  categoryId: number;
}) {
  const activeThreadId = useActiveThreadId();
  const router = useRouter();

  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{ flexGrow: 0, display: 'relative' }}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#222',
          display: 'flex',
          flexDirection: 'row',
          borderBottom: '.5px solid #3b3a39',
          alignItems: 'center',
          height: 56
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: { lg: '450px' },
            borderRight: '.5px solid #3b3a39',
          }}
        >
          <Toolbar>
            <DrawerMenu />
            <Typography variant="h6" component="div" align="center" sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
            <IconButton
              size="large"
              color="inherit"
            >
              <AddIcon />
            </IconButton>
          </Toolbar>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', lg: 'flex' },
            flexGrow: 1,
            px: 2.5,
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}
          >
            {activeThreadId && 
              <IconButton
                size="small"
                color="inherit"
                aria-label="like"
                onClick={() => router.push(`/category/${categoryId}`)}
              >
                <ArrowBackIcon fontSize='small' />
              </IconButton>
            }
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {activeThreadId ? `Thread ${activeThreadId}` : ''}
            </Typography>
          </Box>
        </Box>
      </AppBar>
    </Container>
  );
}
