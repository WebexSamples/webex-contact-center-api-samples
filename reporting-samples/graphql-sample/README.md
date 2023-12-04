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


### Filtering based on Scalar fields:

Scalar fields are atomic and represent indivisible values (Unlike object types,
which can have subfields and contain complex data structures).
Scalars include basic data types like Int, Long, String, Boolean

#### String Operators for filtering:

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

#### Numerical Operators for filtering:

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

### Filtering based on Composite objects:

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


### Pagination
Queries are restricted to returning a defined number of records, known as a page.
To retrieve successive pages, pagination feature is used.
The cursor is a unique identifier for a specific record, and it is used to determine the starting point for the next page of results.

| Type of query 	 	      | Page size | Maximum Cursor Value |
|------------------------|-----------|----------------------|
| task(CSR)              | 500       | 199                  |
| taskDetails(CSR + CAR) | 250       | 399                  |
| agentSession(ASR)      | 250       | No Limit             |
| taskLegDetails(CLR)    | 500       | 199                  |

NOTE: Cursor value for next request should not be incremented by 1 but instead value should be picked from pageInfo -> endCursor from response always.

#### Sample pagination query for CSR
```graphql
  {
    taskDetails(
        from: 1641789000000
        to: 1652157000000
        pagination: {
            # The cursor value present here should be the same as the endCursor value from the previous API response
            cursor: "2"
        }
    ) {
        tasks {
            id
        }
        pageInfo {
            # This gives the cursor value for the next page and can used in the cursor input above 
            endCursor
            hasNextPage
        }
    }
}
```
#### Sample pagination query for ASR
```graphql
{
  # Pagination
  # Include the pageInfo object in the query, to fetch hasNextPage and endCursor
  # If the hasNextPage is set to true the cursor can be passed in the next query
  agentSession(from: 1644859375000, to: 1671038575000
  pagination : {
    # Giving cursor as "NA" is equivalent of fetching the first cursor
    cursor : "NA"
  }
  ) {
    agentSessions {
      agentId
    }
    pageInfo {
      # Flag which indicates if the next page exists or not.
      hasNextPage
      # Nullable String (not  necessary a Numberic value) to fetch the next page
      endCursor
    }
  }
}

```
| Query Type/ Record                           | Query                                                                        | response                                                                           |
|----------------------------------------------|------------------------------------------------------------------------------|------------------------------------------------------------------------------------|
| agentSession query for ASR  using pagination | [link](agentSession/Raw%20Data%20Fetching/Pagination%20.graphql)             | [link](agentSession%2FRaw%20Data%20Fetching%2FPagination%20-response.json)                   |
| agentSession query for ASR  using pagination | [link](agentSession/Raw Data Fetching/Pagination 2.graphql)                  | [link](agentSession%2FRaw%20Data%20Fetching%2FPagination%20-response.json)                  |
| agentSession query for ASR  using pagination | [link](agentSession/Raw Data Fetching/Pagination 3.graphql)                  | [link](agentSession/Raw Data Fetching/Pagination 3-response.json)                  |
| taskDetails query for CSR using pagination   | [link](taskDetails/Samples for Raw Data Fetching/Pagination query.graphql)   | [link](taskDetails%2FSamples%20for%20Raw%20Data%20Fetching%2FPagination%20query%20-response.json)  |
| taskDetails query for CSR using pagination   | [link](taskDetails/Samples for Raw Data Fetching/Pagination query 2.graphql) | [link](taskDetails/Samples for Raw Data Fetching/Pagination query 2-response.json) |
| taskDetails query for CSR using pagination   | [link](taskDetails/Samples for Raw Data Fetching/Pagination query 3.graphql) | [link](taskDetails/Samples for Raw Data Fetching/Pagination query 3-response.json) |
| taskLegs query for CLR using pagination      | [link](taskLegDetails/Fetching Raw Data/Pagination.graphql)                  | [link](taskLegDetails/Fetching Raw Data/Pagination-response.json)                  |
| taskLegs query for CLR using pagination      | [link](taskLegDetails/Fetching Raw Data/Pagination 2.graphql)                | [link](taskLegDetails/Fetching Raw Data/Pagination 2-response.json)                |
| taskLegs query for CLR using pagination      | [link](taskLegDetails/Fetching Raw Data/Pagination 3.graphql)                | [link](taskLegDetails/Fetching Raw Data/Pagination 3-response.json)                |

