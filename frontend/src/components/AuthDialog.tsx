import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import LoginForm from './LoginForm';
import RegisterForm from './SignupForm';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTheme } from '@mui/material';

function TabPanel(props: {
  children?: React.ReactNode;
  index: number;
  value: number;
}) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `auth-tab-${index}`,
    'aria-controls': `auth-tabpanel-${index}`,
  };
}

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
          <LoginForm />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <RegisterForm />
        </TabPanel>
      </DialogContent>
    </Dialog>
  );
}
