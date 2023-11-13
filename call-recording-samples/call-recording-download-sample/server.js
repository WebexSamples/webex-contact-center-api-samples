const express = require('express');
const app = express();
const dotenv = require('dotenv');
const url = require('url');
const { default: axios } = require('axios');
const fs = require('fs');

// Read all the ENV Variables. Please ensure that you have created a .env file in this folder
dotenv.config();

// Simple inmemory, global scope
let loginDetails = null;

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

app.post('/webhook', async (req, res) => {
  /*
   * Here is a basic Webhook Sample. In Production, please "Verify" your webhooks using Signed Webhooks.
   * For more details, refer :
   */

  let type = req.body ? (req.body.type ? req.body.type : '') : '';

  if (type === 'capture:available') {
    // Handle Capture available Webhook
    console.log('Received a new Call Recording Download Event. Processing..');

    // Fetch and Extract Webhook details
    let details = req.body.data;
    let taskId = details.taskId;
    let filePath = details.filePath;
    let createdTime = new Date(details.createdTime);
    console.log(
      `Downloading Recording for TaskId: ${taskId} from path: ${filePath} created On: ${createdTime}`
    );

    // Required Headers and Payload for CAPTURE call Recording
    let headers = {
      Authorization: `Bearer ${loginDetails.access_token}`,
      'Content-Type': 'application/json',
    };
    let payload = {
      query: {
        orgId: process.env.ORG_ID,
        urlExpiration: 30,
        taskIds: [taskId],
        includeSegments: false,
      },
    };
    // Capture Call Recording FilePath
    let response;
    try {
      response = await axios.post(
        'https://api.wxcc-us1.cisco.com/v1/captures/query',
        payload,
        { headers: headers }
      );
    } catch (error) {
      console.error(error);
    }

    // Extract response
    let recordingDetails = response.data.data.pop().recording.pop().attributes;
    let localFilePath = process.env.FILE_PATH || './recordings';
    let fileName = `${taskId}-${recordingDetails.fileName}`;

    console.log(`Call Recording Details: ${recordingDetails}\n`);
    console.log(
      `Fetching Details from recording storage: ${recordingDetails.filePath}\n`
    );

    // Fetch actual Wav file
    let recordingData = await axios({
      method: 'GET',
      url: recordingDetails.filePath,
      responseType: 'stream',
    });

    // Write to file system
    recordingData.data.pipe(
      fs.createWriteStream(localFilePath + '/' + fileName),
      (error) => {
        console.error(`Error while saving file to disk! \n Error: ${error}`);
      }
    );

    console.log(JSON.stringify(recordingDetails));
  } else if (type.includes('agent')) {
    // This is for Agent Based Events. Today, we're only logging this.
    console.log(
      `Agent Webhook Triggered with payload: \n ${JSON.stringify(
        req.body.data
      )}\n`
    );
  } else {
    console.log('Not a Call Recording capture Webhook. Ignoring..');
  }

  // Default Response
  res.status(200).send('Webhook Triggered');
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
