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

| Query Type/ Record                              | Query                                                                           | Response                                                                              |
| ----------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| taskDetails query for CSR  using binary filter  | [link](taskDetails/Samples for Raw Data Fetching/binaryFilterOperators.graphql) | [link](taskDetails/Samples for Raw Data Fetching/binaryFilterOperators-response.json) |
| agentSession query for ASR  using binary filter | [link](agentSession/Raw Data Fetching/binaryFilterOperation.graphql)            | [link](agentSession/Raw Data Fetching/binaryFilterOperation-response.json)            |
| taskLegs query for CLR  using binary filter     | [link](taskLegDetails/Fetching Raw Data/Simple Filtering.graphql)               | [link](taskLegDetails/Fetching Raw Data/Simple Filtering-response.json)               |

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

| Query Type/ Record                                  | Query                                                                                        | Response                                                                                           |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| taskDetails query for CSR using compound operator   | [link](taskDetails/Samples for Raw Data Fetching/Filtering using compound operators.graphql) | [link](taskDetails/Samples for Raw Data Fetching/Filtering using compound operators-response.json) |
| agentSession query for ASR  using compound operator | [link](agentSession/Raw Data Fetching/Filtering using compound operators.graphql)            | [link](agentSession/Raw Data Fetching/Filtering using compound operators-response.json)            |
| taskLegs query for CLR  using compound operator     | [link](taskLegDetails/Fetching Raw Data/Filtering using compound operators.graphql)          | [link](taskLegDetails/Fetching Raw Data/Filtering using compound operators-response.json)          |

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
| agentSession query with filter on object of ASR   | [link](agentSession/Raw Data Fetching/Filtering on object types.graphql)                          | [link](agentSession/Raw Data Fetching/Filtering on object types-response.json)                          |
| agentSession query for filtering on object of AAR | [link](agentSession/Raw%20Data%20Fetching/FitleringOnextFilter.graphql)                           | [link](agentSession/Raw%20Data%20Fetching/FilteringOnextFilter-response.json)                           |
| taskLegDetails query with filter on object of CLR | [link](taskLegDetails/Fetching Raw Data/Filtering on object types.graphql)                        | [link](taskLegDetails/Fetching Raw Data/Filtering on object types-response.json)                        |
