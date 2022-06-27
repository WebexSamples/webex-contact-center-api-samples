import express from "express";
const router = express.Router();

// Initially add tokens using Postman
router.post("/", (req, res) => {
  const myData = new Token(req.body);
  myData.save({ myData });
  res.send("add to database");
});

export { router as add };
