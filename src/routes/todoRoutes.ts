import { Router } from "express";
import {
  getAllTodos,
  addTodo,
  completeTodo,
} from "../controllers/todoController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.use(authMiddleware);

router.get("/", getAllTodos);
router.post("/", addTodo);
router.delete("/:id", completeTodo);

export default router;
