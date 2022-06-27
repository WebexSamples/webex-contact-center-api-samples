import { Token } from "../models/token.js";
import express from "express";
const router = express.Router();

// Update tokens on MongoDB/
router.post("/", (req, res) => {
  const myData = new Token(req.body);
  const expires = myData.expires;

  myData.collection.updateOne({}, { $set: { expires: expires } }, function (err) {
    if (err) {
      res.send(err);
    } else {
      res.send("updated");
    }
    // mongoose.connection.close().then(r => console.log("db successfully closed"));
  });
});

export { router as updateTimer };
