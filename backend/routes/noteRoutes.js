import { Router } from "express";
import { verifyToken, requireRole } from "../middlewares/authMiddleware.js";
import * as noteController from "../controllers/noteController.js";

const router = Router();

router.use(verifyToken, requireRole("student"));

router.get("/", noteController.listNotes);
router.post("/", noteController.createNote);
router.put("/:id", noteController.updateNote);
router.delete("/:id", noteController.deleteNote);

export default router;
