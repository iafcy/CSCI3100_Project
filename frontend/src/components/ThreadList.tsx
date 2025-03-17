'use client';

import * as React from 'react';
import List from '@mui/material/List';
import ThreadListItem from './ThreadListItem';
import { Thread } from '@/types/types';
import { useActiveThreadId } from '@/hooks/useActiveThreadId';

export default function ThreadList({
  threads, categoryId
}: {
  threads: Thread[],
  categoryId: number
}) {
  const activeThreadId = useActiveThreadId();

  return (
    <List
      disablePadding
      sx={{
        height: '100%',
        width: '100%',
        bgcolor: '#151515',
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
  );
}
