import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Navbar from '../components/Navbar';
import ThreadList from '../components/Forum/ThreadList';
import { useParams } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useTheme } from '@mui/material';

export default function MainLayout() {
  const theme = useTheme();
  const { categoryId, threadId } = useParams();

  return (
    <Container
      maxWidth={false}
      sx={{
        bgcolor: theme.palette.background.paper,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        m: 0,
        p: 0
      }}
    >
      <Container
        maxWidth="xl"
        disableGutters
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'hidden',
        }}
      >
        <Navbar />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexGrow: 1,
            height: 'calc(100vh - 56px)',
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              maxWidth: { lg: '450px' },
              borderRightWidth: '.5px',
              borderRightStyle: 'solid',
              borderRightColor: theme.palette.divider,
              overflowY: 'hidden',
              display: {
                'xs': threadId ? 'none' : 'block',
                'lg': 'block'
              }
            }}
          >
            <ThreadList categoryId={Number(categoryId)} />
          </Box>
          <Box
            sx={{
              display: {
                xs: threadId ? 'block' : 'none',
                lg: 'block'
              },
              flexGrow: 1,
              width: '100%',
              height: '100%',
              overflowY: 'hidden'
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Container>
    </Container>
  );
}
