import { getCountries } from "../services/db-service";
import { GameService } from "./../services/game";
import { Router } from "express";

const router = Router();
const gs = GameService.getInstance();

router.get("/start", async (req, res) => {
  const gs = GameService.getInstance();
  const game = gs.startGame();
  res.send("Game started");
});

router.get("/nextRound", async (req, res) => {
  const gs = GameService.getInstance();
  const data = await gs.game?.getRoundData();
  console.log("nextRound".repeat(20));
  console.log(data);
  console.log(gs);
  console.log("nextRound".repeat(20));
  gs.game?.next();
  res.json(data);
});

router.post("/gameover", async (req, res) => {
  const gs = GameService.getInstance();
  const userId = req.body.userId;
  gs.game?.stop(userId);
  // game.stop();
  // game = new Game(countries);
});

router.get("/countries", async (_, res) => {
  const countries = await getCountries();
  res.json(countries);
});

export default router;
