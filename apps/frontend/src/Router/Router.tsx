import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Layout } from "../components";

import { AuthProvider } from "../Auth";
import {
  Chat,
  ChatApp,
  ChatProfile,
  Explore,
  ExploreProfile,
  Notifications,
  SignIn,
  SignUp,
} from "../pages";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

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
              <Route path={":id"} element={<Chat />} />
              <Route path=":id/profile/:userId" element={<ChatProfile />} />
            </Route>
            <Route path="/explore" element={<Explore />}>
              <Route path=":id/profile" element={<ExploreProfile />} />
            </Route>
            <Route path="/notifications" element={<Notifications />}></Route>
            <Route path="/deleted" element={<p>Delete</p>}></Route>
          </Route>

          <Route
            path="/sign-in"
            element={
              <PublicRoutes>
                <SignIn />
              </PublicRoutes>
            }
          />
          <Route
            path="/sign-up"
            element={
              <PublicRoutes>
                <SignUp />
              </PublicRoutes>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
