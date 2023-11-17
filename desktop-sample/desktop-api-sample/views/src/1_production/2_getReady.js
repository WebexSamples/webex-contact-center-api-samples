import { callInfo, agentStatus } from "../desktop.js";

// Get Ready
export async function getReady(token) {
  console.log(agentStatus);
  //Call Info
  const status = document.querySelector("#status");
  let statusText = status.options[status.selectedIndex].text;
  let statusValue = null;

  switch (statusText) {
    case "Available":
      statusText = "Available";
      statusValue = "0";
      break;
    case "Lunch":
      statusText = "Idle";
      statusValue = "AXZxaC0KgHvT6JNFiA-g";
      break;
    case "Not Ready":
      statusText = "Idle";
      statusValue = "AXiD8SMWWbHEHKpTt6_D";
      break;

    default:
      break;
  }

  let raw = JSON.stringify({
    state: statusText,
    auxCodeId: statusValue
  });
  try {
    const posts = await fetch(`https://api.wxcc-us1.cisco.com/v1/agents/session/state`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: raw
    });
    const response = await posts.text();
    console.log(`${response} ${statusText} now `);

    const getReadySVG = document.querySelector("#hourGlass");
    console.log(agentStatus);
    if (agentStatus == "Available") {
      getReadySVG.classList.replace("available", "notAvailable");
      callInfo.textContent = agentStatus;
    } else if (agentStatus == "Not Ready") {
      callInfo.textContent = agentStatus;
      getReadySVG.classList.replace("notAvailable", "available");
    } else if (agentStatus == "Lunch") {
      callInfo.textContent = agentStatus;
      getReadySVG.classList.replace("notAvailable", "available");
    }
  } catch (error) {
    console.log(error);
  }
}
