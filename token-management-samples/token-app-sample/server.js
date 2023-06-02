const express = require('express');
const app = express();
const dotenv = require('dotenv');
const url = require('url');
// Scheduler Service
const { initializeScheduler } = require('./scheduler/scheduler');
// Fetch The token
const { getToken } = require('./service/tokenService');
// Check Request Headers
const { checkRequestHeaders } = require('./auth');
// Env Variables
dotenv.config();

// Initialize the Token Scheduler - Background Refresh
initializeScheduler();

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

// Use JSON as the primary method of exchange in the body for the parser
app.use(express.json());

// Build the Token API
app.get('/api/token', async (req, res) => {
  /*
   * API Endpoint for Requesting an Access token.
   * Here, we give the client the access token but need to authenticate the request.
   * There are plenty of ways we can secure this. The best way is a secure hash.
   * This is a very static method that uses a mix of headers to validate. Admin user, OrgId, Passphrase, and Source IP Address
   */

  // All Requests are insecure by default
  let authenticated = false;

  console.log(req.headers);
  // Authenticate the request. Only deliver the token to WebexCC
  let contentType = req.headers['content-type'];
  let orgId = req.headers['x-organization-id'];
  let from = req.headers['x-from'];
  let apiToken = req.headers['x-api-phrase'];
  let sourceIp = req.ip;
  let accept = req.headers['accept'];

  let headers = {
    contentType: contentType,
    orgId: orgId,
    from: from,
    apiToken: apiToken,
    sourceIp: sourceIp,
    accept: accept,
  };

  console.log(
    `API Token Access with request headers: ${JSON.stringify(headers)}`
  );
  // Build a middleware checker - this function can be built
  authenticated = checkRequestHeaders(headers);

  if (authenticated) {
    let accessToken = await getToken();
    res.json(accessToken);
  } else {
    res.status(400);
    res.json({ error: 'Malformed Request' });
  }
});

app.listen(process.env.PORT || 8080, process.env.HOST || '0.0.0.0', () => {
  console.log(
    `Server listening on PORT: http://${process.env.HOST || '0.0.0.0'}:${
      process.env.PORT || 8080
    }`
  );
});
