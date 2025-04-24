import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

export default function ErrorPage() {
  const theme = useTheme();
  const location = useLocation();

  const state = location.state || {};
  const title = state.title || "Something went wrong";
  const message = state.message || "An unexpected error occurred.";

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.paper,
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        m: 0,
        p: 2
      }}
    >
      <img 
        src='/logo.webp'
        style={{
          width: '100%',
          maxWidth: 200,
          height: 'auto'
        }}   
      />
      <Box
        sx={{
          textAlign: 'center'
        }}
      >
        <Typography variant='h2' component='h1' sx={{ mb: 2 }}>{title}</Typography>
      </Box>

      <Box
        sx={{
          textAlign: 'center'
        }}
      >
        <Typography variant='h5' sx={{ mb: 6 }}>{message}</Typography>
      </Box>

      <Button
        component={Link}
        to='/'
        variant="contained"
        size='large'
      >
          Go Back to Home
      </Button>
    </Box>
  );
};
