import express from "express";
import authRoutes from "./routes/auth.route";

const app = express();

app.use("/api/auth", authRoutes);

app.listen(8000, () => {
  console.log("Server running on PORT: 8000");
});
