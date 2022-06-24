## Webhooks - Understanding, Subscribing and configuring Webhooks for Webex Contact Center

The following example covers a simple webhook listening for a few events and action taken on those events is to send an email.
Watch the demo below to understand what this app does and how to set it up and extend on it.

## [Watch Now: Getting Started with WebexCC Webhooks and Configuring Email Notifications](https://app.vidcast.io/share/09d59095-c849-44e0-ac61-eb7bbb469473)

## Getting Started

This app is assuming you already have a Client ID and Secret. If you don't please go to [postman-sample app](https://github.com/CiscoDevNet/webex-contact-center-api-samples/tree/main/postman-sample) and obtain your Client ID and Client Secret.

### Executing sample

How to run the app:

- Step 1:

  - Rename the `copy.env` to `.env` and add your client Id, secret Id, redirect URI, etc...

- Step 2:

  - In the index.js file, **line 19**, add your own unique subdomain name. ie: `mywebhook12345`
  - This publicly generated URL will be needed for the webhook subscription.

- Step 3:

  - Inside this project on your terminal type: `npm install`

- Step 4:

  - Inside this project on your terminal type: `npm run local`
  - this should run the app on your localhost:5000 as well as your own public URL.

- Step 5:
  - From here on please watch the video that will help guide you along.

## Change Log

- 1.0.0
  - a few GET methods & updated readme
