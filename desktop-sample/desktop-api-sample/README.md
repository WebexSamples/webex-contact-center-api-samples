## Webex Contact Center Agent Desktop REST APIs

This is a tutorial on the WebexCC Agent Desktop REST APIs, Call Control REST APIs and Websocket API for notifications.

These APIs are currently in early access and will be generally available soon.

The focus of sample is to show you how to use the attached Postman Collection for the REST APIs and Websocket APIs and also on how to build a custom application that leverages these APIs.

## Watch: [WebexCC Desktop REST APIs, Call Control APIs and Websocket notification API](https://app.vidcast.io/share/438b4efb-10e5-479f-afde-4d5f97462aa3)

> **Note:** This is a /video assumes you have WebexCC OAuth2 configured on Postman.
> We recommend watching the video @ **[Working with WebexCC OAuth2 on Postman](https://github.com/CiscoDevNet/webex-contact-center-api-samples/tree/main/postman-sample)** to know how to retrieve an Access Token for WebexCC REST APIs.

## Developer Documentation

**https://developer.webex-cx.com/documentation/getting-started**

## Getting Started

> **Disclaimer:** The code below is an early access version and does not gaurantee bug-free use. Several layers have been abstracted away so that you can understand how these REST APIs can be used to control the Desktop and Call Control actions.
> While using these APIs to build a production-grade desktop, please consider refactoring the code and including pub-sub mechanisms for event listeners to build a more robust, event-driven front-end application.

### Executing the sample

The sample code makes use of a few assumptions to show you the main section of desktop and call control.
Its designed to go through the OAuth process and during development a reverse proxy was used (e.g ngrok) to obtain a public URL.

**Step 0:**

- Build out your own webex App to get your own Client / Secret credentials for the OAuth Process. Follow the other samples to understand how to register and app and get your Client ID / Client Secret.
- Install/Run a reverse proxy (e.g ngrok) locally to obtain a public URL if needed.

**Step 1:**
Configure your environment

- Rename the file copy.env to .env (_basically remove the word "copy"_)
- Inside this project on your terminal type: `npm run dev`
- This should run the app on `http://localhost:3000`

**Step 2:**
Modify a few files (_description in files should help explain_):

- .env
- desktop.html
- startTokenProcess.js
- token.js

## Disclaimer

> These samples are meant to be used, as "samples", for demos, and to understand how to interact w
> ith the WebexCC APIs.
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
  - Initial Sample of the Desktop App and Postman collection.
    <!-- * See [commit change]() or See [release history]() -->
