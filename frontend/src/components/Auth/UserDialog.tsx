import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AuthDialog from './AuthDialog';
import AccountDialog from './AccountDialog';
import useAuth from '../../hooks/useAuth';

export default function UserDialog() {
  const { session } = useAuth();
  const [openAuth, setOpenAuth] = React.useState(false);
  const [openAccount, setOpenAccount] = React.useState(false);

  const handleOpen = (event: React.MouseEvent) => {
    event.stopPropagation();

    if (session) {
      setOpenAccount(true);
    } else {
      setOpenAuth(true);
    }
  };

  const handleClose = () => {
    setOpenAccount(false);
    setOpenAuth(false);
  };

  return (
    <>
      <IconButton
        size="small"
        onClick={handleOpen}
        data-testid="open-account-btn"
      >
        <AccountCircleIcon />
      </IconButton>

      {openAuth && <AuthDialog open={openAuth} onClose={handleClose} />}

      {openAccount && (
        <AccountDialog open={openAccount} onClose={handleClose} />
      )}
    </>
  );
}
