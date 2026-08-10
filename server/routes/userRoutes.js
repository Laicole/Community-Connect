import express from "express";
import { 
    registerUser,
    loginUser,
    getProfile
 } from "../controllers/userControllers.js";

 import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);

export default router;