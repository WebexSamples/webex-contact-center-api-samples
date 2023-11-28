# Getting started with the Search API using GraphQL

For a quick overview of the `search` API and how to use our documentation, refer the video below:

## [Watch: Getting Started with the /search API](https://app.vidcast.io/share/c8c778c5-6659-4145-891a-bafcece29863)

## Introduction

A GraphQL API enables clients to construct queries in order retrieve data. The queries that can be constructed is defined by the API server in the form of a GraphQL schema, this acts a contract between the server and the client.

Depending the data required the `search` API supports 3 types of queries :

    1. **taskDetails** - This is used for retrieving/analyzing Contact / Task related data also represented as Contact Session Records (CSRs) and Contact Activity Records(CARs) in analyzer.

    2. **agentSession** - This is used for retrieving/analyzing Agent related data also represented as Agent Session Records (ASRs) and Agent Activity Records (AARs) in analyzer.

    3. **taskLegDetails** - This is used for retrieving/analyzing data related to Queues also represented as Queue Based Records or Call-Leg-Record (CLRs).

The queries formed using these types can be broadly categorized into 2 operations 

1. **Fetching Raw Data** - Fetching individual records stored such as CSRs, ASRs, CARs etc, clients can define filter data and paginate.

2. **Aggregations** - Performing aggregation operations on fields of records with  support for group-bys, fitlering and pagination.

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

Sample query to fetch CSR fields can be found [here](taskDetails/Samples%20for%20Raw%20Data%20Fetching/Simple%20query.graphql), the response for the same is [here](taskDetails/Samples%20for%20Raw%20Data%20Fetching/Simple%20query-response.json).

Sample query to fetch CAR fields can be found [here](taskDetails/Samples%20for%20Raw%20Data%20Fetching/SimpleQueryForCARFields.graphql), the response for the same is [here](taskDetails/Samples%20for%20Raw%20Data%20Fetching/SimpleQueryForCARFields-response.json).

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

Sample query to fetch ASR fields can be found [here](agentSession/Raw%20Data%20Fetching/Simple%20query.graphql), the response for the same is [here](agentSession/Raw%20Data%20Fetching/Simple%20query-response.json).

Sample query to fetch AAR fields can be found [here](agentSession/Raw%20Data%20Fetching/SimpleQueryForAARFields.graphql), the response for the same is [here](agentSession/Raw%20Data%20Fetching/SimpleQueryForAARFields-response.json).

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

A sample query to fetch CLR records can be found [here](taskLegDetails/Fetching%20Raw%20Data/Simple%20Query.graphql), the response for the same is [here](taskLegDetails/Fetching%20Raw%20Data/Simple%20Query-response.json).

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

### Support for filtering within Aggregation

#### Aggregations with global filters

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

## Support for Filtering data

Filtering of data is supported using the `filter` and `extFilter` arguments which is supported in context of fetching raw data and while performing aggregations, the syntax remains same in both the context.

The distinction between `filter` and `extFilter` is type of fields they allow filtering on. In a *taskDetails* query, `filter` is used for filtering data based on fields available in a CSR record and `extFilter` is used for filtering data based on fields available in a CAR record, Simlarlty In an *agentSession* query, `filter` is used for filtering based on ASR fields and `extFilter` is used for filtering based on AAR fields.
In a *taskLegDetails* query `extfilter` is **not** supported and `filter` can be used to filter data based on CLR fields.

### Filtering based on scalar fields:

Scalar fields are atomic and represent indivisible values (Unlike object types, 
which can have subfields and contain complex data structures).
Scalars in GraphQL include basic data types like Int, Long, String, Boolean

#### String Operators for filtering:

The following operators are supported for *String* fields

| Operator  | Description                                       |
| --------- | ------------------------------------------------- |
| equals    | Checks if two values are equal.                   |
| notequals | Checks if two values are not equal.               |
| match     | Checks if a value matches a specified pattern.    |
| contains  | Checks if a string contains a specific substring. |

Fetch TaskDetails where contactReason is "sales" OR matches the regex "product.*" OR contains the string "fail"

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

#### Numerical Operators for filtering:

The following operators are supported for numerical fields, (Int, Long, float)

| Operator  | Description                     |
| --------- | ------------------------------- |
| equals    | exact match operation           |
| notequals | negate operation                |
| gt        | Greater than operation          |
| gte       | Greater than or equal operation |
| lt        | Less than operation             |
| lte       | Less than or equal operation    |

```graphql
        filter: {
                {
                    or: [
                        # For Numeric fields - lte, lt , gte, gt, equals, notequals are available.
                        { totalDuration: { lte: 120000 } }
                        { totalDuration: { gte: 60000 } }
                    ]
                }
                # lastTeam name should not be null.
                { lastTeam: { name: { notequals: null } } }
            ]
        }
```

