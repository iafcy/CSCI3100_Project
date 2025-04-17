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
import Slider from '@mui/material/Slider';
import { useColorScheme } from '@mui/material/styles';
import { useTheme } from '@mui/material';
import useSettings from '../../hooks/useSettings';

export default function Settings() {
  const theme = useTheme();
  const { mode, setMode } = useColorScheme();
  const { fontSize, setFontSize } = useSettings();

  const [open, setOpen] = React.useState(false);
  const [fontValue, setFontValue] = React.useState<number>((fontSize - 12) / 2); // 0, 1, 2

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

  const handleFontSizeChange = (_ : Event, val: number | number[]) => {
    const newVal = Array.isArray(val) ? val[0] : val;
    setFontValue(newVal);
    setFontSize(12 + newVal * 2); // 12, 14, 16
  }

  return (
    <>
      <IconButton
        size="small"
        color="inherit"
        onClick={handleOpen}
      >
        <SettingsIcon />
      </IconButton>

      <Dialog
        onClick={(e) => e.stopPropagation()}
        onClose={handleClose}
        open={open}
        maxWidth='sm'
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
          Settings
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
          }}
        >
          <List sx={{ minWidth: 250 }}>
            <ListItem
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                p: 0
              }}
            >
              <Typography>Dark mode</Typography>
              <Switch
                onChange={toggleTheme}
                checked={mode == 'dark'}
                edge='end'
              />
            </ListItem>

            <ListItem
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                p: 0
              }}
            >
              <Typography>Font size</Typography>
              <Slider
                sx={{
                  maxWidth: 125,
                  mr: 1.5
                }}
                value={fontValue}
                onChange={handleFontSizeChange}
                step={1}
                marks={[
                  {
                    value: 0,
                    label: 'Small',
                  },
                  {
                    value: 1,
                    label: 'Default',
                  },
                  {
                    value: 2,
                    label: 'Large',
                  },
                ]}
                min={0}
                max={2}
              />
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
}