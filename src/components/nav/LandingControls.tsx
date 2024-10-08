import * as React from 'react';
import { Box, Link, Typography } from '@mui/material';

const LandingControls = () => {
  return (
    <Box display="flex" alignItems="center" flexGrow={1}>
        <Typography variant="h6" component="div" sx={{ mr: 2 }}>
            Welcome to Hospitly!
        </Typography>
        <Link href="/features" color="inherit" underline="hover" sx={{ mr: 2 }}>
            Features
        </Link>
        <Link href="/pricing" color="inherit" underline="hover" sx={{ mr: 2 }}>
            Pricing
        </Link>
        <Link href="/about" color="inherit" underline="hover" sx={{ mr: 2 }}>
            About Us
        </Link>
        <Link href="/contact" color="inherit" underline="hover">
            Contact
        </Link>
    </Box>
  );
};

export default LandingControls;