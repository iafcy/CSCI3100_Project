import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import { useParams, Link } from 'react-router-dom';
import { Thread } from '../../types/types';
import { useTheme } from '@mui/material';
import useThread from '../../hooks/useThreads';
import { useEffect } from 'react';

export default function ThreadListItem({
  thread, isLast, categoryId
}: {
  thread: Thread;
  isLast: boolean;
  categoryId: number;
}) {
  const { threadId: activeThreadId } = useParams();
  const theme = useTheme();
  const { setThread } = useThread();

  useEffect(() => {
    if (Number(activeThreadId) == thread.id) {
      setThread(thread);
      document.title = `${thread.title} | CUHKG`;
    }
  }, [activeThreadId]);

  return (
    <ListItem
      disablePadding
      component={Link} to={`/category/${categoryId}/thread/${thread.id}`}
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