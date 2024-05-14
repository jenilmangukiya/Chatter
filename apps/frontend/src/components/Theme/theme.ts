import { createTheme } from "@mui/material";
import { COLORS } from "./COLOR";
import { componentOverride } from "./components";

export const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.primary,
    },
    text: {
      primary: COLORS.black,
      secondary: COLORS.text_secondary,
    },
    success: {
      main: "#28a745",
    },
  },
  components: componentOverride,
});
