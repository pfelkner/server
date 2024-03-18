import { getCountries, getCurrentGame, saveGame } from "../services/db-service";
import { Router } from "express";

const router = Router();

router.post("/saveGame", async (req, res) => {
  console.log("/saveGame", req.body);
  saveGame(req.body);
});

router.get("/current/:userId", async (req, res) => {
  const currentGame = await getCurrentGame(req.params.userId);
  res.json(currentGame);
});

router.post("/gameover", async (req, res) => {
  throw new Error("Not implemented");
});

router.get("/countries", async (_, res) => {
  const countries = await getCountries();
  res.json(countries);
});

export default router;
