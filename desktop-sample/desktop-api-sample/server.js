//Express Configuration
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { testRoute } from "./routes/testRoute.js";
import { verifyRoute } from "./routes/verifyRoute.js";
import { oauthRoute } from "./routes/oauthCodeRoute.js";
import { tokenRoute } from "./routes/tokenRoute.js";

// part 1 or 2: needed for CommonJS ie using vanilla JS instead of template engines
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//use env
dotenv.config();

//use routes locally on this file
const app = express();

//Cors Configuration
app.use(cors());

//help read form values - native express option
// app.use(express.urlencoded());
app.use(express.json());

// start the server
//imported routes
// test
app.use("/test", testRoute);
// verify
app.use("/verify", verifyRoute);
app.use("/token", tokenRoute);
// Get accessToken from authorization code grant ie redirect route- POST
app.use("/oauth/redirect", oauthRoute);
// test APi
app.use("/", verifyRoute);

// part 2 of 2: Needed for CommonJS ie using vanilla JS instead of template engines
app.use(express.static(__dirname + "/views"));

app.listen(process.env.PORT || 5000, function () {
  console.log(`Server is running at PORT:${process.env.PORT}`);
});
