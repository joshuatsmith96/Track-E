// theme.js
import { createTheme } from "@mui/material/styles";

// Define your default themes
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#5500ffff",
    },
    secondary: {
      main: "#9c27b0", // purple
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#ce93d8",
    },
    background: {
      default: "#121212",
      paper: "#1d1d1d",
    },
  },
});
