import List from '@mui/material/List';
import ThreadListItem from './ThreadListItem';
import ThreadListItemSkeleton from './ThreadListItemSkeleton';
import { Thread } from '../../types/types';
import { useTheme } from '@mui/material';

export default function ThreadList({
  id, loading, threads, page
}: {
  id: number | string;
  loading: boolean;
  threads: Thread[];
  page: 'category' | 'user';
}) {
  const theme = useTheme();

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
            id={id}
            thread={thread}
            isLast={i == threads.length - 1}
            page={page}
          />
        ))
      )}
    </List>
  );
}
