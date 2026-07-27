import express from "express";

import {
  createHotel,
  getHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
} from "../controllers/hotelController.js";

import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getHotels);

router.get("/:id", getHotelById);

// Protected Routes
router.post("/", requireAuth, createHotel);

router.put("/:id", requireAuth, updateHotel);

router.delete("/:id", deleteHotel);

export default router;
