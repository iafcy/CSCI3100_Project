import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { Thread } from '../../types/types';
import { useTheme } from '@mui/material';
import useThread from '../../hooks/useThreads';
import { useEffect } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export default function ThreadListItem({
  thread
}: {
  thread: Thread;
}) {
  const { threadId: activeThreadId } = useParams();
  const theme = useTheme();
  const { setActiveThread } = useThread();

  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort_by');

  dayjs.extend(relativeTime);

  useEffect(() => {
    if (Number(activeThreadId) == thread.id) {
      setActiveThread(thread);
    }
  }, [activeThreadId]);

  return (
    <ListItem
      disablePadding
      component={Link}
      to={sortBy == null ? `thread/${thread.id}` : `thread/${thread.id}?sort_by=${sortBy}`}
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
        mb: 0,
        color: Number(activeThreadId) == thread.id ? theme.palette.primary.main : theme.palette.text.primary
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%'
        }}
      >
        <Typography component="h6">
          {thread.username}
        </Typography>
        <Typography
          sx={{
            flexShrink: 0,
            color: Number(activeThreadId) == thread.id ? theme.palette.primary.main : theme.palette.secondary.main
          }}  
        >
          {dayjs(thread.created_at).fromNow()}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Typography component="h6">
          {thread.title}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 1,
            flexShrink: 0,
            color: Number(activeThreadId) == thread.id ? theme.palette.primary.main : theme.palette.secondary.main
          }}
        >
          <ThumbUpIcon fontSize='small' />
          {thread.like}
        </Box>
      </Box>
    </ListItem>
  )
}