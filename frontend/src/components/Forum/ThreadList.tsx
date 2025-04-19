import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ThreadListItem from './ThreadListItem';
import ThreadListItemSkeleton from './ThreadListItemSkeleton';
import { useTheme } from '@mui/material';
import useUser from '../../hooks/useUser';
import useThread from '../../hooks/useThreads';

export default function ThreadList({
  loading, loadingMore, loadMoreThreads
}: {
  loading: boolean;
  loadingMore: boolean;
  loadMoreThreads: () => void;
}) {
  const theme = useTheme();
  const { isBlocking } = useUser();
  const { threads, threadsCount } = useThread();

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
        threads.length == 0 ? (
          <ListItem
            disablePadding
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              py: 2,
              px: 4,
              gap: 1,
              mb: 6,
              color: theme.palette.secondary.main
            }}
          >
            <Typography>There is no threads here...</Typography>
          </ListItem>
        ) : (
          <>
            {threads.map(thread => (
              (
                !isBlocking(thread.user_id) &&
                <ThreadListItem
                  key={thread.id}
                  thread={thread}
                />
              )
            ))}
            <ListItem
              disablePadding
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                py: 2,
                px: 4,
                gap: 1,
                mb: 8,
                color: theme.palette.secondary.main
              }}
            >
              {
                threads.length < threadsCount &&
                <Button
                  variant="contained"
                  onClick={loadMoreThreads}
                  loading={loadingMore}
                >
                  Load more
                </Button>
              }
            </ListItem>
          </>
        )
      )}
    </List>
  );
}
