import { DataSource } from "typeorm";
import { Todo } from "./entity/Todo";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Todo, User],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});
