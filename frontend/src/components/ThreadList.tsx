import { useState, useEffect } from 'react';
import axios from '../utils/axios';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ThreadListItem from './ThreadListItem';
import { Thread } from '../types/types';
import { useTheme } from '@mui/material';

export default function ThreadList({
  categoryId
}: {
  categoryId: number;
}) {
  const theme = useTheme();

  // Fetch threads
  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/category/${categoryId}`)
      .then((response) => {
        setThreads(response.data.data.threads);
      })
  }, [categoryId]);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        maxWidth: { lg: '450px' },
        borderRightWidth: '.5px',
        borderRightStyle: 'solid',
        borderRightColor: theme.palette.divider,
        overflowY: 'hidden'
      }}
    >
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
    </Box>
  );
}
