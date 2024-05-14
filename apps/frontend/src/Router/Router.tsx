import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import {
  Chat,
  ChatApp,
  Groups,
  Notifications,
  Profile,
  SignIn,
  SignUp,
} from "../modules";

import { Layout } from "../components";

import { AuthProvider } from "../Auth";
import { Deleted } from "../modules/Deleted";
import { PrivateRoutes } from "./PrivateRoutes";

export const Router = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoutes>
                <Layout />
              </PrivateRoutes>
            }
          >
            <Route index element={<Navigate to="/chat" replace />} />
            <Route path="/chat" element={<ChatApp />}>
              <Route path={":id"} element={<Chat />}></Route>
              <Route path=":id/profile" element={<Profile />} />
            </Route>
            <Route path="/notifications" element={<Notifications />}></Route>
            <Route path="/groups" element={<Groups />}></Route>
            <Route path="/deleted" element={<Deleted />}></Route>
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
