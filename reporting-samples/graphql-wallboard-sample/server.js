import express from "express";
import "dotenv/config";
// import { db } from "./controller/database/db.js";
import cors from "cors";
import { basicAuth } from "./controller/auth.js";

// Routes
import { testRoute } from "./routes/testRoute.js";
import { environment } from "./routes/environment.js";
import { update } from "./routes/update.js";
import { updateTimer } from "./routes/updateTimer.js";
import { add } from "./routes/add.js";
import { token } from "./routes/token.js";
import { refreshToken } from "./routes/refreshToken.js";
import { devToken } from "./routes/devToken.js";
import { checkToken } from "./routes/checkToken.js";
import { callCountByEntryPoint } from "./routes/wallboard/callCountByEntryPoint.js";
import { callStatsByAgent } from "./routes/wallboard/callStatsByAgent.js";
import { callStatsByQueue } from "./routes/wallboard/callStatsByQueue.js";
import { totalAgentSessionsRealTime } from "./routes/wallboard/totalAgentSessionsRealTime.js";

const app = express();

// part 1 of 2: Using vanilla JS instead of any template engines
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Use DB
// const database = db();

// Decode Form URL Encoded data and json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
var whitelist = ["http://localhost:3000", "https://sa-graphql.herokuapp.com"];
var corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};
app.use(cors(corsOptions));

// Check is access token needs rotation
app.use("/checkToken", checkToken);

// Send manually copied token from the developer portal
app.use("/dev-token", basicAuth, devToken);

// Get token from mongoDB
app.use("/token", basicAuth, token);

// Refresh token
app.use("/refreshToken", basicAuth, refreshToken);

// Initially add tokens using Postman
app.use("/add", basicAuth, add);

// Update tokens on MongoDB/
app.use("/update", basicAuth, update);

// Update timers on MongoDB/
app.use("/updateTimer", updateTimer);

// Decide to use mongoDB or dev portal tokens
app.use("/environment", environment);

// callCountByEntryPoint Chart
app.use("/callCountByEntryPoint", callCountByEntryPoint);

// callStatsByAgent Chart
app.use("/callStatsByAgent", callStatsByAgent);

// callStatsByQueue Chart
app.use("/callStatsByQueue", callStatsByQueue);

// totalAgentSessionsRealTime Chart
app.use("/totalAgentSessionsRealTime", totalAgentSessionsRealTime);

// basic testing with express is up and running correctly
app.use("/test", testRoute);

// part 2 of 2: Using vanilla JS instead of template engines
app.use(express.static(__dirname + "/views"));

// Start listening...
app.listen(process.env.PORT || "3000", () => {
  console.log("server running on 3000");
});
