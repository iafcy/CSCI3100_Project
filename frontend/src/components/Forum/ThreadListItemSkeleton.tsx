import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import { useTheme } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

export default function ThreadListItemSkeleton() {
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
        borderBottomWidth: '.5px',
        borderBottomStyle: 'solid',
        borderBottomColor: theme.palette.divider,
        gap: 1,
        textDecoration: null,
        boxSizing: 'border-box',
        mb: 0,
        color: theme.palette.text.primary
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%'
        }}
      >
        <Typography component="h6" sx={{ width: '100%' }}>
          <Skeleton animation="wave" />
        </Typography>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Typography component="div" sx={{ width: '100%' }}>
          <Skeleton animation="wave" />
        </Typography>
      </Box>
    </ListItem>
  )
}