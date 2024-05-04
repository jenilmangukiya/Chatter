import React from "react";
import { Router } from "./Router";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./components/Theme/theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  );
};

export default App;
