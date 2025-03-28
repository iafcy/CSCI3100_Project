import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import { useTheme } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

export default function CommentListItemSkeleton() {
  const theme = useTheme();

  return (
    <ListItem
      disablePadding
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        py: 2,
        px: 4,
        gap: 1,
        textDecoration: null,
        boxSizing: 'border-box',
        mt: 2,
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            width: '100%',
          }}
        >
          <Typography variant="h6" component="h6" sx={{ width: '100%' }}>
            <Skeleton width={'100%'} variant="text" animation="wave" />
          </Typography>
        </Box>
      </Box>

      {/* Comment content */}
      <Box
        sx={{ py: 2, width: '100%' }}
      >
        <Typography variant='body1' sx={{ width: '100%' }}>
          <Skeleton width={'100%'} height={96} variant="rectangular" animation="wave" />
        </Typography>
      </Box>

      {/* Like and dislike buttons */}
      <Box
        sx={{
          display: 'flex',
          mb: 1,
          width: '100%'
        }}
      >
        <Typography variant="body1" sx={{ width: '100%' }}>
          <Skeleton width={'100%'} variant="text" animation="wave" />
        </Typography>
      </Box>
    </ListItem>
  );
}
