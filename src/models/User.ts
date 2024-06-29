import { db } from "../db";
import bcrypt from "bcryptjs";

export interface User {
  id: number;
  username: string;
  password: string;
}

export const findUserByUsername = async (
  username: string
): Promise<User | null> => {
  const rows = await db.query("SELECT * FROM users WHERE username = ?", [
    username,
  ]);
  return rows[0] || null;
};

export const createUser = async (
  username: string,
  password: string
): Promise<User> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await db.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, hashedPassword]
  );
  return { id: result.insertId, username, password: hashedPassword };
};
