/**
 * Responds to any HTTP request.
 * 
 * This example shows how to listen for capture available webhook events from webex contact center 
 * download the recording and then upload to GCP bucket.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

const express = require('express');
const app = express();
const dotenv = require('dotenv');
const url = require('url');
const { default: axios } = require('axios');
const fs = require('fs');

const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const bucketName = 'recordingbucket_123' // GCP bucket you want to upload to

app.use(express.json());

// Root URL for testing purposes.
app.get('/', (req, res) => {

    res.send('APP running');

});

app.post('/webhook', async(req, res) => {
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
            Authorization: ``,
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
                payload, { headers: headers }
            );
        } catch (error) {
            console.error(error);
        }

        // Extract response GCP
        let recordingDetails = response.data.data.pop().recording.pop().attributes;
        // let localFilePath = process.env.FILE_PATH || './recordings';
//         let fileName = `${taskId}-${recordingDetails.fileName}`;

        console.log(`Call Recording Details: ${recordingDetails}\n`);
        console.log(
            `Fetching Details from recording storage: ${recordingDetails.filePath}\n`
        );

        // Fetch actual Wav file
        /*let recordingData = await axios({
            method: 'GET',
            url: recordingDetails.filePath,
            responseType: 'stream',
        });

        // change this to GCP
        /*  recordingData.data.pipe(
              fs.createWriteStream(localFilePath + '/' + fileName),
              (error) => {
                  console.error(`Error while saving file to disk! \n Error: ${error}`);
              }
          ); */

        await storage.bucket(bucketName).upload(recordingDetails.filePath, {
            metadata: {
                cacheControl: 'no-cache'
            },
        });

        console.log(JSON.stringify(recordingDetails));
    // This is for Agent Based Events. Today, we're only logging this.
    } else if (type.includes('agent')) {
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

module.exports = {
    app
};