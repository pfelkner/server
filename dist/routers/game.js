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
Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = require("./../services/game");
const express_1 = require("express");
const router = (0, express_1.Router)();
const gs = game_1.GameService.getInstance();
router.get("/start", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const game = gs.startGame();
    res.send("Game started");
}));
router.get("/nextRound", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const data = (_a = gs.game) === null || _a === void 0 ? void 0 : _a.getRoundData();
    (_b = gs.game) === null || _b === void 0 ? void 0 : _b.next();
    res.json(data);
}));
router.post("/gameover", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const userId = req.body.userId;
    (_c = gs.game) === null || _c === void 0 ? void 0 : _c.stop(userId);
    // game.stop();
    // game = new Game(countries);
}));
exports.default = router;
