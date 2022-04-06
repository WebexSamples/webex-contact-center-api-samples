## Configuration API - Callback

Simple example of using the Callback Task API, Postman example as well as NodeJS backend and a simple HTML/CSS form that can be rendered on any webpage using a Javascript injector.

## [Watch Now: Configuration Callback API Overview and Demo](https://app.vidcast.io/share/b26ca3a0-309a-4244-8455-56306b302573)

## Getting Started

This app is assuming you already have done through the Oauth samples. If you don't please go to [postman-sample app](https://github.com/CiscoDevNet/webex-contact-center-api-samples/tree/main/postman-sample). For ease this app just requires you to paste in your Bearer token.

### Executing program

How to run the app:

- Step 1:

  - On the **server.js** file, line 89, please paste in your access token.

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

- 1.0.0
