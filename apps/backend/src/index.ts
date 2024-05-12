import dotenv from "dotenv";
import { app } from "./App.js";
import { connectDB } from "./db/index.js";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5001, () => {
      console.log(
        `Server running on PORT : http://localhost:${process.env.PORT || 5001}`
      );
    });
  })
  .catch((error) => {
    console.log("mongoDB connection error: ", error);
  });

export default app;
