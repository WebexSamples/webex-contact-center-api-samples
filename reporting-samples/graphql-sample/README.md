# Getting started with the Search API using GraphQL

For a quick overview of the `search` API and how to use our documentation, refer the video below:

## Watch Getting Started With the Search API

[Watch: Getting Started with the /search API](https://app.vidcast.io/share/c8c778c5-6659-4145-891a-bafcece29863)

## Introduction

A GraphQL API enables clients to construct queries to retrieve data. The queries are defined by the API server in the form of a GraphQL schema, which acts as a contract between the server and the client.

**Note:** For an introduction to GraphQL, refer : [GraphQL - 101](https://graphql.org/learn/)

The API allows access to the following:

1. Task related data stored as Customer Session Records (CSRs) and Customer Activity Records (CARs), accessible using the **taskDetails** graphql query.

2. Agent related data stored as Agent Session Records (ASRs) and Agent Activity Records (AARs), accessible using the **agentSession** graphql query.

3. Queue related data stored as Call Leg Records (CLRs), accessible using the **taskLegDetails** graphql query

Based on the operation, a query can be of two types:

1. **Query to fetch raw data:** fetching individual records stored, such as CSRs, ASRs, CARs, etc., with the ability to filter on data and apply pagination to get more records. In SQL terminology, this operation is analogous to

   `SELECT id, channelType FROM task WHERE channelType='telephony'`

   The structure of such a query is shown below

   ![Structure of query fetching raw data](https://s3.amazonaws.com/devportal.cms.devus1/Raw_query_sample_b6d475e5ae.png)

2. **Query to perform aggregations**: performing aggregation operations on record fields with support for group-bys, filtering, and pagination. In SQL terminology, the API is capable of the following queries:

   - `SELECT COUNT(id), MAX(totalDuration) FROM task`

   - `SELECT AVG(connectedDuration), AVG(totalDuration) FROM task  GROUP BY teamId, siteId`

   - `SELECT MAX(holdDuration) FROM task WHERE channelType='telephony' GROUP BY lastAgent.id`

   The structure of such a query can be found below

   ![Structure of a query performing aggregations](https://s3.amazonaws.com/devportal.cms.devus1/Aggregation_query_11ba02f950.png)

The following sections describe each query and supported operations in detail.

## Query Definitions

The following sections describe the query types supported in detail.

### TaskDetails Query

A taskDetails query operates over **CSR** and **CAR** records.

#### Sample Query

A sample query to fetch tasks created on 1st January 2023

```graphql
{
  taskDetails(
    from: 1672531200000 # 1st January 2023 00:00:00 UTC
    to: 1672617599000 # 1st January 2023 23:59:59 UTC
  ) {
    tasks {
      id # Scalar field
      isActive
      channelType
      createdTime
      endedTime
      lastAgent {
        # Object / Composite field
        id # Scalar field
      }
    }
  }
}
```

**Note:** Scalar fields are atomic and represent indivisible values, these are basic data types like Int, Long, String, Boolean, Float. Object fields are defined by the graphQL schema and contain other fields within them.Refer GraphQL documentation for [Scalar types](https://graphql.org/learn/schema/#scalar-types), [type system and objects](https://graphql.org/learn/schema/#object-types-and-fields)

#### GraphQL Schema

The GraphQL schema structure is defined as given below.

```graphql
taskDetails(
    from: Long!  # MANDATORY ARGUMENT
    to: Long!    # MANDATORY ARGUMENT
    timeComparator: QueryTimeType
    filter: TaskDetailsFilters
    extFilter: TaskDetailsSpecificFilters
    aggregations: [TaskV2Aggregation]
    aggregationInterval: IntervalData
    pagination: Pagination
): TaskDetailsList
```

#### Arguments

1. _from_ - Mandatory argument: accepts a _Long_ value representing the epoch timestamp, which defines the start of the query span. By default, the `createdTime` field is used for comparison, but this can be overridden to use `endedTime` by using the `timeComparator` argument.

2. _to_ - Mandatory argument: accepts a _Long_ value representing the epoch timestamp, which defines the end of the query span. By default, the `createdTime` field is used for comparison, but this can be overridden to use `endedTime` by using the `timeComparator` argument.

3. _timeComparator_ - Optional argument: accepts a value of the `QueryTimeType` type. This defines the field which `from` and `to` arguments use for retrieving documents. Accepted values are `createdTime` and `endedTime`.

4. _filter_ - Optional argument: accepts a _TaskDetailsFilters_ object. This is used to filter results based on a criteria defined on CSR fields. Refer to the [filtering section](#support-for-filtering-data) for more details.

5. _extFilter_ - Optional argument: accepts a _TaskDetailsSpecificFilters_ object. This is used to filter results based on a criteria defined on CAR fields. Refer to the [filtering section](#support-for-filtering-data) for more details.

6. _aggregations_ - Optional argument: accepts a List of `TaskV2Aggregation`. This is used to perform aggregations over data. Refer to the [aggregations section](#performing-aggregations) for more details.

7. _aggregationInterval_- Optional argument: accepts an `IntervalData` object. This is used when time-based aggregation needs to be performed. Refer to the [aggregations section](#interval-based-group-bys) for more details.

8. _pagination_ - Optional argument: accepts an object of `Pagination` object. This is used to perform pagination. Refer to the [pagination section](#pagination-support-1) for more details.

Some sample queries can be found below

| Usecase                                                                                                                                                 | Query / Record Type | Query                                                                                                                                                                                                 | Response                                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fetch isActive, id, createdTime, endedTime, totalDuration, lastAgent.id, queueCount and queueDuration attributes for tasks with pagination information. | CSR                 | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Samples%20for%20Raw%20Data%20Fetching/Simple%20query.graphql)          | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Samples%20for%20Raw%20Data%20Fetching/Simple%20query-response.json)          |
| Fetch id, channelType of task and the number of CARs, eventName, duration of CARs, along with pagination information                                    | CAR                 | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Samples%20for%20Raw%20Data%20Fetching/SimpleQueryForCARFields.graphql) | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Samples%20for%20Raw%20Data%20Fetching/SimpleQueryForCARFields-response.json) |

### AgentSession Query

An agentSession query operates over **ASR** and **AAR** records.

#### Sample Query

A sample query to fetch agentSessions created on 1st January 2023.

```graphql
{
  agentSession(
    from: 1672531200000 # 1st January 2023 00:00:00 UTC
    to: 1672617599000 # 1st January 2023 23:59:59 UTC
  ) {
    agentSessions {
      agentId # Scalar field
      teamId
      siteId
      startTime
      endTime
      channelInfo {
        # Object / Composite field
        channelId
        channelType # Scalar field
        totalDuration
        connectedDuration
      }
    }
  }
}
```

#### GraphQL schema

The GraphQL schema structure is defined as given below.

```graphql
agentSession(
    from: Long! # MANDATORY ARGUMENT
    to: Long!   # MANDATORY ARGUMENT
    filter: AgentSessionFilters
    extFilter: AgentSessionSpecificFilters
    aggregations: [AgentSessionV2Aggregation]
    aggregationInterval: IntervalData
    pagination: Pagination
): AgentSessions
```

#### Arguments

1. _from_ - Mandatory argument: accepts a _Long_ value representing epoch timestamp which defines the start of the query span, the `startTime` field is used for comparison.

2. _to_ - Mandatory argument: accepts a _Long_ value representing the epoch timestamp, which defines the end of the query span; the `startTime` field is used for comparison.

3. _filter_ - Optional argument: accepts an _AgentSessionFilters_ object. This is used to filter results based on user-defined criteria on ASR fields. Refer to the [filtering section](#support-for-filtering-data) for more details.

4. _extFilter_ - Optional argument: accepts an _AgentSessionSpecificFilters_ object. This is used to filter results based on user-defined criteria on AAR fields. Refer to the [filtering section](#support-for-filtering-data) for more details.

5. _aggregations_ - Optional argument: accepts a List of `AgentSessionV2Aggregation`, This is used to perform aggregations over data. Refer to the [aggregations section](#performing-aggregations) for more details.

6. _aggregationInterval_- Optional argument: accepts an `IntervalData` object. This is used when time-based aggregation needs to be performed. Refer to the [aggregations section](#interval-based-group-bys) for more details.

7. _pagination_ - Optional argument: accepts an object of `Pagination` object. This is used to perform pagination. Refer to the [pagination section](#pagination-support-1) for more details.

Sample query to fetch ASR fields can be found [here](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Raw%20Data%20Fetching/Simple%20query.graphql), the response for the same is [here](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Raw%20Data%20Fetching/Simple%20query-response.json).

| Usecase                                                                                                                            | Query / Record Type | Query                                                                                                                                                                                  | Response                                                                                                                                                                                     |
| ---------------------------------------------------------------------------------------------------------------------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fetch the agentSession details, agent details, team details, site details and channel details along with pagination information.   | ASR                 | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Raw%20Data%20Fetching/Simple%20query.graphql)          | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Raw%20Data%20Fetching/Simple%20query-response.json)          |
| Fetch the agentSession , agent details, team details, site details and channel details. For each channel also includes AAR details | AAR                 | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Raw%20Data%20Fetching/SimpleQueryForAARFields.graphql) | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Raw%20Data%20Fetching/SimpleQueryForAARFields-response.json) |

### TaskLegDetails Query

An taskLegDetails query operates over CLR data.

#### Sample Query

A sample query to fetch taskLegs for a particular task on 1st January 2023

```graphql
{
  taskLegDetails(
    from: 1672531200000 # 1st January 2023 00:00:00 UTC
    to: 1672617599000 # 1st January 2023 23:59:59 UTC
    filter: { taskId: { equals: "2d6ef583-4a57-40ec-83b4-390d14625e19" } }
  ) {
    taskLegs {
      id
      taskId
      queue {
        name
      }
      handleType
    }
  }
}
```

#### GraphQL schema

The GraphQL schema structure is defined as

```graphql
taskLegDetails(
    from: Long! # MANDATORY ARGUMENT
    to: Long!   # MANDATORY ARGUMENT
    timeComparator: QueryTimeType
    filter: TaskLegDetailsFilters
    aggregations: [TaskLegV2Aggregation]
    aggregationInterval: IntervalData
    pagination: Pagination
): TaskLegDetailsList
```

#### Arguments

1. _from_ - Mandatory argument: accepts a _Long_ value representing the epoch timestamp which defines the start of the query span, By default, the `createdTime` field is used for comparison, but this can be overridden to use `endedTime` by using the `timeComparator` argument.

2. _to_ - Mandatory argument: accepts a _Long_ value representing epoch timestamp which defines the end of the query span, By default, the `createdTime` field is used for comparison, but this can be overridden to use `endedTime` by using the `timeComparator` argument.

3. _timeComparator_ - Optional argument: accepts a value of `QueryTimeType` type. This defines the field  which `from` and `to` arguments use for retrieving documents. Accepted values are `createdTime` and `endedTime`.

4. _filter_ - Optional argument: accepts an _TaskLegDetailsFilters_ object. This is used to filter results based on user-defined criteria. Refer to the [filtering section](#support-for-filtering-data) for more details.

5. _aggregations_ - Optional argument: accepts a List of TaskLegV2Aggregation. This is used to perform aggregations over data. Refer to the [aggregations section](#performing-aggregations) for more details.

6. _aggregationInterval_- Optional argument: accepts an `IntervalData` object. This is used when time-based aggregation needs to be performed. Refer to the [aggregations section](#interval-based-group-bys) for more details.

7. _pagination_ - Optional argument: accepts an object of `Pagination` object. This is used to perform pagination. Refer to the [pagination section](#pagination-support-1) for more details.

| Usecase                                                                                                                                             | Query / Record Type | Query                                                                                                                                                                           | Response                                                                                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fetch id of the taskLeg, taskId, createdTime,  queue id, entrypoint id, number of successful consults, consult duration and pagination information. | CLR                 | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskLegDetails/Fetching%20Raw%20Data/Simple%20Query.graphql) | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskLegDetails/Fetching%20Raw%20Data/Simple%20Query-response.json) |

## Support for Filtering data

Filtering of data is supported using the `filter` and `extFilter` arguments. Filtering is supported in both operations, fetching raw data or performing aggregations; the syntax for defining the filter criteria remains the same.

The distinction between `filter` and `extFilter` is the type of fields they allow filtering on. In a _taskDetails_ query, `filter` is used for filtering data based on fields available in a CSR record, and `extFilter` is used for filtering data based on fields available in a CAR record. Similarly, in an _agentSession_ query, `filter` is used for filtering based on ASR fields and `extFilter` is used for filtering based on AAR fields. In a _taskLegDetails_ query, `extfilter` is **not** supported and `filter` can be used to filter data based on CLR fields.

The general formula or syntax for filtering is

```graphql
filter : {
    fieldName : { operator : value }
}
```

### Filtering based on Scalar fields

Based on the data type different filter operators are available

#### String Operators for filtering

The following operators are supported for _String_ fields

| Operator  | Description                                       |
| --------- | ------------------------------------------------- |
| equals    | Checks if two values are equal.                   |
| notequals | Checks if two values are not equal.               |
| match     | Checks if a value matches a specified pattern.    |
| contains  | Checks if a string contains a specific substring. |

Given below is a sample for filtering using _equals_ operator, _equals_ can be replaced with _notequals_.

```graphql
filter: {
    origin: { equals: "+12344565678" }
}
```

_match_ operator can be used filter based on a regex/pattern.

```graphql
filter: {
    origin: { match: "+12345678.+" }
}
```

_contains_ operator to filter on a substring match of a string field

```graphql
filter: {
    campaignName : { contains : "Sales"}
}
```

#### Numerical Operators for filtering

The following operators are supported for numerical fields

| Operator  | Description                     |
| --------- | ------------------------------- |
| equals    | Exact match operation           |
| notequals | Negate operation                |
| gt        | Greater than operation          |
| gte       | Greater than or equal operation |
| lt        | Less than operation             |
| lte       | Less than or equal operation    |

Using the compound operator `and` and numerical operators we can build range filter as given in below sample.

```graphql
filter: {
    and: [
        { totalDuration: { lte: 120000 } }
        { totalDuration: { gte: 60000 } }
    ]
}
```

| Usecase                                                                                                           | Query / Record Type  | Query                                                                                                                                                                                               | Response                                                                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fetch _telephony_ tasks which are marked *abandoned*.                                                             | taskDetails / CSR    | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Samples%20for%20Raw%20Data%20Fetching/binaryFilterOperators.graphql) | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Samples%20for%20Raw%20Data%20Fetching/binaryFilterOperators-response.json) |
| Fetch records for active sessions where channelType is not _telephony_ and teamName exists.                       | agentSession / ASR   | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Raw%20Data%20Fetching/binaryFilterOperation.graphql)                | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Raw%20Data%20Fetching/binaryFilterOperation-response.json)                |
| Fetch id of taskLeg, created time, queue id, agent/owner id, entrypoint id and ended time  for a particular task. | taskLegDetails / CLR | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskLegDetails/Fetching%20Raw%20Data/Simple%20Filtering.graphql)                 | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskLegDetails/Fetching%20Raw%20Data/Simple%20Filtering-response.json)                 |

#### Compound operators for filtering

Compound filters include 2 operators - `and` & `or` operator, these accept multiple filter criterion in the form of a list.

Fetch records where channelType is telephony and status is either created or ended

```graphql
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
```

Some sample queries using compound operators are given below.

| Usecase                                                                         | Query Type/ Record   | Query                                                                                                                                                                                                                  | Response                                                                                                                                                                                                                     |
| ------------------------------------------------------------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fetch _telephony_ tasks where totalDuration is between 30s and 60s.             | taskDetails / CSR    | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Samples%20for%20Raw%20Data%20Fetching/Filtering%20using%20compound%20operators.graphql) | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Samples%20for%20Raw%20Data%20Fetching/Filtering%20using%20compound%20operators-response.json) |
| Fetch records where agent session is active and channelType is _telephony_.     | agentSession / ASR   | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Raw%20Data%20Fetching/Filtering%20using%20compound%20operators.graphql)                | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Raw%20Data%20Fetching/Filtering%20using%20compound%20operators-response.json)                |
| Fetch id of taskLegs, queue ids and owner ids associated with a specific queue. | taskLegDetails / CLR | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskLegDetails/Fetching%20Raw%20Data/Filtering%20using%20compound%20operators.graphql)              | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskLegDetails/Fetching%20Raw%20Data/Filtering%20using%20compound%20operators-response.json)              |

