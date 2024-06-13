import { useContext } from "react";

import { SnackbarContext } from "../../context/snackbar-context";

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("Can not use useSnackbar Hook outside SnackbarProvider");
  }
  return context;
};
