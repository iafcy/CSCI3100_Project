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
import { useColorScheme } from '@mui/material/styles';
import { useTheme } from '@mui/material';

export default function Settings() {
  const theme = useTheme();
  const { mode, setMode } = useColorScheme();
  const [open, setOpen] = React.useState(false);

  const handleOpen = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const toggleTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMode(event.target.checked ? 'dark' : 'light');
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
        onClick={(e) => e.stopPropagation()}
        onClose={handleClose}
        open={open}
      >
        <DialogTitle 
          sx={{
            m: 0,
            p: 2,
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.paper,
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
            color: theme.palette.text.primary,
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent 
          dividers
          sx={{
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <List sx={{ minWidth: 250 }}>
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between'}}>
              <Typography>Theme</Typography>
              <Switch
                onChange={toggleTheme}
                checked={mode == 'dark'}
              />
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
}