import express from "express";
const router = express.Router();

// Decide to use mongoDB or dev portal tokens
router.get("/", (req, res) => {
  res.json({ environment: process.env.ENVIRONMENT, org_id: process.env.ORG_ID });
});

export { router as environment };