| Query Type/ Record                             | Query                                                                           | Response                                                                              |
| ---------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| taskDetails query for CSR using binary filter  | [link](taskDetails/Samples for Raw Data Fetching/binaryFilterOperators.graphql) | [link](taskDetails/Samples for Raw Data Fetching/binaryFilterOperators-response.json) |
| agentSession query for ASR using binary filter | [link](agentSession/Raw Data Fetching/binaryFilterOperation.graphql)            | [link](agentSession/Raw Data Fetching/binaryFilterOperation-response.json)            |
| taskLegs query for CLR using binary filter     | [link](taskLegDetails/Fetching Raw Data/Simple Filtering.graphql)               | [link](taskLegDetails/Fetching Raw Data/Simple Filtering-response.json)               |

### Filter on Composite objects:

Filtering can also be done based scalar fields present in another objects,
For instance, consider the scenario where filtering is performed on the "subject" field within the "email" object, which is nested inside the "channelMetaData" field.
The structure of the query reflects this hierarchy, starting from the top-level field and traversing through subfields until reaching the leaf field.
The filter condition is specified using the operator and value for the targeted field.

Fetch TaskDetails where channelMetaData.email.subject is "sample subject"

```graphql
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
```

| Query Type/ Record                        | Query                                                                               | Response                                                                                  |
| ----------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| taskDetails,complex object query for CSR  | [link](taskDetails/Samples for Raw Data Fetching/Filtering on object types.graphql) | [link](taskDetails/Samples for Raw Data Fetching/Filtering on object types-response.json) |
| agentSession,complex object query for ASR | [link](agentSession/Raw Data Fetching/Filtering on object types.graphql)            | [link](agentSession/Raw Data Fetching/Filtering on object types-response.json)            |
| tasklegs,complex object query for CLR     | [link](taskLegDetails/Fetching Raw Data/Filtering on object types.graphql)          | [link](taskLegDetails/Fetching Raw Data/Filtering on object types-response.json)          |

##### extFilter on Composite objects:

All CAR fields specific filter fields such as, queues, sites, teams, contributors and entrypoints can be filtered using an extFilter.
the operators supported are same as that of filter.

```graphql
        extFilter: { queues: { name: { equals: "Arryn_Queue" } } }
```

All fields which are inside nodes (i.e fields which can only be found in AARs) can be filtered by specifying an extFilter. For example as given in below query.

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

| Query Type/ Record                         | query                                                                                  | Response                                                                                     |
| ------------------------------------------ | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| taskDetails, complex object query for CAR  | [link](taskDetails/Samples for Raw Data Fetching/extFilteringOnComplexObjects.graphql) | [link](taskDetails/Samples for Raw Data Fetching/extFilteringOnComplexObjects-response.json) |
| agentSession, complex object query for AAR | [link](agentSession/Raw Data Fetching/extFilteringOnComplexObject.graphql)             | [link](agentSession/Raw Data Fetching/extFilteringOnComplexObject-response.json)             |
| taskDetails, complex object query for CAR  | [link](taskDetails/Samples for Raw Data Fetching/Filtering using extFilters.graphql)   | [link](taskDetails/Samples for Raw Data Fetching/Filtering using extFilters-response.json)   |
| agentSession, complex object query for AAR | [link](agentSession/Raw Data Fetching/FitleringOnextFilter.graphql)                    | [link](agentSession/Raw Data Fetching/FilteringOnextFilter-response.json)                    |

### Filter using compound operators:

Compound filter includes 2 types of filters - AND , OR operations, each of them accepts a list of filter expressions.
Fetch taskDetails where channelType is telephony and status is either created or ended

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

| Query Type/ Record                                 | Query                                                                                        | Response                                                                                           |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| taskDetails query for CSR using compound operator  | [link](taskDetails/Samples for Raw Data Fetching/Filtering using compound operators.graphql) | [link](taskDetails/Samples for Raw Data Fetching/Filtering using compound operators-response.json) |
| agentSession query for ASR using compound operator | [link](agentSession/Raw Data Fetching/Filtering using compound operators.graphql)            | [link](agentSession/Raw Data Fetching/Filtering using compound operators-response.json)            |
| taskLegs query for CLR using compound operator     | [link](taskLegDetails/Fetching Raw Data/Filtering using compound operators.graphql)          | [link](taskLegDetails/Fetching Raw Data/Filtering using compound operators-response.json)          |

##### extFilter using compund operators:

| Query Type/ Record                        | Query                                                                                  | Response                                                                                     |
| ----------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| taskDetails,complex object query for CAR  | [link](taskDetails/Samples for Raw Data Fetching/extFilteringOnComplexObjects.graphql) | [link](taskDetails/Samples for Raw Data Fetching/extFilteringOnComplexObjects-response.json) |
| agentSession,complex object query for AAR | [link](agentSession/Raw Data Fetching/extFilteringOnComplexObject.graphql)             | [link](agentSession/Raw Data Fetching/extFilteringOnComplexObject-response.json)             |

##### Fields supported for Filtering:

Refer Data Dictionary section for fields supporting filtering.

## Additional Notes

* Query type *task* API is deprecated, Use *taskDetails*

* *aggregation* argument supported by *TaskDetails*, *agentSession* queries is deprecated, use *aggregations*. 

* Recommended to fetch 

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
