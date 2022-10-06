## Agent Desktop APIs

This is a tutorial on the Desktop APIs. Early access APIs. The focus of this video is to introduce these new APIs. These APIs will help you build a custom Agent Desktop.

Watch the video below.

## Watch [Agent Desktop APIs](https://app.vidcast.io/share/438b4efb-10e5-479f-afde-4d5f97462aa3)

> **Note:** This is a /video assumes you have oAuth configured on Postman.
> We recommend watching the videos @ **[Working with Postman](https://github.com/CiscoDevNet/webex-contact-center-api-samples/tree/main/postman-sample)**

## Developer Documentation

**https://developer.webex-cx.com/documentation/getting-started**

## Getting Started

> **Note:** The code below is first draft, v0.  
> You might encounter a few bugs if you decide to use it. The code will need to be refactored, as there are a few manually entered key/value pairs, not DRY, etc.. Eventually also re-designed with a Pub/Sub type of pattern.Please keep this in mind.  
> Thank you.

### Executing the sample

The sample code makes a good amount of assumptions.
Its designed to go through the oauth process and during development ngrok was used to obtain a public URL in order to properly redirect.

**Step 0:**

Again, making assumptions that you are able to complete these two aspects to run code locally.

- build out your own webex App to get your own Client / Secret credentials for the OAuth Process
- Install/Run ngrok locally

**Step 1:**

To use the existing sample code on your localhost.

- Rename the file copy.env to .env (_basically remove the word "copy"_)
- Inside this project on your terminal type: `npm run dev`
- This should run the app on your localhost:3000

**Step 2:**
Modify a few files (_description in files should help explain_):

- .env
- desktop.html
- startTokenProcess.js
- token.js.

## Disclaimer

> These samples are meant to be used, as "samples", for demos, and to understand how to interact w
> ith the WebexCC APIs.
> When building a production grade solution, please consider the overall architecture and design with a security first approach.
> Also, please consider how you would extend this app for multiple orgs, manage tokens for the orgs, etc.
> These samples are only meant to provide working, starter code and many layers have been simplified and abstracted away to focus on the Webex Contact Center use cases.

## Support

For Support and Assistance, use the Cisco Developer Community Page:

Need Help? Visit the **[Webex Contact Center APIs Developer Community](https://community.cisco.com/t5/contact-center/bd-p/j-disc-dev-contact-center)**

Refer: **[How to Ask a Question or Initiate a Discussion](https://community.cisco.com/t5/contact-center/webex-contact-center-apis-developer-community-and-support/m-p/4558270)**

## Version History

- 1.0.0
  - a few GET methods & updated readme
    <!-- * See [commit change]() or See [release history]() -->
    <!-- * See [commit change]() or See [release history]() -->
