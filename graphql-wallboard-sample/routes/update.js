import { Token } from "../models/token.js";
import express from "express";
const router = express.Router();

// Update tokens on MongoDB/
router.post("/", (req, res) => {
  const myData = new Token(req.body);
  const ac = myData.access_token;
  const re = myData.refresh_token;

  myData.collection.updateMany({}, { $set: { access_token: ac, refresh_token: re } }, function (err) {
    if (err) {
      res.send(err);
    } else {
      res.send("updated");
    }
    // mongoose.connection.close().then(r => console.log("db successfully closed"));
  });
});

export { router as update };
