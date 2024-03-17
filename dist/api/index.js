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
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors = require("cors");
// Create a single supabase client for interacting with your database
const game_1 = require("./game");
const with_difficulty_json_1 = __importDefault(require("../assets/with-difficulty.json"));
const auth_1 = __importDefault(require("../routers/auth"));
const score_1 = __importDefault(require("../routers/score"));
const game_2 = __importDefault(require("../routers/game"));
const PORT = process.env.PORT || 8080;
let game = new game_1.Game(with_difficulty_json_1.default);
const app = (0, express_1.default)();
app.use(cors());
app.use(express_1.default.json());
app.use("/auth", auth_1.default);
app.use("/score", score_1.default);
app.use("/game", game_2.default);
app.use(express_1.default.json());
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
}));
app.get("/gameover", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // game.stop();
    game = new game_1.Game(with_difficulty_json_1.default);
}));