### Filtering based on Composite objects

Filtering is only supported for scalar fields and not for objects; however, scalar fields inside objects can be filtered.

Consider a scenario where filtering is performed on the `subject` field within the `email` object, which is nested inside the top-level `channelMetaData` field. The structure of the query reflects this hierarchy, starting from the top-level field and traversing through subfields until reaching the leaf field.

```graphql
filter: {
    channelMetaData: {
        email: { subject: { equals: "sample subject" } }
    }
}
```

Since all the CAR and AAR fields are present in the `activities` object, filtering using `extFilter` also follows the same pattern, one such sample is given below

```graphql
extFilter : {
    activities : {
        nodes : {
            queueId : {equals : "40162355-72f4-4dc1-b710-2f8c94e5d14b"}
        }
    }
}
```

Some samples for filtering on object types are given below

| Usecase                                                                 | Query Type/ Record   | Query                                                                                                                                                                                                         | Response                                                                                                                                                                                                            |
| ----------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fetch tasks which are handled by a specific team.                       | taskDetails / CSR    | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Samples%20for%20Raw%20Data%20Fetching/Filtering%20on%20object%20types.graphql) | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Samples%20for%20Raw%20Data%20Fetching/Filtering%20on%20object%20types-response.json) |
| For a single interaction fetch the queues the contact is _parked_ into. | taskDetails / CAR    | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Samples%20for%20Raw%20Data%20Fetching/Filtering%20using%20extFilters.graphql)  | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Samples%20for%20Raw%20Data%20Fetching/Filtering%20using%20extFilters-response.json)  |
| Fetch ASR records where channelType is _telephony_.                     | agentSession / ASR   | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Raw%20Data%20Fetching/Filtering%20on%20object%20types.graphql)                | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Raw%20Data%20Fetching/Filtering%20on%20object%20types-response.json)                |
| Fetch AAR records where activity _state_ is _connected_.                | agentSession / AAR   | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Raw%20Data%20Fetching/FitleringOnextFilter.graphql)                           | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Raw%20Data%20Fetching/FilteringOnextFilter-response.json)                           |
| Fetch taskLegs associated with a specific queue and agents.             | taskLegDetails / CLR | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskLegDetails/Fetching%20Raw%20Data/Filtering%20on%20object%20types.graphql)              | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskLegDetails/Fetching%20Raw%20Data/Filtering%20on%20object%20types-response.json)              |

