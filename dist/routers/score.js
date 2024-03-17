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
const express_1 = require("express");
const db_service_1 = require("../services/db-service");
const router = (0, express_1.Router)();
router.post("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.userId;
    const newScore = req.body.highestStreak;
    const userScore = yield (0, db_service_1.getPlayerScore)(userId);
    console.log(`User ${userId} has score ${newScore} and highestStreak ${userScore.highestStreak}`);
    if (userScore.highestStreak < newScore) {
        // cant be null due to implementaton of getPlayerScore
        const updatedScore = yield (0, db_service_1.updatePlayerScore)(userId, newScore);
    }
    res.send("Score updated");
}));
router.get("/", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const scores = yield (0, db_service_1.getScores)();
    res.json(scores);
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const scores = yield (0, db_service_1.getScores)();
    const playerScore = scores.find((score) => score.userId === userId);
    if (!playerScore) {
        res.status(404).send("User not found");
    }
    res.json(playerScore);
}));
exports.default = router;
