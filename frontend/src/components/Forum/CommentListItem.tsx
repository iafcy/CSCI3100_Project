import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import { Comment } from '../../types/types';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useTheme } from '@mui/material';
import axios from '../../utils/axios';
import ReplyIcon from '@mui/icons-material/Reply';
import CommentEditorDialog from '../Editor/CommentEditorDialog';
import useThread from '../../hooks/useThreads';
import { useSearchParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import AuthDialog from '../Auth/AuthDialog';

export default function CommentListItem({
  comment, index
}: {
  comment: Comment;
  index: number;
}) {
  const { user } = useAuth();
  const theme = useTheme();
  const { thread } = useThread();
  const [likeCount, setLikeCount] = useState<number>(comment.like);
  const [dislikeCount, setDislikeCount] = useState<number>(comment.dislike);
  const [reaction, setReaction] = useState<'like' | 'dislike' | null>(comment.user_reaction);
  const [open, setOpen] = useState(false);
  const [searchParams, _] = useSearchParams();
  const page = searchParams.get('page') || 1;

  if (!thread) {
    return null;
  }
    
  const handleOpen = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLike = () => {
    if (reaction == 'like') {
      axios.delete(`/comment/${comment.id}/reaction`)
        .then(response => {
          setReaction(null);
          setLikeCount(likeCount - 1);
        })
        .catch(error => console.log(error));
    } else {
      axios.post(`/comment/${comment.id}/like`)
        .then(response => {
          if (reaction == 'dislike') {
            setDislikeCount(dislikeCount - 1);
          }

          setReaction('like');
          setLikeCount(likeCount + 1);
        })
        .catch(error => console.log(error));
    }
  }

  const handleDislike = () => {
    if (reaction == 'dislike') {
      axios.delete(`/comment/${comment.id}/reaction`)
        .then(response => {
          setReaction(null);
          setDislikeCount(dislikeCount - 1);;
        })
        .catch(error => console.log(error));
    } else {
      axios.post(`/comment/${comment.id}/dislike`)
        .then(response => {
          if (reaction == 'like') {
            setLikeCount(likeCount - 1);
          }

          setReaction('dislike');
          setDislikeCount(dislikeCount + 1);
        })
        .catch(error => console.log(error));
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
          <Typography component="h6" color={thread.userId == comment.userId ? theme.palette.primary.main : theme.palette.secondary.main}>
            #{(index + 1) + (Number(page) - 1) * 10} 
          </Typography>
          <Typography component="h6" color='#34aadc'>
            {comment.username}
          </Typography>
        </Box>

        <Box

        >
          <IconButton
            color="inherit"
            onClick={handleOpen}
          >
            <ReplyIcon />
          </IconButton>

          {user ? (
            <CommentEditorDialog
              open={open}
              onClose={handleClose}
              treadTitle={thread.title}
              threadId={Number(thread.id)}
              commentToReply={comment}
              index={(index + 1) + (Number(page) - 1) * 10}
              isOp={comment.userId == thread?.userId}
            />
          ) : (
            <AuthDialog
              open={open}
              onClose={handleClose}
            />
          )}
        </Box>
      </Box>

      {/* Comment content */}
      <Box
        sx={{ py: 2 }}
      >
        <Typography variant='body1'>
          <div dangerouslySetInnerHTML={{__html: comment.content}} />
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
            onClick={user ? handleLike : handleOpen}
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
            onClick={user ? handleDislike : handleOpen}
          >
            <ThumbDownIcon
              fontSize='small'
              sx={{ color: reaction == 'dislike' ? theme.palette.primary.main : theme.palette.secondary.main }}
            />
          </IconButton>

          <Typography variant='body2'>{dislikeCount}</Typography>
        </Box>
      </Box>
    </ListItem>
  );
}
