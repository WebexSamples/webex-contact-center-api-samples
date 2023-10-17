const express = require('express');
const app = express();
const dotenv = require('dotenv');
const url = require('url');
const { default: axios } = require('axios');
// ENV Variables
dotenv.config();
// Initialize constants
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;
const orgId = process.env.ORG_ID;
const scopes = 'cjp:config cjp:config_read';
const apiRootUrl = 'https://api.wxcc-us1.cisco.com'; // Change this to your Datacenter
// Simple inmemory, global scope - you can store this on local storage if you'd like.
var loginDetails = null;

// For production HTTPS redirects only
/*
const requireHTTPS = (req, res, next) => {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
};
*/
//app.use(requireHTTPS);

app.use(express.json());

app.use(express.static('./dist'));

// set up rate limiter: maximum of five requests per minute
var RateLimit = require('express-rate-limit');
var limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

// apply rate limiter to all requests
app.use(limiter);





app.get('/', (req, res) => {
  /*
   * This basic endpoint only shows you the access token if existing in memory.
   * If not, it redirects you to login.
   */

  if (loginDetails) {
    // Logged in OR attempted
    res.sendFile('index.html', { root: 'dist/' });
  } else {
    // Not logged in
    res.redirect('/login');
  }
});

app.get('/login', (req, res) => {
  /*
   * Main Login Endpoint that triggers the OAuth2 Flow.
   * Step 1 - Redirect to Webex to fetch Authorization Code
   * Step 2 - Redirect to Callback / Redirect URI to retrieve the code
   * Step 3 - POST to Webex for an Access Token
   */

  const authUrl = 'https://webexapis.com/v1/authorize';

  console.log(`Redirecting to Webex Login Page, using Client ID: ${clientId}`);
  console.log(
    url.format({
      pathname: authUrl,
      query: {
        response_type: 'code',
        client_id: clientId,
        redirect_uri: redirectUri,
        scope: scopes,
        state: 'new',
      },
    })
  );
  res.redirect(
    url.format({
      pathname: authUrl,
      query: {
        response_type: 'code',
        client_id: clientId,
        redirect_uri: redirectUri,
        scope: scopes,
        state: 'AudioConnector',
      },
    })
  );
});

app.get('/auth/webex/callback', async (req, res) => {
  /*
   * Redirect Endpoint to Fetch Code and POST to Webex, i.e
   * Step 2 - Redirect to Callback / Redirect URI to retrieve the code
   * Step 3 - POST to Webex for an Access Token
   */

  const code = req.query.code ? req.query.code : null;
  const error = req.query.error
    ? `${req.query.error} ${req.query.error_description}`
    : null;
  //?code=_____
  if (!code) {
    console.error(
      `Error occured during the OAuth flow: missing CODE parameter`
    );
    console.error(`ERROR: ${error}`);
    res.status(500);
    res.send({ error: 'An error occured while fetching the code' });
  }

  console.log(`Fetched Code: ${code}`);

  // Get access Token - submit required payload
  const payload = {
    grant_type: 'authorization_code',
    client_id: clientId,
    client_secret: clientSecret,
    code: code,
    redirect_uri: redirectUri,
  };
  // Parameterize
  const data = Object.keys(payload)
    .map((key, index) => `${key}=${encodeURIComponent(payload[key])}`)
    .join('&');

  console.log(`Params: ${data}`);

  const response = await axios.post(
    'https://webexapis.com/v1/access_token',
    data,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  console.log(`Got Response: ${JSON.stringify(response.data)}`);

  /*
   * Here is where you Fetch the Access Token, Refresh Token and also, "Org ID" can be derived from the access token.
   * You would usually persist this to a database. For the sample, we are storing it in a global variable in memory.
   * THIS IS NOT INTENDED FOR PRODUCTION USE - Please persist this to a cache or local datastore.
   */
  loginDetails = response.data
    ? response.data
    : { error: 'Error while fetching access token' };

  // You can fetch the Access Token, Cluster ID, Org ID from here

  let [accessToken, ciCluster, orgId] = loginDetails.access_token.split('_');
  console.log(`Got Access Token: ${accessToken}`);
  console.log(`Got Webex CI Cluster ID: ${ciCluster}`);
  console.log(`Got Org ID: ${orgId}`);
  // Redirect to Home to show you the access token.
  res.redirect('/');
});

app.get('/userinfo', async (req, res) => {
  res.json(loginDetails);
});

app.get('/outdial', async (req, res) => {
  //click to dial

  const options = {
    method: 'POST',
    url: `https://api.wxcc-us1.cisco.com/v1/tasks`,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${loginDetails.access_token}`,
    },
    data: {
      "destination": "1##########",
      "entryPointId": "57a9b978-206f-48bd-a340-770b61ca83c4",
      "outboundType": "OUTDIAL",
      "mediaType": "telephony",
      "origin": "+14806754092"
    } 
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.json({ error: error });
  }
});


app.get('/execute_flow', async (req, res) => {
  // prefered agent
  const options = {
    method: 'POST',
    url: `https://api.wxcc-us1.cisco.com/v1/tasks`,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${loginDetails.access_token}`,
    },
    data: {
      "destination": "1##########",
      "entryPointId": "495ba730-ec20-4e17-8aae-365a12f9337a",
      "outboundType": "EXECUTE_FLOW",
      "mediaType": "telephony",
      "attributes": {"agentEmail":"jiwyatt_ps@email.carehybrid.com"},
      "origin": "+14806754092"
    } 
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.json({ error: error });
  }
});

app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: 'dist/' });
});

app.listen(process.env.PORT || 8080, process.env.HOST || '0.0.0.0', () => {
  console.log(
    `Server listening on PORT: http://${process.env.HOST || '0.0.0.0'}:${
      process.env.PORT || 8080
    }`
  );
});
