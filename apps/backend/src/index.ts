import dotenv from "dotenv";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { allowedOrigins, app } from "./App.js";
import { NEW_MESSAGE } from "./constants/events.js";
import { connectDB } from "./db/index.js";
import { socketAuthenticator } from "./middlewares/auth.middleware.js";
import { NewMessageArgType } from "./types.js";
dotenv.config({
  path: "./env",
});

export const userSocketIDs = new Map();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

app.set("io", io);

io.use(async (socket, next) => {
  await socketAuthenticator(socket, next);
});

io.on("connection", (socket: any) => {
  const user = socket.user;
  userSocketIDs.set(user._id.toString(), socket.id);
  console.log(userSocketIDs);
  console.log("a user connected");

  socket.on(NEW_MESSAGE, ({ chatId, members, message }: NewMessageArgType) => {
    console.log(NEW_MESSAGE, chatId, members, message);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
    userSocketIDs.delete(user._id.toString());
  });
});

// Connect DB and start the server
connectDB()
  .then(() => {
    server.listen(process.env.PORT || 5001, () => {
      console.log(
        `Server running on PORT : http://localhost:${process.env.PORT || 5001}`
      );
    });
  })
  .catch((error) => {
    console.log("mongoDB connection error: ", error);
  });
