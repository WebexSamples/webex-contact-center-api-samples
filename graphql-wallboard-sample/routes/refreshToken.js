import { Token } from "../models/token.js";
import express from "express";
const router = express.Router();

// Get token from mongoDB
router.get("/", (req, res, next) => {
  Token.find({}, function (err, tokens) {
    if (err) {
      res.send(err);
    } else {
      res.json(tokens);
    }
  });
});

export { router as refreshToken };
