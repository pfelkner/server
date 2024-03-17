import { Game } from "./../api/game";
import countries from "../assets/with-difficulty.json";

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
}
