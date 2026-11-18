# Queue Business Hours Data Dictionary

Queue Business Hours (QBH) fields expose queue wait duration counted during the working time in the queue's Business Hours configuration. All duration values below use the GraphQL `Long` type and are measured in milliseconds.

## Fields

| Search API query | Record type | Field name | Description |
| --- | --- | --- | --- |
| `taskDetails` | [Customer Session Record (CSR)](CSR.md) | `queueDurationBusinessHours` | Cumulative queue wait duration during business hours for the contact session. |
| `taskDetails` | [Customer Session Record (CSR)](CSR.md) | `lastQueue.durationBusinessHours` | Business Hours-aware queue duration exposed on the `lastQueue` object. This uses the same contact-session Business Hours duration as `queueDurationBusinessHours`. |
| `taskLegDetails` | [Call Leg Record (CLR)](CLR.md) | `queue.durationBusinessHours` | Queue wait duration during business hours for the call leg. |
| `topicAnalytics` | Topic analytics | `queueDurationBusinessHours` | Queue wait duration during business hours for the interaction represented by the topic analytics record. |
| `customerInsights` | Customer insights | `totalWaitTimeBusinessHours` | Total queue wait duration during business hours across the customer's contacts in the requested time range. |

The existing CSR and CLR dictionaries describe the supported aggregation, group-by, filtering, and sorting operations for their fields. `customerInsights` also supports filtering `totalWaitTimeBusinessHours` with a `LongExpression`. The `topicAnalytics` filter does not expose `queueDurationBusinessHours`.

## Contact-session and call-leg examples

The following query selects both the overall queue wait duration and its Business Hours-aware counterpart. Supply `from` and `to` as epoch timestamps in milliseconds.

```graphql
query QueueBusinessHours($from: Long!, $to: Long!) {
  taskDetails(from: $from, to: $to) {
    tasks {
      id
      queueDuration
      queueDurationBusinessHours
      lastQueue {
        id
        name
        durationBusinessHours
      }
    }
  }
  taskLegDetails(from: $from, to: $to) {
    taskLegs {
      id
      taskId
      queue {
        id
        name
        duration
        durationBusinessHours
      }
    }
  }
}
```

The nested `durationBusinessHours` field belongs to `lastQueue` for a CSR and to `queue` for a CLR. For query arguments and pagination, see [Getting started with the Search API using GraphQL](../README.md).
