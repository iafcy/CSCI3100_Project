import { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import List from '@mui/material/List';
import ThreadListItem from './ThreadListItem';
import ThreadListItemSkeleton from './ThreadListItemSkeleton';
import { Thread } from '../../types/types';
import { useTheme } from '@mui/material';
import useAuth from '../../hooks/useAuth';

export default function ThreadList({
  categoryId
}: {
  categoryId: number;
}) {
  const theme = useTheme();
  const { user } = useAuth();
  
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/category/${categoryId}`)
      .then((response) => {
        setThreads(response.data.data.threads);
      })
      .finally(() => setLoading(false));
  }, [categoryId, user]);

  return (
    <List
      disablePadding
      sx={{
        height: '100%',
        width: '100%',
        bgcolor: theme.palette.background.default,
        overflowY: 'auto',
      }}
    >
      {loading ? (
        <>
          <ThreadListItemSkeleton />
          <ThreadListItemSkeleton />
          <ThreadListItemSkeleton />
        </>
      ) : (
        threads.map((thread, i) => (
          <ThreadListItem
            key={thread.id}
            categoryId={categoryId}
            thread={thread}
            isLast={i == threads.length - 1}
          />
        ))
      )}
    </List>
  );
}
