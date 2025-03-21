import { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import List from '@mui/material/List';
import ThreadListItem from './ThreadListItem';
import { Thread } from '../../types/types';
import { useTheme } from '@mui/material';

export default function ThreadList({
  categoryId
}: {
  categoryId: number;
}) {
  const theme = useTheme();
  
  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/category/${categoryId}`)
      .then((response) => {
        setThreads(response.data.data.threads);
      })
  }, [categoryId]);

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
      {threads.map((thread, i) => (
        <ThreadListItem
          key={thread.id}
          categoryId={categoryId}
          thread={thread}
          isLast={i == threads.length - 1}
        />
      ))}
    </List>
  );
}
