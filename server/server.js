import express from "express";

import dotenv from "dotenv";
dotenv.config();
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key:", process.env.CLOUDINARY_API_KEY);
console.log("API Secret:", process.env.CLOUDINARY_API_SECRET);
import cors from "cors";

import { clerkMiddleware } from "@clerk/express";

import connectDB from "./config/db.js";

import hotelRoutes from "./routes/hotelRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import webhookRoutes from "./routes/webhookRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import ownerRoutes from "./routes/ownerRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// Routes
app.use("/api/hotels", hotelRoutes);
app.use("/api/users", userRoutes);
app.use("/api/webhooks", webhookRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/owner", ownerRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("API Working...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
