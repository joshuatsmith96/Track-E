import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import boardRoutes from "./routes/boardRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/boards", boardRoutes);

app.use(errorHandler);

export default app;
