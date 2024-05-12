import { useContext } from "react";
import { AuthContext } from "../context/auth-context";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Can not call useAuth Outside <AuthProvider />");
  }

  return context;
};
