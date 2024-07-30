import { Request, Response } from "express";
import { AppDataSource } from "../ormconfig";
import { Todo } from "../entity/Todo";
import { User } from "../entity/User";

export class TodoController {
  static getAll = async (req: Request, res: Response) => {
    const todoRepository = AppDataSource.getRepository(Todo);
    const userRepository = AppDataSource.getRepository(User);
    const { userId } = req.query;
    const user = await userRepository.findOneBy({ id: userId as any });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const todos = await todoRepository.find({
      where: { user: { id: userId as any } },
    });

    res.json(todos);
  };

  static create = async (req: Request, res: Response) => {
    const todoRepository = AppDataSource.getRepository(Todo);
    const userRepository = AppDataSource.getRepository(User);
    const { userId } = req.body;
    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const todo = new Todo();
    todo.text = req.body.text;
    todo.user = user;

    const result = await todoRepository.save(todo);
    res.json(result);
  };

  static update = async (req: Request, res: Response) => {
    const todoRepository = AppDataSource.getRepository(Todo);
    const userRepository = AppDataSource.getRepository(User);

    const todoId = parseInt(req.params.id, 10);

    const { userId } = req.query;
    const user = await userRepository.findOneBy({ id: userId as any });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (isNaN(todoId)) {
      return res.status(400).json({ message: "Invalid todo ID" });
    }

    let todo = await todoRepository.findOneBy({
      id: todoId,
      user: { id: userId as any },
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todoRepository.merge(todo, req.body);
    const result = todoRepository.save(todo);
    res.json(result);
  };

  static delete = async (req: Request, res: Response) => {
    const todoRepository = AppDataSource.getRepository(Todo);
    const todoId = parseInt(req.params.id);

    if (isNaN(todoId)) {
      return res.status(400).json({ message: "Invalid todo ID" });
    }

    const todo = await todoRepository.findOneBy({
      id: todoId,
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todoRepository.remove(todo);

    res.json({ message: "Todo deleted successfully" });
  };
}
