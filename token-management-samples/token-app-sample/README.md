# Understanding Access Tokens and Refresh Tokens - Token Management Service Sample

This sample intends to explain the Access Token and Refresh Token flows

## [WATCH: REFRESH Token Management and Calling WebexCC API from Flow Designer](https://app.vidcast.io/share/c5876929-2d94-40b6-96e5-ae541b42b413)

For basics of the Webex Contact Center API, refer to the [WebexCC Postman tutorial](https://github.com/CiscoDevNet/webex-contact-center-api-samples/tree/main/postman-sample)

For an introduction to OAuth2 and to understand Access tokens and Refresh tokens, refer : **[OAuth2 - Specification](https://oauth.net/2/)**

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

**Note** `There is a copy.env file that you can use as a template. Please rename that to .env and proceed`

```
PORT=5000
CLIENT_ID=<your-client-id-here>
CLIENT_SECRET=<your-client-secret-here>
REDIRECT_URI=http://localhost:5000/auth/webex/callback
ORG_ID=<your-org-id-here>
ACCESS_TOKEN=<your-access-token-here>
REFRESH_TOKEN=<your-refresh-token-here>
PASSPHRASE=<your-random-passphrase-here>
SOURCE_IP=127.0.0.1
FROM=admin@webexcc.com
```

- Run `$ npm install`

- Run the App

`$ nodemon` OR `$ npm start`

- In the console, you will see logs similar to the following indicating that the access token was successfully fetched.

```
Created new DB record: [{"id":1,"org_id":"---","cluster_id":"PF84","access_token":"---","expires_in":43199,"refresh_token":"---","refresh_token_expires_in":5086614,"token_type":"Bearer"},null]

Trying request with params: {"grant_type":"refresh_token","client_id":"---","client_secret":"---","refresh_token":"---"}

Storing in database: {"access_token":"---","expires_in":43199,"refresh_token":"---","refresh_token_expires_in":5086594,"token_type":"Bearer"}

Executing (default): SELECT `id`, `org_id`, `cluster_id`, `access_token`, `expires_in`, `refresh_token`, `refresh_token_expires_in`, `token_type`, `created_at` AS `createdAt`, `updated_at` AS `updatedAt` FROM `tokens` AS `tokens` WHERE `tokens`.`id` = 1;

Found existing token details in DB: {"id":1,"org_id":"---","cluster_id":"PF84","access_token":"---","expires_in":43199,"refresh_token":"---","refresh_token_expires_in":5086614,"token_type":"Bearer","createdAt":"2022-03-21T20:34:54.325Z","updatedAt":"2022-03-22T22:50:04.941Z"} updating with this data:-> {"access_token":"---","expires_in":43199,"refresh_token":"-----","refresh_token_expires_in":5086594,"token_type":"Bearer"}

Executing (default): INSERT INTO `tokens` (`id`,`org_id`,`cluster_id`,`access_token`,`expires_in`,`refresh_token`,`refresh_token_expires_in`,`token_type`,`created_at`,`updated_at`) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) ON CONFLICT (`id`) DO UPDATE SET `id`=EXCLUDED.`id`,`org_id`=EXCLUDED.`org_id`,`cluster_id`=EXCLUDED.`cluster_id`,`access_token`=EXCLUDED.`access_token`,`expires_in`=EXCLUDED.`expires_in`,`refresh_token`=EXCLUDED.`refresh_token`,`refresh_token_expires_in`=EXCLUDED.`refresh_token_expires_in`,`token_type`=EXCLUDED.`token_type`,`updated_at`=EXCLUDED.`updated_at`;

Created new DB record: [{"id":1,"org_id":"---","cluster_id":"PF84","access_token":"NmNmNjliZTgtMzA2NS00MmQyLThlYzItY2QwZjRkMmEzZGQzMTkyYzk3MzQtYmI0","expires_in":43199,"refresh_token":"---","refresh_token_expires_in":5086594,"token_type":"Bearer"},null]
```

Expand / extend the sample app(s) as required.

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

## Change Log

- 1.0.0
  - initial example
