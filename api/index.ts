require("dotenv").config();
import express from "express";
import cors = require("cors");

import authRouter from "../routers/auth";
import scoreRouter from "../routers/score";
import gameRouter from "../routers/game";

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/score", scoreRouter);
app.use("/game", gameRouter);

app.use(express.json());

app.listen(PORT, async () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
