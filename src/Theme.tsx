import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

// A custom theme with muted grey tones
const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto', // Primary font
      'Arial',  // Fallback font 1
      'sans-serif', // Generic fallback
    ].join(','), // Join with comma for CSS font-family property

    // You can also define specific variants here if needed
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none', // Prevent MUI from automatically capitalizing buttons
    },
  },
  palette: {
    background: {
      default: '#ffffff', // Light gray background
      paper: '#ffffff',  
    },
    // You can also define primary, secondary, error, warning, info, success colors here
    primary: {
      main: '#535C91', // Example primary color
    },
  },
  // You can customize typography, spacing, components, etc., here
});

export default theme;