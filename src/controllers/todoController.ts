import { Request, Response } from "express";
import { db } from "../db";

export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const todos = await db.query("SELECT * FROM todos");
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addTodo = async (req: Request, res: Response) => {
  const { text } = req.body;
  try {
    const result = await db.query("INSERT INTO todos (text) VALUES (?)", [
      text,
    ]);
    res.status(201).json({ id: result.insertId, text });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const completeTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM todos WHERE id = ?", [id]);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
