import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Navbar from '../components/Navbar';
import ThreadList from '../components/Forum/ThreadList';
import { useParams } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { Thread } from '../types/types';
import axios from "../utils/axios";
import useAuth from '../hooks/useAuth';
import useNav from '../hooks/useNav';

export default function UserThreadLayout() {
  const theme = useTheme();
  const { userId, threadId } = useParams();
  const { user } = useAuth();
  const { setActiveUserProfile } = useNav();

  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  if (!userId) {
    return null;
  }

  useEffect(() => {
    setLoading(true);

    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/thread/user/${userId}`)
      .then((response) => {
        setThreads(response.data.data.threads);
        setActiveUserProfile({
          userId: userId,
          username: response.data.data.username
        });
      })
      .finally(() => setLoading(false));
  }, [userId, user]);

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
            <ThreadList
              id={userId}
              loading={loading}
              threads={threads}
              page='user'
            />
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
