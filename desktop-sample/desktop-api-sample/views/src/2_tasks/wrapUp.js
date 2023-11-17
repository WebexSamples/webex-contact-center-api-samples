import { callInfo, agentStatus } from "../desktop.js";

// Wrap up
export async function wrapUp(taskId, token) {
  // add your own wrap-up if not programmatically fetching
  let auxCodeId = "AXsC77QbCsCfPjzFZ-4S";
  let wrapUpReason = "Account";
  let raw = JSON.stringify({
    auxCodeId,
    wrapUpReason
  });
  try {
    const posts = await fetch(`https://api.wxcc-us1.cisco.com/v1/tasks/${taskId}/wrapup`, {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${token.ccAccessToken}`,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: raw
    });
    const response = await posts.text();
    console.log(response + "wrap up");

    setTimeout(() => {
      callInfo.textContent = "Wrap Up Completed";
      callInfo.textContent = agentStatus;
    }, 500);
  } catch (error) {
    console.log(error + " [taskId: ]" + taskId);
  }
}
