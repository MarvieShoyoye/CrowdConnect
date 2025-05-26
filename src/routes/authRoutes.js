import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
} from "../controllers/authcontroller.js";
import { protect } from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getUserProfile);
router.patch("/me", protect, updateUserProfile);
router.delete("/me", protect, deleteUser);

export default router;
