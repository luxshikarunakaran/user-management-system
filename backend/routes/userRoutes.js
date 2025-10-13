import { Router } from "express";
import { verifyToken, requireRole } from "../middlewares/authMiddleware.js";
import * as userController from "../controllers/userController.js";

const router = Router();

router.use(verifyToken, requireRole("admin"));

router.get("/", userController.listUsers);
router.put("/:id/role", userController.changeRole);
router.delete("/:id", userController.deleteUser);

export default router;
