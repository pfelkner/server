"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameService = void 0;
const game_1 = require("./../api/game");
const client_1 = require("@prisma/client");
const with_difficulty_json_1 = __importDefault(require("../assets/with-difficulty.json"));
const prisma = new client_1.PrismaClient();
class GameService {
    constructor() {
        this.currentGames = [];
        this.startGame = () => {
            this.game = new game_1.Game(with_difficulty_json_1.default);
            this.game.start();
            return this.game;
        };
        this.createGame = () => {
            return new game_1.Game(with_difficulty_json_1.default);
        };
        this.inProgress = (game) => {
            return false;
        };
        this.updatePlayerScore = (userId, newScore) => __awaiter(this, void 0, void 0, function* () {
            const updatedScore = yield prisma.score.update({
                where: { userId: userId },
                data: { highestStreak: newScore },
            });
            return updatedScore;
        });
        this.game = null;
    }
    static getInstance() {
        if (!GameService.instance) {
            GameService.instance = new GameService();
        }
        return GameService.instance;
    }
}
exports.GameService = GameService;
