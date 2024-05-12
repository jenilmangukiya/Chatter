import { useContext } from "react";

import { SnackbarContext } from "../../context/SnackbarContext";

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("Can not use useSnackbar Hook outside SnackbarProvider");
  }
  return context;
};
