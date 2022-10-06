import axios from "axios";

export let ccRefreshToken;
export let ccAccessToken;
export let ccExpires;

export async function oauthCode(req, res) {
  //The req.query object has the query params that were sent to this route. We want the `code` param
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
  // console.log(`Params: ${data}`);
  const response = await axios.post("https://webexapis.com/v1/access_token", data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
  ccRefreshToken = response.data.refresh_token;
  ccAccessToken = response.data.access_token;
  ccExpires = response.data.expires_in;
  console.log(response.data);
  res.redirect("/src/desktop.html");
}
