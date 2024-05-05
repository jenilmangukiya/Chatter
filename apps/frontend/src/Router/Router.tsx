import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import {
  Chat,
  ChatApp,
  Groups,
  Login,
  Notifications,
  Register,
} from "../modules";

import { Layout } from "../components";
import { Deleted } from "../modules/Deleted";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/chat" replace />} />
          <Route path="/chat" element={<ChatApp />}>
            <Route path={":id"} element={<Chat />}></Route>
          </Route>
          <Route path="/notifications" element={<Notifications />}></Route>
          <Route path="/groups" element={<Groups />}></Route>
          <Route path="/deleted" element={<Deleted />}></Route>
        </Route>
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};
