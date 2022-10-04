import { callInfo } from "../desktop.js";

// resume  call
export async function resumeCall(taskId, token) {
  let raw = JSON.stringify({
    mediaResourceId: taskId
  });
  try {
    const posts = await fetch(`https://api.wxcc-us1.cisco.com/v1/tasks/${taskId}/unhold`, {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${token.ccAccessToken}`,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: raw
    });
    const response = await posts.text();
    console.log(response + "resume call");

    setTimeout(() => {
      callInfo.textContent = "ON A CALL";
    }, 500);
  } catch (error) {
    console.log(error + " [taskId: ]" + taskId);
  }
}
