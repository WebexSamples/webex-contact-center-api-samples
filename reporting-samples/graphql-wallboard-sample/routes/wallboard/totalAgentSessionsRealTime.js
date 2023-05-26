import express from "express";
const router = express.Router();

import { totalAgentSessionsRealTime } from "../../controller/wallboard/totalAgentSessionsRealTime.js";

// Decide to use mongoDB or dev portal tokens
router.get("/", async (req, res) => {
  res.json({ data: await totalAgentSessionsRealTime() });
});

export { router as totalAgentSessionsRealTime };
