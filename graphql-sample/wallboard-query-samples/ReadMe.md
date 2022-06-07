## Wallboard Query Samples

The following set of GraphQL samples show you a set of sample calls that can be drafted out to build a basic wallboard API.

### Objective

- Extract Data from Webex Contact Center using the GraphQL - /search API.
- Draft out customized queries on /search to fit the business wallboard use case.
- Understand how to retrieve realtime and historical data.

The following statistics are retrieved from Webex Contact Center.
Follow the table below to understand whether these are Real-time or Historical.

### Documentation

GraphQL Documentation & /search: **https://developer.webex-cx.com/documentation/search**

### Samples

| #   | Metric                                      | Type                   | API          | Link                                                                                                                                                               |
| --- | ------------------------------------------- | ---------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Call Count by Entry Point                   | Real-time              | POST /search | [View Sample](https://github.com/CiscoDevNet/webex-contact-center-api-samples/blob/main/graphql-sample/wallboard-query-samples/callCountByEntryPoint.graphql)      |
| 2   | Call Statistics by Queue                    | Real-time              | POST /search | [View Sample](https://github.com/CiscoDevNet/webex-contact-center-api-samples/blob/main/graphql-sample/wallboard-query-samples/callStatsByQueue.graphql)           |
| 3   | Call Counts by Teams                        | Real-time              | POST /search | [View Sample](https://github.com/CiscoDevNet/webex-contact-center-api-samples/blob/main/graphql-sample/wallboard-query-samples/callCountByTeam.graphql)            |
| 4   | Call Counts by Agents                       | Real-time              | POST /search | [View Sample](https://github.com/CiscoDevNet/)                                                                                                                     |
| 5   | Total Active Calls in the System            | Real-time              | POST /search | [View Sample](https://github.com/CiscoDevNet/)                                                                                                                     |
| 6   | Total Connected Calls in the System         | Real-time              | POST /search | [View Sample](https://github.com/CiscoDevNet/)                                                                                                                     |
| 7   | Total Queued Calls in the system (Realtime) | Real-time              | POST /search | [View Sample](https://github.com/CiscoDevNet/)                                                                                                                     |
| 8   | Total Logged in Agent Sessions              | Real-time              | POST /search | [View Sample](https://github.com/CiscoDevNet/webex-contact-center-api-samples/blob/main/graphql-sample/wallboard-query-samples/totalAgentSessionsRealTime.graphql) |
| 9   | Call Details for all Calls Today (Grid)     | Historical + Real-time | POST /search | [View Sample](https://github.com/CiscoDevNet/)                                                                                                                     |
