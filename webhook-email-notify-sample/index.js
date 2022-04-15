import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import localtunnel from 'localtunnel';
import postmark from 'postmark';

//needed for CommonJS
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Localtunnel Wrapper used for Local dev testing on APIs that need public HTTPS access...
(async () => {
  const tunnel = await localtunnel({
    port: 5000,
    // Give a unique subdomain. Or you can delete this object to get a random assigned
    subdomain: 'mywebhook12345',
  });

  // The assigned public url for your tunnel  i.e. https://abcdefgjhij.localtunnel.me
  let url = tunnel.url;
  console.log(url); // copy the URL and add to to your POST / WebHook, etc...

  tunnel.on('close', () => {
    // tunnels are closed
  });
})();

// middleware
const app = express();
app.use(cors());
app.use(
  express.json({
    verify: function (req, res, buf, encoding) {
      req.rawBody = buf.toString();
    },
  })
);

// Declare the redirect route
app.get(process.env.REDIRECT_PATH, async (req, res) => {
  // The req.query object has the query params that
  // were sent to this route. We want the `code` param
  const code = req.query.code;

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
  const accessToken = response.data.access_token;
  // send access token to URL...
  res.redirect(`/app.html?access_token="${accessToken}"`);
});

app.get('/index', (req, res) => {
  res.redirect(
    `/index.html?clientID=${process.env.CLIENT_ID}?path=${process.env.REDIRECT_PATH}`
  );
});

app.post('/webhook', (req, res) => {
  // Fetch and Extract Webhook details
  const type = req.body ? (req.body.type ? req.body.type : '') : '';
  const details = req.body;
  const { taskId, filePath, agentId, destination, createdTime, currentState } =
    details.data;
  const org_id = details.comciscoorgid;
  let msg; // send out email notifications...

  //email notification
  function emailNotify(Subject, TextBody, HtmlBody) {
    return {
      To: 'someone@cisco.com', // Change to your recipient
      From: 'someone@cisco.com', // Change to your verified sender
      Subject,
      TextBody,
      HtmlBody,
    };
  }

  // Based on type... we will send out an email notification...
  switch (type) {
    case 'capture:available':
      console.log('Received a new Call Recording Download Event. Processing..');
      console.log(
        `Downloading Recording for TaskId: ${taskId} from path: ${filePath} created On: ${new Date(
          createdTime
        )}`
      );
      console.log(org_id);
      // send email notification
      msg = emailNotify(
        `Recording Available`,
        `Recording ${taskId} create on ${createdTime}, location: ${filePath}`,
        `<strong>Recording: <br> ${taskId} <br> create on ${createdTime}, <br> location: ${filePath}</strong>`
      );
      break;
    case 'agent:login':
      console.log(
        `Agent: ${agentId} using DN: ${destination} has login at: ${new Date(
          createdTime
        )}.`
      );
      // send email notification
      msg = emailNotify(
        `Logging in...`,
        `Agent: ${agentId} using DN: ${destination} has login at: ${new Date(
          createdTime
        )}.`,
        `<strong>Agent: <br> ${agentId} <br> DN: <br> ${destination} <br> Login at: <br> ${new Date(
          createdTime
        )}.</strong>`
      );
      break;
    case 'agent:logout':
      console.log(
        `Agent: ${agentId} has ${currentState} at: ${new Date(createdTime)}`
      );
      // send email notification
      msg = emailNotify(
        `Logging out...`,
        `Agent: ${agentId} has ${currentState} at: ${new Date(createdTime)}`,
        `<strong>Agent: <br> ${agentId} <br> ${currentState} at: <br> ${new Date(
          createdTime
        )}</strong>`
      );
      break;
    default:
      console.log('Cant find any types');
      break;
  }

  // Postmark email transporter...
  const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

  client
    .sendEmail(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });

  // Defer processing to later by pushing to a queue and responding ASAP.
  pushToQueue({ details, org_id, type });
  res.status(200).send();
});

function pushToQueue(event) {
  // In your app, you might push to an event bus or an in-memory queue
  // for this example, pushing to JS event loop (kinda like a queue)
  console.log('Pushing event into queue...');
  setTimeout(() => {
    processEvent(event);
  }, 1000);
}

function processEvent(event) {
  // In your app, you might do many things here.
  // for this example, pretend we're only interested in agent:login events
  switch (event.type) {
    case 'capture:available':
      console.log(event.details);
      break;
    case 'agent:login':
      console.log(event.details);
      break;
    case 'agent:logout':
      console.log(event.details);
      break;

    default:
      console.warn(
        `Unexpected event type '${event.type}', ignoring. Maybe the Subscription is misconfigured?`
      );
      break;
  }
}

// least specific route...
app.use(express.static(__dirname + '/src/public'));

// run server
app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
