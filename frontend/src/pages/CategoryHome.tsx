import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useNav from '../hooks/useNav';

export default function CategoryHome() {
  const { activeCategory } = useNav();

  if (!activeCategory) {
    return null;
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Typography variant='h4' component='h1' color='textPrimary'>CUHKG - {activeCategory.name}</Typography>
    </Box>
  );
}