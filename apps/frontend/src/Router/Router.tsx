import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChatApp, Login, Register } from "../modules";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatApp />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};
