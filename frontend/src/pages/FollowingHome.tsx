import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function FollowingHome() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
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
      <Typography variant='h4' component='h1' color='textPrimary'>CUHKG - Following</Typography>
    </Box>
  );
}