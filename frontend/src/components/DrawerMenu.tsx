'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import OutboxIcon from '@mui/icons-material/Outbox';
import PeopleIcon from '@mui/icons-material/People';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Settings from './Settings';
import { Button } from '@mui/material';

export default function TemporaryDrawer() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const params = useParams<{ categoryId: string }>()

  const categories = [
    {id: 1, name: 'Category 1'},
    {id: 2, name: 'Category 2'},
    {id: 3, name: 'Category 3'},
    {id: 4, name: 'Category 4'},
    {id: 5, name: 'Category 5'},
  ]

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleLinkClick = (href: string) => {
    toggleDrawer(false);

    // Delay redirct to play the animation of Drawer
    setTimeout(() => {
      router.push(href);
    }, 100);
  };

  const DrawerList = (
    <Box 
      sx={{
        height: '100%',
        width: 350,
        color: '#fff',
        display: 'flex',
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <Box
        sx={{
          width: 56,
          bgcolor: '#151515',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          py: 2
        }}
      >
        <IconButton
          size="large"
          color="inherit"
        >
          <AccountCircleIcon />
        </IconButton>
        <Settings />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          bgcolor: '#222',
          py: 2,
          px: 1
        }}
      >
        <List disablePadding>
          <ListItem
            disablePadding
            component={Link}
            href={`/`}
            sx={{ color: '#fff' }}
          >
            <ListItemButton>
              <ListItemText primary={'CUHKG'} />
            </ListItemButton>
          </ListItem>

          <Divider sx={{ bgcolor: '#3b3a39', my: 2 }} />

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <OutboxIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <ListItemText primary="Outbox" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PeopleIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <ListItemText primary="Following" />
            </ListItemButton>
          </ListItem>

          <Divider sx={{ bgcolor: '#3b3a39', my: 2 }} />
        
          {categories.map((category) => (
            <ListItem
              key={category.id}
              disablePadding
              component={Button}
              onClick={() => handleLinkClick(`/category/${category.id}`)}
              sx={{
                color: params.categoryId == category.id.toString() ? '#fcba03' : '#fff'
              }}
            >
              <ListItemButton>
                <ListItemText primary={category.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <Box>
      <IconButton
        size="large"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { bgcolor: '#222' }
        }}
      >
        {DrawerList}
      </Drawer>
    </Box>
  );
}
