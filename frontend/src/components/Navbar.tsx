import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DrawerMenu from './Menu/DrawerMenu';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Editor from './Editor/Editor';
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material';

export default function Navbar() {
  const { categoryId, threadId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{ flexGrow: 0, display: 'relative' }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          bgcolor: theme.palette.divider,
          borderBottomWidth: '.5px',
          borderBottomStyle: 'solid',
          borderBottomColor: theme.palette.divider,
          alignItems: 'center',
          height: 56
        }}
      >
        <Box
          sx={{
            display: {
              xs: threadId ? 'none' : 'block',
              lg: 'block'
            },
            width: '100%',
            maxWidth: { lg: '450px' },
            borderBottomWidth: '.5px',
            borderBottomStyle: 'solid',
            borderBottomColor: theme.palette.divider,
            borderRightWidth: '.5px',
            borderRightStyle: 'solid',
            borderRightColor: theme.palette.divider,
          }}
        >
          <Toolbar>
            <DrawerMenu />
            <Typography variant="h6" component="div" align="center" sx={{ flexGrow: 1 }}>
              Category {categoryId}
            </Typography>
            <Editor />
          </Toolbar>
        </Box>
        <Box
          sx={{
            display: {
              xs: threadId ? 'flex' : 'none',
              lg: 'flex'
            },
            flexGrow: 1,
            px: 2.5,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}
          >
            {threadId && 
              <IconButton
                color="inherit"
                aria-label="like"
                onClick={() => navigate(`/category/${categoryId}`)}
              >
                <ArrowBackIcon fontSize='small' />
              </IconButton>
            }
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {threadId ? `Thread ${threadId}` : ''}
            </Typography>
          </Box>
        </Box>
      </AppBar>
    </Container>
  );
}