### Fields supported for filtering

Refer [data dictionary](#data-dictionary) for fields supporting filtering.

## Performing Aggregations

Any query with the `aggregations` argument is treated as an aggregation query; this argument accepts a list of objects.

Each object requires the following mandatory arguments :

1. _field_ - String, denotes the identifier or field name on which the aggregation needs to be done.
2. _name_ - String, identifier to determine the result of the aggregation operation.
3. _type_ - Enum, defines the aggregation operation; depending on the data type of the field specified, the following aggregations are supported.

| Type        | Description                                                     | Supported data types             |
| ----------- |-----------------------------------------------------------------| -------------------------------- |
| count       | Counts the occurrence of the field across documents.             | Int, Long, Float, String boolean |
| min         | Returns the minimum value of the field across documents.        | Int, Long, Float                 |
| max         | Returns the maximum value of the field across documents         | Int, Long, Float                 |
| sum         | Aggregates the value of the field across documents.             | Int, Long, Float                 |
| average     | Returns the average of the field across documents.              | Int, Long, Float                 |
| cardinality | Returns the count of unique value of the field across documents | Int, Long, Float, String boolean |

The following arguments are optional :

1. _filter_ - Denotes the filter criteria for documents for the particular aggregation.

2. _predicate_ - Applicable only for global variables, Refer to the [Global Variable section ](#performing-aggregations-on-global-variables)for more details.

Refer below for the syntax of `aggregations` argument.

```graphql
aggregations: [
  {
     field: "totalDuration"
     type: max
     name: "maxDurationTelephony"
  }
]
```

Sample queries to perform aggregations on various data types are given below.

| Usecase                                                                            | Query Type/ Record   | Query                                                                                                                                                                                     | Response                                                                                                                                                                                          |
| ---------------------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fetch the count of tasks and their average totalDuration                           | taskDetails / CSR    | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Performing%20Aggregations/Aggregation%20query.graphql)     | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Performing%20Aggregations/Aggregation%20query%20-response.json)    |
| Fetch number of unique  queues tasks were queued into.                             | taskDetails / CAR    | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Performing%20Aggregations/AggregationQueryForCAR.graphql)  | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Performing%20Aggregations/AggregationQueryForCAR-response.json)    |
| Fetch total connectedCount and average of connectedDuration across agent sessions. | agentSession / ASR   | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Performing%20Aggregations/Aggregation%20query.graphql)    | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Performing%20Aggregations/Aggregation%20query-response.json)      |
| Fetch count of unique ids and max duration of activities across sessions.          | agentSession / AAR   | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Performing%20Aggregations/AggregationQueryForAAR.graphql) | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Performing%20Aggregations/AggregationQueryForAAR-response.json)   |
| Fetch average queue duration and average ringing duration across taskLegs          | taskLegDetails / CLR | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskLegDetails/Performing%20Aggregations/Aggregation%20query.graphql)  | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskLegDetails/Performing%20Aggregations/Aggregation%20query%20-response.json) |

### Performing group by operation

To perform a group by operation, the fields required for group bys should be included in the requested fields. The below sample performs a group by on the **lastAgent.id** field.

```graphql
{
  taskDetails(
    from: 1617401436000
    to: 1619647836000
    aggregations: [
      {
        field: "totalDuration"
        type: max
        name: "maxDurationTelephony"
        filter: { channelType: { equals: telephony } }
      }
    ]
  ) {
    tasks {
      lastAgent {
        id # Group by on lastAgent.id
      }
      aggregation {
        name
        value
      }
    }
  }
}
```

Some sample queries to perform group by on various data types.

