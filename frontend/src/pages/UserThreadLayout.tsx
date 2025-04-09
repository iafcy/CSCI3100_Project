import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Navbar from '../components/Navbar';
import ThreadList from '../components/Forum/ThreadList';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { Thread } from '../types/types';
import axios from "../utils/axios";
import useAuth from '../hooks/useAuth';
import useNav from '../hooks/useNav';
import { a11yProps } from '../components/Shared/TabPanel';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function UserThreadLayout() {
  const theme = useTheme();
  const { userId, threadId } = useParams();
  const { user } = useAuth();
  const { setActiveUserProfile } = useNav();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort_by') || 'time';

  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  if (!userId) {
    return null;
  }

  useEffect(() => {
    setLoading(true);

    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/thread/user/${userId}?sort_by=${sortBy}`)
      .then((response) => {
        setThreads(response.data.data.threads);
        setActiveUserProfile({
          userId: userId,
          username: response.data.data.username
        });
      })
      .finally(() => setLoading(false));
  }, [userId, user, sortBy]);

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
            <Tabs
              value={sortBy == 'time' ? 0 : 1}
              onChange={(_, num) => {navigate(`/user/${userId}?sort_by=${num == 0 ? 'time' : 'likes'}`)}}
              variant="fullWidth"
            >
              <Tab label="Recent" {...a11yProps(0)} sx={{ fontWeight: 700 }} />
              <Tab label="Popular" {...a11yProps(1)} sx={{ fontWeight: 700 }} />
            </Tabs>
            <ThreadList
              id={userId}
              loading={loading}
              threads={threads}
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
