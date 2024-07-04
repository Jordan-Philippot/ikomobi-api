import { DataSource } from "typeorm";
import { Todo } from "./entity/Todo";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "us-cluster-east-01.k8s.cleardb.net",
  port: 3306,
  username: "bcde2712981ddc",
  password: "33280824",
  database: "heroku_639a46fe7e74e84",
  synchronize: true,
  logging: false,
  entities: [Todo, User],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});
// npm run typeorm migration:generate "src/migrations/createUserAndTodo" --dataSource "src/ormconfig.ts"
// npm run typeorm migration:generate ./src/migrations/createUserAndTodo --dataSource ./src/ormconfig.ts
