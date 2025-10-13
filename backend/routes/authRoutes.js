import { Router } from "express";
import { register, login, profile } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", verifyToken, profile);

export default router;
