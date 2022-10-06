import { accessToken } from "./token.js";
import { getAgentStatus } from "./0_webSocket/getAgentStatus.js";
import { getSocketURL } from "./0_webSocket/getSocketURL.js";
import { stationLogin } from "./1_production/1_stationLogin.js";
import { getReady } from "./1_production/2_getReady.js";
import { holdCall } from "./2_tasks/holdCall.js";
import { resumeCall } from "./2_tasks/resumeCall.js";
import { endCall } from "./2_tasks/endCall.js";
import { wrapUp } from "./2_tasks/wrapUp.js";
import { stationLogout } from "./optional/stationLogout.js";

let processToken = await accessToken();
let token = await processToken();
console.log(token);

let taskId = null;
let ciAgentId = null;
export let agentStatus = null;
// should be state management
export let callInfo = document.querySelector(".callInfo");
export let ready = document.querySelector(".notReady");

// socket;
async function socketEvent() {
  let socketURL = await getSocketURL(token);
  console.log(socketURL);
  let socket = new WebSocket(socketURL);

  socket.onmessage = function (event) {
    console.log(`[message] Data received from server: ${event.data}`);
    let getWSInfo = event.data;
    ciAgentId = getWSInfo.agentId;

    if (getWSInfo.includes("Welcome")) {
      let agent = JSON.parse(event.data);
      ciAgentId = agent.data.agentId;
    }
    if (getWSInfo.includes("interactionId")) {
      let id = JSON.parse(event.data);
      taskId = id.data.interactionId;
    }
    if (getWSInfo.includes("INBOUND")) {
      callInfo.textContent = "ON A CALL";
      callInfo.textContent = agentStatus;
      let taskList = document.querySelector(".taskList");
      taskList.style.display = "block";
    }
    // if (getWSInfo.includes("AgentReloginSuccess")) {
    //   let res = JSON.parse(event.data);
    //   agentStatus = res.data.subStatus;
    //   console.log(agentStatus);
    //   callInfo.textContent = agentStatus;
    // }
    // if (getWSInfo.includes("AGENT_MAX_CONNECTIONS_EXCEEDED")) {
    //   let res = JSON.parse(event.data);
    //   reason = res.data.reason;
    //   console.log(reason);
    //   callInfo.textContent = reason;
    // }
  };
  getAgentStatus(token);
}

socketEvent();

//  ---------------- Event handlers ----------------------- \\

// Station login: Submit to Enable Device
let enableDeviceEvent = document.querySelector("#enableDevice");
enableDeviceEvent.addEventListener("click", async () => {
  socketEvent();
  stationLogin(token);
  enableDeviceEvent.classList.add("removed");
  getAgentStatus(token);
});

// Get Ready Status
let getReadyStatus = document.querySelector("#status");
getReadyStatus.addEventListener("change", async () => {
  socketEvent();
  getReady(token);
  getAgentStatus(token);
});

// hold call
const holdCallEvent = document.querySelector("#holdCall");
holdCallEvent.addEventListener("click", async () => {
  socketEvent();
  holdCall(taskId, token);
  getAgentStatus(token);
});

// resume call
const resumeCallEvent = document.querySelector("#resumeCall");
resumeCallEvent.addEventListener("click", () => {
  socketEvent();
  resumeCall(taskId, token);
  getAgentStatus(token);
});

// end call
const endCallEvent = document.querySelector("#endCall");
endCallEvent.addEventListener("click", () => {
  socketEvent();
  endCall(taskId, token);
  getAgentStatus(token);
});

// wrap up
const wrapUpEvent = document.querySelector("#wrapUpCall");
wrapUpEvent.addEventListener("click", () => {
  socketEvent();
  wrapUp(taskId, token);
  getReady(token);
  setTimeout(() => {
    let taskList = document.querySelector(".taskList");
    taskList.style.display = "none";
  }, 3000);
});

/// DELETE  closeSocket :  used only for testing.....

// station logout
let stationLogoutEvent = document.querySelector(".icon-agentLogout");
stationLogoutEvent.addEventListener("click", () => {
  socketEvent();
  stationLogout(token, ciAgentId);
});
