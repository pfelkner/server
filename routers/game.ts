import {
  archiveGame,
  getCountries,
  getCurrentGame,
  removeCurrentGame,
  saveGame,
} from "../services/db-service";
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

router.get("/gameover/:userId", async (req, res) => {
  const currentGame = await getCurrentGame(req.params.userId);
  try {
    await archiveGame(currentGame);
  } catch (error) {
    console.error("Error archiving game", error);
  }
  await removeCurrentGame(currentGame.userId);
});

router.get("/countries", async (_, res) => {
  const countries = await getCountries();
  res.json(countries);
});

export default router;
