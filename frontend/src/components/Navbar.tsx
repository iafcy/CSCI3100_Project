import * as React from 'react';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DrawerMenu from './Menu/DrawerMenu';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import ThreadEditorDialog from '../components/Editor/ThreadEditorDialog';
import { useParams } from "react-router-dom";
import { useTheme } from '@mui/material';
import ThreadHeader from './Forum/ThreadHeader';
import useNav from '../hooks/useNav';
import useAuth from '../hooks/useAuth';
import AuthDialog from './Auth/AuthDialog';

export default function Navbar() {
  const { threadId, categoryId, userId } = useParams();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { activeCategory, activeUserProfile } = useNav();
  const { session } = useAuth();
    
  const handleOpen = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
            
            {categoryId && 
              <Typography variant="h6" component="div" align="center" sx={{ flexGrow: 1 }}>
                {activeCategory?.name}
              </Typography>
            }
            {userId && 
              <Typography variant="h6" component="div" align="center" sx={{ flexGrow: 1 }}>
                {activeUserProfile?.username}
              </Typography>
            }

            <IconButton
              color="inherit"
              onClick={handleOpen}
            >
              <AddIcon />
            </IconButton>
            
            {session ? (
              <ThreadEditorDialog
                open={open}
                onClose={handleClose}
              />
            ) : (
              <AuthDialog
                open={open}
                onClose={handleClose}
              />
            )}
          </Toolbar>
        </Box>
        {threadId && <ThreadHeader />}
      </AppBar>
    </Container>
  );
}
