import { Request, Response } from "express";
import { AppDataSource } from "../ormconfig";
import { User } from "../entity/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthController {
  static login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ username: username });

    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1m",
      }
    );
    res.json({ user: user, token });
  };

  static getUser = async (req: Request, res: Response) => {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const { userId } = (req as any).user;

      const user = await userRepository.findOneBy({ id: userId });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ id: user.id, username: user.username });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
