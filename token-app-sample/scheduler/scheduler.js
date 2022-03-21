/**
 * This file stores the logic to call the "Scheduler" to refresh the tokens every INTERVAL hours.
 * INTERVAL = 10; would refresh the token every 10 hours
 * To Store the Token, it depends on the "Token Service"
 */
// Scheduler
const {
  ToadScheduler,
  SimpleIntervalJob,
  AsyncTask,
} = require('toad-scheduler');
// HTTP Client
const axios = require('axios');
const dotenv = require('dotenv').config();
const path = require('path');
// Store the Token inside the Database
const { db } = require('../db/db');
const { getToken, updateToken } = require('../service/tokenService');
// Global Constants
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const refreshToken = process.env.REFRESH_TOKEN;
const authUrl = 'https://webexapis.com/v1/access_token';
// You can externalize this - interval in hours
const INTERVAL = 20;

// Connect to your database. Change the parameters inside of db.js to switch your database type.
db.sync({
  force: false,
})
  .then(() => console.log('DB Connected!'))
  .catch((err) => console.log(err));

const getRefreshToken = async () => {
  const webexUrl = authUrl;
  const params = {
    grant_type: 'refresh_token',
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
  };

  console.log(`Trying request with params: ${JSON.stringify(params)}`);

  let urlParams = Object.entries(params)
    .map((x) => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
    .join('&');

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
  };

  try {
    const response = await axios.post(webexUrl, urlParams, config);

    // Store this in database..
    console.log(`Storing in database: ${JSON.stringify(response.data)}`);
    // Gives -> access_token, expires_in, refresh_token, refresh_token_expires_in, token_type
    // Returned access token
    let token_data = await response.data;
    let token = '';
    // Checking
    try {
      token = await getToken();
    } catch (error) {
      console.error(`Error while fetching token: ${error}`);
    }
    if (token) {
      console.log(
        `Found existing token details in DB: ${JSON.stringify(
          token
        )} updating with this data:-> ${JSON.stringify(token_data)}`
      );
    } else {
      console.log(`No Existing token found, updating / creating first one..`);
    }

    // Update Token in DB - Client Secret update
    let dbResponse = '';
    try {
      dbResponse = await updateToken(token_data);
      console.log(`Created new DB record: ${JSON.stringify(dbResponse)}`);
    } catch (error) {
      console.error(`Error while updating DB: ${error}`);
    }
    return dbResponse;
  } catch (error) {
    console.error(`MAJOR ERROR in RETRIEVING THE ACCESS TOKEN: ${error}`);
  }
};

const initializeScheduler = () => {
  console.info('Initializing the Scheduler..');
  // Initialize the Token first
  getRefreshToken();
  const scheduler = new ToadScheduler();
  const task = new AsyncTask('Fetch Refresh Token', getRefreshToken);

  // Setup the Scheduler to get the refresh token every INTERVAL hours
  // For minutes, use: const job = new SimpleIntervalJob({ minutes: INTERVAL }, task);

  const job = new SimpleIntervalJob({ seconds: INTERVAL }, task);
  //const job = new SimpleIntervalJob({ hours: INTERVAL }, task);
  scheduler.addSimpleIntervalJob(job);
  console.info(`Scheduler initialized with Interval:${INTERVAL}`);
  return;
};

module.exports = { getRefreshToken, initializeScheduler };
