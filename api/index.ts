import { getStatsById } from "./../services/db-service";
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

app.listen(PORT, async () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

// Route to get stats form db
// db service method to actually get the data from db
// in frontend send get request to fetch the stats
// in component set stats to compoentn data to dispaly in table

app.get("/stats/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const stats = await getStatsById(userId);
    if (stats.error) throw Error;

    res.json(stats.data);
  } catch (error) {
    console.error("getStatsById:Error fetching data:", error);
  }
});
// app.get("/stats/", (req, res) => {});
