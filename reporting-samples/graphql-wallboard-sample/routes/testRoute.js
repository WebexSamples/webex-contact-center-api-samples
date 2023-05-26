import express from "express";
const router = express.Router();

//Test API
router.get("/", (req, res) => {
  res.send("backend api is running!");
});

export { router as testRoute };
