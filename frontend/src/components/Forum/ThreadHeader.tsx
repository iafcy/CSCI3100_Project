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
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';

export default function ThreadHeader () {
  const theme = useTheme();
  const { categoryId, userId } = useParams();
  const navigate = useNavigate();
  const { activeThread, setActiveThread, toggleLike, toggleDislike } = useThread();
  const { user } = useAuth();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState<boolean>(false);
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState<string>('');
    
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
  };

  const handleToggleLike = (id: number) => {
    setOpenErrorSnackbar(false);
    setErrorSnackbarMessage('');

    const { error } = toggleLike(id);

    if (error) {
      setErrorSnackbarMessage(error.response.data?.message || 'Unexpected error. Please try again.');
      setOpenErrorSnackbar(true);
    }
  };

  const handleToggleDisike = (id: number) => {
    setOpenErrorSnackbar(false);
    setErrorSnackbarMessage('');

    const { error } = toggleDislike(id);

    if (error) {
      setErrorSnackbarMessage(error.response.data?.message || 'Unexpected error. Please try again.');
      setOpenErrorSnackbar(true);
    }
  };

  return (
    (
      activeThread &&
      <Box
        sx={{
          display: 'flex',
          px: 2.5,
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          flexGrow: 1,
          minWidth: 0,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            overflow: 'hidden',     
            flex: '1 1 0',
            minWidth: 0,
          }}
        >
          <IconButton
            color="inherit"
            aria-label="like"
            onClick={handleBack}
          >
            <ArrowBackIcon fontSize='small' />
          </IconButton>
          
          <Tooltip
            title={activeThread.title}
            enterTouchDelay={0}
          >
            <Typography
              noWrap
              variant="h6"
              component="div"
              sx={{
                minWidth: 0,
                flex: '1 1 auto', 
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                flexGrow: 0
              }}
            >
              {activeThread.title}
            </Typography>
          </Tooltip>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            flexShrink: 0,
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
              onClick={user && activeThread ? () => handleToggleLike(activeThread.id) : handleOpen}
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
              onClick={user && activeThread ? () => handleToggleDisike(activeThread.id) : handleOpen}
            >
              <ThumbDownIcon
                fontSize='small'
                sx={{ color: activeThread.user_reaction == 'dislike' ? theme.palette.primary.main : theme.palette.secondary.main }}
              />
            </IconButton>
            <Typography variant='body2'>{activeThread.dislike}</Typography>
          </Box>
        </Box>

        <Snackbar
          open={openErrorSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenErrorSnackbar(false)}
        >
          <Alert
            onClose={() => setOpenErrorSnackbar(false)}
            severity='error'
            variant='outlined'
            sx={{ width: '100%' }}
          >
            {errorSnackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    )
  )
}