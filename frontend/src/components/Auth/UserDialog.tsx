import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AuthDialog from './AuthDialog';
import AccountDialog from './AccountDialog';
import useAuth from '../../hooks/useAuth';

export default function UserDialog() {
  const { session } = useAuth();
  const [open, setOpen] = React.useState(false);

  const handleOpen = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        size="small"
        onClick={handleOpen}
      >
        <AccountCircleIcon />
      </IconButton>

      {session && open ? (
        <AccountDialog
          open={open}
          onClose={handleClose}
        />
      ) : (
        <AuthDialog
          open={open}
          onClose={handleClose}
        />
      )}
    </>
  );
}
