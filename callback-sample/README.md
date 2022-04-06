## Webcallback API - Configure Callbacks from your website using Webex Contact Center

Here is a sample of using the Web Callback Task API, the overview using Postman as well as a sample NodeJS backend for your webpage, using a simple HTML/CSS form that can be rendered on any webpage.
The example uses a Javascript injector called Scripty to inject the Callback form into any website of your choice.

## [Watch Now: Webcallback API Overview and Demo](https://app.vidcast.io/share/b26ca3a0-309a-4244-8455-56306b302573)

## Getting Started

This app is assuming you already have done through the OAuth2 samples and have a Client ID and Client Secret to use the APIs. If you don't please go to [postman-sample](https://github.com/CiscoDevNet/webex-contact-center-api-samples/tree/main/postman-sample). For ease of use, this app only requires you to paste in your Bearer token.

In production, before actually deploying this you will still need to "maintain" API access via OAuth2 Access Tokens and Refresh Tokens. To understand how refresh tokens work, please refer the `token-app-sample`.

### Executing the Sample

How to run the app shown in the demo above:

- Step 1:

  - On the **server.js** file, line 89, please paste in your access token manually. You can do this by visiting the developer portal at developer.webex-cx.com and copying out your access token after Signing in.

- Step 2:

  - On the **server.js** file, line 12, add your own unique subdomain. ie: _myuniquecallback_

- Step 3:

  - Inside this project on your terminal type: `npm run local`
  - this should run the app on your localhost:5000 and well as give you a unique URL.

- Step 4:

  - Copy the unique URL to your clipboard.
  - On file **frontEndForm.js** paste in unique subdomain in line 9.

- Step 5:
  - Copy all the content of the file _**frontEndForm.js**_ into your Javascript Injector.

## Version History

- 1.0.0: Basic Webcallback API Sample
