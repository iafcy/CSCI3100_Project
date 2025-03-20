'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ThreadListItem from './ThreadListItem';
import { Thread } from '@/types/types';
import { useActiveThreadId } from '@/hooks/useActiveThreadId';
import { useTheme } from '@mui/material';

export default function ThreadList({
  threads, categoryId
}: {
  threads: Thread[],
  categoryId: number
}) {
  const activeThreadId = useActiveThreadId();
  const theme = useTheme();

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
            active={Number(activeThreadId) == thread.id}
          />
        ))}
      </List>
    </Box>
  );
}
