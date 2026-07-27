import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import {
  getDashboard,
  getOwnerRooms,
  deleteRoom,
  getRoomById,
  updateRoom,
  addRoom,
  addHotel,
  getOwnerBookings,
} from "../controllers/ownerController.js";

import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/rooms", requireAuth, upload.array("images", 4), addRoom);
router.post("/hotel", requireAuth, upload.single("image"), addHotel);
router.get("/dashboard", requireAuth, getDashboard);
router.get("/rooms", requireAuth, getOwnerRooms);
router.delete("/rooms/:id", requireAuth, deleteRoom);
router.get("/rooms/:id", requireAuth, getRoomById);
router.put("/rooms/:id", requireAuth, updateRoom);
router.get("/bookings", requireAuth, getOwnerBookings);

// router.get("/dashboard", getDashboard);

export default router;
