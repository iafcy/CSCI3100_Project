import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';

export default function CategoryHome() {
  const { categoryId } = useParams();

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
      <Typography variant='h4' component='h1' color='textPrimary'>CUHKG - Category {categoryId}</Typography>
    </Box>
  );
}