import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();
const port = process.env.PORT || 5123;


app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDb connection succeeded!");
  })
  .catch((err) => {
    console.log("Error connecting to Mongo" + err);
  });

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected!");
});


app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/user", userRoutes);


app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
