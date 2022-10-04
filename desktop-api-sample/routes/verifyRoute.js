import express from "express";
const router = express.Router();

//Get controller Logic
import { verify } from "../controllers/verifyController.js";

//send route to server
router.get("/", verify);

//export route to server
export { router as verifyRoute };
