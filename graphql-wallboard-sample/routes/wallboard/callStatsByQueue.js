import express from "express";
const router = express.Router();

import { callStatsByQueue } from "../../controller/wallboard/callStatsByQueue.js";

// Decide to use mongoDB or dev portal tokens
router.get("/", async (req, res) => {
  res.json({ data: await callStatsByQueue() });
});

export { router as callStatsByQueue };