| Usecase                                                                                                                         | Query Type / Record  | Query                                                                                                                                                                                                     | Response                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| For each queue, fetch the number of contacts that were handled and its average queue duration.                                  | taskDetails / CSR    | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Performing%20Aggregations/Group%20by%20aggregation%20query.graphql)        | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Performing%20Aggregations/Group%20by%20aggregation%20query-response.json)           |
| For each site, agent and channelType, get the number of tasks handled and the average value of connected duration.              | taskDetails / CSR    | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Performing%20Aggregations/Group%20by%20multiple%20fields.graphql)          | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Performing%20Aggregations/Group%20by%20multiple%20fields%20-response.json)          |
| For each queue the tasks are queued into, get the average duration of parked activity.                                          | taskDetails / CAR    | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Performing%20Aggregations/GroupBySingleFieldsForCAR.graphql)               | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Performing%20Aggregations/GroupBySingleFieldsForCAR-response.json)                  |
| For each agent and queue, count the number of times the call was presented.                                                     | taskDetails / CAR    | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Performing%20Aggregations/GroupByMultipleFieldsForCAR.graphql)             | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Performing%20Aggregations/GroupByMultipleFieldsForCAR-response.json)                |
| For each channel type, find the total connected count, average connected duration, total idle count, and average idle duration. | agentSession / ASR   | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Performing%20Aggregations/Group%20by%20query.graphql)                     | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Performing%20Aggregations/Group%20by%20query-response.json)                        |
| For each team, site and channel type, compute the total connected count, average connected duration, and average idle duration. | agentSession / ASR   | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Performing%20Aggregations/Group%20by%20multiple%20fields%20query.graphql) | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Performing%20Aggregations/Group%20by%20multiple%20fields%20query%20-response.json) |
| Find the maximum duration of each agent activity.                                                                               | agentSession / AAR   | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Performing%20Aggregations/GroupBySingleFieldsQueryForAAR.graphql)         | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Performing%20Aggregations/GroupBySingleFieldsQueryForAAR-response.json)            |
| For each agent and activity state find the max of duration.                                                                     | agentSession / AAR   | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Performing%20Aggregations/GroupByMultipleFieldsQueryForAAR.graphql)       | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Performing%20Aggregations/GroupByMultipleFieldsQueryForAAR-response.json)          |
| Get count of consults, average queued duration and ringing duration for each queue                                              | taskLegDetails / CLR | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskLegDetails/Performing%20Aggregations/Aggregation%20with%20group%20bys.graphql)     | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskLegDetails/Performing%20Aggregations/Aggregation%20with%20group%20bys-response.json)        |
| Calculate the number of consult-transfers and blind-transfers done into the queue and entrypoint.                               | taskLegDetails / CLR | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskLegDetails/Performing%20Aggregations/Group%20bys%20multiple%20fields.graphql)      | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskLegDetails/Performing%20Aggregations/Group%20bys%20multiple%20fields%20-response.json)      |

#### Interval based group bys.

Aggregations can be grouped based on time intervals such as `DAILY` , `WEEKLY` etc. by adding the `intervalStartTime` as a requested field and using the `aggregationInterval` argument, which accepts two parameters.

- _interval_ - Mandatory argument: accepts an Enum, Based on the query span (i.e. difference of the values passed in `from` and `to`) the following values are supported.

| Query Span        |                            Supported intervals                             |
| :---------------- | :------------------------------------------------------------------------: |
| <= DAY            | `FIFTEEN_MINUTES`,`THIRTY_MINUTES`, `HOURLY`, `DAILY`, `WEEKLY`, `MONTHLY` |
| > DAY & <= 7 DAYS |          `THIRTY_MINUTES`, `HOURLY`, `DAILY`, `WEEKLY`, `MONTHLY`          |
| > 7 DAYS          |                        `DAILY`, `WEEKLY`, `MONTHLY`                        |

- timezone - Optional argument: accepts a String representing the timezone, using which the intervals should be formed; the default timezone used is `UTC`.

Refer the below sample syntax for the `aggregationInterval` argument.

```graphql
aggregationInterval : {
    interval : DAILY
    timezone : "America/New_York"
}
```

Sample queries to perform interval based aggregations.

| Usecase                                                                                                                                | Query Type/ Record   | Query                                                                                                                                                                                                                           | Response                                                                                                                                                                                                                              |
| -------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Get the number of tasks handled on a daily basis (based on Asia/Kolkata) for each channelType and site                                 | taskDetails / CSR    | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Performing%20Aggregations/Interval%20based%20timezone%20supported%20aggregation%20query.graphql) | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Performing%20Aggregations/Interval%20based%20timezone%20supported%20aggregation%20query-response.json) |
| Find the average duration of parked events on a daily basis for each queue.                                                            | taskDetails / CAR    | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Performing%20Aggregations/IntervalBasedTimezoneSupportedAggregationQueryForCAR.graphql)          | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Performing%20Aggregations/IntervalBasedTimezoneSupportedAggregationQueryForCAR-response.json)          |
| Fetch the total connected Count, average connected duration, total idle count, average of idleDuration on a daily basis for each team. | agentSession / ASR   | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Performing%20Aggregations/Interval%20timezone%20based%20aggregation%20query.graphql)            | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Performing%20Aggregations/Interval%20timezone%20based%20aggregation%20query-response.json)            |
| Fetch max ringing duration on daily basis.                                                                                             | agentSession / AAR   | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Performing%20Aggregations/IntervalTimezoneBasedAggregationQueryForAAR.graphql)                  | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Performing%20Aggregations/IntervalTimezoneBasedAggregationQueryForAAR-response.json)                  |
| For each queue get the number of calls queued and number of consults into the queue on a daily basis (based on Asia/Kolkata)           | taskLegDetails / CLR | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskLegDetails/Performing%20Aggregations/Interval%20timezone%20based%20aggregation%20query.graphql)          | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskLegDetails/Performing%20Aggregations/Interval%20timezone%20based%20aggregation%20query%20-%20response.json)    |

**Note:** The number of fields used for a group by operation in an aggregation query cannot exceed 10.

#### Pagination support

When using group bys, the data can be paginated to get more results, using the `pagination` argument. Refer to the [Pagination section](#pagination-support-1) for more details.

### Support for filtering within Aggregation

In an aggregation query, filters can be applied for all the aggregations or for individual aggregations, which are referred to as global filters and sub-filters respectively.

When filtering has to be applied to all aggregations, the top-level `filter` and extFilter arguments can be used. Refer to the [Filtering section](#support-for-filtering-data) for more details on the syntax and usage. Refer to the below general syntax for global filtering support.

```graphql
filter : {
    lastTeam : {
        name : {equals : "team1"}
    }
},
aggregations: [
    {
        field: "id"
        type: count
        name: "count of ids"
    },
    {
        field: "totalDuration"
        type: average
        name: "average of totalDuration"
    }
]
```

Sample queries to perform aggregations with filter criteria on various data types are given below.

| Usecase                                                                                                    | Query Type/ Record     | Query                                                                                                                                                                                                             | Response                                                                                                                                                                                                                |
|------------------------------------------------------------------------------------------------------------| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Get the number of tasks handled and their average total duration of tasks handled by the particular queue. | taskDetails / CSR      | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Performing%20Aggregations/Aggregation%20query%20with%20filters.graphql)            | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Performing%20Aggregations/Aggregation%20query%20with%20filters-response.json)            |
| Fetch the average duration of parked events for _telephony_ contacts.                                      | taskDetails / CAR      | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Performing%20Aggregations/AggregationQueryWithFiltersForCAR.graphql)               | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Performing%20Aggregations/AggregationQueryWithFiltersForCAR-response.json)               |
| Fetch the count of agents and teams for active sessions.                                                   | agentSession / ASR     | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Performing%20Aggregations/Aggregation%20global%20filter%20query.graphql)          | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Performing%20Aggregations/Aggregation%20global%20filter%20query-response.json)          |
| For a given agent, fetch the count of connected events across sessions.                                    | agentSession / AAR     | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Performing%20Aggregations/AggregationQueryWithGlobalFilterForAAR.graphql)         | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Performing%20Aggregations/AggregationQueryWithGlobalFilterForAAR-response.json)         |
| Get the count of abandoned callLegs                                                                        | taskLegDetails  /  CLR | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskLegDetails/Performing%20Aggregations/Aggregation%20query%20with%20Global%20Filter.graphql) | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskLegDetails/Performing%20Aggregations/Aggregation%20query%20with%20Global%20Filter-response.json) |

