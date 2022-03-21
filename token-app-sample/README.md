# Understanding Access Tokens and Refresh Tokens - Token Management Service Sample

This sample intends to explain the Access Token and Refresh Token flows

## [Watch: Getting Started with the /search API]()

For basics of the Webex Contact Center API, refer to the [WebexCC Postman tutorial](https://github.com/CiscoDevNet/webex-contact-center-api-samples/tree/main/postman-sample)

For an introduction to OAuth2, refer : **[OAuth2 - Specification](https://oauth.net/2/)**

#### Pre-Requisites:

- Node JS and NPM
- An IDE like VS Code or similar.

```
$ node -v
v14.16.1
$ npm -v
6.14.12
```

#### Steps:

- Ensure you have installed NodeJS and NPM
- Clone this Repository / Download it.
- Create a .env file in each of the folders with the settings of the environment variables required to initialize the environment variables. Your server.js will pick it up from the local .env file in the root folder.

`$ cat .env`

```
PORT=5000
CLIENT_ID=<your-client-id>
CLIENT_SECRET=<your-client-secret>
REDIRECT_URI=<your-redirect uri - ex: http://localhost:5000/auth/webex/callback>
ORG_ID=<your-org-id>
ACCESS_TOKEN=<your-access-token-from-postman>
REFRESH_TOKEN=<your-refresh-token-from-postman>
```

- Run `$ npm install`

- Run the App

`$ nodemon` OR `$ npm start`

- Go to http://localhost:5000 to fetch an access token
- Go to http://localhost:5000/tasks or http://localhost:5000/users to see the basic GET Tasks and GET Users examples.

Expand / extend the sample app(s) as required.

## Support

For Support and Assistance, use the Cisco Developer Community Page:

Need Help? Visit the **[Webex Contact Center APIs Developer Community](https://community.cisco.com/t5/contact-center/bd-p/j-disc-dev-contact-center)**

Refer: **[How to Ask a Question or Initiate a Discussion](https://community.cisco.com/t5/contact-center/webex-contact-center-apis-developer-community-and-support/m-p/4558270)**
