import express from "express";

import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  addFavorite,
  removeFavorite,
  getRecommendations
} from "../controllers/userControllers.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

router.post("/favorites/:eventId", protect, addFavorite);
router.delete("/favorites/:eventId", protect, removeFavorite);

router.get(
  "/recommendations",
  protect,
  getRecommendations
);

export default router;