## Token Service Sample

In this tutorial we create a Token Service for use with Webex Contact Center OAuth2 tokens that leverages a Google Cloud Function and Firebase Firestore database.

This sample project is similar in concept to the [token-app-sample](https://github.com/CiscoDevNet/webex-contact-center-api-samples/tree/main/token-app-sample) but is fully cloud hosted making it easier to call the API from WxCC flows, JDS, Webex Connect, and other Cloud Applications.

Be sure to also explore the [app-auth-sample](https://github.com/CiscoDevNet/webex-contact-center-api-samples/tree/main/app-auth-sample) for a better understanding of how the OAuth works with WxCC API.


## [Watch: Token Service setup video](https://app.vidcast.io/share/ed971770-49bb-47e5-96d0-7c920074fd53)


This sample covers deploying the code for the Google Cloud Function, setting up Firebase Firestore and configuring a Webex App for OAuth2, but is not a full Google Cloud tutorial.

The Token Service provides a simple API that returns a current access token for Webex Contact Center APIs. If the Access Token has less then 2 hours remaining or it is expired it is refreshed before returning a token.

Webex OAuth2 Access Tokens are valid up to 12 hours and Refresh Tokens are valid for up to 60 days. If a request in made while the Refresh Token is valid the token service will return a valid token. After the Refresh Token has expired, you will need to re-run step 6, below in the getting started to create new tokens.

## Pre-requisites

- Google Cloud Project
  - Check [Creating and managing Google Projects](https://cloud.google.com/resource-manager/docs/creating-managing-projects) for help
- Google Cloud & Firebase Consoles
  - [Google Cloud Console](http://console.cloud.google.com)
  - [Firebase Console](https://console.firebase.google.com)
- Webex user account with Contact Center Administrator license
  - [Webex CX Developer Portal](https://developer.webex-cx.com)
- Postman and a good code editor


## Getting Started

Watch the video above, for complete setup instructions. Pause the video while you complete each step.
1. Create a Google Cloud Function using the index.js and package.json files  
   - Set an enviroment variable TOKEN_PASSPHRASE on the function
2. Create a Firestore database and update the security rules using the firebase.rules file
3. Use Postman to initialize your Firestore database by calling the /init route
4. Create a Webex App OAuth integration  
   - Set the Redirect URI to the trigger (Step 1) + /callback
5. Copy your Client ID, Client Secret, and Redirect URL from Setp 5 into the Firestore database
   - Client ID and Client Secret comes from Step 4
   - The Redirect URL is the trigger (Step 1) + /callback
6. Open a browser and call the OAuth Authorization URL from Setp 5, edit the query param ***state*** and set it to your token name  
   - The query param is the ***state=set_state_here*** at the end of the URL, change ***set_state_here*** to your token name
7. Use Postman to test the token service

## API Requirements
To use the service, make a ***GET*** request to the http trigger of your Cloud Function. 
>When calling the endpoint you must add a ***query*** for the name of the token your are requesting at the end of your url  
>(E.g. ***?name=example-token***)

>Also in the ***header*** of the request you must set your secret token passphrase  
>(E.g. ***x-token-passphrase: random-passphrase***)

The token service will return on the following ***JSON*** results
>Success body JSON  
>
>{  
>  "status": "200",  
>  "token": "example-token-here"  
>}  

>Failed/error body JSON  
>
>{  
>  "status": "500",  
>  "message": "error-message-here"  
>}  

***Please Note***  
There is also a /init endpoint that creates a Firestore Collection named ***tokens*** and a Document named after the query ***name*** passed in.  This route should only be called when setting up the service and it will break the service if called while it is in production.

## Useful Links

**[Webex Contact Center for Developers](https://www.cisco.com/c/en/us/td/docs/voice_ip_comm/cust_contact/contact_center/webexcc/SetupandAdministrationGuide_2/b_mp-release-2/b_cc-release-2_chapter_011.html#topic_8230815F4023699032326F948C3F1495)**

## Disclaimer

> These samples are meant to be used, as "samples", for demos, and to understand how to interact with the WebexCC APIs.
> When building a production grade solution, please consider the overall architecture and design with a security first approach.
> Also, please consider how you would extend this app for multiple orgs, manage tokens for the orgs, etc.
> These samples are only meant to provide working, starter code and many layers have been simplified and abstracted away to focus on the Webex Contact Center use cases.

## Support

For Support and Assistance, use the Cisco Developer Community Page:

Need Help? Visit the **[Webex Contact Center APIs Developer Community](https://developer.webex-cx.com)**

Refer: **[How to Ask a Question or Initiate a Discussion](https://community.cisco.com/t5/contact-center/webex-contact-center-apis-developer-community-and-support/m-p/4558270)**

## Version History

- 1.0.0
  - Initial project commit