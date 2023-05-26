import fetch from "node-fetch";
import { decide } from "../decide.js";

export async function callStatsByQueue() {
  let info = await decide();
  let org_id = info.org_id;
  let token = await info.fetchToken;

  try {
    // graphQL Query
    const query = `
  {
    #TOTAL CALLS BY Queue and Average Handle Time by Queue
  
    task(
      from: 1673729535000 #This can be set to Date.now() - (days * 24 * 60 * 60 * 1000) for look back in days
      to: ${Date.now()}  #This can be set to Date.now() in ms
      timeComparator: createdTime
      filter: {
        and: [
          { direction: { equals: "inbound" } }
          { channelType: { equals: telephony } }
        ]
      }
      aggregations: [
        { field: "id", type: count, name: "Total Contacts by Queue" }
        { field: "queueDuration", type: average, name: "Average Queue Time" }
        { field: "queueDuration", type: max, name: "Maximum Queue Time" }
        {
          field: "totalDuration"
          type: average
          name: "Average Handle Time by Queue"
        }
      ]
    ) {
      tasks {
        lastQueue {
          name
          id
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
  `;

    const posts = await fetch(`https://api.wxcc-us1.cisco.com/search?orgId=${org_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        query
      })
    });
    const response = await posts.json();
    let results = await response.data.task.tasks;
    // console.log(results);
    return results;
  } catch (error) {
    // console.log(`network issue ${error}`);
  }
}
