'use client';

import * as React from 'react';
import { Box, Avatar, Typography, Button, AppBar, Toolbar, Container, Link } from '@mui/material';
import AdminControls from './AdminControls';

import { useAuth } from '@/hooks/AuthenticationHook';
import LandingControls from './LandingControls';

const NavBar = () => {
  const { user, loading } = useAuth(); // Using a custom hook to access the authentication context

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {user ? (
            // Authenticated Variant
            <>
              <Box display="flex" alignItems="center" flexGrow={1}>
                <Avatar alt={user.name} src={user.avatar} sx={{ width: 56, height: 56, mr: 2 }} />
                <Typography variant="h6" component="div">
                  Welcome, Dr. {user.name}!
                </Typography>
              </Box>

              {/* Admin Controls (only show if the user is an admin) */}
              {user.isEditor && (
                <Box sx={{ mr: 2 }}>
                  <AdminControls />
                </Box>
              )}

              {/* Option to log out */}
              <Button variant="outlined" color="inherit" onClick={() => alert('Logout functionality')}>Logout</Button>
            </>
          ) : (
            // Unauthenticated Variant
            <>
              <LandingControls />

              {/* Option to log in */}
              <Button variant="contained" color="primary" onClick={() => alert('Login functionality')}>Login</Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;