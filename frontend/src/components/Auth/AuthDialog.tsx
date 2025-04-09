import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTheme } from '@mui/material';
import { TabPanel, a11yProps } from '../Shared/TabPanel';

export default function AuthDialog({
  open, onClose
} : {
  open: boolean;
  onClose: () => void;
}) {
  const theme = useTheme();
  const [tabValue, setTabValue] = React.useState(0);

  return (
    <Dialog
      onClose={onClose}
      open={open}
      onClick={(e) => e.stopPropagation()}
      maxWidth='sm'
      fullWidth={true}
    >
      <DialogTitle 
        sx={{
          m: 0,
          p: 2,
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.background.paper,
        }}
        align='center'
      >
        {tabValue == 0 ? 'Login' : 'Register'}
      </DialogTitle>
      <DialogContent 
        dividers
        sx={{
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Tabs
          value={tabValue}
          onChange={(_, num) => setTabValue(num)}
          variant="fullWidth"
        >
          <Tab label="Login" {...a11yProps(0)} sx={{ fontWeight: 700 }} />
          <Tab label="Register" {...a11yProps(1)} sx={{ fontWeight: 700 }} />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <LoginForm onClose={onClose} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <SignupForm onClose={onClose} />
        </TabPanel>
      </DialogContent>
    </Dialog>
  );
}
