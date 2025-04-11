import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function UserActionDialog({
  username, userId, isFollowed, isBlocked, handleToggleFollow, handleToggleBlock
} : {
  username: string;
  userId: number;
  isFollowed: boolean;
  isBlocked: boolean;
  handleToggleFollow: () => void;
  handleToggleBlock: () => void;
}) {
  const theme = useTheme();
  const { user } = useAuth();

  const [open, setOpen] = useState(false);

  const handleOpen = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Typography
        sx={{
          display: 'inline',
          color: '#34aadc',
          cursor: 'pointer'
        }}
        onClick={handleOpen}
      >
        {username}
      </Typography>

      <Dialog
        onClick={(e) => e.stopPropagation()}
        onClose={handleClose}
        open={open}
        maxWidth='xs'
        fullWidth={true}
      >
        <DialogTitle 
          sx={{
            m: 0,
            py: 1,
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.paper,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
          align='center'
        >
          User
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              color: theme.palette.text.primary,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent 
          dividers
          sx={{
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.paper,
            p: 0
          }}
        >
          <Typography
            component={Box}
            sx={{
              textAlign: 'center',
              py: 2,
              bgcolor: theme.palette.background.default
            }}
          >
            {username}
          </Typography>

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}  
          >
            <Button
              component={Link}
              to={`/user/${userId}`}
              sx={{
                flex: 1,
                py: 1,
              }}
            >
              Profile
            </Button>
            <Button
              disabled={!user || user.id == String(userId)}
              onClick={handleToggleFollow}
              sx={{
                flex: 1,
                py: 1
              }}
            >
              {isFollowed ? 'Unfollow' : 'Follow'}
            </Button>
            <Button
              disabled={!user || user.id == String(userId)}
              onClick={handleToggleBlock}
              sx={{
                flex: 1,
                py: 1
              }}
            >
              {isBlocked ? 'Unblock' : 'Block'}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}