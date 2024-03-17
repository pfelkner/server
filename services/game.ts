import { Game } from "./../api/game";
import { PrismaClient, Score, User } from "@prisma/client";
import countries from "../assets/with-difficulty.json";
import game from "../routers/game";

const prisma = new PrismaClient();

export interface CurrentGame {
  userId: number;
  game: Game;
}
export class GameService {
  private static instance: GameService;
  game: Game | null;
  currentGames: Game[] = [];

  constructor() {
    this.game = null;
  }

  public static getInstance(): GameService {
    if (!GameService.instance) {
      GameService.instance = new GameService();
    }
    return GameService.instance;
  }

  public startGame = (): Game => {
    this.game = new Game(countries);
    this.game.start();

    return this.game;
  };

  createGame = (): Game => {
    return new Game(countries);
  };

  inProgress = (game: Game): boolean => {
    return false;
  };

  updatePlayerScore = async (
    userId: number,
    newScore: number
  ): Promise<Score> => {
    const updatedScore = await prisma.score.update({
      where: { userId: userId },
      data: { highestStreak: newScore },
    });
    return updatedScore;
  };
}
