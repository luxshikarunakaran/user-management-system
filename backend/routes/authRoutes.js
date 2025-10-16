import { Router } from "express";
import {
  register,
  login,
  profile,
  updateProfile,
} from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", verifyToken, profile);
router.put("/profile", verifyToken, updateProfile);

export default router;
