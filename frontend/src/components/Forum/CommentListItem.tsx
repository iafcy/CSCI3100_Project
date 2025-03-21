import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import { Comment } from '../../types/types';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useTheme } from '@mui/material';

export default function CommentListItem({
  comment, index, initRating
}: {
  comment: Comment;
  index: number;
  initRating: 'like' | 'dislike' | null;
}) {
  const theme = useTheme();
  const [likeCount, setLikeCount] = useState<number>(comment.like);
  const [dislikeCount, setDislikeCount] = useState<number>(comment.dislike);
  const [rating, setRating] = useState<'like' | 'dislike' | null>(initRating);

  const handleLike = () => {
    if (rating == 'like') {
      setRating(null);
      setLikeCount(likeCount - 1);
    } else {
      setRating('like');
      setLikeCount(likeCount + 1);
    }
  }

  const handleDislike = () => {
    if (rating == 'dislike') {
      setRating(null);
      setDislikeCount(dislikeCount - 1)
    } else {
      setRating('dislike');
      setDislikeCount(dislikeCount + 1)
    }
  }

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
            gap: 2
          }}
        >
          <Typography component="h6" color={index == 0 ? theme.palette.primary.main : theme.palette.secondary.main}>
            #{index + 1} 
          </Typography>
          <Typography component="h6" color='#34aadc'>
            {comment.username}
          </Typography>
        </Box>

        <Box>
          <Typography component="h6">
            ...
          </Typography>
        </Box>
      </Box>

      {/* Comment content */}
      <Box
        sx={{ py: 2 }}
      >
        <Typography variant='body1'>
          {comment.content}
        </Typography>
      </Box>

      {/* Like and dislike buttons */}
      <Box
        sx={{
          bgcolor: theme.palette.divider,
          display: 'flex',
          mb: 1
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            px: 1,
            py: 0.5
          }}
        >
          <IconButton
            size="small"
            color="inherit"
            aria-label="like"
            edge='start'
            onClick={handleLike}
          >
            <ThumbUpIcon
              fontSize='small'
              sx={{ color: rating == 'like' ? theme.palette.primary.main : theme.palette.secondary.main }}
            />
          </IconButton>
          <Typography variant='body2'>{likeCount}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            px: 1,
            py: 0.5
          }}
        >
          <IconButton
            size="small"
            color="inherit"
            aria-label="dislike"
            edge='start'
            onClick={handleDislike}
          >
            <ThumbDownIcon
              fontSize='small'
              sx={{ color: rating == 'dislike' ? theme.palette.primary.main : theme.palette.secondary.main }}
            />
          </IconButton>
          <Typography variant='body2'>{dislikeCount}</Typography>
        </Box>
      </Box>
    </ListItem>
  );
}
