import fetch from "node-fetch";
import { decide } from "../decide.js";

export async function totalAgentSessionsRealTime() {
  let info = await decide();
  let org_id = info.org_id;
  let token = await info.fetchToken;

  try {
    // graphQL Query
    const query = `
  {
    #FILTER: Fetch Real-time (Active) Queued Tasks on the System - using filters.
    task(
      from: 1673729535000 #This can be set to Date.now() - (days * 24 * 60 * 60 * 1000) for look back in days
      to: ${Date.now()}  #This can be set to Date.now() in ms
      filter: {
        #The main filter for active tasks is isActive: true
        and: [
          { channelType: { equals: telephony } }
           #{ status: { equals: "parked" } }
          { direction: { equals: "inbound" } }
          { isActive: { equals: true } }
        ]
      }aggregations: {
        field: "isActive"
        type: count
        name: "Total Active Calls"
      }
    ) {
      tasks {
        #Add more fields here as needed
        
        isActive
        
        aggregation {
          name
          value
        }
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

    return results;
  } catch (error) {
    // console.log(`network issue ${error}`);
  }
}
