import "dotenv/config";
import express from "express";
import cors from "cors";
import axios from "axios";

//needed for CommonJS
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// oauth info
const clientID = process.env.CLIENT_ID; // make sure to add your IDs in your own .env file
const clientSecret = process.env.CLIENT_SECRET; // same as above

const app = express();
app.use(cors());

//Declare the redirect route
app.get("/oauth/redirect", (req, res) => {
  // The req.query object has the query params that
  // were sent to this route. We want the `code` param
  const requestToken = req.query.code;

  async function getAccessToken() {
    // let data = stringify({});
    let data = {};
    let config = {
      method: "post",
      url: `https://webexapis.com/v1/access_token?grant_type=authorization_code&client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}&redirect_uri=http://localhost:5000/oauth/redirect`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        const accessToken = response.data.access_token;
        const refreshToken = response.data.refresh_token;
        // redirect the user to the welcome page, along with the access token
        getRefreshToken(refreshToken);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  async function getRefreshToken(refreshToken) {
    let data = {};
    let config = {
      method: "post",
      url: `https://webexapis.com/v1/access_token?grant_type=refresh_token&client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&redirect_uri=http://localhost:5000/oauth/redirect`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        const accessToken = response.data.access_token;
        console.log(`get from Refresh token ${JSON.stringify(response.data)}`);
        // redirect the user to the welcome page, along with the access token
        res.redirect(`/app.html?access_token="${accessToken}"`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getAccessToken();
});

app.get("/", (req, res) => {
  res.redirect("/app.html");
});

app.use(express.static(__dirname + "/src/public"));

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
