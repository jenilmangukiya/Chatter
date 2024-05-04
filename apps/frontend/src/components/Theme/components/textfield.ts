import { Components, Theme } from "@mui/material";
import { COLORS } from "../COLOR";

export const textfield: Components<Theme> = {
  MuiTextField: {
    defaultProps: {
      size: "small",
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        color: COLORS.black,
      },
    },
  },
};
