import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import CommentEditorDialog from '../Editor/CommentEditorDialog';
import useThread from '../../hooks/useThreads';
import useAuth from '../../hooks/useAuth';
import AuthDialog from '../Auth/AuthDialog';

export default function ThreadHeader () {
  const theme = useTheme();
  const { categoryId, userId } = useParams();
  const navigate = useNavigate();
  const { activeThread, setActiveThread, toggleLike, toggleDislike } = useThread();
  const { user } = useAuth();
  const location = useLocation();

  const [open, setOpen] = useState(false);
    
  const handleOpen = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBack = () => {
    setActiveThread(null);
    if (categoryId) {
      navigate(`/category/${categoryId}`);
    } else if (userId) {
      navigate(`/user/${userId}`);
    } else if (location.pathname.startsWith('/following')) {
      navigate('/following');
    }
  }

  return (
    (
      activeThread &&
      <Box
        sx={{
          display: {
            xs: 'flex',
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
            gap: 2,
          }}
        >
          <IconButton
            color="inherit"
            aria-label="like"
            onClick={handleBack}
          >
            <ArrowBackIcon fontSize='small' />
          </IconButton>
          
          <Typography noWrap variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {activeThread.title}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5
          }}
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
              treadTitle={activeThread ? activeThread.title : ''}
              threadId={activeThread.id}
            />
          ) : (
            <AuthDialog
              open={open}
              onClose={handleClose}
            />
          )}

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
              onClick={user && activeThread ? () => toggleLike(activeThread.id) : handleOpen}
            >
              <ThumbUpIcon
                fontSize='small'
                sx={{ color: activeThread.user_reaction == 'like' ? theme.palette.primary.main : theme.palette.secondary.main }}
              />
            </IconButton>
            <Typography variant='body2'>{activeThread.like}</Typography>
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
              onClick={user && activeThread ? () => toggleDislike(activeThread.id) : handleOpen}
            >
              <ThumbDownIcon
                fontSize='small'
                sx={{ color: activeThread.user_reaction == 'dislike' ? theme.palette.primary.main : theme.palette.secondary.main }}
              />
            </IconButton>
            <Typography variant='body2'>{activeThread.dislike}</Typography>
          </Box>
        </Box>
      </Box>
    )
  )
}