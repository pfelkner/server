import express, { Router } from "express";
import {
  getPlayerScore,
  updatePlayerScore,
  getScores,
  ScoreEntity,
} from "../services/db-service";

const router = Router();

router.post("/update", async (req, res) => {
  const userId = req.body.userId;
  const newScore = req.body.highestStreak;
  const userScore = await getPlayerScore(userId);
  console.log(
    `User ${userId} has score ${newScore} and highestStreak ${userScore.highestStreak}`
  );
  if (userScore.highestStreak! < newScore) {
    // cant be null due to implementaton of getPlayerScore
    const updatedScore = await updatePlayerScore(userId, newScore);
  }

  res.send("Score updated");
});

router.get("/", async (_, res) => {
  const scores = await getScores();
  res.json(scores);
});

router.get("/:id", async (req, res) => {
  const userId: string = req.params.id;

  const scores: ScoreEntity[] = await getScores();
  const playerScore = scores.find((score) => score.userId === userId);
  if (!playerScore) {
    res.status(404).send("User not found");
  }
  res.json(playerScore);
});

export default router;
