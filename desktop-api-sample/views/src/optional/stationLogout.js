import { callInfo } from "../desktop.js";

// Station loginOut
export async function stationLogout(token, ciAgentId) {
  document.querySelector(".dialNumber").value = "";
  document.querySelector("#teamId").value = "";
  document.querySelector("#isExtension").value = "";
  let raw = JSON.stringify({
    logoutReason: "Logout initiated by user",
    agentId: ciAgentId
  });
  try {
    const posts = await fetch(`https://api.wxcc-us1.cisco.com/v1/agents/logout`, {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${token.ccAccessToken}`,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: raw
    });
    const response = await posts.text();
    // const result = response;
    console.log(response + "Station Logout Successful");
    setTimeout(() => {
      let submitBtn = document.querySelector("#enableDevice");
      submitBtn.classList.remove("removed");
      submitBtn.style.display = "block";

      let agentIcon = document.querySelector(".icon-agentLogout");
      agentIcon.classList.replace("icon-agentLogout", "notReady");

      // agentStatus.classList.replace("loginAgain", "agentLogout");
      let phoneColor = document.querySelector(".ready");
      phoneColor.classList.replace("ready", "notReady");
      callInfo.textContent = "Logged out";
    }, 500);
  } catch (error) {
    console.log(error);
  }
}
