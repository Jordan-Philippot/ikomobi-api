import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { findUserByUsername, createUser } from "../models/User";

const secret = process.env.JWT_SECRET || "your_jwt_secret";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: "1h" });
    res.json({ token, user: user.username });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await createUser(username, password);
    res.status(201).json({ message: "User created successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
