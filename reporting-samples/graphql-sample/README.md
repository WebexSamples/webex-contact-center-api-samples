# Getting started with the Search API using GraphQL

For a quick overview of the `/search` API and how to use our documentation, refer the video below:

## [Watch: Getting Started with the /search API](https://app.vidcast.io/share/c8c778c5-6659-4145-891a-bafcece29863)



## Introduction

A GraphQL API enables clients to construct queries in order retrieve data. The queries that can be constructed is defined by the API server in the form of a GraphQL schema, this acts a contract between the server and the client.

The schema defined by the `/search` API can be found in the "Try Out" section of the  [developer documentation.](**https://developer.webex-cx.com/documentation/search)  Depending the data required the API supports 3 types of queries :

    1) **taskDetails** - This is used for retrieving/analyzing Contact / Task related data.

    2) **agentSession** - This is used for retrieving/analyzing Agent related data.

    3) **taskLegDetails** - This is used for retrieving/analyzing data related to individual call-legs.



The `/search` API powers the Analyzer UX refresh and supports operations required for reporting  such as filtering of data,  aggregations and group bys. These operations will explained in detail in the following sections.



> [!TIP]

> For an introduction to GraphQL, refer : **[GraphQL - 101](https://graphql.org/learn/)**

### GraphQL query structure.

A typical GraphQL query defines 3 things - Query type, Query Parameters, Fields required.

Here is a sample quer 







## Support

For dedicated Developer Support on the APIs - Please open a ticket with the team using this link: **[Webex Contact Center Developer Support](https://developer.webex-cx.com/support)**

For discussions on the samples, feel free to participate in our Developer Community:

**[Webex Contact Center APIs Developer Community](https://community.cisco.com/t5/contact-center/bd-p/j-disc-dev-contact-center)**

Refer: **[How to Ask a Question or Initiate a Discussion](https://community.cisco.com/t5/contact-center/webex-contact-center-apis-developer-community-and-support/m-p/4558270)**

## Version History

- 0.0.1
  - Initial examples
- 1.0.0
  - Added wallboard-query-samples
- 2.0.0
  - Added several additional example calls
