# Getting started with the Search API using GraphQL

For a quick overview of the `/search` API and how to use our documentation, refer the video below:

## [Watch: Getting Started with the /search API](https://app.vidcast.io/share/c8c778c5-6659-4145-891a-bafcece29863)

## Introduction

A GraphQL API enables clients to construct queries in order retrieve data. The queries that can be constructed is defined by the API server in the form of a GraphQL schema, this acts a contract between the server and the client.

Depending the data required the `search`API supports 3 types of queries :

    1) **taskDetails** - This is used for retrieving/analyzing Contact / Task related data also represented as Contact Session Records (CSRs) and Contact Activity Records(CARs) in analyzer.

    2) **agentSession** - This is used for retrieving/analyzing Agent related data also represented as Agent Session Records (ASRs) and Agent Activity Records (AARs) in analyzer.

    3) **taskLegDetails** - This is used for retrieving/analyzing data related to Queues also represented as Queue Based Records or Call-Leg-Record (CLR)s.

 The following sections define each type in detail.

> [!TIP]
> 
> For an introduction to GraphQL, refer : **[GraphQL - 101](https://graphql.org/learn/)**

## Query Definitions

The following sections describe the query types in detail.

### TaskDetails Query

A taskDetails query operates over CSR and CAR data. The GraphQL schema structure is defined as given below. 

```graphql
taskDetails(
    from: Long!
    to: Long!
    timeComparator: QueryTimeType
    filter: TaskDetailsFilters
    extFilter: TaskDetailsSpecificFilters
    aggregations: [TaskV2Aggregation]
    aggregationInterval: IntervalData
    pagination: Pagination
): TaskDetailsList
```

#### Arguments

1. *from* - Mandatory Argument, Accepts a *Long* value representing epoch timestamp which defines the start of the query span, By default the `createdTime` field used for comparision, but this can be overriden to use `endedTime` by using the `timeComparator` argument.

2. *to* - Mandatory Argument, Accepts a *Long* value representing epoch timestamp which defines the end of the query span, By default the `createdTime` field used for comparision, but this can be overriden to use `endedTime` by using the `timeComparator` argument.

3. *timeComparator* - Optional Argument, Accepts a value of `QueryTimeType` type, This defines which field should `from` and `to` arguments use for retrieving documents, Accepted values are `createdTime` and `endedTime`.

4. *filter* - Optional Argument, Accepts an *TaskDetailsFilters* object, This is used to filter results  based on a user defined criteria, Refer filtering section for more details.

5. *extFilter* - Optional Argument, Accepts an *TaskDetailsSpecificFilters* object, This is used to filter results based on a user defined criteria, `filter` and `extFilter` define criteria for different fields, Refer filtering section for more details.

6. *aggregations* - Optional Argument, Accepts a List of `TaskV2Aggregation`, This is used to perform aggregations over data. Refer aggregations section for more details.

7. *aggregationInterval*- Optional Argument, Accepts a `IntervalData` object, This is used when time-based aggregation needs to be performed. Refer aggregations section for more details.

8. *pagination* - Optional Argument, Accepts an object of `Pagination` object, This is used to perform pagination. Refer pagination section for more details.

Sample query to fetch CSR records can be found [here](taskDetails/Samples%20for%20Raw%20Data%20Fetching/Simple%20query.graphql), the response for the same is [here](taskDetails/Samples%20for%20Raw%20Data%20Fetching/Simple%20query-response.json).

Sample query to fetch CSR & CAR records can be found [here](taskDetails/Samples%20for%20Raw%20Data%20Fetching/SimpleQueryForCARFields.graphql), the response for the same is [here](taskDetails/Samples%20for%20Raw%20Data%20Fetching/SimpleQueryForCARFields-response.json).

### AgentSession Query

An agentSession query operates over ASR and AAR data. The GraphQL schema structure is defined as

```graphql
agentSession(
    from: Long!
    to: Long!
    filter: AgentSessionFilters
    extFilter: AgentSessionSpecificFilters
    aggregations: [AgentSessionV2Aggregation]
    aggregationInterval: IntervalData
    pagination: Pagination
): AgentSessions
```

#### Arguments

1. *from* - Mandatory Argument, Accepts a *Long* value representing epoch timestamp which defines the start of the query span, the `startTime` field used for comparision.

2. *to* - Mandatory Argument, Accepts a *Long* value representing epoch timestamp which defines the end of the query span, the `startTime` field used for comparision.

3. *filter* - Optional Argument, Accepts an *AgentSessionFilters* object, This is used to filter results based on a user defined criteria, Refer filtering section for more details.

4. *extFilter* - Optional Argument, Accepts an *AgentSessionSpecificFilters* object, This is used to filter results based on a user defined criteria, `filter` and `extFilter` define criteria for different fields, Refer filtering section for more details.

5. *aggregations* - Optional Argument, Accepts a List of `AgentSessionV2Aggregation`, This is used to perform aggregations over data. Refer aggregations section for more details.

6. *aggregationInterval*- Optional Argument, Accepts a `IntervalData` object, This is used when time-based aggregation needs to be performed. Refer aggregations section for more details.

7. *pagination* - Optional Argument, Accepts an object of `Pagination` object, This is used to perform pagination. Refer pagination section for more details.

Sample query to fetch ASR records can be found [here](agentSession/Raw%20Data%20Fetching/Simple%20query.graphql), the response for the same is [here](agentSession/Raw%20Data%20Fetching/Simple%20query-response.json).

Sample query to fetch ASR & AAR recrods can be found [here](agentSession/Raw%20Data%20Fetching/SimpleQueryForAARFields.graphql), the response for the same is [here](agentSession/Raw%20Data%20Fetching/SimpleQueryForAARFields-response.json).

### TaskLegDetails Query

An taskLegDetails query operates over CLR data. The GraphQL schema structure is defined as

```graphql
taskLegDetails(
    from: Long!
    to: Long!    
    timeComparator: QueryTimeType
    filter: TaskLegDetailsFilters
    aggregations: [TaskLegV2Aggregation]
    aggregationInterval: IntervalData
    pagination: Pagination
): TaskLegDetailsList
```

#### Arguments

1. *from* - Mandatory Argument, Accepts a *Long* value representing epoch timestamp which defines the start of the query span, By default the `createdTime` field used for comparision, but this can be overriden to use `endedTime` by using the `timeComparator` argument.

2. *to* - Mandatory Argument, Accepts a *Long* value representing epoch timestamp which defines the end of the query span, By default the `createdTime` field used for comparision, but this can be overriden to use `endedTime` by using the `timeComparator` argument.

3. *timeComparator* - Optional Argument, Accepts a value of `QueryTimeType` type, This defines which field should `from` and `to` arguments use for retrieving documents, Accepted values are `createdTime` and `endedTime`.

4. *filter* - Optional Argument, Accepts an *TaskLegDetailsFilters* object, This is used to filter results based on a user defined criteria, Refer filtering section for more details.

5. *aggregations* - Optional Argument, Accepts a List of `TaskLegV2Aggregation`, This is used to perform aggregations over data. Refer aggregations section for more details.

6. *aggregationInterval*- Optional Argument, Accepts a `IntervalData` object, This is used when time-based aggregation needs to be performed. Refer aggregations section for more details.

7. *pagination* - Optional Argument, Accepts an object of `Pagination` object, This is used to perform pagination. Refer pagination section for more details.

A sample query to fetch CSR records can be found [here](taskLegDetails/Fetching%20Raw%20Data/Simple%20Query.graphql), the response for the same is [here](taskLegDetails/Fetching%20Raw%20Data/Simple%20Query-response.json).

## Performing Aggregations

Any query with the  `aggregations` argument is treated as an aggregation query, this argument accepts a list of object.

Each object requires the following mandatory arguments :

1. *field* - String, denotes the identifier/field-name on which the aggregation needs to be done.
2. *name* - String, identifier to determine the result of the aggregation operation.
3. *type* - Enum, defines the aggregation operation, depending on the data type of the field specified the following aggregations are supported. 

| Type        | Description                                                     | Supported data types             |
| ----------- | --------------------------------------------------------------- | -------------------------------- |
| count       | Counts the occurence of the field across documents.             | Int, Long, Float, String boolean |
| min         | Aggregates the value of the field across documents.             | Int, Long, Float                 |
| max         | Returns the maximum value of the field across documents         | Int, Long, Float                 |
| sum         | Returns the minimum value of the field across documents         | Int, Long, Float                 |
| average     | Performs the average of the field across documents.             | Int, Long, Float                 |
| cardinality | Returns the count of unique value of the field across documents | Int, Long, Float, String boolean |

The following arguments are optional :

1. *filter* - Denotes the filter-criteria for documents for the particular aggregation.

2. *predicate* - Applicable only for global variables, Refer Global Variable section.

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

Sample queries to perform aggegations on various data types are given below.

| Query Type/ Record           | Query                                                                         | Response                                                                              |
| ---------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| taskDetails query for CSR    | [link](taskDetails/Performing%20Aggregations/Aggregation%20query.graphql)     | [link](taskDetails/Performing%20Aggregations/Aggregation%20query%20-response.json)    |
| taskDetails query for CAR    | [link](taskDetails/Performing%20Aggregations/AggregationQueryForCAR.graphql)  | [link](taskDetails/Performing%20Aggregations/AggregationQueryForCAR-response.json)    |
| agentSession query for ASR   | [link](agentSession/Performing%20Aggregations/Aggregation%20query.graphql)    | [link](agentSession/Performing%20Aggregations/Aggregation%20query-response.json)      |
| agentSession query for AAR   | [link](agentSession/Performing%20Aggregations/AggregationQueryForAAR.graphql) | [link](agentSession/Performing%20Aggregations/AggregationQueryForAAR-response.json)   |
| taskLegDetails query for CLR | [link](taskLegDetails/Performing%20Aggregations/Aggregation%20query.graphql)  | [link](taskLegDetails/Performing%20Aggregations/Aggregation%20query%20-response.json) |

### Support for filtering

#### Global Filtering support

When filtering has to be applied over all aggregations, the top-level  `filter` and     `extFilter` arguments can be used. Refer Filtering section for more details on the syntax and usage. Refer below general syntax for global filtering support

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

Sample queries to perform aggegations with filter criteria on various data types are given below.

| Query Type/ Record           | Query                                                                                                 | Response                                                                                                    |
| ---------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| taskDetails query for CSR    | [link](taskDetails/Performing%20Aggregations/Aggregation%20query%20with%20filters.graphql)            | [link](taskDetails/Performing%20Aggregations/Aggregation%20query%20with%20filters-response.json)            |
| taskDetails query for CAR    | [link](taskDetails/Performing%20Aggregations/AggregationQueryWithFiltersForCAR.graphql)               | [link](taskDetails/Performing%20Aggregations/AggregationQueryWithFiltersForCAR-response.json)               |
| agentSession query for ASR   | [link](agentSession/Performing%20Aggregations/Aggregation%20global%20filter%20query.graphql)          | [link](agentSession/Performing%20Aggregations/Aggregation%20global%20filter%20query-response.json)          |
| agentSession query for AAR   | [link](agentSession/Performing%20Aggregations/AggregationQueryWithGlobalFilterForAAR.graphql)         | [link](agentSession/Performing%20Aggregations/AggregationQueryWithGlobalFilterForAAR-response.json)         |
| taskLegDetails query for CLR | [link](taskLegDetails/Performing%20Aggregations/Aggregation%20query%20with%20Global%20Filter.graphql) | [link](taskLegDetails/Performing%20Aggregations/Aggregation%20query%20with%20Global%20Filter-response.json) |

#### Sub filter support

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

Sample queries to perform aggegations with sub-filter criteria on various data types are given below.

| Query Type/ Record           | Query                                                                                            | Response                                                                                               |
| ---------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| taskDetails query for CSR    | [link](taskDetails/Performing%20Aggregations/Aggregation%20query%20with%20sub-filters.graphql)   | [link](taskDetails/Performing%20Aggregations/Aggregation%20query%20with%20sub-filters-response.json)   |
| taskDetails query for CAR    | [link](taskDetails/Performing%20Aggregations/AggregationQueryWithSubFiltersForCAR.graphql)       | [link](taskDetails/Performing%20Aggregations/AggregationQueryWithSubFiltersForCAR-response.json)       |
| agentSession query for ASR   | [link](agentSession/Performing%20Aggregations/Aggregation%20sub-filter%20query.graphql)          | [link](agentSession/Performing%20Aggregations/Aggregation%20sub-filter%20query-response.json)          |
| agentSession query for AAR   | [link](agentSession/Performing%20Aggregations/AggregationQueryWithSubFilterForAAR.graphql)       | [link](agentSession/Performing%20Aggregations/AggregationQueryWithSubFilterForAAR-response.json)       |
| taskLegDetails query for CLR | [link](taskLegDetails/Performing%20Aggregations/Aggregation%20query%20with%20sub-filter.graphql) | [link](taskLegDetails/Performing%20Aggregations/Aggregation%20query%20with%20sub-filter-response.json) |

### Performing group by operation

To perform a group by operation, the fields required for group bys should be included in the requested fields, The below sample performs a group by on **lastAgent.id** field.

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
        id
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

| Description                                                       | Query                                                                                          | Response                                                                                               |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| taskDetails query to group by on a single field of CSR record     | [link](taskDetails/Performing%20Aggregations/Group%20by%20aggregation%20query.graphql)         | [link](taskDetails/Performing%20Aggregations/Group%20by%20aggregation%20query-response.json)           |
| taskDetails query to group by on multiple fields of CSR record    | [link](taskDetails/Performing%20Aggregations/Group%20by%20multiple%20fields.graphql)           | [link](taskDetails/Performing%20Aggregations/Group%20by%20multiple%20fields%20-response.json)          |
| taskDetails query to group by on a single field of CAR record     | [link](graphql-sample/taskDetails/Performing%20Aggregations/GroupBySingleFieldsForCAR.graphql) | [link](taskDetails/Performing%20Aggregations/GroupBySingleFieldsForCAR-response.json)                  |
| taskDetails query to group by on multiple fields of CAR record    | [link](taskDetails/Performing%20Aggregations/GroupByMultipleFieldsForCAR.graphql)              | [link](taskDetails/Performing%20Aggregations/GroupByMultipleFieldsForCAR-response.json)                |
| agentSession query to group by on a single field of ASR record    | [link](agentSession/Performing%20Aggregations/Group%20by%20query.graphql)                      | [link](agentSession/Performing%20Aggregations/Group%20by%20query-response.json)                        |
| agentSession query to group by on multiple fields of ASR record   | [link](agentSession/Performing%20Aggregations/Group%20by%20multiple%20fields%20query.graphql)  | [link](agentSession/Performing%20Aggregations/Group%20by%20multiple%20fields%20query%20-response.json) |
| agentSession query to group by on a single field of AAR record    | [link](agentSession/Performing%20Aggregations/GroupBySingleFieldsQueryForAAR.graphql)          | [link](agentSession/Performing%20Aggregations/GroupBySingleFieldsQueryForAAR-response.json)            |
| agentSession query to group by on multiple field of AAR record    | [link](agentSession/Performing%20Aggregations/GroupByMultipleFieldsQueryForAAR.graphql)        | [link](agentSession/Performing%20Aggregations/GroupByMultipleFieldsQueryForAAR-response.json)          |
| taskLegDetails query to group by on single field of CLR record    | [link](taskLegDetails/Performing%20Aggregations/Aggregation%20with%20group%20bys.graphql)      | [link](taskLegDetails/Performing%20Aggregations/Aggregation%20with%20group%20bys-response.json)        |
| taskLegDetails query to group by on multiple fields of CLR record | [link](taskLegDetails/Performing%20Aggregations/Group%20bys%20multiple%20fields.graphql)       | [link](taskLegDetails/Performing%20Aggregations/Group%20bys%20multiple%20fields%20-response.json)      |

#### Interval based group bys.

Aggregations can be grouped based on time intervals such as `DAILY` , `WEEKLY` etc. by adding the `intervalStartTime` in ther requested field and using the `aggregationInterval` argument, this accepts 2 parameters 

* *interval* - Mandatory argument, Accepts an Enum, Based on the query span, (i.e difference of the values passed in `from` and `to`) the following values are supported.

| Query Span        | Supported intervals                                                        |
|:----------------- |:--------------------------------------------------------------------------:|
| <= DAY            | `FIFTEEN_MINUTES`,`THIRTY_MINUTES`, `HOURLY`, `DAILY`, `WEEKLY`, `MONTHLY` |
| > DAY & <= 7 DAYS | `THIRTY_MINUTES`, `HOURLY`, `DAILY`, `WEEKLY`, `MONTHLY`                   |
| > 7 DAYS          | `DAILY`, `WEEKLY`, `MONTHLY`                                               |

* timezone - Optional argument, Accepts a String representing the timezone, using which the intervals should be formed, the default timezone used is `UTC`.

Refer the below sample syntax for the aggregationIntervalArgument. 

```graphql
aggregationInterval : {
    interval : DAILY
    timezone : "America/New_York"
}
```

Sample queries to perform interval based aggregations.

| Query Type/ Record           | Query                                                                                                               | Response                                                                                                                  |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| taskDetails query for CSR    | [link](taskDetails/Performing%20Aggregations/Interval%20based%20timezone%20supported%20aggregation%20query.graphql) | [link](taskDetails/Performing%20Aggregations/Interval%20based%20timezone%20supported%20aggregation%20query-response.json) |
| taskDetails query for CAR    | [link](/taskDetails/Performing%20Aggregations/IntervalBasedTimezoneSupportedAggregationQueryForCAR.graphql)         | [link](taskDetails/Performing%20Aggregations/IntervalBasedTimezoneSupportedAggregationQueryForCAR-response.json)          |
| agentSession query for ASR   | [link](agentSession/Performing%20Aggregations/Interval%20timezone%20based%20aggregation%20query.graphql)            | [link](agentSession/Performing%20Aggregations/Interval%20timezone%20based%20aggregation%20query-response.json)            |
| agentSession query for AAR   | [link](agentSession/Performing%20Aggregations/IntervalTimezoneBasedAggregationQueryForAAR.graphql)                  | [link](agentSession/Performing%20Aggregations/IntervalTimezoneBasedAggregationQueryForAAR-response.json)                  |
| taskLegDetails query for CLR | [link](taskLegDetails/Performing%20Aggregations/Interval%20timezone%20based%20aggregation%20query.graphql)          | [link](taskLegDetails/Performing%20Aggregations/Interval%20timezone%20based%20aggregation%20query%20-%20response.json)    |

#### Pagination support

When using group bys, the data can be paginated to get more results, using the `pagination` argument. Refer section for Pagination on more details.

### Fields supported for aggregations

Refer Data Dictionary section for fields supporting aggregation.

## Additional Notes

* Query type *task* API is deprecated, Use *taskDetails*

* *aggregation* argument supported by *TaskDetails*, *agentSession* queries is deprecated, use *aggregations*. 

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
