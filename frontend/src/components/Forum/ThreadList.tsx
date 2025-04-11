import List from '@mui/material/List';
import ThreadListItem from './ThreadListItem';
import ThreadListItemSkeleton from './ThreadListItemSkeleton';
import { Thread } from '../../types/types';
import { useTheme } from '@mui/material';
import useUser from '../../hooks/useUser';

export default function ThreadList({
  loading, threads
}: {
  loading: boolean;
  threads: Thread[];
}) {
  const theme = useTheme();
  const { isBlocking } = useUser();

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
          (
            !isBlocking(thread.user_id) &&
            <ThreadListItem
              key={thread.id}
              thread={thread}
              isLast={i == threads.length - 1}
            />
          )
        ))
      )}
    </List>
  );
}
