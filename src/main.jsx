import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const themeOptions = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#A0153E"
    },
    secondary: {
      main: "#5D0E41"
    },
    error: {
      main: "rgba(211,47,47,0.84)"
    },
    warning: {
      main: "rgba(237,108,2,0.78)"
    },
    info: {
      main: "rgba(2,136,209,0.8)"
    },
    success: {
      main: "rgba(46,125,50,0.82)"
    },
    background: {
      default: "#f9ecea",
      paper: "#ffffff"
    }
  }
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={themeOptions}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);
