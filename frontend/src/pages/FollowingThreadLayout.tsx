import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Navbar from '../components/Navbar';
import ThreadList from '../components/Forum/ThreadList';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useTheme } from '@mui/material';
import axios from "../utils/axios";
import useAuth from '../hooks/useAuth';
import { a11yProps } from '../components/Shared/TabPanel';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import useThread from '../hooks/useThreads';

export default function FollowingThreadLayout() {
  const { user, authenticated } = useAuth();

  const theme = useTheme();
  const { threadId } = useParams();
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
  }

  const { threads, setThreads, threadsCount, setThreadsCount } = useThread();

  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort_by') || 'time';

  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/thread/following?sort_by=${sortBy}&limit=10`)
      .then((response) => {
        setThreads(response.data.data.threads);
        setThreadsCount(response.data.data.threadsCount)
      })
      .catch(() => navigate('/error', {
        replace: true,
      }))
      .finally(() => setLoading(false));
  }, [authenticated, sortBy]);

  const loadMoreThreads = async () => {
    if (threads.length >= threadsCount) {
      return;
    }

    setLoadingMore(true);
    
    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/thread/following?sort_by=${sortBy}&limit=10&offset=${threads.length}`)
      .then((response) => {
        if (response.data.data.threads.length > 0) {
          setThreads([
            ...threads,
            ...response.data.data.threads,
          ]);
        }
        setThreadsCount(response.data.data.threadsCount)
      })
      .finally(() => setLoadingMore(false));
  };

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
              onChange={(_, num) => {navigate(`/following?sort_by=${num == 0 ? 'time' : 'likes'}`)}}
              variant="fullWidth"
              
            >
              <Tab label="Recent" {...a11yProps(0)} sx={{ fontWeight: 700 }} disabled={threads.length == 0} />
              <Tab label="Popular" {...a11yProps(1)} sx={{ fontWeight: 700 }} disabled={threads.length == 0} />
            </Tabs>
            <ThreadList
              loading={loading}
              loadingMore={loadingMore}
              loadMoreThreads={loadMoreThreads}
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
