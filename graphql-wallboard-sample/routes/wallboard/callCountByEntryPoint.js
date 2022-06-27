import express from "express";
const router = express.Router();

import { callCountByEntryPoint } from "../../controller/wallboard/callCountByEntryPoint.js";

// Decide to use mongoDB or dev portal tokens
router.get("/", async (req, res) => {
  res.json({ data: await callCountByEntryPoint() });
});

export { router as callCountByEntryPoint };
