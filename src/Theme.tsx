import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

// A custom theme with muted grey tones
const theme = createTheme({
  palette: {
    primary: {
      main: grey[700], // A medium-dark grey
    },
    secondary: {
      main: grey[500], // A medium grey
    },
    text: {
      primary: grey[900], // Dark grey for primary text
      secondary: grey[700], // Medium-dark grey for secondary text
    },
    background: {
      default: grey[200], // Light grey for the default background
      paper: grey[100], // Very light grey for paper-like backgrounds
    },
    action: {
      active: grey[900],
      hover: grey[300],
      selected: grey[400],
      disabled: grey[500],
      disabledBackground: grey[300],
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '2.8rem',
      fontWeight: 500,
      color: grey[900],
      marginBottom: '1rem',
    },
    h2: {
      fontSize: '2.2rem',
      fontWeight: 500,
      color: grey[900],
      marginBottom: '0.8rem',
    },
    body1: {
      fontSize: '1rem',
      color: grey[800],
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.9rem',
      color: grey[700],
      lineHeight: 1.4,
    },
    // Customize other typography variants as needed
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 4,
        },
        containedPrimary: {
          backgroundColor: grey[700],
          color: grey[100],
          '&:hover': {
            backgroundColor: grey[600],
          },
        },
        outlinedPrimary: {
          borderColor: grey[700],
          color: grey[700],
          '&:hover': {
            backgroundColor: grey[200],
          },
        },
        containedSecondary: {
          backgroundColor: grey[500],
          color: grey[100],
          '&:hover': {
            backgroundColor: grey[400],
          },
        },
        outlinedSecondary: {
          borderColor: grey[500],
          color: grey[500],
          '&:hover': {
            backgroundColor: grey[200],
          },
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0, // Remove default shadow for a flatter look
      },
      styleOverrides: {
        root: {
          backgroundColor: grey[300],
          color: grey[900],
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 1, // Subtle shadow for depth
      },
      styleOverrides: {
        root: {
          backgroundColor: grey[100],
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    // Customize other components as desired
  },
});

export default theme;