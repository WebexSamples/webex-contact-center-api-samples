import express from "express";
const router = express.Router();

import { callStatsByAgent } from "../../controller/wallboard/callStatsByAgent.js";

// Decide to use mongoDB or dev portal tokens
router.get("/", async (req, res) => {
  res.json({ data: await callStatsByAgent() });
});

export { router as callStatsByAgent };
