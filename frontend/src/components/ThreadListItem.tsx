'use client';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import Link from 'next/link';
import { Thread } from '@/types/types';
import { useActiveThreadId } from '@/hooks/useActiveThreadId';
import { useTheme } from '@mui/material';

export default function ThreadListItem({
  thread, isLast, categoryId
}: {
  thread: Thread;
  isLast: boolean;
  categoryId: number;
}) {
  const activeThreadId = useActiveThreadId();
  const theme = useTheme();

  return (
    <ListItem
      disablePadding
      component={Link} href={`/category/${categoryId}/thread/${thread.id}`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        py: 2,
        px: 4,
        borderBottomWidth: '.5px',
        borderBottomStyle: 'solid',
        borderBottomColor: theme.palette.divider,
        gap: 1,
        textDecoration: null,
        boxSizing: 'border-box',
        mb: isLast ? 6 : 0,
        color: Number(activeThreadId) == thread.id ? theme.palette.primary.main : theme.palette.text.primary
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Typography component="h6">
          {thread.username}
        </Typography>
      </Box>
      <Box>
        <Typography component="div">
          {thread.title}
        </Typography>
      </Box>
    </ListItem>
  )
}