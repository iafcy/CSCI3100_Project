import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ThreadListItem from './ThreadListItem';
import { Thread } from '@/types/types';

async function fetchData(categoryId: number) : Promise<{
  threadsCount: number;
  threads: Thread[];
}> {
  const response  = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/category/${categoryId}`);
  const data = await response.json();
  return data.data;
}

export default async function ThreadList({
  categoryId
}: {
  categoryId: number;
}) {
  // Fetch threads
  const { threadsCount, threads } = await fetchData(categoryId);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        maxWidth: { lg: '450px' },
        borderRightWidth: '.5px',
        borderRightStyle: 'solid',
        // borderRightColor: theme.palette.divider,
        overflowY: 'hidden'
      }}
    >
      <List
        disablePadding
        sx={{
          height: '100%',
          width: '100%',
          // bgcolor: theme.palette.background.default,
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
