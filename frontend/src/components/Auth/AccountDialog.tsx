import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { Divider, useTheme } from '@mui/material';
import supabase from '../../utils/supabase';
import useAuth from '../../hooks/useAuth';

export default function AccountDialog({
  open, onClose
} : {
  open: boolean;
  onClose: () => void;
}) {
  const { user } = useAuth();
  const theme = useTheme();
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleLogout = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error.message);
      setLoading(false);
    } else {
      setLoading(false);
      onClose();
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
        Account
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
          p: 0
        }}
      >
        <List sx={{ minWidth: 250 }}>
          <ListItem
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              py: 2
            }}
          >
            <Avatar></Avatar>
            {user?.user_metadata.username}
          </ListItem>

          <Divider />

          <ListItem
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              py: 2
            }}
          >
            <Button
              fullWidth
              onClick={handleLogout}
              loading={loading}
            >
              Log out
            </Button>
          </ListItem>
        </List>
      </DialogContent>
    </Dialog>
  );
}
