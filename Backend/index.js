import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./socketIo/server.js";

dotenv.config();
const Port = process.env.PORT || 4000;
const URI = process.env.MONGODB_URL;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use("/user", userRoute);
app.use("/user/message", messageRoute);

// -------deployment----
if (process.env.NODE_ENV === "production") {
  const dirPath = path.resolve();
  app.use(express.static(path.join(dirPath, "Frontend", "dist")));

  app.get("/*splat", (req, res) => {
    res.sendFile(path.resolve(dirPath, "Frontend", "dist", "index.html"));
  });
}

try {
  mongoose
    .connect(URI)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log("MongoDB connection error:", error));
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
}

server.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});