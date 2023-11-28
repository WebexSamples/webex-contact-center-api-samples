# Getting started with the Search API using GraphQL

For a quick overview of the `/search` API and how to use our documentation, refer the video below:

## [Watch: Getting Started with the /search API](https://app.vidcast.io/share/c8c778c5-6659-4145-891a-bafcece29863)

## Developer Documentation

**https://developer.webex-cx.com/documentation/search**

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

## Filter
Filters can be specified either as the filter input parameter at the global level or within the aggregation. The syntax remains consistent for each type of query, whether it is for TaskDetails or agentSession.
The difference between filter and extFilter is that filter is used to filter CSR and ASR fields, whereas extFilter is used to filter AAR and CAR fields.
Different types of filter operations and the samples are given below.

##### filter on simple fields:
###### String Operators for filtering:

| operator | description                                                         |
|----------|---------------------------------------------------------------------|
|  equals        | Checks if two values are equal.                                     |
|    notequals      | Checks if two values are not equal.                                 |
|    match      | Checks if a value matches a specified pattern. |
|    contains      | Checks if a string contains a specific substring.                                                |

Fetch TaskDetails where contactReason is "sales" OR matches the regex "product.*" OR contains the string "fail"
```graphql
{
  taskDetails(
    from: 1617401436000
    to: 1619647836000
    filter: {
      and: [
        { channelType: { equals: telephony } }
        {
          or: [
            { status: { equals: "ended" } }
            { status: { equals: "created" } }
          ]
        }
      ]
    }
  ) {
    tasks {
      channelType
      id
      status
      channelType
      createdTime
    }
  }
}

```
###### Numerical(Long, Int, Float) Operators for filtering:

|  Operator   | description                    |
|-----|--------------------------------|
| equals    | exact match operation          |
|  notequals   | negate operation               |
|  gt   | Greater than operation         |
|   gte  | Greater than or equal operation |
|    lt | Less than operation            |
|    lte | Less than or equal operation                               |

##### Fetch TaskDetails where integerGlobalVariable named "intVar1" is greater than equal to 0 AND integerGlobalVariable named "intVar2" is less than 40
```graphql
{
  taskDetails(
    from: 1617401436000
    to: 1619647836000
    filter: {
      and: [
        {
          integerGlobalVariables: {
            name: { equals: "intVar1" }
            value: { gte: 0 }
          }
        }
        {
          integerGlobalVariables: {
            name: { equals: "intVar2" }
            value: { lt: 40 }
          }
        }
      ]
    }
  ) {
    tasks {
      id
      contactReason
      status
      integerGlobalVariables(name: "intVar1") {
        name
        value
      }
      int_var2: integerGlobalVariables(name: "intVar2") {
        name
        value
      }
    }
  }
}

```

|   Query Type/ Record    | Query                                                                           | Response                                                                              |
|-----|---------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| taskDetails query for CSR  using binary filter   | [link](taskDetails/Samples for Raw Data Fetching/binaryFilterOperators.graphql) | [link](taskDetails/Samples for Raw Data Fetching/binaryFilterOperators-response.json) |
| agentSession query for ASR  using binary filter  | [link](agentSession/Raw Data Fetching/binaryFilterOperation.graphql)            | [link](agentSession/Raw Data Fetching/binaryFilterOperation-response.json)            |


A sample query to fetch CSR records using binary filter can be found , the response for the same is .
A sample query to fetch ASR records using binary filter can be found , the response for the same is .

##### Filter using compund operators:

Compound filter includes 2 types of filters - AND , OR operations, each of them accepts a list of filter expressions.
Fetch taskDetails where channelType is telephony and status is either created or ended

```graphql
{
  taskDetails(
    from: 1617401436000
    to: 1619647836000
    filter: {
      and: [
        { channelType: { equals: telephony } }
        {
          or: [
            { status: { equals: "ended" } }
            { status: { equals: "created" } }
          ]
        }
      ]
    }
  ) {
    tasks {
      channelType
      id
      status
      channelType
      createdTime
    }
  }
}
```

| Query Type/ Record                                | Query                                                                           | Response                                                                              |
|---------------------------------------------------|---------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| taskDetails query for CSR using compound operator | [link](taskDetails/Samples for Raw Data Fetching/Filtering using compound operators.graphql) | [link](taskDetails/Samples for Raw Data Fetching/Filtering using compound operators-response.json) |
| agentSession query for ASR  using compound operator   | [link](agentSession/Raw Data Fetching/Filtering using compound operators.graphql)            | [link](agentSession/Raw Data Fetching/Filtering using compound operators-response.json)            |

