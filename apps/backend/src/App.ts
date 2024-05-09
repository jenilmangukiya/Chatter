import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
); // Cors Middleware

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
import healthCheckRouter from "./routes/healthcheck.routes.js";

// Routes Declaration
app.use("/api/v1/healthCheck", healthCheckRouter);
// app.use("/api/v1/users", userRouter);

export { app };
