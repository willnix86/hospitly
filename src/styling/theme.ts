'use client';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a custom theme for Hospitly
const hospitlyTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',     // A calm and professional blue as the main brand color
      contrastText: '#ffffff', // White text on primary backgrounds
    },
    secondary: {
      main: '#43a047',     // A refreshing green for accents and important UI elements
      contrastText: '#ffffff', // White text on secondary backgrounds
    },
    error: {
      main: red.A400,      // Standard Material UI error red
    },
    background: {
      default: '#f4f6f8',  // A soft light gray for the app's background
      paper: '#ffffff',    // White background for cards and modals
    },
    text: {
      primary: '#212121',  // Dark text for better readability on light backgrounds
      secondary: '#757575', // Gray text for less important information
    },
    success: {
      main: '#388e3c',     // A green tone for success messages
    },
    warning: {
      main: '#f57c00',     // Orange for warnings
    },
    info: {
      main: '#0288d1',     // Lighter blue for info messages
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // A clean sans-serif font for modern design
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      color: '#1976d2', // Heading color in primary blue
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      color: '#43a047', // Secondary green for smaller headings
    },
    body1: {
      fontSize: '1rem',
      color: '#212121',  // Standard body text color
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',  // Disable uppercase for button text for a professional look
        },
      },
    },
    // EXAMPLE OF HOW TO OVERRIDE STYLES
    // MuiPaper: {
    //   styleOverrides: {
    //     root: {
    //       padding: '16px',  // Standard padding for paper components
    //       borderRadius: '8px', // Slightly rounded corners for a soft, modern look
    //     },
    //   },
    // },
  },
});

export default hospitlyTheme;