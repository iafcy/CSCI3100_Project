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
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import UserActionDialog from './UserActionDialog';
import useUser from '../../hooks/useUser';

export default function CommentListItem({
  comment, index, isFollowingUser, isBlockingUser
}: {
  comment: Comment;
  index: number;
  isFollowingUser: boolean;
  isBlockingUser: boolean;
}) {
  const { user } = useAuth();
  const theme = useTheme();
  const { activeThread } = useThread();
  const [likeCount, setLikeCount] = useState<number>(comment.like);
  const [dislikeCount, setDislikeCount] = useState<number>(comment.dislike);
  const [reaction, setReaction] = useState<'like' | 'dislike' | null>(comment.user_reaction);
  const [open, setOpen] = useState<boolean>(false);
  const [showBlocked, setShowBlocked] = useState<boolean>(false);
  const { followUser, unfollowUser, blockUser, unblockUser } = useUser();

  const [searchParams, _] = useSearchParams();
  const page = searchParams.get('page') || 1;

  dayjs.extend(relativeTime);

  if (!activeThread) {
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

  const handleToggleFollow = () => {
    if (isFollowingUser) {
      unfollowUser(comment.user_id);
    } else {
      followUser(comment.user_id)
    }
  }

  const handleToggleBlock = () => {
    if (isBlockingUser) {
      unblockUser(comment.user_id);
    } else {
      blockUser(comment.user_id);
      setShowBlocked(true);
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
      {isBlockingUser &&
        <Box
          onClick={() => setShowBlocked(!showBlocked)}
          sx={{
            cursor: 'pointer',
            width: '100%',
            color: theme.palette.secondary.main
          }}
        >
          <Typography component="h6">
            Blocked user: {comment.username}
          </Typography>
        </Box>
      }
      
      {(showBlocked || !isBlockingUser) &&
        <>
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
                gap: 1
              }}
            >
              <Typography component="h6" color={activeThread.user_id == comment.user_id ? theme.palette.primary.main : theme.palette.secondary.main}>
                #{(index + 1) + (Number(page) - 1) * 10} 
              </Typography>
              <UserActionDialog
                username={comment.username}
                userId={comment.user_id}
                isFollowed={isFollowingUser}
                isBlocked={isBlockingUser}
                handleToggleFollow={handleToggleFollow}
                handleToggleBlock={handleToggleBlock}
              />
              <Typography
                sx={{
                  color: theme.palette.secondary.main
                }}
              >
                •
              </Typography>
              <Typography
                sx={{
                  color: theme.palette.secondary.main
                }}
              >
                {dayjs(comment.created_at).fromNow()}
              </Typography>
            </Box>

            <Box>
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
                  treadTitle={activeThread.title}
                  threadId={Number(activeThread.id)}
                  commentToReply={comment}
                  index={(index + 1) + (Number(page) - 1) * 10}
                  isOp={comment.user_id == activeThread?.user_id}
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
        </>
      }
    </ListItem>
  );
}
