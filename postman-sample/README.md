## WebexCC APIs: Working with Postman

**Pre-requisites:**

- Download Postman Here: [https://www.postman.com/](https://www.postman.com/)
- Ensure you have access to the **[Developer Portal](https://developer.webex-cx.com/)**.
- Keep your Administrator UserID / Password handy for the developer portal login.

`Note: The following videos are independent. To start using the postman collection, watch the Video 2. "Working with the Postman Collection"`

## [1. Watch the Video: Getting Started with OAuth2 & Postman - The Basics](https://app.vidcast.io/share/e2fc878b-9294-4830-86a5-38c77fcc5093)

## [2. Watch the Video: Working with the Postman Collection & Token Refresh](https://app.vidcast.io/share/58109fbb-0339-4026-a87c-fefcdd8686d3)

- To import the postman collection, download the file : `New WebexCC OAuth2 APIs.postman_collection.json` attached to the repository.
- `Import` this file into postman to begin using the collection.
- Setup all the variables like the Authorization URLs, Client ID, Client Secret, and Redirect URIs as needed.

## IMPORTANT - Geo-URLs for Different Datacenters on Webex Contact Center

Please follow the matrix below to ensure you are using the right datacenter for both, the Developer Portal as well as the API Root Endpoint, when drafting your requests.

| #   | Datacenter Location (Country) | Developer Portal                                                   | API Root URL                                                       |
| --- | ----------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| 1   | US                            | [https://developer.webex-cx.com](https://developer.webex-cx.com)   | [https://api.wxcc-us1.cisco.com](https://api.wxcc-us1.cisco.com)   |
| 2   | UK                            | [https://devportal.wxcc-eu1.com](https://devportal.wxcc-eu1.com)   | [https://api.wxcc-eu1.cisco.com](https://api.wxcc-eu1.cisco.com)   |
| 3   | Germany                       | [https://devportal.wxcc-eu2.com](https://devportal.wxcc-eu2.com)   | [https://api.wxcc-eu2.cisco.com](https://api.wxcc-eu2.cisco.com)   |
| 4   | Australia                     | [https://devportal.wxcc-anz1.com](https://devportal.wxcc-anz1.com) | [https://api.wxcc-anz1.cisco.com](https://api.wxcc-anz1.cisco.com) |

## Specifics - Environment Variables

In the collection, the following variables need to be setup correctly.

`access_token` - {Copy and Paste this after OAuth2 flow completes}

`refresh_token` - {Copy and Paste this after OAuth2 flow completes}

`accessToken_url` - https://webexapis.com/v1/access_token

`grant_type` - {refresh_token}

`client_id` - {Your client ID}

`client_secret` - {Your Client Secret}

`auth_url` - https://webexapis.com/v1/authorize

`scope` - cjp:config cjp:config_read cjp:config_write

`org_id` - {Your org Id}

`startTimer` - This needs to be an epoch timestamp

`expires` - leave this blank, the script will auto-populate this value.

`datacenter` - One of us1,eu1,eu2,anz1 and so on.

## Support

For dedicated Developer Support on the APIs - Please open a ticket with the team using this link: **[Webex Contact Center Developer Support](https://developer.webex-cx.com/support)**

For discussions on the samples, feel free to participate in our Developer Community:

**[Webex Contact Center APIs Developer Community](https://community.cisco.com/t5/contact-center/bd-p/j-disc-dev-contact-center)**

Refer: **[How to Ask a Question or Initiate a Discussion](https://community.cisco.com/t5/contact-center/webex-contact-center-apis-developer-community-and-support/m-p/4558270)**

## Change Log

The following change log shows the version updates to the files and what enhacements were added:

| #   | Date       | File name                                          | Version | Comment                      |
| --- | ---------- | -------------------------------------------------- | ------- | ---------------------------- |
| 1   | March 2022 | New WebexCC OAuth2 APIs.postman_collection.json    | 0.0.1   | Initial Collection with GETs |
| 2   | May 2022   | New WebexCC OAuth2 APIs_v1.postman_collection.json | 1.0.0   | Updates to Collection        |
