import dotenv from "dotenv";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import { allowedOrigins, app } from "./App.js";
import { NEW_MESSAGE } from "./constants/events.js";
import { connectDB } from "./db/index.js";
import { socketAuthenticator } from "./middlewares/auth.middleware.js";
import { Message } from "./models/message.model.js";
import { NewMessageArgType } from "./types.js";
import { getSockets } from "./utils/helpers.js";

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

  socket.on(
    NEW_MESSAGE,
    async ({ chatId, members, message }: NewMessageArgType) => {
      const socketMessage = {
        _id: uuidv4(),
        type: "message",
        chat: chatId,
        sender: user._id,
        content: message,
        createdAt: new Date().toISOString(),
        username: user.fullName,
        avatar: user?.avatar,
      };

      const messageForDB = {
        content: message,
        sender: user._id,
        chat: chatId,
        type: "message",
      };

      const membersSocket = getSockets(members);
      io.to(membersSocket).emit(NEW_MESSAGE, {
        chatId,
        message: socketMessage,
      });

      try {
        await Message.create(messageForDB);
      } catch (error: any) {
        throw new Error(error);
      }
    }
  );

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
