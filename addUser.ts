import { AppDataSource } from "./src/ormconfig";
import { User } from "./src/entity/User";
import bcrypt from "bcrypt";

const addUser = async (username: string, password: string) => {
  try {
    // Initialize the data source
    await AppDataSource.initialize();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const user = new User();
    user.username = username;
    user.password = hashedPassword;
    user.created_at = new Date();

    // Save the user to the database
    await AppDataSource.manager.save(user);

    console.log("User added successfully");
  } catch (error) {
    console.error("Error adding user:", error);
  } finally {
    // Destroy the data source to close the connection
    await AppDataSource.destroy();
  }
};

// Replace 'your_username' and 'your_password' with the actual values
const username = "jordan";
const password = "ikomobi123";

addUser(username, password);
