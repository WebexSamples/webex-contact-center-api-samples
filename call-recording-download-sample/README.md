## Call Recording Download Sample - Using Webhooks

For an overview on this Sample Application, watch this video.

## [Watch the Video: Using Webhooks with Webex Contact Center to download Call Recordings - DEMO]()

- This sample app hosts a simple POST /webhook endpoint that can be used to showcase and demo WebexCC's webhook capabilities for agent state changes (logging only) and Call recording Downloads.

- Note to make this work correctly, you must launch http://localhost once and login so that your access_token and refresh_token can be stored in memory.

- In production, you will need to build a simple scheduler service that does this every 10 hours. Refer to the sample application in the folder - token-manager-sample

- Please follow the original instructions as in the README.md of the parent (Root) Folder.

1. For the Call recording Downloader to work, please create a folder called 'recordings'

`Example of file system:`

```
├── .env
├── .gitignore
├── README.md
├── node_modules
├── package-lock.json
├── package.json
├── recordings
└── server.js
```

2. Download and Run ngrok on your localhost. This is a reverse Proxy that will help you test the webhooks.

   https://ngrok.com/

`./ngrok http 5000`

This will redirect port 5000 to 80 and 443 using HTTP and HTTPS reverse proxies.

3. Register your Webhook with WebexCC - using the POST /subscriptions endpoint.
   **Note:** During testing, you will register the ngrok address that is HTTPS URL generated. In production, you will register your production URL as the webhook.

4. When you run the app, you should receive events on your local.

## Support

For Support and Assistance, use the Cisco Developer Community Page:

Need Help? Visit the **[Webex Contact Center APIs Developer Community](https://community.cisco.com/t5/contact-center/bd-p/j-disc-dev-contact-center)**

Refer: **[How to Ask a Question or Initiate a Discussion](https://community.cisco.com/t5/contact-center/webex-contact-center-apis-developer-community-and-support/m-p/4558270)**
