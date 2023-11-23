# Getting started with the Search API using GraphQL

For a quick overview of the `/search` API and how to use our documentation, refer the video below:

## [Watch: Getting Started with the /search API](https://app.vidcast.io/share/c8c778c5-6659-4145-891a-bafcece29863)

## Introduction

A GraphQL API enables clients to construct queries in order retrieve data. The queries that can be constructed is defined by the API server in the form of a GraphQL schema, this acts a contract between the server and the client.

The schema defined by the `/search` API can be found in the "Try Out" section of the  [developer documentation.](**https://developer.webex-cx.com/documentation/search)  Depending the data required the API supports 3 types of queries :

    1) **taskDetails** - This is used for retrieving/analyzing Contact / Task related data.

    2) **agentSession** - This is used for retrieving/analyzing Agent related data.

    3) **taskLegDetails** - This is used for retrieving/analyzing data related to individual call-legs.

 `/search` API powers the Analyzer UX refresh and supports operations required for reporting  such as filtering of data,  aggregations and group bys. These operations will explained in detail in the following sections.

> For an introduction to GraphQL, refer : **[GraphQL - 101](https://graphql.org/learn/)**

### GraphQL query structure.

All the queries defined by the `/search` API has the same structure. Lets take a sample **taskDetails** query. 

```graphql
{
  taskDetails(from: 1688100591166, to: 1688169600000) {
    tasks {
      id
      createdTime
      lastAgent {
        id
      }
    }
  }
}

```



The query starts with defining the *query type* as **taskDetails**, this implies that the query will be operating over Tasks/Contact data.

Next we have the *[arguments](https://graphql.org/learn/schema/#arguments)* accepted by the query. The schema defined by the `/search` API defines `from` and `to` as mandatory arguments for all query types, both the arguments accept epoch timestamps and define the span of the query.



`from` defines the start of the query, in the given sample the query would search of Tasks that were **created after** 1685577600000 or *1 June 2023 00:00:00 GMT*.

`to` defines the end of the query, in the given sample the query would search for Tasks 

that were **created before** 1688169600000 or *1 July 2023 00:00:00 GMT*



After the arguments, the query defines the fields to be fetched, *[Fields](https://graphql.org/learn/queries/#fields)* can be of scalar types such as *String*, *Int*, *Float* etc. or can be an *Object*. In the sample query **tasks** object is defined 

















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
