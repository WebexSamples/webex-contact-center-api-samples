# Webex Contact Center API Samples

This basic set of samples helps a developer understand the all new Webex Contact Center APIs available today on the **[Webex Contact Center Developer Portal](https://developer.webex-cx.com/)**

`Scroll down to the Index to view the description of each of the samples`

## [Watch Now: Welcome to the Webex Contact Center API Samples](https://app.vidcast.io/share/861a3320-669c-4edb-b284-3c1300130583)

## Getting Started

To get started, create an App Integration on the Developer Portal:
( This will help you obtain your `Client ID` and `Client Secret` )

- Sign into developer.webex-cx.com with a valid Webex Control Hub Account.
- Create an Application Integration by going to your Profile > Manage My Apps.
- Creating an Application Integration will give you a set of Client ID and Client Secret that you will need for this sample.
- Note: While entering the Redirect URI, ensure it has the right URL. For example, for postman, it is : `https://oauth.pstmn.io/v1/callback`
- For your local app, it will be in the format: `http://localhost:{port}/{path}`

## Using the API Samples

### Samples - Index

The API samples are divided into several folders. It would be great to follow the samples in the following order. Each sample has a supporting ReadMe and/or a supporting video on how to get started.

| #   | Folder Name                     | Comments                                                                                                                                                                                                                                                                               | Link                                                                                                                                             |
| --- | ------------------------------  | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| 0   | postman-sample                  | Getting Started with the Webex Contact Center APIs and how to create a pair of Client ID or Client Secret for OAuth2 etc.                                                                                                                                                              | [Postman Sample](https://github.com/CiscoDevNet/webex-contact-center-api-samples/tree/main/postman-sample)                                       |
| 1   | app-auth-sample                 | This is a sample application that shows you how to obtain an access token. It also has sample GET calls for Tasks, Agent Stats, Queue Stats, Users, Sites, etc.                                                                                                                        | [OAuth2 Sample](https://github.com/CiscoDevNet/webex-contact-center-api-samples/tree/main/app-auth-sample)                                       |
| 2   | configuration-app-sample        | This is a sample frontend application that shows you how to use the Configuration APIs for EPs, Queues, Teams, and expose the capabilities on the front-end                                                                                                                            | [Configuration App Sample](https://github.com/CiscoDevNet/webex-contact-center-api-samples/tree/main/configuration-app-sample)                   |
| 3   | graphql-sample                  | This is a sample application that has example calls for the new /search endpoint that is powered by GraphQL. One can formulate multiple request types that support the GraphQL syntax. Both Tasks and Agent Sessions are supported.                                                    | [GraphQL /search API Sample](https://github.com/CiscoDevNet/webex-contact-center-api-samples/tree/main/graphql-sample)                           |
| 4   | configuration-extraction-sample | This is a sample application that has example rest API calls to extract and export CSV Webexcc configuration data.                                                                                                                                                                     | [introduction-to-apis Java](https://github.com/CiscoDevNet/webex-contact-center-api-samples/tree/main/configuration-extraction-sample)           |
| 5   | webhook-email-notify-sample     | This is a sample application that shows you how to use Webhooks and send an email notification using webhooks.                                                                                                                                                                         | [Webhook Sample with Email Notifications](https://github.com/CiscoDevNet/webex-contact-center-api-samples/tree/main/webhook-email-notify-sample) |
| 6   | call-recording-download-sample  | This is a sample application that shows you how to use Webhooks - the capture:created Webhook allows you to download a new call recording on the system, to a local file.                                                                                                              | [Call Recording Download Sample](https://github.com/CiscoDevNet/webex-contact-center-api-samples/tree/main/call-recording-download-sample)       |
| 7   | token-app-sample                | This is a sample application that shows you how to build a scheduler service that obtains a new access token every 10 hours from Webex and persist this onto your local datastore. The example uses a simple SQLite DB as an example.                                                  | [Token Management Service Sample](https://github.com/CiscoDevNet/webex-contact-center-api-samples/tree/main/token-app-sample)                    |
| 8   | callback-sample                 | This is a sample application that shows you how to build a front end Form to Leverage our brand new Webcallback API that injects a callback call into Webex Contact Center. The example uses a simple javaScript injection technique to inject the form in any webpage of your choice. | [Web Callback API Sample](https://github.com/CiscoDevNet/webex-contact-center-api-samples/tree/main/callback-sample)                             |
| 9   | widget-sample-101               | This is a sample web component widget that shows you how to build a web component widget from scratch. It also covers how you can read the Desktop STORE to retrieve information and pass these values into the widget via the layout.                                                 | [Web component Widget Sample & 101](https://github.com/CiscoDevNet/webex-contact-center-api-samples/tree/main/widget-sample-101)                 |

## Disclaimer

> These samples are meant to be used, as "samples", for demos, and to understand how to interact with the WebexCC APIs.
> When building a production grade solution, please consider the overall architecture and design with a security first approach.
> Also, please consider how you would extend this app for multiple orgs, manage tokens for the orgs, etc.
> These samples are only meant to provide working, starter code and many layers have been simplified and abstracted away to focus on the Webex Contact Center use cases.

## Support

For Support and Assistance, use the Cisco Developer Community Page:

Need Help? Visit the **[Webex Contact Center APIs Developer Community](https://community.cisco.com/t5/contact-center/bd-p/j-disc-dev-contact-center)**

Refer: **[How to Ask a Question or Initiate a Discussion](https://community.cisco.com/t5/contact-center/webex-contact-center-apis-developer-community-and-support/m-p/4558270)**
