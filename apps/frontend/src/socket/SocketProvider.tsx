import { ReactNode, useMemo } from "react";
import io from "socket.io-client";
import { SocketContext } from "../context/socket-context";
import { getCookie } from "../utils";

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const baseUrl = new URL(
    import.meta.env.VITE_BASE_URL || "http://localhost:3001"
  ).origin;

  const socket = useMemo(
    () =>
      io(baseUrl, {
        withCredentials: true,
        auth: {
          token: getCookie("accessToken") || "",
        },
      }),
    []
  );

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
