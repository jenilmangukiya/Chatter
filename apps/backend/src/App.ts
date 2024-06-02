import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export { app };
export default app;
