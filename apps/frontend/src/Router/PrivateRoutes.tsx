import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Auth";
import { getCookie } from "../utils";

export const PrivateRoutes = ({ children }: { children: ReactNode }) => {
  const accessToken = getCookie("accessToken");
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated || !accessToken) {
    return <Navigate to={"/sign-in"}></Navigate>;
  }
  return children;
};
