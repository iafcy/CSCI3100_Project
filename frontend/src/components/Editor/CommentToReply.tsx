import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useTheme } from '@mui/material';
import { Comment } from '../../types/types';

export default function CommentToReply({
  comment, index, isOp
} : {
  comment: Comment;
  index: number;
  isOp: boolean;
}) {
  const theme = useTheme();
  const [hide, setHide] = useState<boolean>(false);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        flexGrow: 0,
        p: 1,
        maxHeight: '40%',
        overflowY: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 2,
          }}
        >
          <Typography component="h6" color={isOp ? theme.palette.primary.main : theme.palette.secondary.main}>
            # {index}
          </Typography>
          <Typography component="h6" color='#34aadc'>
            {comment.username}
          </Typography>
        </Box>

        <Box>
          <IconButton
            size='small'
            aria-label="hide"
            onClick={() => setHide(!hide)}
            sx={{
              color: theme.palette.text.primary,
            }}
          >
            {hide ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </Box>
      </Box>

      <Box
        sx={{
          overflowY: 'scroll',
          bgcolor: theme.palette.background.default,
          p: 2,
          display: hide ? 'none' : 'block'
        }}
      >
        <Typography variant='body1'>{comment.content}</Typography>
      </Box>
    </Box>
  )
}