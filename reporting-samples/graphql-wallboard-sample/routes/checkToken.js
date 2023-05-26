import express from "express";
const router = express.Router();

import { checkToken } from "../controller/refresh.js";

router.get("/", async (req, res) => {
  checkToken();
  res.send("making sure your still working!");
});

export { router as checkToken };
