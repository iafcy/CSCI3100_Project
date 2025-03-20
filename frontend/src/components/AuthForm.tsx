import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AuthDialog from './AuthDialog';

export default function AuthForm() {
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
        size="large"
        onClick={handleOpen}
      >
        <AccountCircleIcon />
      </IconButton>

      <AuthDialog
        open={open}
        onClose={handleClose}
      />
    </>
  );
}
