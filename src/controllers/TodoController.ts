import { Request, Response } from "express";
import { AppDataSource } from "../ormconfig";
import { Todo } from "../entity/Todo";

export class TodoController {
  static getAll = async (req: Request, res: Response) => {
    const todoRepository = AppDataSource.getRepository(Todo);
    const todos = await todoRepository.find();
    res.json(todos);
  };

  static create = async (req: Request, res: Response) => {
    const todoRepository = AppDataSource.getRepository(Todo);
    const todo = await todoRepository.save(req.body);
    res.json(todo);
  };

  static update = async (req: Request, res: Response) => {
    const todoRepository = AppDataSource.getRepository(Todo);
    const result = await todoRepository.update(req.params.id, req.body);
    res.json(result);
  };

  static delete = async (req: Request, res: Response) => {
    const todoRepository = AppDataSource.getRepository(Todo);
    const result = await todoRepository.delete(req.params.id);
    res.json(result);
  };
}
