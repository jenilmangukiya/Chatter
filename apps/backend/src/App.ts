import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

const app = express();

export const allowedOrigins = process.env.CORS_ORIGINS?.split(",");

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins?.indexOf(origin) !== -1) {
        // Origin is allowed
        callback(null, true);
      } else {
        // Origin is not allowed
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
import chatRouter from "./routes/chat.routes.js";
import healthCheckRouter from "./routes/healthCheck.routes.js";
import messageRouter from "./routes/message.routes.js";
import requestRouter from "./routes/request.routes.js";
import userRouter from "./routes/user.routes.js";

// Routes Declaration
app.use("/api/v1/healthCheck", healthCheckRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/requests", requestRouter);
app.use("/api/v1/chats", chatRouter);
app.use("/api/v1/messages", messageRouter);

export { app };
