import { useContext } from "react";
import { Socket } from "socket.io-client";
import { SocketContext } from "../context/socket-context";

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("Can not use useContext outside SocketProvider");
  }

  return context as Socket;
};
