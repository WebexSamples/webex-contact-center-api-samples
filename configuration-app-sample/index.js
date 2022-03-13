import "dotenv/config";
import express from "express";
import cors from "cors";
import axios from "axios";

//needed for CommonJS
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// middleware
const app = express();
app.use(cors());

// Declare the redirect route
app.get(process.env.REDIRECT_PATH, async (req, res) => {
  // The req.query object has the query params that
  // were sent to this route. We want the `code` param
  const code = req.query.code;

  // Get access Token - submit required payload
  const payload = {
    grant_type: "authorization_code",
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code: code,
    redirect_uri: process.env.REDIRECT_URI
  };
  // Parameterize
  const data = Object.keys(payload)
    .map((key, index) => `${key}=${encodeURIComponent(payload[key])}`)
    .join("&");
  console.log(`Params: ${data}`);

  const response = await axios.post("https://webexapis.com/v1/access_token", data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
  const accessToken = response.data.access_token;
  // send access token to URL...
  res.redirect(`/app.html?access_token="${accessToken}"`);
});

app.get("/index", (req, res) => {
  res.redirect(`/index.html?clientID=${process.env.CLIENT_ID}?path=${process.env.REDIRECT_PATH}`);
});

app.get("/", (req, res) => {
  res.redirect("/app.html");
});

// least specific route...

app.use(express.static(__dirname + "/src/public"));

// run server
app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
