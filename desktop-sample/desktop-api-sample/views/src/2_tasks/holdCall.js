import { callInfo } from "../desktop.js";

// hold call
export async function holdCall(taskId, token) {
  let raw = JSON.stringify({
    mediaResourceId: taskId
  });
  try {
    const posts = await fetch(`https://api.wxcc-us1.cisco.com/v1/tasks/${taskId}/hold`, {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${token.ccAccessToken}`,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: raw
    });
    const response = await posts.text();
    console.log(response + "hold call");

    setTimeout(() => {
      callInfo.textContent = "On Hold";
    }, 500);
  } catch (error) {
    console.log(error + " [taskId: ]" + taskId);
  }
}
