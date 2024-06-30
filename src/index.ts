import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import { AppDataSource } from "./ormconfig";
import { todoRouter } from "./routes/todo";
import { authRouter } from "./routes/auth";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use("/todos", todoRouter);
app.use("/auth", authRouter);

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
