import { Router } from "express";
import { createUser, getUserByName, getUsers } from "../services/db-service";

const router = Router();

interface User {
  created_at: string;
  id: string;
  name: string;
  password: string;
}

router.post("/signin", async (req, res) => {
  const userName = req.body.name;
  const user = await getUserByName(userName);
  if (!user) {
    res.status(400).send("User not found");
    return;
  }
  if (user.password !== req.body.password) {
    res.status(400).send("Wrong password");
    return;
  }

  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

router.post("/signup", async (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const users: User[] = await getUsers();
  if (users.find((user) => user.name === name)) {
    res.status(400).send("Name already exists");
    return;
  }
  const user = await createUser(name, password);

  res.json(user);
});

router.get("/users", async (req, res) => {
  const users = await getUsers();
  res.json(users);
});

export default router;
