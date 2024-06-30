import { Router } from "express";
import { TodoController } from "../controllers/TodoController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/", authMiddleware, TodoController.getAll);
router.post("/", authMiddleware, TodoController.create);
router.put("/:id", authMiddleware, TodoController.update);
router.delete("/:id", authMiddleware, TodoController.delete);

export { router as todoRouter };
