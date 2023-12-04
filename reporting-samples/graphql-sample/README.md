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

1. **Fetching Raw Data** - Fetching individual records stored such as CSRs, ASRs, CARs etc, clients can define filter data and paginate. The structure of the query is given below.

2. **Aggregations** - Performing aggregation operations on fields of records with  support for group-bys, fitlering and pagination. The structure of the query is given below.
   
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

## Support for Filtering data

Filtering of data is supported using the `filter` and `extFilter` arguments which is supported in context of fetching raw data and while performing aggregations, irrespective of the operation the syntax remains the same.

The distinction between `filter` and `extFilter` is type of fields they allow filtering on. In a *taskDetails* query, `filter` is used for filtering data based on fields available in a CSR record and `extFilter` is used for filtering data based on fields available in a CAR record, Similarly in an *agentSession* query, `filter` is used for filtering based on  ASR fields and `extFilter` is used for filtering based on AAR fields.
In a *taskLegDetails* query `extfilter`  is **not** supported and  `filter` can be used to filter data based on CLR fields.

The general formula/syntax for filtering is

```graphql
filter : {
    fieldName : { operator : value }
}
```

### Filtering based on Scalar fields

> [!TIP]
> 
> Refer [GraphQL documentation](https://graphql.org/learn/schema/#scalar-types) for Scalar types 

Scalar fields are atomic and represent indivisible values (Unlike object types,
which can have subfields and contain complex data structures).
Scalars include basic data types like Int, Long, String, Boolean

#### String Operators for filtering

The following operators are supported for *String* fields

| Operator  | Description                                       |
| --------- | ------------------------------------------------- |
| equals    | Checks if two values are equal.                   |
| notequals | Checks if two values are not equal.               |
| match     | Checks if a value matches a specified pattern.    |
| contains  | Checks if a string contains a specific substring. |

Given below is a sample for filtering using *equals* operator, *equals* can be replaced with *notequals*.

```graphql
filter: {
    origin: { equals: "+12344565678" }
}
```

*match* operator can be used  filter based on a regex/pattern.

```graphql
filter: {
    origin: { match: "+12345678.+" }
}
```

*contains* operator to filter on a substring match of a string field

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

| Query Type/ Record                              | Query                                                                                   | Response                                                                                      |
| ----------------------------------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| taskDetails query for CSR  using binary filter  | [link](taskDetails/Samples%20for%20Raw%20Data%20Fetching/binaryFilterOperators.graphql) | [link](taskDetails/Samples%20for%20Raw%20Data%20Fetching/binaryFilterOperators-response.json) |
| agentSession query for ASR  using binary filter | [link](agentSession/Raw%20Data%20Fetching/binaryFilterOperation.graphql)                | [link](agentSession/Raw%20Data%20Fetching/binaryFilterOperation-response.json)                |
| taskLegs query for CLR  using binary filter     | [link](taskLegDetails/Fetching%20Raw%20Data/Simple%20Filtering.graphql)                 | [link](taskLegDetails/Fetching%20Raw%20Data/Simple%20Filtering-response.json)                 |

#### Compound operators for filtering

Compound filter includes 2 types of operators - `and`  & `or` operators, these accept a list of filter expressions.

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

| Query Type/ Record                                  | Query                                                                                                      | Response                                                                                                            |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| taskDetails query for CSR using compound operator   | [link](taskDetails/Samples%20for%20Raw%20Data%20Fetching/Filtering%20using%20compound%20operators.graphql) | [link](tastaskDetails/Samples%20for%20Raw%20Data%20Fetching/Filtering%20using%20compound%20operators-response.json) |
| agentSession query for ASR  using compound operator | [link](agentSession/Raw%20Data%20Fetching/Filtering%20using%20compound%20operators.graphql)                | [link](agentSession/Raw%20Data%20Fetching/Filtering%20using%20compound%20operators-response.json)                   |
| taskLegs query for CLR  using compound operator     | [link](taskLegDetails/Fetching%20Raw%20Data/Filtering%20using%20compound%20operators.graphql)              | [link](taskLegDetails/Fetching%20Raw%20Data/Filtering%20using%20compound%20operators-response.json)                 |

### Filtering based on Composite objects

> [!TIP]
> 
> Refer [GraphQL documentation](https://graphql.org/learn/schema/#scalar-types) for type system to Object Types

Filtering is only supported for scalar fields and not supported for objects, however scalar fields inside objects can be filtered.

Consider a scenario where filtering is performed on the `subject` field within the `email` object, which is nested inside the top-level `channelMetaData` field.
The structure of the query reflects this hierarchy, starting from the top-level field and traversing through subfields until reaching the leaf field.

```graphql
filter: {
    channelMetaData: {
        email: { subject: { equals: "sample subject" } }
    }
}
```

Since all the CAR and AAR fields are present in the `activities` object, filtering using `extFilter` also follow the same pattern, one such sample is given below

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

| Query Type/ Record                                | Query                                                                                             | Response                                                                                                |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| taskDetails query with filter on object of CSR    | [link](taskDetails/Samples%20for%20Raw%20Data%20Fetching/Filtering%20on%20object%20types.graphql) | [link](taskDetails/Samples%20for%20Raw%20Data%20Fetching/Filtering%20on%20object%20types-response.json) |
| taskDetails query with filter on object of CAR    | [link](taskDetails/Samples%20for%20Raw%20Data%20Fetching/Filtering%20using%20extFilters.graphql)  | [link](taskDetails/Samples%20for%20Raw%20Data%20Fetching/Filtering%20using%20extFilters-response.json)  |
| agentSession query with filter on object of ASR   | [link](agentSession/Raw%20Data%20Fetching/Filtering%20on%20object%20types.graphql)                | [link](agentSession/Raw%20Data%20Fetching/Filtering%20on%20object%20types-response.json)                |
| agentSession query for filtering on object of AAR | [link](agentSession/Raw%20Data%20Fetching/FitleringOnextFilter.graphql)                           | [link](agentSession/Raw%20Data%20Fetching/FilteringOnextFilter-response.json)                           |
| taskLegDetails query with filter on object of CLR | [link](taskLegDetails/Fetching%20Raw%20Data/Filtering%20on%20object%20types.graphql)              | [link](taskLegDetails/Fetching%20Raw%20Data/Filtering%20on%20object%20types-response.json)              |

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

> [!NOTE]
> 
> The number of fields used for a group by operation in an aggregation query cannot exceed 10.

#### Pagination support

When using group bys, the data can be paginated to get more results, using the `pagination` argument. Refer section for Pagination on more details.

### Structure of aggregation query

The structure of the aggregation query is given below

![Structure of a query performing aggregations](Aggregation%20query.png)

### Support for filtering within Aggregation

In an aggregation query, filters can be applied for all the aggregations or for individual aggregations this is referred to as global filter and sub-filter support.

#### Aggregations with global filters

When filtering has to be applied over all aggregations, the top-level  `filter` and     `extFilter` arguments can be used. Refer [Filtering section](#support-for-filtering-data) for more details on the syntax and usage. Refer below general syntax for global filtering support

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

### Fields supported for aggregations

Refer Data Dictionary section for fields supporting aggregation.

### Global Variables Support

The globalVariables are of five types according values it holds such as stringGlobalVariables, booleanGlobalVariables, integerGlobalVariables, doubleGlobalVariables and longGlobalVariables types

Global Variables are in TaskDetails and TaskLegDetails schema.

to get query the global data, pass name of the global in the argument
Eg: to get data of the Global Variable String Type with name as GlobalVariable1

```graphql
# 'name' argument is mandatory.
#  This block will fetch name and value for the stringGlobalVariable named 'GlobalVariable1'
stringGlobalVariables(name: "GlobalVariable1") {
    name
    value
}
```
to fetch multiple global variables of same type use aliasing:

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

| Query Type                              | Query                                                                                            | Response                                                                                               |
|-----------------------------------------| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| taskDetails query on globalVariables    | [link](taskDetails/Global Variables/Fetching global variables.graphql)   | [link](taskDetails/Global Variables/Fetching global variables-response.json)   |
| taskLegDetails query on globalVariables | [link](taskLegDetails/Global Variables/Fetching global variables.graphql) | [link](taskLegDetails/Global Variables/Fetching global variables-response.json) |

## Fetching Raw Data

Fields from individual records can also fetched using the API, this is referred to as fetching raw data, Any query without the `aggregations` argument is treated as a query to fetch raw data. 

Based on the fields that are requested and the filter criteria specified in the query, the API will read data from the appropriate type of record and return the requested field for each record. **It is recommended to fetch fields belonging to the same type of record**. Refer data dictionary section for more details.

Sample taskDetails query to fetch *id* field in a taskDetails query.

```graphql
{
  taskDetails(from: 1644859375000, to: 1671038575000) {
    tasks {
      id
    }
  }
}
```

> [!NOTE]
> 
> When fetching AAR and CAR raw data, the query span i.e. `from` and `to` cannot exceed more than 30 days

Samples for various data types are given below 

| Description                              | Query                                                                                     | Response                                                                                        |
| ---------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| taskDetails query to fetch CSR fields    | [link](taskDetails/Samples%20for%20Raw%20Data%20Fetching/Simple%20query.graphql)          | [link](taskDetails/Samples%20for%20Raw%20Data%20Fetching/Simple%20query-response.json)          |
| taskDetails query to fetch CAR fields    | [link](taskDetails/Samples%20for%20Raw%20Data%20Fetching/SimpleQueryForCARFields.graphql) | [link](taskDetails/Samples%20for%20Raw%20Data%20Fetching/SimpleQueryForCARFields-response.json) |
| agentSession query to fetch ASR fields   | [link](agentSession/Raw%20Data%20Fetching/Simple%20query.graphql)                         | [link](agentSession/Raw%20Data%20Fetching/Simple%20query-response.json)                         |
| agentSession query to fetch AAR fields   | [link](agentSession/Raw%20Data%20Fetching/SimpleQueryForAARFields.graphql)                | [link](agentSession/Raw%20Data%20Fetching/SimpleQueryForAARFields-response.json)                |
| taskLegDetails query to fetch CLR fields | [link](askLegDetails/Fetching%20Raw%20Data/Simple%20Query.graphql)                        | [link](taskLegDetails/Fetching%20Raw%20Data/Simple%20Query-response.json)                       |

### Filtering data

To fetch data matching a filter criteria, the `filter` and `extFilter` arguments can be used. Refer [section on filtering](#support-for-filtering-data) for details

### Pagination support for fetching raw data

Pagination is supported for raw queries, Refer section on pagination for details

### Structure of a query to fetch raw data

The structure of a query to fetch raw data is given below

![Structure of query fetching raw data](Raw%20query%20sample.png)

## Restrictions

1. For any type of query, the query span i.e. the `from` and `to` should not exceed a period of 12 months 

2. When fetching AAR and CAR raw data, the query span i.e. `from` and `to` cannot exceed more than 30 days.   

3. When fetching CSR and CLR documents, using pagination the API supports upto a maximum of 100K records.  

4. The number of fields used for a group by operation in an aggregation query cannot exceed 10.

## Recommendations / Best Practices

* While querying data / performing aggregations, it is recommended to use fields belonging to only a single data type.  

* It is recommended to use *taskDetails* query for any Task related data instead of the older *task* query

* For aggregations, use *aggregation* argument, the older argument named *aggregation*  supports limited functionalities.

* Performing group by's on Global Variables and skill related fields is not recommended as the performance may be impacted based on the data.

* It is recommended to pass `TrackingId` header with a valid UUID in the request payload, which allows support teams to debug any issues.

## More Examples

This repository is oragnized into multiple files that you can paste directly into the section of the interactive editor on **[Webex Developer Portal - Search Tasks](https://developer.webex-cx.com/documentation/search/search-tasks)**

| #   | File Name                                                                            | Comments                                                                                                                                                                 | Query Type              |
| --- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| 1   | [simple.graphql](More%20Examples/simple.graphql)                                     | SIMPLE: Simply retrieve all task IDs.                                                                                                                                    | Fetching raw data       |
| 2   | [basicFields.graphql](More%20Examples/basicFields.graphql)                           | BASIC: Basic query to request for certain fields.                                                                                                                        | Fetching raw data       |
| 3   | [advanced.graphql](More%20Examples/advanced.graphql)                                 | AGGREGATES/FORMULAS: Usage of filters, aggregates, pagination and custom fields.                                                                                         | Performing Aggregations |
| 4   | [callback.graphql](More%20Examples/callbackFilter.graphql)                           | FILTER: Get the Task details using CallBack filters and logical operators to match a condition.                                                                          | Fetching raw data       |
| 5   | [realTimeQueuedTasks.graphql](More%20Examples/realTimeQueuedTasks.graphql)           | FILTER: Fetch Real-time (Active) Queued Tasks on the System - using filters.                                                                                             | Fetching raw data       |
| 6   | [lastAgentInteraction.graphql](More%20Examples/lastAgentInteraction.graphql)         | LAST AGENT INTERACTIONS: Usage of filters, aggregates, pagination and custom fields to find when the customer called last in a 7 day window and who they reached.        | Performing Aggregations |
| 7   | [interactionDetails.graphql](More%20Examples/interactionDetails.graphql)             | INTERACTION DETAILS: Usage of filters, aggregates, pagination and custom fields to find out information about a specific interaction using INTERACTION ID/TaskID/CSR ID. | Performing Aggregations |
| 8   | [totalCallsByAni.graphql](More%20Examples/totalCallsByAni.graphql)                   | Filter with Aggregates: Usage of filters with aggregations, for total calls made by a specific customer.                                                                 | Performing Aggregations |
| 9   | [globalVariables.graphql](More%20Examples/globalVariables.graphql)                   | GLOBAL VARIABLES: Usage of the Global Variables field to extract a specific global variable or a combination of two global variables.                                    | Fetching raw data       |
| 10  | [globalVariableFilter.graphql](More%20Examples/globalVariableFilter.graphql)         | GLOBAL VARIABLES: Usage of the Global Variables as a FILTER to extract a specific tasks for a specific global variable.                                                  | Fetching raw data       |
| 11  | [allContactFields.graphql](More%20Examples/allContactFields.graphql)                 | ALL FIELDS: Extracting all fields from the Contact Session Record = Task Details.                                                                                        | Fetching raw data       |
| 12  | [allAgentSessionFields.graphql](More%20Examples/allAgentSessionFields.graphql)       | ALL FIELDS: Extracting all fields from the Agent Session Record = ASR Details.##                                                                                         | Fetching raw data       |
| 13  | [FetchAgentSkill.graphql](More%20Examples/FetchAgentSkill.graphql)                   | SKILLS : Extracting Agent skills from an ASR record                                                                                                                      | Fetching raw data       |
| 14  | [FilteringUsingAgentSkill.graphql](More%20Examples/FilteringUsingAgentSkill.graphql) | SKILLS : Filtering ASR records based on Agent skill criteria                                                                                                             | Fetching raw data       |
| 15  | [GroupByAgentSkills.graphql](More%20Examples/GroupByAgentSkills.graphql)             | SKILLS: Group ASR records based on set of skills                                                                                                                         | Performing Aggregations |

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
