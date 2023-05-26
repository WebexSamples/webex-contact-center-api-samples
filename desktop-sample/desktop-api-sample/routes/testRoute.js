import express from "express";
const router = express.Router();

//Test API
router.get("/", (req, res) => {
  res.send(process.env.REDIRECT_URI);
});

export { router as testRoute };
