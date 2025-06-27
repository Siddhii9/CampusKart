import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import connectDB from "../config/connectDB.js"; // <- use your modular DB connection
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/user.router.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // Adjust if needed
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// DB Connection + Server Start
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error(" Failed to connect DB:", err);
  });
