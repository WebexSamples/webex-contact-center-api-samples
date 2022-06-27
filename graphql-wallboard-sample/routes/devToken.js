import express from "express";
const router = express.Router();

// Send manually copied token from the developer portal
router.get("/", (req, res) => {
  res.json({ access_token: process.env.DEV_TOKEN });
});

export { router as devToken };
