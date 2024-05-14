import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Auth";

export const PublicRoutes = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return children;
};