#### Aggregations with sub filters

Filtering can also be done for individual aggregation using the `filter` and `extfilter` argument in the aggregation object. Refer below general syntax for sub-filter support

```graphql
aggregations: [
  {
     field: "totalDuration"
     type: max
     name: "maxDurationTelephony"
     filter: { channelType: { equals: telephony } }
  }
]
```

Sample queries to perform aggregations with sub-filter criteria on various data types are given below.

| Usecase                                                                                                                        | Query Type/ Record    | Query                                                                                                                                                                                                        | Response                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------ | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Fetch the number of tasks handled by multiple queues.                                                                          | taskDetails / CSR     | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Performing%20Aggregations/Aggregation%20query%20with%20sub-filters.graphql)   | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Performing%20Aggregations/Aggregation%20query%20with%20sub-filters-response.json)   |
| Fetch the average duration customers are put on hold by specific agents                                                        | taskDetails / CAR     | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Performing%20Aggregations/AggregationQueryWithSubFiltersForCAR.graphql)       | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Performing%20Aggregations/AggregationQueryWithSubFiltersForCAR-response.json)       |
| Fetch the count of agents where 1)'channelType' is 'telephony' 2) 'channelType' is 'social' 3)idle agents 4) connected agents. | agentSession / ASR    | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Performing%20Aggregations/Aggregation%20sub-filter%20query.graphql)          | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Performing%20Aggregations/Aggregation%20sub-filter%20query-response.json)          |
| Find the count of connected and ringing events.                                                                                | agentSession / AAR    | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Performing%20Aggregations/AggregationQueryWithSubFilterForAAR.graphql)       | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Performing%20Aggregations/AggregationQueryWithSubFilterForAAR-response.json)       |
| Fetch the number of calls queued into specific queues.                                                                         | taskLegDetails  / CLR | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskLegDetails/Performing%20Aggregations/Aggregation%20query%20with%20sub-filter.graphql) | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskLegDetails/Performing%20Aggregations/Aggregation%20query%20with%20sub-filter-response.json) |

### Fields supported for aggregations

Refer [data dictionary](#data-dictionary) for fields supporting aggregation.

## Fetching Raw Data

Fields from individual records can also be fetched; this is referred to as fetching raw data. Any query without the `aggregations` argument is treated as a query to fetch raw data.

Based on the fields that are requested and the filter criteria specified in the query, the API will read data from the appropriate type of record and return the requested field for each record. **It is recommended to fetch fields belonging to the same type of record**. Refer to the data dictionary section for more details.

Sample taskDetails query to fetch _id_ field in a taskDetails query.

```graphql
{
  taskDetails(from: 1644859375000, to: 1671038575000) {
    tasks {
      id
    }
  }
}
```

**Note:** When fetching AAR and CAR data, the query span i.e. `from` and `to` cannot exceed more than 30 days

Samples for various data types are given below

| Usecase                                                                                                                                                                                                                                                                  | Query / Record Type  | Query                                                                                                                                                                                                 | Response                                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fetch isActive, id, createdTime, endedTime, totalDuration, lastAgent.id, queueCount and queueDuration attributes for tasks with pagination information.                                                                                                                  | taskDetails / CSR    | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Samples%20for%20Raw%20Data%20Fetching/Simple%20query.graphql)          | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Samples%20for%20Raw%20Data%20Fetching/Simple%20query-response.json)          |
| Fetch id, channelType of task and the number of CARs, eventName, duration of CARs, along with pagination information                                                                                                                                                     | taskDetails / CAR    | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Samples%20for%20Raw%20Data%20Fetching/SimpleQueryForCARFields.graphql) | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Samples%20for%20Raw%20Data%20Fetching/SimpleQueryForCARFields-response.json) |
| Fetch the agentSessionId, agentId, teamId, siteId, agentSession startTime, endTime, isActive and channelInfo fields such as channelId, channelType and few metrics along with pagination information.                                                                    | agentSession / ASR   | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Raw%20Data%20Fetching/Simple%20query.graphql)                         | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Raw%20Data%20Fetching/Simple%20query-response.json)                         |
| Fetch the agentSession Id, agent Id, team Id, site Id, agentSession's startTime, endTime, isActive and channel level details such as channelId, channelType. For each channel also includes the AAR with id, startTime, endtime, state fields and pagination information | agentSession / AAR   | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Raw%20Data%20Fetching/SimpleQueryForAARFields.graphql)                | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Raw%20Data%20Fetching/SimpleQueryForAARFields-response.json)                |
| Fetch id of the taskLeg, taskId, createdTime, queue id, entrypoint id, number of successful consults, consult duration and pagination information                                                                                                                        | taskLegDetails / CLR | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskLegDetails/Fetching%20Raw%20Data/Simple%20Query.graphql)                       | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskLegDetails/Fetching%20Raw%20Data/Simple%20Query-response.json)                       |

### Filtering data

To fetch data matching a filter criteria, the `filter` and `extFilter` arguments can be used. Refer [section on filtering](#support-for-filtering-data) for details

### Sorting Support

When fetching raw data, the data can be sorted in ascending or descending order. Fields supporting sorting accept a `sort` argument where the sorting criteria can be specified as
`asc` for ascending and `desc` for descending. The below sample sorts data in ascending order of "createdTime" field.

```graphql
{
  taskDetails(from: 1644859375000, to: 1671038575000) {
    tasks {
      id
      createdTime(sort: asc)
    }
  }
}
```

Refer to the [data dictionary](#data-dictionary) for fields supporting sorting.
Sample queries to fetch data with sorting are given below.

| Usecase                                                                                                                                                                 | Query Type/ Record   | Query                                                                                                                                                                                                                    | Response                                                                                                                                                                                                                       |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Fetch id, createdTime and endedTime for tasks sorted based on ascending order of createdTime field                                                                      | taskDetails / CSR    | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/blob/main/reporting-samples/graphql-sample/taskDetails/Samples%20for%20Raw%20Data%20Fetching/Sorting%20results%20based%20on%20a%20field.graphql) | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/blob/main/reporting-samples/graphql-sample/taskDetails/Samples%20for%20Raw%20Data%20Fetching/Sorting%20results%20based%20on%20a%20field-response.json) |
| For a specific task, fetch id, channelType and count of activities, also fetch the id and created time for each activity sorted based on ascending order of createdTime | taskDetails / CAR    | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/blob/main/reporting-samples/graphql-sample/taskDetails/Samples%20for%20Raw%20Data%20Fetching/SortingQueryForCAR.graphql)                         | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/blob/main/reporting-samples/graphql-sample/taskDetails/Samples%20for%20Raw%20Data%20Fetching/SortingQueryForCAR.json)                                  |
| Fetch id of the taskLeg, taskId, channelType and createdTime based on ascending order of createdTime field                                                              | taskLegDetails / CLR | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/blob/main/reporting-samples/graphql-sample/taskLegDetails/Fetching%20Raw%20Data/Sorting%20samples%20based%20on%20a%20field.graphql)              | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/blob/main/reporting-samples/graphql-sample/taskLegDetails/Fetching%20Raw%20Data/Sorting%20samples%20based%20on%20a%20field-response.json)              |

### Pagination support for fetching raw data

