import { callInfo } from "../desktop.js";

// end call
export async function endCall(taskId, token) {
    let raw = JSON.stringify({});
    try {
        const posts = await fetch(`https://api.wxcc-us1.cisco.com/v1/tasks/${taskId}/end`, {
            method: "POST",
            headers: {
                // Authorization: `Bearer ${token.ccAccessToken}`,
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: raw
        });
        const response = await posts.text();
        console.log(response + "end call");

        setTimeout(() => {
            callInfo.textContent = "Call Ended";
            callInfo.textContent = "Please wrap up call";
        }, 500);
    } catch (error) {
        console.log(error + " [taskId: ]" + taskId);
    }
}