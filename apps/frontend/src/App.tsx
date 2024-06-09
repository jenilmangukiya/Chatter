import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Router } from "./Router";
import { SnackbarAlertProvider } from "./components/SnackbarAlert";
import { theme } from "./components/Theme/theme";

const App = () => {
  const client = new QueryClient({
    defaultOptions: { queries: { staleTime: 5000, gcTime: 5000 } },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={client}>
        <SnackbarAlertProvider>
          <Router />
        </SnackbarAlertProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