Pagination is supported for raw queries, Refer [section on pagination](#pagination-support-1) for details

## Pagination Support

The `search` API supports pagination for both operations: performing aggregations and fetching raw data. The page size/ number of records returned by the query is fixed. Clients can fetch the next set of records using the `hasNextPage` and the `endCursor` fields in the response.

```graphql
{
  taskDetails(from: 1690964812000, to: 1691224012000) {
    tasks {
      id
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

`hasNextPage` is a boolean field that determines if more data exists for the given query. If the `hasNextPage` value is `true,` clients can fetch the value of the `endCursor` field, which is a string and acts as an identifier for the next page. `endCursor` value is passed in the subsequent query to fetch the next set of records.

The `pagination` argument accepts the `cursor` input parameter, which accepts the `endCursor` value and fetches the next page. A sample is given below.

```graphql
{
  taskDetails(
    from: 1690964812000
    to: 1691224012000
    pagination: { cursor: "<VALUE-OF-endCursor-FROM-PREVIOUS-QUERY" }
  ) {
    tasks {
      id
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

The page size of a query depends on the query type and the operations, these are given below.

| Operation         | Query Type     | Page Size | Total  number of Records that can be fetched with pagination |
| ----------------- | -------------- | --------- | ------------------------------------------------------------ |
| Fetch raw data    | taskDetails    | 250       | 100000                                                       |
| Fetch raw data    | agentSession   | 250       | No Limit                                                     |
| Fetch raw data    | taskLegDetails | 500       | 100000                                                       |
| Aggregation query | taskDetails    | 1000      | No Limit                                                     |
| Aggregation query | agentSession   | 1000      | No Limit                                                     |
| Aggregation query | taskLegDetails | 1000      | No Limit                                                     |

**Note:** In order to fetch the first page, the `pagination` argument can either be omitted or the `cursor` value can be set to **NA**.

Sample queries demonstrating pagination when fetching raw data are given below.

| Usecase                                              | Query Type/ Record   | Query                                                                                                                                                                                                | Response                                                                                                                                                                                                      |
| ---------------------------------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fetch the first page of records with ASR attributes. | agentSession / ASR   | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Raw%20Data%20Fetching/Pagination%20.graphql)                         | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/blob/main/reporting-samples/graphql-sample/agentSession/Raw%20Data%20Fetching/Pagination%20-response.json)                            |
| Fetch the next page of data.                         | agentSession / ASR   | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Raw%20Data%20Fetching/Pagination%202.graphql)                        | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/blob/main/reporting-samples/graphql-sample/agentSession/Raw%20Data%20Fetching/Pagination%202-response.json)                           |
| Fetch the next & the last page.                      | agentSession / ASR   | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Raw%20Data%20Fetching/Pagination%203.graphql)                        | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Raw%20Data%20Fetching/Pagination%203-response.json)                           |
| Fetch the first page of records with CSR attributes  | taskDetails /  CSR   | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Samples%20for%20Raw%20Data%20Fetching/Pagination%20query.graphql)     | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/blob/main/reporting-samples/graphql-sample/taskDetails%2FSamples%20for%20Raw%20Data%20Fetching%2FPagination%20query%20-response.json) |
| Fetch the next page of data                          | taskDetails  / CSR   | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Samples%20for%20Raw%20Data%20Fetching/Pagination%20query%202.graphql) | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Samples%20for%20Raw%20Data%20Fetching/Pagination%20query%202-response.json)    |
| Fetch the next & the last page                       | taskDetails / CSR    | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Samples%20for%20Raw%20Data%20Fetching/Pagination%20query%203.graphql) | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Samples%20for%20Raw%20Data%20Fetching/Pagination%20query%203-response.json)    |
| Fetch the first page of records with CLR attributes  | taskLegDetails / CLR | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskLegDetails/Fetching%20Raw%20Data/Pagination.graphql)                          | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/blob/main/reporting-samples/graphql-sample/taskLegDetails/Fetching%20Raw%20Data/Pagination%20-response.json)                          |
| Fetch the next page of data                          | taskLegDetails / CLR | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskLegDetails/Fetching%20Raw%20Data/Pagination%202.graphql)                      | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/blob/main/reporting-samples/graphql-sample/taskLegDetails/Fetching%20Raw%20Data/Pagination%202%20-%20response.json)                   |

### Inner Pagination / Paginating CAR and AAR records

Both CAR and AAR records are exposed within the `activities.nodes` field, which provides a list of records. To fetch more CAR and AAR records, inner pagination can be used; this enables pagination within the records instead of paginating the records themselves.

To fetch more records within `activities.nodes` , the cursor can be retrieved from the `activities.pageInfo` field, which contains the `endCursor` and `hasNextPage` fields. This cursor value can be passed into the `after` argument.

The `activities` field supports the following two arguments to support inner pagination

1. _first_ - Accepts an Int value which determines the number of records to be fetched. By default, the value is set to **25** and the maximum supported value is **100**.

2. _after_ - Accepts a String value which determines the next page to be fetched.

**Note:** The total count of records can be read using the `activities.totalCount` field.

**Note:** Since inner pagination enables record level pagination, the cursor value retrieved from a record is not applicable for other records, hence it is highly recommended to use a `filter` to exclude the other records.

A sample query to fetch next **5** CAR records for task id **9bd2d70a-3438-4784-b9fd-83e263538393** after the cursor value of **1697205941011** is shown below

```graphql
{
  taskDetails(
    from: 1696118400000
    to: 1697328000000
    filter: { id: { equals: "9bd2d70a-3438-4784-b9fd-83e263538393" } }
  ) {
    tasks {
      id
      activities(first: 5, after: "1697205941011") {
        totalCount
        nodes {
          id
          eventName
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
}
```

Sample queries for inner pagination of CAR and AAR are given below.

| Usecase                                                           | Query / Record Type | Query                                                                                                                                                                                         | Response                                                                                                                                                                                            |
| ----------------------------------------------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| For a task fetch the next 2 CAR records after a given cursor      | taskDetails / CAR   | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Samples%20for%20Raw%20Data%20Fetching/innerPagination.graphql) | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/blob/main/reporting-samples/graphql-sample/taskDetails/Samples%20for%20Raw%20Data%20Fetching/innerPagination-response.json) |
| For a channelId fetch the next 3 AAR records after a given cursor | agentSession / AAR  | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Raw%20Data%20Fetching/innerPagination.graphql)                | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Raw%20Data%20Fetching/innerPagination-response.json)                |

### Pagination Support for Aggregation with Group Bys

In case of aggregation queries involving group bys, pagination can be done to fetch more records. Sample queries are given below.

