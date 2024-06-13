import React, { useState } from "react";

import { SnackbarContext } from "../../context/snackbar-context";
import { SnackbarAlert } from "./SnackbarAlert";
import { SnackbarAlertProps } from "./types";

export const SnackbarAlertProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [snackbarConfig, setSnackbarConfig] = useState<
    SnackbarAlertProps["snackbarConfig"]
  >({
    open: false,
    message: "",
    severity: "success",
  });

  return (
    <SnackbarContext.Provider value={{ snackbarConfig, setSnackbarConfig }}>
      {children}
      <SnackbarAlert
        snackbarConfig={snackbarConfig}
        setSnackbarConfig={setSnackbarConfig}
      />
    </SnackbarContext.Provider>
  );
};
