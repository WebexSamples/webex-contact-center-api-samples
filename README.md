# Webex Contact Center API Samples

This basic set of samples helps a developer understand the all new Webex Contact Center APIs available today on the **[Webex Contact Center Developer Portal](https://developer.webex-cx.com/)**

## Getting Started

To get started, created an App on the Developer Portal:

- Sign into developer.webex-cx.com with a valid Webex Control Hub Account.
- Create an Application Integration by going to your Profile > Manage My Apps.
- Creating an Application Integration will give you a set of Client ID and Client Secret that you will need for this sample.
- Note: While entering the Redirect URI, ensure it has http://localhost:5000/auth/webex/callback for example.

## Using the API Samples

### Samples - Index

The API samples are divided into several folders. It would be great to follow the samples in the following order to understand more.

| #   | Folder Name                    | Comments                                                                                                                                                                                                                              | Links |
| --- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| 0   | postman-sample                 | Getting Started with the Webex Contact Center APIs and how to create a pair of Client ID or Client Secret for OAuth2 etc.                                                                                                             |       |
| 1   | app-auth-sample                | This is a sample application that shows you how to obtain an access token. It also has sample GET calls for Tasks, Agent Stats, Queue Stats, Users, Sites, etc.                                                                       |       |
| 2   | configuration-app-sample       | This is a sample frontend application that shows you how to use the Configuration APIs for EPs, Queues, Teams, and expose the capabilities on the front-end                                                                           |       |
| 3   | call-recording-download-sample | This is a sample application that shows you how to use Webhooks - the capture:created Webhook allows you to download a new call recording on the system, to a local file.                                                             |       |
| 4   | token-app-sample               | This is a sample application that shows you how to build a scheduler service that obtains a new access token every 10 hours from Webex and persist this onto your local datastore. The example uses a simple SQLite DB as an example. |       |
| 5   | graphql-sample                 | This is a sample application that has example calls for the new /search endpoint that is powered by GraphQL. One can formulate multiple request types that support the GraphQL syntax. Both Tasks and Agent Sessions are supported.   |       |