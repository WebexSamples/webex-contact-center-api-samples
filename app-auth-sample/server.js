const express = require('express');
const app = express();
const dotenv = require('dotenv');
const url = require('url');
const { default: axios } = require('axios');

// ENV Variables
dotenv.config();

// Simple inmemory, global scope
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

app.get('/', (req, res) => {
  /*
   * This basic endpoint only shows you the access token if existing in memory.
   * If not, it redirects you to login.
   */

  if (loginDetails) {
    // Logged in OR attempted
    res.json(loginDetails);
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

  console.log(
    `Redirecting to Webex Login Page, using Client ID: ${process.env.CLIENT_ID}`
  );

  res.redirect(
    url.format({
      pathname: authUrl,
      query: {
        response_type: 'code',
        client_id: process.env.CLIENT_ID,
        redirect_uri: process.env.REDIRECT_URI,
        scope: 'cjp:config cjp:config_read cjp:config_write',
        state: '',
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
  //?code=_____
  if (!code) {
    console.error(`Error occured during the OAuth flow: ${error}`);
    res.code(500);
    res.send({ error: 'An error occured while fetching the code' });
  }

  console.log(`Fetched Code: ${code}`);

  // Get access Token - submit required payload
  const payload = {
    grant_type: 'authorization_code',
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code: code,
    redirect_uri: process.env.REDIRECT_URI,
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

app.get('/tasks', async (req, res) => {
  // Simple "GET Tasks" Sample. Change the DATES to fetch another range.
  // View the spec here :

  let from = new Date('2021-10-10').getTime();
  let to = new Date('2021-10-20').getTime();
  const options = {
    method: 'GET',
    url: 'https://api.wxcc-us1.cisco.com/v1/tasks',
    params: {
      channelTypes: 'telephony',
      from: from,
      to: to,
      pageSize: '100',
      orgId: process.env.ORG_ID,
    },
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${loginDetails.access_token}`,
    },
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

app.get('/users', async (req, res) => {
  // Simple "GET Users" Sample. Change the DATES to fetch another range.
  // View the spec here :

  const options = {
    method: 'GET',
    url: `https://api.wxcc-us1.cisco.com/organization/${process.env.ORG_ID}/user`,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${loginDetails.access_token}`,
    },
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

app.get('/agents', async (req, res) => {
  // Simple "GET Agent Statistics" Sample. Change the DATES to fetch another range.
  // View the spec here :

  let from = new Date('2021-11-15').getTime();
  let to = new Date('2021-11-18').getTime();
  let orgId = process.env.ORG_ID;

  options = {
    method: 'GET',
    url: 'https://api.wxcc-us1.cisco.com/v1/agents/statistics',
    params: {
      from: from,
      to: to,

      interval: '15',
      orgId: orgId,
    },

    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${loginDetails.access_token}`,
    },
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

app.get('/queues', async (req, res) => {
  // Simple "GET Queue Statistics" Sample. Change the DATES to fetch another range.
  // View the spec here :

  let from = new Date('2021-10-10').getTime();
  let to = new Date('2021-10-20').getTime();
  let orgId = process.env.ORG_ID;

  options = {
    method: 'GET',
    url: 'https://api.wxcc-us1.cisco.com/v1/queues/statistics',
    params: {
      from: from,
      to: to,

      interval: '15',
      orgId: orgId,
    },

    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${loginDetails.access_token}`,
    },
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

app.get('/sites', async (req, res) => {
  // Simple "GET Sites" Sample. Change the DATES to fetch another range.
  // View the spec here :

  let orgId = process.env.ORG_ID;

  const options = {
    method: 'GET',
    url: `https://api.wxcc-us1.cisco.com/organization/${orgId}/site`,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${loginDetails.access_token}`,
    },
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
