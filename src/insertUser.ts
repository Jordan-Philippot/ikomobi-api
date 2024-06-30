import "reflect-metadata";
import { AppDataSource } from "./ormconfig";
import bcrypt from "bcryptjs";
import { User } from "./entity/User";

async function insertUser(username: string, password: string) {
  await AppDataSource.initialize();

  const userRepository = AppDataSource.getRepository(User);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User();
  user.username = username;
  user.password = hashedPassword;

  await userRepository.save(user);
  console.log("User has been inserted successfully.");

  await AppDataSource.destroy();
}

const username = "Séraphin"; // remplace par le nom d'utilisateur souhaité
const password = "ikomobi"; // remplace par le mot de passe souhaité

insertUser(username, password).catch((error) => console.log(error));
