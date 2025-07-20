import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import connectDB from "../config/connectDB.js"; // <- use your modular DB connection
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/user.router.js";
import cookieParser from "cookie-parser";
import cartRoutes from "./routes/cart.route.js";
import orderRoutes from "./routes/order.route.js";
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
app.use(cookieParser());
// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// DB Connection + Server Start
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error(" Failed to connect DB:", err);
  });
