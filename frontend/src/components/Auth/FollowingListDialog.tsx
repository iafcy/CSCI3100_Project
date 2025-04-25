import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';
import useUser from '../../hooks/useUser';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function FollowingListDialog({
  open, onClose
} : {
  open: boolean;
  onClose: () => void;
}) {
  const theme = useTheme();
  const { followingUsers, unfollowUser } = useUser();
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState<boolean>(false);
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState<string>('');

  const handleUnfollow = (id: string) => {
    setOpenErrorSnackbar(false);
    setErrorSnackbarMessage('');

    const { error } = unfollowUser(id);

    if (error) {
      setErrorSnackbarMessage(error.response.data?.message || 'Unexpected error. Please try again.');
      setOpenErrorSnackbar(true);
    }
  }

  return (
    <Dialog
      onClose={onClose}
      open={open}
      onClick={(e) => e.stopPropagation()}
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
      >
        Following
        <IconButton
          aria-label="close"
          onClick={onClose}
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
          p: 0,
          maxHeight: '50vh'
        }}
      >
        {followingUsers.length == 0 ?
          <Typography sx={{ p: 2 }}>You are not following any user...</Typography> :
          <List sx={{ minWidth: 250 }}>
            {followingUsers.map((user, i) => (
              <>
                {i > 0 && <Divider />}
                <ListItem
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    py: 2
                  }}
                  secondaryAction={
                    <Button
                      onClick={() => handleUnfollow(user.id)}
                    >
                      Unfollow
                    </Button>
                  }
                >
                  {user.username}
                </ListItem>
              </>
            ))}
          </List>
        }

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
      </DialogContent>
    </Dialog>
  )
}