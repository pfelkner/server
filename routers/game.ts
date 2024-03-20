import { getCountries, getCurrentGame, saveGame } from "../services/db-service";
import { Router } from "express";

const router = Router();

router.post("/saveGame", async (req, res) => {
  console.log("/saveGame", req.body);
  const gameOver: boolean = await saveGame(req.body);
  res.send(gameOver);
});

router.get("/current/:userId", async (req, res) => {
  const currentGame = await getCurrentGame(req.params.userId);
  res.json(currentGame);
});

router.get("/countries", async (_, res) => {
  const countries = await getCountries();
  res.json(countries);
});

export default router;
