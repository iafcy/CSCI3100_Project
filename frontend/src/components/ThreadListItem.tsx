import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import Link from 'next/link';
import { Thread } from '@/types/types'

export default function ThreadListItem({
  thread, isLast, active, categoryId
}: {
  thread: Thread;
  isLast: boolean;
  active: boolean;
  categoryId: number;
}) {
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
        borderBottom: '.5px solid #3b3a39',
        gap: 1,
        textDecoration: null,
        boxSizing: 'border-box',
        mb: isLast ? 6 : 0,
        color: active ? '#fcba03' : '#fff'
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