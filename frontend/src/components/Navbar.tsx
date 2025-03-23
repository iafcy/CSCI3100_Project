import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DrawerMenu from './Menu/DrawerMenu';
import Editor from './Editor/Editor';
import { useParams } from "react-router-dom";
import { useTheme } from '@mui/material';
import ThreadHeader from './Forum/ThreadHeader';

export default function Navbar() {
  const { categoryId, threadId } = useParams();
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
        {threadId && <ThreadHeader />}
      </AppBar>
    </Container>
  );
}
