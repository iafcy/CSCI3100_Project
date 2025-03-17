'use client';

import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Switch from '@mui/material/Switch';

export default function Settings() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };

  return (
    <>
      <IconButton
        size="large"
        color="inherit"
        onClick={handleOpen}
      >
        <SettingsIcon />
      </IconButton>

      <Dialog
        onClose={handleClose}
        open={open}
      >
        <DialogTitle 
          sx={{
            m: 0,
            p: 2,
            color: '#fff',
            backgroundColor: '#222',
          }}
        >
          Settings
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent 
          dividers
          sx={{
            color: '#fff',
            backgroundColor: '#222',
          }}
        >
          <List sx={{ minWidth: 250 }}>
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between'}}>
              <Typography>Theme</Typography>
              <Switch defaultChecked onClick={toggleTheme} />
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
}