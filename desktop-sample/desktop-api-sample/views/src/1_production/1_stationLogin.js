import { callInfo } from "../desktop.js";

// Station login
export async function stationLogin(token) {
  let dialNumber = document.querySelector(".dialNumber").value;
  let teamId = document.querySelector("#teamId").value;
  let isExtension = document.querySelector("#isExtension").value;
  let raw = JSON.stringify({
    dialNumber,
    teamId,
    isExtension,
    roles: ["Agent"]
  });
  try {
    const posts = await fetch(`https://api.wxcc-us1.cisco.com/v1/agents/login`, {
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
    console.log(response + "Station Login Successful");
    setTimeout(() => {
      enableDevice.setAttribute(
        "style",
        ` transition: opacity 1s ease; display:none;
      `
      );
      let ready = document.querySelector(".notReady");
      ready.classList.replace("notReady", "ready");
      callInfo.textContent = "";
    }, 500);
  } catch (error) {
    console.log(error);
  }
}
