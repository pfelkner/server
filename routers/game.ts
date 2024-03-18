import { getCountries } from "../services/db-service";
import { Router } from "express";

const router = Router();

router.post("/gameover", async (req, res) => {
  throw new Error("Not implemented");
});

router.get("/countries", async (_, res) => {
  const countries = await getCountries();
  res.json(countries);
});

export default router;