###     Inner Pagination Support
For the TaskDetails API:
The default page size for CARs is set at 25, meaning that up to 25 CARs can be retrieved in a single query for a specific contact session.
If the need arises to fetch more than 25 CARs, you can utilize the "first" parameter as shown in the below example.

```graphql
{
    taskDetails(
        from: 1642215016949, to: 1646197282577
    ) {
        tasks {
            activities(first:2){
                totalCount
                nodes{
                    id
                }
                pageInfo{
                    hasNextPage
                    endCursor
                }
            }
        }
    }
}
```

For the AgentSession API:
The default page size for AARs is also set at 25, allowing for the retrieval of up to 25 AARs in a single query for a specific agent session.
If the need arises to fetch more than 25 AARs, you can utilize the "first" parameter as shown below.

Sample Query for AAR with Inner Pagination
```graphql
{
    agentSession(
        from: 1642215016949, to: 1646197282577
    ) {
        agentSessions {
            activities(first:2){
                totalCount
                nodes{
                    id
                }
                pageInfo{
                    hasNextPage
                    endCursor
                }
            }
        }
    }
}
```
Note: the maximum limit for the  "first" parameter is 100  and is applicable for both CAR and AAR.

| Query Type/ Record                                 | query                                                       | response                                                          |
|----------------------------------------------------|-------------------------------------------------------------|-------------------------------------------------------------------|
| agentSession query for AAR  using inner pagination | agentSession/Raw Data Fetching/innerPagination.graphql      | agentSession/Raw Data Fetching/innerPagination-response.json      |
| taskDetails query for CAR using inner pagination   | taskDetails/Performing Aggregations/innerPagination.graphql | taskDetails/Performing Aggregations/innerpagination-response.json |

### Pagination Support for Aggregation with Group By
Pagination can also be applied in case of queries which involve grouping based aggregation to fetch aggregation for more groups.
The endCursor value from a previous response should be used in the cursor.
If the cursor value is unknown , use "NA" or remove pagination cursor field.

Note:
1.We can have a max of 10 group by field as the cursor value.
2.Cursor value should have the same number of groupBy field and in same order as used in the request query

samples for aggregation with group by queries using pagination are given below 

| Query Type/ Record                                            | query                                                                                 | response                                                                                    |
|---------------------------------------------------------------|---------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| taskDetails query for CSR, aggregation using pagination       | taskDetails/Performing Aggregations/Aggregation pagination query.graphql              | taskDetails/Performing Aggregations/Aggregation pagination query -response.json             |
| taskDetails query for CSR, aggregation using pagination       | taskDetails/Performing Aggregations/Aggregation pagination query 2.graphql            | taskDetails/Performing Aggregations/Aggregation pagination query 2-response.json            |
| taskDetails query for CAR, aggregation using innerpagination  | taskDetails/Performing Aggregations/AggregationWithinnerPaginattionCAR.graphql        | taskDetails/Performing Aggregations/Aggregation pagination query 3-response.json            |
| agentSession query for ASR, aggregation using pagination      | agentSession/Performing Aggregations/Aggregation Pagination.graphql                   | agentSession/Performing Aggregations/Aggregation Pagination -response.json                  |
| agentSession query for ASR, aggregation using pagination      | agentSession/Performing Aggregations/Aggregation Pagination 2.graphql                 | agentSession/Performing Aggregations/Aggregation Pagination 2-response.json                 |
| agentSession query for AAR, aggregation using innerpagination | agentSession/Performing Aggregations/AggregationWithinnerPaginattionAAR.graphql       | agentSession/Performing Aggregations/AggregationWithinnerPaginattionAAR-response.json       |
| taskLegDetails query for CLR, aggregation using pagination    | taskLegDetails/Performing Aggregations/Group by Aggregation with Pagination.graphql   | taskLegDetails/Performing Aggregations/Group by Aggregation with Pagination - response.json |
| taskLegDetails query for CLR, aggregation using pagination    | taskLegDetails/Performing Aggregations/Group by Aggregation with Pagination 2.graphql | taskLegDetails/Performing Aggregations/Group by Aggregation with Pagination 2-response.json |
