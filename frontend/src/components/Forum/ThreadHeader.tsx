import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate } from "react-router-dom";
import axios from '../../utils/axios';
import { useTheme } from '@mui/material';

export default function ThreadHeader () {
  const theme = useTheme();
  const { categoryId, threadId } = useParams();
  const navigate = useNavigate();

  const [likeCount, setLikeCount] = useState<number>(0);
  const [dislikeCount, setDislikeCount] = useState<number>(0);
  const [reaction, setReaction] = useState<'like' | 'dislike' | null>(null);

  const handleLike = () => {
    if (reaction == 'like') {
      axios.delete(`/thread/${threadId}/reaction`)
        .then(response => {
          setReaction(null);
          setLikeCount(likeCount - 1);
        })
        .catch(error => console.log(error));
    } else {
      axios.post(`/thread/${threadId}/like`)
        .then(response => {
          setReaction('like');
          setLikeCount(likeCount + 1);
        })
        .catch(error => console.log(error));
    }
  }

  const handleDislike = () => {
    if (reaction == 'dislike') {
      axios.delete(`/thread/${threadId}/reaction`)
        .then(response => {
          setReaction(null);
          setDislikeCount(dislikeCount - 1);;
        })
        .catch(error => console.log(error));
    } else {
      axios.post(`/thread/${threadId}/dislike`)
        .then(response => {
          setReaction('dislike');
          setDislikeCount(dislikeCount + 1);
        })
        .catch(error => console.log(error));
    }
  }

  return (
    <Box
      sx={{
        display: {
          xs: threadId ? 'flex' : 'none',
          lg: 'flex'
        },
        flexGrow: 1,
        px: 2.5,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        {threadId && 
          <IconButton
            color="inherit"
            aria-label="like"
            onClick={() => navigate(`/category/${categoryId}`)}
          >
            <ArrowBackIcon fontSize='small' />
          </IconButton>
        }
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {threadId ? `Thread ${threadId}` : ''}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
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
              sx={{ color: reaction == 'like' ? theme.palette.primary.main : theme.palette.secondary.main }}
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
              sx={{ color: reaction == 'dislike' ? theme.palette.primary.main : theme.palette.secondary.main }}
            />
          </IconButton>
          <Typography variant='body2'>{dislikeCount}</Typography>
        </Box>
      </Box>
    </Box>
  )
}