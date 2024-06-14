import { userSocketIDs } from "../index.js";

export const getSockets = (users: string[] = []) => {
  const sockets = users.map((user: any) => userSocketIDs.get(user.toString()));

  return sockets;
};