| Usecase                                                                                                                                                                     | Query Type/ Record   | Query                                                                                                                                                                                                                 | Response                                                                                                                                                                                                                          |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Get the number of contacts handled on a daily basis per agent, team, site, queue & entrypoint for each channel.                                                             | taskDetails / CSR    | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Performing%20Aggregations/Aggregation%20pagination%20query.graphql)                    | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Performing%20Aggregations/Aggregation%20pagination%20query%20-response.json)                       |
| Get the next page of records for the above query.                                                                                                                           | taskDetails / CSR    | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Performing%20Aggregations/Aggregation%20pagination%20query%202.graphql)                | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Performing%20Aggregations/Aggregation%20pagination%20query%202-response.json)                      |
| Get the count of "connected" or "ctq-accepted" activities on a daily basis per agent, team, site, queue & entrypoint                                                        | taskDetails / CAR    | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Performing%20Aggregations/AggregationQueryWithPaginationForCAR.graphql)                | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Performing%20Aggregations/AggregationQueryWithPaginationForCAR-response.json)                      |
| Get the next page of records for the above query.                                                                                                                           | taskDetails / CAR    | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Performing%20Aggregations/AggregationQueryWithPaginationForCAR2.graphql)               | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Performing%20Aggregations/AggregationQueryWithPaginationForCAR2.json)                              |
| Fetch the total connected count, average connectedDuration,total idleCount, average idleDuration.                                                                           | agentSession / ASR   | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Performing%20Aggregations/Aggregation%20Pagination.graphql)                           | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Performing%20Aggregations/Aggregation%20Pagination%20-response.json)                              |
| Get the next page of records for the above query.                                                                                                                           | agentSession / ASR   | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Performing%20Aggregations/Aggregation%20Pagination%202.graphql)                       | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Performing%20Aggregations/Aggregation%20Pagination%202-response.json)                             |
| Find the max duration for each agent,team,site and state.                                                                                                                   | agentSession / AAR   | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Performing%20Aggregations/AggregationPaginationQueryForAAR.graphql)                   | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Performing%20Aggregations/AggregationPaginationQueryForAAR-response.json)                         |
| Get the next page of records for the above query.                                                                                                                           | agentSession / AAR   | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Performing%20Aggregations/AggregationPaginationQueryForAAR2.graphql)                  | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/agentSession/Performing%20Aggregations/AggregationPaginationQueryForAAR2-response.json)                        |
| Get average of queue duration, ringing duration, connected duration and self-service duration  on a daily basis per agent, team, site, queue & entrypoint for each channel. | taskLegDetails / CLR | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskLegDetails/Performing%20Aggregations/Group%20by%20Aggregation%20with%20Pagination.graphql)     | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskLegDetails/Performing%20Aggregations/Group%20by%20Aggregation%20with%20Pagination%20-%20response.json)     |
| Get the next page for the above query.                                                                                                                                      | taskLegDetails / CLR | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskLegDetails/Performing%20Aggregations/Group%20by%20Aggregation%20with%20Pagination%202.graphql) | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/blob/main/reporting-samples/graphql-sample/taskLegDetails/Performing%20Aggregations/Group%20by%20Aggregation%20with%20Pagination%202%20-%20response.json) |

## Global Variables Support

[Global variables](https://portal-v2.wxcc-us1.cisco.com/ccone-help-new/webexcc_t_add-global-variable.html#!wcc_c_global-variables.html) are exposed as part of the TaskDetails and TaskLegDetails queries. Depending on the data type of the variable, the following 5 types of global variables are stored and can be fetched:

1. stringGlobalVariables

2. booleanGlobalVariables

3. integerGlobalVariables

4. doubleGlobalVariables

5. longGlobalVariables

To fetch the global variable data, pass the name of the global in the argument
Eg: To get data of the Global Variable of String Type with name as GlobalVariable1

```graphql
# 'name' argument is mandatory.
#  This block will fetch name and value for the stringGlobalVariable named 'GlobalVariable1'
stringGlobalVariables(name: "GlobalVariable1") {
    name
    value
}
```

Multiple global variables of the same type can be fetched using [aliasing](https://graphql.org/learn/queries/#aliases):

```graphql
# To fetch multiple global variables use aliasing - https://graphql.org/learn/queries/#aliases
GV1: stringGlobalVariables(name: "GV1") {
    name
    value
}
GV59: stringGlobalVariables(name: "GV59") {
    name
    value
}
```

Some sample queries on globalVariables for taskDetails and taskLegDetails

| Usecase                                                      | Query / Record Type  | Query                                                                                                                                                                                       | Response                                                                                                                                                                                          |
| ------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fetch value of integer, string and boolean global variables. | taskDetails / CSR    | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Global%20Variables/Fetching%20global%20variables.graphql)    | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Global%20Variables/Fetching%20global%20variables-response.json)    |
| Fetch value of integer, string and boolean global variables. | taskLegDetails / CLR | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskLegDetails/Global%20Variables/Fetching%20global%20variables.graphql) | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskLegDetails/Global%20Variables/Fetching%20global%20variables-response.json) |

### Filtering based on global variables

Filtering on global variables is supported by passing the global variable name in the `name` argument and values to be filtered in the `value` argument.
Eg: Fetch the records Global Variable (GV1) of string with value ABC123

```graphql
{
    stringGlobalVariables: {
        name: { equals: "GV1" }
        value: { equals: "ABC123" }
    }
}
```

Eg: Fetch the records Global Variable (GV2) of integer type greater than 100

```graphql
{
    integerGlobalVariables: {
        name: { equals: "GV2" }
        value: { gt: 100 }
    }
}
```

Refer [section on filtering](#support-for-filtering-data) for different operators supported.

Some sample queries on global variables with filtering for taskDetails and taskLegDetails

| Usecase                                                                      | Query / Record Type  | Query                                                                                                                                                                                                     | Response                                                                                                                                                                                                        |
| ---------------------------------------------------------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Filter tasks based on a condition on string and integer global variables.    | taskDetails / CSR    | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Global%20Variables/Filter%20based%20on%20global%20variables.graphql)       | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Global%20Variables/Filter%20based%20on%20global%20variables-response.json)       |
| Filter taskLegs based on a condition on string and integer global variables. | taskLegDetails / CLR | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskLegDetails/Global%20Variables/Filtering%20based%20on%20global%20variables.graphql) | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskLegDetails/Global%20Variables/Filtering%20based%20on%20global%20variables-response.json) |

### Performing Aggregations on global variables

For performing aggregation on global variables we need to use the `predicate` argument in the `aggregations` object
Eg: Sum of all values of integer global variable named `GV2` .

```graphql
 {
    field: "integerGlobalVariables.value"
    name: "Sum of GV2"
    type: sum
    # Predicate is used to define which global variable needs to be considered for the operation.
    predicate: { integerGlobalVariables: { name: { equals: "GV2" } } }
}
```

Eg: Fetch unique value of a string global variable named `GV1`.

```graphql
 {
    field: "stringGlobalVariables.value"
    name: "Unique of GV1"
    type: cardinality
    # Predicate is used to define which global variable needs to be considered for the operation.
    predicate: { stringGlobalVariables: { name: { equals: "GV1" } } }
}
```

Refer [section on aggregation](#performing-aggregations) for more details on aggregation types.

Some sample aggregations on globalVariables for taskDetails and taskLegDetails

| Usecase                                                          | Query / Record Type  | Query                                                                                                                                                                                               | Response                                                                                                                                                                                                  |
| ---------------------------------------------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Calculate sum of integer global variable named "GV2" across CSRs | taskDetails / CSR    | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Global%20Variables/Aggregation%20on%20global%20variables.graphql)    | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Global%20Variables/Aggregation%20on%20global%20variables-response.json)    |
| Calculate sum of integer global variable named "GV2" across CLRs | taskLegDetails / CLR | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskLegDetails/Global%20Variables/Aggregation%20on%20global%20variables.graphql) | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskLegDetails/Global%20Variables/Aggregation%20on%20global%20variables-response.json) |

### Performing group by operation on global variables

For performing group by's using global variables, the fields required for group bys should be included in the requested fields, The sample below performs a group by operation on the value of a string global variable named `Global_Language`.

