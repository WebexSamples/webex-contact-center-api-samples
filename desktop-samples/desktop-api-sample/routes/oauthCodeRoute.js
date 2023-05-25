import express from "express";
const router = express.Router();

//Get controller Logic
import { oauthCode } from "../controllers/oauthCodeController.js";

//send route to server
router.get("/", oauthCode);

//export route to server
export { router as oauthRoute };
