import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import {
  createBooking,
  getMyBookings,
  cancelBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

// Create Booking
router.post("/", requireAuth, createBooking);

// Get Logged-in User Bookings
router.get("/my-bookings", requireAuth, getMyBookings);

// Cancel Booking
router.put("/cancel/:id", requireAuth, cancelBooking);

export default router;