```graphql
{
  # Group by using  Global Variables
  # To perform a group by on a global variable add the global variable in the selection set.
  taskDetails(
    from: 1655449155512
    to: 1671038575000
    aggregations: [
      { field: "id", name: "count of calls", type: count }
      {
        field: "integerGlobalVariables.value"
        name: "Sum of GV2"
        type: sum
        predicate: { integerGlobalVariables: { name: { equals: "GV2" } } }
      }
    ]
  ) {
    tasks {
      # Group by on stringGlobalVariable named "Global_Language".
      stringGlobalVariables(name: "Global_Language") {
        value
      }
      aggregation {
        name
        value
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

Using aliasing group by can be done on multiple global variables of the same type.

```graphql
{
  # Group by using  Global Variables
  # To perform a group by on a global variable add the global variable in the selection set.
  taskDetails(
    from: 1655449155512
    to: 1671038575000
    aggregations: [
      { field: "id", name: "count of calls", type: count }
      {
        field: "integerGlobalVariables.value"
        name: "Sum of GV2"
        type: sum
        predicate: { integerGlobalVariables: { name: { equals: "GV2" } } }
      }
    ]
  ) {
    tasks {
      # Group by on stringGlobalVariable named "Global_Language".
      stringGlobalVariables(name: "Global_Language") {
        value
      }
      # Group by on stringGlobalVariable named "Location".
      Location: stringGlobalVariables(name: "Location") {
        value
      }
      aggregation {
        name
        value
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

Some sample group by's on globalVariables with aggregations for taskDetails and taskLegDetails

| Query Type                                                                                                                               | Query / Record Type  | Query                                                                                                                                                                                               | Response                                                                                                                                                                                                         |
| ---------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fetch count of calls and sum of integer global variable named "GV2", per unique value of string global variable named "Global_Language". | taskDetails / CSR    | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Global%20Variables/Group%20by%20on%20global%20variables.graphql)     | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskDetails/Global%20Variables/Group%20by%20on%20global%20variables-response.json)            |
| Fetch count of calls and sum of integer global variable named "GV2", per unique value of string global variable named "Global_Language". | taskLegDetails / CLR | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskLegDetails/Global%20Variables/Aggregation%20on%20global%20variables.graphql) | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/taskLegDetails/Global%20Variables/Group%20by%20based%20on%20global%20variables-response.json) |

## Restrictions

1. For any type of query, the query span, i.e. the `from` and `to,` should not exceed a period of 12 months.

2. When fetching AAR and CAR raw data, the query span, i.e. `from` and `to` cannot exceed more than 30 days.

3. When fetching CSR and CLR documents using pagination, the API supports up to a maximum of 100K records.

4. The number of fields used for a group by operation in an aggregation query cannot exceed 10.

5. When using `extFilter` in a query to fetch raw data, if matching records for first page cannot be populated from the first 2500 Records (based on query span and `filter` criteria), then the API will respond back with 413 Status code.

## Recommendations and best practices

- While querying data or performing aggregations, it is recommended to use fields belonging to only a single data type. Ex: In a taskDetails query, it is recommended to use fields either from CSR or from CAR and not from both. Similarly, for AgentSession query, it is recommended to use fields either from ASR or from AAR.

- It is recommended to use the _taskDetails_ query for any Task related data instead of the older _task_ query.

- For aggregations, use the _aggregations_ argument; the older argument _aggregation_ supports limited functionalities and is not recommended to be used.

- Performing group by's on global variables and skill-related fields is not recommended as the performance may be impacted based on the volume of data.

- Performing group by's on Int, Double or numerical fields or String fields that have a high number of unique values is not recommended.

- It is recommended to pass a `TrackingId` header with a valid UUID in the request payload, For example - `007bfe3b-a257-4caa-9882-fbd710cc671e`;this allows for easier debugging by support teams in case of any issue.

## Sample Usecases and queries

This repository is organized into multiple files that you can paste directly into the section of the interactive editor on **[Webex Developer Portal - Search Tasks](https://developer.webex-cx.com/documentation/search/search-tasks)**

| #   | File Name                                                                                                                                                                                        | Comments                                                                                                                                                                 | Query Type              |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| 1   | [simple.graphql](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/More%20Examples/simple.graphql)                                     | SIMPLE: Simply retrieve all task IDs.                                                                                                                                    | Fetching raw data       |
| 2   | [basicFields.graphql](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/More%20Examples/basicFields.graphql)                           | BASIC: Basic query to request for certain fields.                                                                                                                        | Fetching raw data       |
| 3   | [advanced.graphql](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/More%20Examples/advanced.graphql)                                 | AGGREGATES/FORMULAS: Usage of filters, aggregates, pagination and custom fields.                                                                                         | Performing Aggregations |
| 4   | [callback.graphql](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/More%20Examples/callbackFilter.graphql)                           | FILTER: Get the Task details using CallBack filters and logical operators to match a condition.                                                                          | Fetching raw data       |
| 5   | [realTimeQueuedTasks.graphql](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/More%20Examples/realTimeQueuedTasks.graphql)           | FILTER: Fetch Real-time (Active) Queued Tasks on the System - using filters.                                                                                             | Fetching raw data       |
| 6   | [lastAgentInteraction.graphql](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/More%20Examples/lastAgentInteraction.graphql)         | LAST AGENT INTERACTIONS: Usage of filters, aggregates, pagination and custom fields to find when the customer called last in a 7 day window and who they reached.        | Performing Aggregations |
| 7   | [interactionDetails.graphql](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/More%20Examples/interactionDetails.graphql)             | INTERACTION DETAILS: Usage of filters, aggregates, pagination and custom fields to find out information about a specific interaction using INTERACTION ID/TaskID/CSR ID. | Performing Aggregations |
| 8   | [totalCallsByAni.graphql](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/More%20Examples/totalCallsByAni.graphql)                   | Filter with Aggregates: Usage of filters with aggregations, for total calls made by a specific customer.                                                                 | Performing Aggregations |
| 9   | [globalVariables.graphql](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/More%20Examples/globalVariables.graphql)                   | GLOBAL VARIABLES: Usage of the Global Variables field to extract a specific global variable or a combination of two global variables.                                    | Fetching raw data       |
| 10  | [globalVariableFilter.graphql](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/More%20Examples/globalVariableFilter.graphql)         | GLOBAL VARIABLES: Usage of the Global Variables as a FILTER to extract a specific tasks for a specific global variable.                                                  | Fetching raw data       |
| 11  | [allContactFields.graphql](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/More%20Examples/allContactFields.graphql)                 | ALL FIELDS: Extracting all fields from the Contact Session Record = Task Details.                                                                                        | Fetching raw data       |
| 12  | [allAgentSessionFields.graphql](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/More%20Examples/allAgentSessionFields.graphql)       | ALL FIELDS: Extracting all fields from the Agent Session Record = ASR Details.##                                                                                         | Fetching raw data       |
| 13  | [FetchAgentSkill.graphql](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/More%20Examples/FetchAgentSkill.graphql)                   | SKILLS : Extracting Agent skills from an ASR record                                                                                                                      | Fetching raw data       |
| 14  | [FilteringUsingAgentSkill.graphql](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/More%20Examples/FilteringUsingAgentSkill.graphql) | SKILLS : Filtering ASR records based on Agent skill criteria                                                                                                             | Fetching raw data       |
| 15  | [GroupByAgentSkills.graphql](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/More%20Examples/GroupByAgentSkills.graphql)             | SKILLS: Group ASR records based on set of skills                                                                                                                         | Performing Aggregations |

## Data Dictionary

Refer data dictionaries for available fields and supported operations for each query type and record.

| Query Type / Record  | Dictionary Link                                                                                                                           |
|----------------------| ----------------------------------------------------------------------------------------------------------------------------------------- |
| taskDetails / CSR    | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/DataDictionary/CSR.md) |
| taskDetails / CAR    | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/DataDictionary/CAR.md) |
| agentSession / ASR   | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/DataDictionary/ASR.md) |
| agentSession / AAR   | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/DataDictionary/AAR.md) |
| taskLegDetails / CLR | [link](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample/DataDictionary/CLR.md) |

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
- 3.0.0
  - Update documentation and add more samples.
