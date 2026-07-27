import express from "express";

import {
  createRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  searchRooms,
} from "../controllers/roomController.js";

import { requireAuth } from "../middleware/authMiddleware.js";

import upload from "../middleware/upload.js";

const router = express.Router();

// Public Routes
router.get("/", getRooms);
router.get("/:id", getRoomById);

// Protected Routes
router.post("/", requireAuth, upload.array("images", 5), createRoom);
router.put("/:id", requireAuth, updateRoom);
router.delete("/:id", requireAuth, deleteRoom);
router.get("/search", searchRooms);

export default router;
