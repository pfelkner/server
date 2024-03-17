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
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.body.name;
    const user = yield (0, db_service_1.getUserByName)(userName);
    if (!user) {
        res.status(400).send("User not found");
        return;
    }
    if (user.password !== req.body.password) {
        res.status(400).send("Wrong password");
        return;
    }
    res.json(user);
}));
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const password = req.body.password;
    const users = yield (0, db_service_1.getUsers)();
    if (users.find((user) => user.name === name)) {
        res.status(400).send("Name already exists");
        return;
    }
    const user = yield (0, db_service_1.createUser)(name, password);
    res.json(user);
}));
router.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, db_service_1.getUsers)();
    res.json(users);
}));
exports.default = router;
