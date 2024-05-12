import { AlertColor } from "@mui/material";

export type SnackbarConfig = {
  open: boolean;
  message: string;
  severity: AlertColor;
  anchorOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
};

export interface SnackbarAlertProps {
  snackbarConfig: SnackbarConfig;
  setSnackbarConfig: React.Dispatch<React.SetStateAction<SnackbarConfig>>;
  showAlertIcon?: boolean;
}

export type SnackbarContextType = Omit<SnackbarAlertProps, "showAlertIcon">;
