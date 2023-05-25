import { Token } from "../models/token.js";
import express from "express";
const router = express.Router();

// Get token from mongoDB
router.get("/", async (req, res, next) => {
  Token.find({}, function (err, tokens) {
    let accessToken = tokens;
    if (err) {
      res.send(err);
    } else {
      res.json({ access_token: accessToken[0].access_token });
    }
  });
});

export { router as token };
