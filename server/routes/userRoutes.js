import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/userController.js";
import protect from "../middleware/protect.js"; // A middleware to protect routes

const router = express.Router();

// Register a new user
router.post("/register", registerUser);

// Login the user
router.post("/login", loginUser);

// Get user profile (protected route)
router.get("/profile", protect, getUserProfile);

export default router;
