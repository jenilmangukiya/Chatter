import React from "react";

import { Alert, Snackbar } from "@mui/material";

import { SnackbarAlertProps } from "./types";

export const SnackbarAlert: React.FC<SnackbarAlertProps> = ({
  snackbarConfig,
  setSnackbarConfig
}) => {
  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarConfig({
      ...snackbarConfig,
      open: false
    });
  };

  return (
    <Snackbar
      open={snackbarConfig.open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={
        snackbarConfig.anchorOrigin ?? {
          vertical: "bottom",
          horizontal: "right"
        }
      }
    >
      <Alert variant="filled" severity={snackbarConfig.severity}>
        {snackbarConfig.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
