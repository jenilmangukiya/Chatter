import { Dispatch, SetStateAction, createContext } from "react";

export interface UserType {
  username: string;
  email: string;
  userId: string;
  fullName: string;
}

export interface AuthContextType {
  user: UserType;
  setUser: Dispatch<SetStateAction<UserType>>;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

const defaultContextValue: AuthContextType = {
  user: { username: "", email: "", userId: "", fullName: "" },
  setUser: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
};

export const AuthContext = createContext(defaultContextValue);
