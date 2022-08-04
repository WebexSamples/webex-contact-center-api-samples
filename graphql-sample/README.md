# Getting started with the Search API using GraphQL

For a quick overview of the `/search` API and how to use our documentation, refer the video below:

## [Watch: Getting Started with the /search API](https://app.vidcast.io/share/c8c778c5-6659-4145-891a-bafcece29863)

For an introduction to GraphQL, refer : **[GraphQL - 101](https://graphql.org/learn/)**

This repository is oragnized into multiple files that you can paste directly into the section of the interactive editor on **[Webex Developer Portal - Search Tasks](https://developer.webex-cx.com/documentation/search/search-tasks)**

| #   | File Name                                                                                                                                               | Comments                                                                                                                                                                 |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | [simple.graphql](https://github.com/CiscoDevNet/webex-contact-center-api-samples/blob/main/graphql-sample/simple.graphql)                               | SIMPLE: Simply retrieve all task IDs.                                                                                                                                    |
| 2   | [basicFields.graphql](https://github.com/CiscoDevNet/webex-contact-center-api-samples/blob/main/graphql-sample/basicFields.graphql)                     | BASIC: Basic query to request for certain fields.                                                                                                                        |
| 3   | [advanced.graphql](https://github.com/CiscoDevNet/webex-contact-center-api-samples/blob/main/graphql-sample/advanced.graphql)                           | AGGREGATES/FORMULAS: Usage of filters, aggregates, pagination and custom fields.                                                                                         |
| 4   | [callback.graphql](https://github.com/CiscoDevNet/webex-contact-center-api-samples/blob/main/graphql-sample/callbackFilter.graphql)                     | FILTER: Get the Task details using CallBack filters and logical operators to match a condition.                                                                          |
| 5   | [realTimeQueuedTasks.graphql](https://github.com/CiscoDevNet/webex-contact-center-api-samples/blob/main/graphql-sample/realTimeQueuedTasks.graphql)     | FILTER: Fetch Real-time (Active) Queued Tasks on the System - using filters.                                                                                             |
| 6   | [lastAgentInteraction.graphql](https://github.com/CiscoDevNet/webex-contact-center-api-samples/blob/main/graphql-sample/lastAgentInteraction.graphql)   | LAST AGENT INTERACTIONS: Usage of filters, aggregates, pagination and custom fields to find when the customer called last in a 7 day window and who they reached.        |
| 7   | [interactionDetails.graphql](https://github.com/CiscoDevNet/webex-contact-center-api-samples/blob/main/graphql-sample/interactionDetails.graphql)       | INTERACTION DETAILS: Usage of filters, aggregates, pagination and custom fields to find out information about a specific interaction using INTERACTION ID/TaskID/CSR ID. |
| 8   | [totalCallsByAni.graphql](https://github.com/CiscoDevNet/webex-contact-center-api-samples/blob/main/graphql-sample/totalCallsByAni.graphql)             | Filter with Aggregates: Usage of filters with aggregations, for total calls made by a specific customer.                                                                 |
| 9   | [globalVariables.graphql](https://github.com/CiscoDevNet/webex-contact-center-api-samples/blob/main/graphql-sample/globalVariables.graphql)             | GLOBAL VARIABLES: Usage of the Global Variables field to extract a specific global variable or a combination of two global variables.                                    |
| 10  | [globalVariableFilter.graphql](https://github.com/CiscoDevNet/webex-contact-center-api-samples/blob/main/graphql-sample/globalVariableFilter.graphql)   | GLOBAL VARIABLES: Usage of the Global Variables as a FILTER to extract a specific tasks for a specific global variable.                                                  |
| 11  | [allContactFields.graphql](https://github.com/CiscoDevNet/webex-contact-center-api-samples/blob/main/graphql-sample/allContactFields.graphql)           | ALL FIELDS: Extracting all fields from the Contact Session Record = Task Details.                                                                                        |
| 12  | [allAgentSessionFields.graphql](https://github.com/CiscoDevNet/webex-contact-center-api-samples/blob/main/graphql-sample/allAgentSessionFields.graphql) | ALL FIELDS: Extracting all fields from the Agent Session Record = ASR Details.                                                                                           |

## Support

For Support and Assistance, use the Cisco Developer Community Page:

Need Help? Visit the **[Webex Contact Center APIs Developer Community](https://community.cisco.com/t5/contact-center/bd-p/j-disc-dev-contact-center)**

Refer: **[How to Ask a Question or Initiate a Discussion](https://community.cisco.com/t5/contact-center/webex-contact-center-apis-developer-community-and-support/m-p/4558270)**

## Version History

- 0.0.1
  - Initial examples
- 1.0.0
  - Added wallboard-query-samples
- 2.0.0
  - Added several additional example calls
