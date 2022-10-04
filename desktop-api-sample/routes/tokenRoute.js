import express from "express";
const router = express.Router();

import { ccAccessToken, ccExpires } from "../controllers/oauthCodeController.js";

//Test API
router.get("/", (req, res) => {
  res.json({
    ccAccessToken,
    ccExpires
  });
});

export { router as tokenRoute };
