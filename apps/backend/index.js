import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "success", status: 200 });
});

io.on("connection", (socket) => {
  console.log("connection is created");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("foo", (msg) => {
    console.log("message: " + msg);
    socket.emit("foo", msg);
    // socket.broadcast.emit("foo", msg);
    // io.sockets.emit("foo", msg);
  });
});

server.listen(5001, () => {
  console.log("Server is running on port: ", 5001);
});
