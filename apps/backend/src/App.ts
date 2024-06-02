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
import healthCheckRouter from "./routes/healthCheck.routes.js";
import requestRouter from "./routes/request.routes.js";
import userRouter from "./routes/user.routes.js";

// Routes Declaration
app.use("/", (req, res) => {
  res.status(200).json({ status: "success", message: "success" });
});
app.use("/api/v1/healthCheck", healthCheckRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/requests", requestRouter);

export { app };
export default app;
