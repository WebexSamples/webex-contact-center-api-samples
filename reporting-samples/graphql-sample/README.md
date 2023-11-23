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

### Basics

All the queries defined by the `/search` API has the same structure. Lets take a sample **taskDetails** query. 

```graphql
{
  taskDetails(from: 1685577600000, to: 1688169600000) {
    tasks {
      id
      createdTime
      endedTime
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



After the arguments, the query defines the fields to be fetched, *[Fields](https://graphql.org/learn/queries/#fields)* can be of scalar types such as *string*, *int*, *float* etc. or can be an *object*. 

In the sample query, **id**, **createdTime** and **lastAgent** fields are requested from the **tasks** object, Note that **lastAgent** is an *object* in itself and **id** field is requested from that object. 

For more clarity we refer such fieldswhich are nested, by their full path, In this case we will refer the **id** field present inside **lastAgent** *object* as **lastAgent.Id**.

The fields requested in the query define the response JSON. For the above sample query the response will be 

```json
{
  "data": {
    "taskDetails": {
      "tasks": [
        {
          "id": "6b26d5ce-ab4d-46c2-9cb5-6c36c5714a7c",
          "createdTime": 1687855049831,
          "endedTime": 1687856652283,
          "lastAgent": {
            "id": "8e59aa37-f222-4fd2-a95c-d1a46f57dbc0"
          }
        },
        {
          "id": "945d92f3-8ae8-4a63-85d6-c235a0f9fbc7",
          "createdTime": 1687851550519,
          "endedTime": 1687851612772,
          "lastAgent": {
            "id": null
          }
        }
      ]
    }
  }
}
```



### Query Definitions

The following sections describe the query types in detail.



#### TaskDetails Query

A taskDetails query operates over Task data in WxCC. As the GraphQL schema the structure is defined as 

```graphql
taskDetails(
    from: Long!
    to: Long!
    timeComparator: QueryTimeType
    filter: TaskDetailsFilters
    extFilter: TaskDetailsSpecificFilters
    aggregation: TaskAggregationFilters
    aggregations: [TaskV2Aggregation]
    aggregationInterval: IntervalData
    pagination: Pagination
): TaskDetailsList
```

##### Arguments

1.  *from* - Mandatory Argument, Accepts a *Long* value representing epoch timestamp which defines the start of the query span, By default the `createdTime` field used for comparision, but this can be overriden to use `endedTime` by using the `timeComparator` argument.

2. *to* - Mandatory Argument, Accepts a *Long* value representing epoch timestamp which defines the end of the query span, By default the `createdTime` field used for comparision, but this can be overriden to use `endedTime` by using the `timeComparator` argument.

3. *timeComparator* - Optional Argument, Accepts a value of `QueryTimeType` type, This defines which field should `from` and `to` arguments use for retrieving documents.

4. *filter* - Optional Argument, Accepts an *TaskDetailsFilters* object, This is used to filter results based on a user defined criteria, Refer filtering section for more details. 

5. *extFilter* - Optional Argument, Accepts an *TaskDetailsSpecificFilters* object, This is used to filter results based on a user defined criteria, `filter` and `extFilter` define criteria for different fields, Refer filtering section for more details.

6. *aggregation* - Optional Argument, Deprecated, Use `aggregations`.

7. *aggregations* - Optional Argument, Accepts a List of `TaskV2Aggregation`, This is used to perform aggregations over data. Refer aggregations section for more details.

8. *aggregationInterval*- Optional Argument, Accepts a `IntervalData` object, This is used when time-based aggregation needs to be performed. Refer aggregations section for more details.

9. *pagination* - Optional Argument, Accepts an object of `Pagination` object, This is used to perform pagination. Refer pagination section for more details.



### Performing Aggregations

Any query with the  `aggregations` argument is treated as an aggregation query, which accepts a list of objects.

Each object requires the following mandatory arguments :

1. *field* - String, denotes the identifier/field-name on which the aggregation needs to be done.
2. *type* - Enum, defines the aggregation operation, depending on the data type of the field specified the following aggregations are supported. 
   
   | Type        | Description                                                             | Supported data types |
   | ----------- | ----------------------------------------------------------------------- |:--------------------:|
   | count       | Counts the number of occurrence across documents for a particular field | Int, Long, String    |
   | sum         | Returns sum of values across documents for a particular field.          |                      |
   | min         | Returns minimum  value across documents for a particular field.         |                      |
   | max         |                                                                         |                      |
   | average     |                                                                         |                      |
   | cardinality |                                                                         |                      |
   
   
   * count - Counts the number of occurrence of the field
   
   * sum  - 
   
   * min  - 
   
   * average
   
   * max
   
   * cardinality
   
   
3. *name* - String, identifier to determine the result of the aggregation operation.

The following arguments are optional :   

1. *filter* - Denotes the filter-criteria for documents for the particular aggregation.

2. *predicate* - Applicable only for global variables, Refer Global Variable section.















### Appendix

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
