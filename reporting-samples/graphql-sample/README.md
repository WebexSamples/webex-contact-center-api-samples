## Support for Filtering data

Filtering of data is supported using the `filter` and `extFilter` arguments which is supported in context of fetching raw data and while performing aggregations, the syntax remains same in both the context.

The distinction between `filter` and `extFilter` is type of fields they allow filtering on. In a *taskDetails* query, `filter` is used for filtering data based on fields available in a CSR record and `extFilter` is used for filtering data based on fields available in a CAR record, Simlarlty In an *agentSession* query, `filter` is used for filtering based on  ASR fields and `extFilter` is used for filtering based on AAR fields.
In a *taskLegDetails* query `extfilter`  is **not** supported and  `filter` can be used to filter data based on CLR fields.

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
 use equals or notequals operator to filter on exact match of a string field
```graphql
    filter: {
         channelType: { equals: telephony } 

    }
```

use match operator to filter on a pattern match of a string field
```graphql
            filter: {
                channelType: { match: tel.* } 
        
            }
        
```
use contains operator to filter on a substring match of a string field
```graphql
        filter: {
            channelType: { contains: tele } 
    
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
            and: [
                { channelType: { equals: telephony } }
                {
                    or: [
                        # For Numeric fields - lte, lt , gte, gt, equals, notequals are available.
                        { totalDuration: { lte: 10000 } }
                        { totalDuration: { gte: 600000 } }
                    ]
                }
                # lastTeam name should not be null.
                { lastTeam: { name: { notequals: null } } }
            ]
        }
```

| Query Type/ Record                              | Query                                                                           | Response                                                                              |
| ----------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| taskDetails query for CSR  using binary filter  | [link](taskDetails/Samples for Raw Data Fetching/binaryFilterOperators.graphql) | [link](taskDetails/Samples for Raw Data Fetching/binaryFilterOperators-response.json) |
| agentSession query for ASR  using binary filter | [link](agentSession/Raw Data Fetching/binaryFilterOperation.graphql)            | [link](agentSession/Raw Data Fetching/binaryFilterOperation-response.json)            |
| taskLegs query for CLR  using binary filter     | [link](taskLegDetails/Fetching Raw Data/Simple Filtering.graphql)               | [link](taskLegDetails/Fetching Raw Data/Simple Filtering-response.json)               |

##### Filter using compound operators:

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

| Query Type/ Record                                  | Query                                                                                        | Response                                                                                           |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| taskDetails query for CSR using compound operator   | [link](taskDetails/Samples for Raw Data Fetching/Filtering using compound operators.graphql) | [link](taskDetails/Samples for Raw Data Fetching/Filtering using compound operators-response.json) |
| agentSession query for ASR  using compound operator | [link](agentSession/Raw Data Fetching/Filtering using compound operators.graphql)            | [link](agentSession/Raw Data Fetching/Filtering using compound operators-response.json)            |
| taskLegs query for CLR  using compound operator     | [link](taskLegDetails/Fetching Raw Data/Filtering using compound operators.graphql)          | [link](taskLegDetails/Fetching Raw Data/Filtering using compound operators-response.json)          |

##### extFilter using compund operators:

| Query Type/ Record                        | Query                                                                                  | Response                                                                                     |
| ----------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| taskDetails,complex object query for CAR  | [link](taskDetails/Samples for Raw Data Fetching/extFilteringOnComplexObjects.graphql) | [link](taskDetails/Samples for Raw Data Fetching/extFilteringOnComplexObjects-response.json) |
| agentSession,complex object query for AAR | [link](agentSession/Raw Data Fetching/extFilteringOnComplexObject.graphql)             | [link](agentSession/Raw Data Fetching/extFilteringOnComplexObject-response.json)             |

### Filter on Composite objects:

Filtering can also be done based scalar fields present in another  objects,
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


##### Fields supported for Filtering:

Refer Data Dictionary section for fields supporting filtering.