## Call Recording Download Sample - Using Webhooks

> **Note:** The samples assumes that you understand Webhooks. To get a better understanding of how to use Webhooks, and subscribe to them, refer to the [Getting Started With Webex Contact Center Webhooks example](https://github.com/CiscoDevNet/webex-contact-center-api-samples/tree/main/webhook-email-notify-sample).

For an overview on this Sample Application, watch this video.

## [Watch the Video: Using Webhooks with Webex Contact Center to download Call Recordings - DEMO](https://app.vidcast.io/share/829d129e-935e-42cd-9f2b-4d018388baa3)

- This sample app hosts a simple POST /webhook endpoint that can be used to showcase and demo WebexCC's webhook capabilities for agent state changes (logging only) and Call recording Downloads.

- Note to make this work correctly, you must launch http://localhost once and login so that your access_token and refresh_token can be stored in memory.

- In production, you will need to build a simple scheduler service that does this every 10 hours. Refer to the sample application in the folder - token-manager-sample - **[Persisting Access Tokens - Token Management](https://github.com/CiscoDevNet/webex-contact-center-api-samples/tree/main/token-app-sample)**

- Please follow the original instructions as in the README.md of the parent (Root) Folder.

## Developer Documentation

REST API: https://developer.webex-cx.com/documentation/captures/v1/list-captures

Webhook: https://developer.webex-cx.com/documentation/captures/v1/capture-available

## Steps

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

## Disclaimer

> These samples are meant to be used, as "samples", for demos, and to understand how to interact with the WebexCC APIs.
> When building a production grade solution, please consider the overall architecture and design with a security first approach.
> Also, please consider how you would extend this app for multiple orgs, manage tokens for the orgs, etc.
> These samples are only meant to provide working, starter code and many layers have been simplified and abstracted away to focus on the Webex Contact Center use cases.

## Support

For dedicated Developer Support on the APIs - Please open a ticket with the team using this link: **[Webex Contact Center Developer Support](https://developer.webex-cx.com/support)**

For discussions on the samples, feel free to participate in our Developer Community:

**[Webex Contact Center APIs Developer Community](https://community.cisco.com/t5/contact-center/bd-p/j-disc-dev-contact-center)**

Refer: **[How to Ask a Question or Initiate a Discussion](https://community.cisco.com/t5/contact-center/webex-contact-center-apis-developer-community-and-support/m-p/4558270)**

## Version History

- 1.0.0
  - Basic Call Recording Downloader Sample
