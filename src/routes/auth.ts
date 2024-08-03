import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/login", AuthController.login);
router.get("/user", authMiddleware, AuthController.getUser);

export { router as authRouter };