##### Filtering  on complex objects:

 In GraphQL queries, filtering can be applied to complex or composite objects.
 For instance, consider the scenario where filtering is performed on the "subject" field within the "email" object, which is nested inside the "channelMetaData" field. 
 The structure of the query reflects this hierarchy, starting from the top-level field and traversing through subfields until reaching the leaf field. 
 The filter condition is specified using the operator and value for the targeted field.

Fetch TaskDetails where channelMetaData.email.subject is "sample subject"
```graphql
{
  taskDetails(
    from: 1617401436000
    to: 1619647836000
    filter: {
      and: [
        { channelType: { equals: email } }
        {
          channelMetaData: {
            email: { subject: { equals: "sample subject" } }
          }
        }
      ]
    }
  ) {
    tasks {
      id
      channelType
      channelMetaData {
        email {
          subject
        }
      }
    }
  }
}

```

| Query Type/ Record                        | Query                                                                               | Response                                                                                  |
|-------------------------------------------|-------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------|
| taskDetails,complex object query for CSR  | [link](taskDetails/Samples for Raw Data Fetching/Filtering on object types.graphql) | [link](taskDetails/Samples for Raw Data Fetching/Filtering on object types-response.json) |
| agentSession,complex object query for ASR | [link](agentSession/Raw Data Fetching/Filtering on object types.graphql)            | [link](agentSession/Raw Data Fetching/Filtering on object types-response.json)            |

### extFilter:

##### extFilter on simple fields:
All CAR fields specific filter fields such as, queues, sites, teams, contributors and entrypoints can be filtered using an extFilter. 
the operators supported are same as that of filter.

Filter Request for TaskDetails with CAR fields specific filters
| Query Type/ Record                                | Query                                                                           | Response                                                                              |
|---------------------------------------------------|---------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| taskDetails query for CAR  | [link](taskDetails/Samples for Raw Data Fetching/Filtering using extFilters.graphql) | [link](taskDetails/Samples for Raw Data Fetching/Filtering using extFilters-response.json) |

All fields which are inside nodes (i.e fields which can only be found in AARs) can be filtered by specifying an extFilter. For example as given in below query.

Filter Request for an AgentSession Query with activities / AAR specific filters
| Query Type/ Record                                | Query                                                                           | Response                                                                              |
|---------------------------------------------------|---------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| agentsession query for AAR  | [link](agentSession/Raw Data Fetching/FitleringOnextFilter.graphql) | [link](agentSession/Raw Data Fetching/FilteringOnextFilter-response.json) |

##### extFilter on Complex objects:
```graphql

    extFilter: {
      and: [
        {
          channelInfo: {
            activities: {
              nodes: {
                id: {
                  notequals: "6c62ee4a-bb95-4baa-9d4e-61530841cb41-telephony-1660643074113-available"
                }
              }
            }
          }
        }
        {
          channelInfo: {
            activities: {
              nodes: {
                duration: {
                  gt: 100
                }
              }
            }
          }
        }
      ]
    }
  ) 


```

Sample query to fetch CAR records can be found [here](taskDetails/Samples for Raw Data Fetching/extFilteringOnComplexObjects.graphql), the response for the same is [here](taskDetails/Samples for Raw Data Fetching/extFilteringOnComplexObjects-response.json).

Sample query to fetch AAR recrods can be found [here](agentSession/Raw Data Fetching/extFilteringOnComplexObject.graphql), the response for the same is [here](agentSession/Raw Data Fetching/extFilteringOnComplexObject-response.json).

##### extFilter using compund operators:

| Query Type/ Record                        | Query                                                                               | Response                                                                                  |
|-------------------------------------------|-------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------|
| taskDetails,complex object query for CAR  | [link](taskDetails/Samples for Raw Data Fetching/extFilteringOnComplexObjects.graphql) | [link](taskDetails/Samples for Raw Data Fetching/extFilteringOnComplexObjects-response.json) |
| agentSession,complex object query for AAR | [link](agentSession/Raw Data Fetching/extFilteringOnComplexObject.graphql)            | [link](agentSession/Raw Data Fetching/extFilteringOnComplexObject-response.json)            |
