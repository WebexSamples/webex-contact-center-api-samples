import { Desktop } from "@wxcc-desktop/sdk";

const template = document.createElement("template");

template.innerHTML = `
  <style>

  .container{
    font-family: 'Poppins', sans-serif;
    display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-column-gap: 10px;
    overflow: scroll;  
  }
  .outline {
    box-shadow: 10px 10px 20px -9px rgba(0,0,0,0.75);
    margin-bottom: 25px;
    padding: 12px;
    height: 100px;
  }
  .button{
    display: block;
    border-radius: 5px;
    background: #064157;
    color: white;
    padding: 4px;
    margin-top: 10px;
    width: 100%;
    border: none;
    transition:.3s;
  }
  
  input{
    border-top: none;
    border-right: none;
    border-left: none;
    border-color: #DDDDDD;
    border-width: 1.5px;
    color: #005E7D
  }
  *:focus {
    outline: none;
  }
  fieldset{
    border-radius: 5px;
  }
  .atr{
    color: #899499;
  }
  .space{
    margin-bottom: 10px;
  }
  .val{
    color: #005E7D;
    font-weight: bold;
  }
  legend {
    color: #064157;
  }

  .outline:hover legend{
    color:#007AA3;
    transition: 1s;
  }
  .outline:hover .button{
    color:#fff;
    background-color:#007AA3;
    cursor: pointer;
    transition:  1s;
  }

  .hold {
    box-shadow: 10px 10px 20px -9px rgba(0,0,0,0.75);
    margin-bottom: 25px;
    padding: 12px;
    height: 100px;
  }
  .unHold {
    box-shadow: 10px 10px 20px -9px rgba(0,0,0,0.75);
    margin-bottom: 25px;
    padding: 12px;
    height: 100px;
  }

  .hold:hover legend{
    color:#D4371C;
    transition: 1s;
  }
  .hold:hover .button{
    color:#fff;
    background-color:#D4371C;
    cursor: pointer;
    transition:  1s;
  }

  .unHold:hover legend{
    color:#00853C;
    transition: 1s;
  }
  .unHold:hover .button{
    color:#fff;
    background-color:#00853C;
    cursor: pointer;
    transition:  1s;
  }

  input[type="tel"]
{
    background: rgba(0, 0, 0, 0);
    border: none;
    border-bottom: 1px solid DarkGray;
    outline: none;
}

  input[type="text"]
{
    background: rgba(0, 0, 0, 0);
    border: none;
    border-bottom: 1px solid DarkGray;
    outline: none;
    float: right;
}
.letters{
  letter-spacing: 3px;
  font-size: 1em;
  width: 200px;
}
.icon {
  margin-left: 30px;
  font-size: 2em;
}

  .imageBkGd {
    background: url(https://wxccdemo.s3.us-west-1.amazonaws.com/widgets/background/voice_bkg4.png);
    background-repeat: no-repeat;
  }

  .list {
    background-color: transparent;
    color: darkgray;
    border: 1px solid darkgray;
    padding: 0 1em 0 0;
    margin: 0;
    width: 90%;
    font-family: inherit;
    cursor: pointer;
    border-radius: 5px;
  }
  .list:focus{
    color: #00853C;
    font-size: 1.1em;
  }
 
 
  @media screen and (max-width:1200px){
    .container{
      grid-template-columns: repeat(2, 1fr);
      height: 100%;
      overflow: scroll;  
    }
  }
  @media screen and (max-width:600px){
    .container{
      grid-template-columns: repeat(2, 1fr);
      height: 100%;
      overflow: scroll;  
    }
  }
  @media screen and (max-width:599px){
    .container{
      grid-template-columns: repeat(1, 1fr);
      height: 100%;
      overflow: scroll;  
    }
  }
  </style>

  <div class="container">
          <div>
                <fieldset class="outline imageBkGd">
                  <legend> <b>Make an OutDial Call</b></legend>
                  <div>
                  <span class="atr" >OutDial EP Id #</span>
                    <input class="val" type="text" id="entryPointId" onfocus="this.value=''"></input>
                    <span class="atr" >Destination # </span>
                    <input class="val" type="text" id="destination" onfocus="this.value=''"></input>
                    <button class="button" id ="makeCallButton">Call</button>
                  </div>
                </fieldset>
          </div>
          <div>
                <fieldset class="outline imageBkGd">
                  <legend> <b>Transfer to Queue</b></legend>
                  <div>
                    <br>
                    <span class="atr" >Queue Id #</span>
                    <input class="val" type="text" id="queueId" onfocus="this.value=''"></input>
                    <button class="button" id ="transferToQueue">Transfer to Queue</button>
                  </div>
                </fieldset>
          </div>
          <div>
                <fieldset class="outline imageBkGd">
                  <legend> <b>Transfer to Entry Point</b></legend>
                  <div>
                    <br>
                    <span class="atr" >Entry Point Id #</span>
                    <input class="val" type="text" id="entryPtId" onfocus="this.value=''"></input>
                    <button id ="transferToEndPoint" class="button">Transfer to Entry Point</button>
                  </div>
                </fieldset>
          </div>
          <div>
              <fieldset class="outline imageBkGd">
                <legend> <b>Transfer to DN ie Blind-Transfer</b></legend>
                  <div>
                  <br>
                  <span class="atr" >Dest Phone #</span>
                  <input class="val" type="tel" id="phoneDN" onfocus="this.value=''"></input>
                    <br>
                    <button id ="transferToDN" class="button"> Blind Transfer to DN</button>
                  </div>
              </fieldset>
          </div>
          <div>
              <fieldset class="outline imageBkGd">
                <legend> <b>Consult to Agent</b></legend>
                  <div>
                    <span class="atr" >Agent Id #</span>
                      <input class="val" type="text" id="conAgentId" onfocus="this.value=''"></input>
                    <span class="atr" >DestAgent Id # </span>
                      <input class="val" type="text" id="conDestAgentId" onfocus="this.value=''"></input>
                    <button class="button" id ="consultAgent">Consult to Agent</button>
                  </div>
              </fieldset>
          </div>
          <div>
              <fieldset class="outline imageBkGd">
                <legend> <b>Consult to DN</b></legend>
                  <div>
                    <br>
                    <span class="atr" >Dest Phone #</span>
                    <input class="val" type="text" id="consultDNId" onfocus="this.value=''"></input>
                    <button class="button" id ="consultDN">Consult to DN</button>
                  </div>
              </fieldset>
          </div>
          <div>
              <fieldset class=" hold imageBkGd">
                <legend> <b>Hold</b></legend>
                  <div>
                  <br>
                  <br>
                    <button class=" button" id ="hold">Hold</button>
                  </div>
              </fieldset>
          </div>
          <div>
              <fieldset class=" unHold imageBkGd">
                <legend> <b>unHold</b></legend>
                  <div>
                  <br>
                  <br>
                    <button class=" button" id ="unHold">UnHold</button>
                  </div>
              </fieldset>
          </div>
          <div>
              <fieldset class="outline imageBkGd">
                <legend> <b>Pause Recording</b></legend>
                  <div>
                    <div class="atr space">Enter CreditCard/watch record pause </div>
                    <div class="val"><input class="val letters" type="tel" id="credit" placeholder=" 0000 0000 0000 0000"></input><span class="icon">&#128179;</span></div>
                  </div>
              </fieldset>
          </div>
          
  </div>
`;

//Creating a custom logger
const logger = Desktop.logger.createLogger("Niko-logger");

class myDesktopSDK extends HTMLElement {
  constructor() {
    super();

    // Google font
    const font = document.createElement("link");
    font.href = "https://fonts.googleapis.com/css2?family=Cutive+Mono&family=Darker+Grotesque:wght@300&family=Poppins:wght@200;400&display=swap";
    font.rel = "stylesheet";
    document.head.appendChild(font);

    // Step 1
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.interactionId = null;
  }

  connectedCallback() {
    this.init();
    this.getAgentInfo();
  }

  disconnectedCallback() {
    // alert("remove some functions...")
    Desktop.agentContact.removeAllEventListeners();
  }

  // Sample function to print latest data of agent
  getAgentInfo() {
    const latestData = Desktop.agentStateInfo.latestData;
    logger.info("myLatestData", latestData);
  }

  // Get form input fields
  inputElement(name) {
    return this.shadowRoot.getElementById(name);
  }

  // clear inputs fields on focus

  async init() {
    // Initiating desktop config
    Desktop.config.init();

    // ************************** Event listeners ************************** \\

    // Make an OutDial Call
    this.shadowRoot.querySelector(".button").addEventListener("click", () => this.makeCall(this.inputElement("entryPointId").value, this.inputElement("destination").value));

    // Transfer to Queue
    this.shadowRoot.getElementById("transferToQueue").addEventListener("click", e => {
      this.transferToQueue(this.inputElement("queueId").value);
    });

    // Transfer to endPoint
    this.shadowRoot.querySelector("#transferToEndPoint").addEventListener("click", e => {
      this.transferToEntryPnt(this.inputElement("entryPtId").value);
    });

    // Transfer to DN ie Blind-Transfer
    this.shadowRoot.querySelector("#transferToDN").addEventListener("click", e => {
      this.transferToDN(this.inputElement("phoneDN").value);
    });

    // Consult to Agent
    this.shadowRoot.querySelector("#consultAgent").addEventListener("click", e => {
      this.consultToAgent(this.inputElement("conAgentId").value, this.inputElement("conDestAgentId").value);
    });

    // Consult to DN
    this.shadowRoot.querySelector("#consultDN").addEventListener("click", e => {
      this.consultToDN(this.inputElement("consultDNId").value);
    });

    // Hold
    this.shadowRoot.querySelector("#hold").addEventListener("click", e => {
      this.holdCall();
    });

    // unHold
    this.shadowRoot.querySelector("#unHold").addEventListener("click", e => {
      this.unHoldCall();
    });

    // Pause recording
    this.shadowRoot.getElementById("credit").addEventListener("focus", () => this.pauseRecord());
  }

  // Get interactionID, but more info can be obtained from this method
  async getInteractionId() {
    const currentTaskMap = await Desktop.actions.getTaskMap();
    for (const iterator of currentTaskMap) {
      const interId = iterator[1].interactionId;
      return interId;
    }
  }

  // Make an OutDial Call
  async makeCall(entryPointId, destination) {
    //entrypoint is the OutDial Entrypoint
    //Origin is the OutDial ANI
    try {
      const outDial = await Desktop.dialer.startOutdial({
        data: {
          entryPointId,
          destination,
          direction: "OUTBOUND",
          origin: "+1xxxxxxxxxx",
          attributes: {},
          mediaType: "telephony",
          outboundType: "OUTDIAL"
        }
      });
      logger.info("myOutDial" + JSON.stringify(outDial));
    } catch (error) {
      Desktop.dialer.addEventListener("eOutdialFailed", msg => logger.info(msg));
    }
  }

  // Transfer to Queue
  async transferToQueue(queueId) {
    let interactionId = await this.getInteractionId();
    let response = await Desktop.agentContact.vteamTransfer({
      interactionId,
      data: {
        vteamId: queueId, // replace with your onw Queue
        vteamType: "inboundqueue"
      }
    });

    logger.info("transferToQueue" + JSON.stringify(response));
  }

  // Transfer to entry Point
  async transferToEntryPnt(entryPtId) {
    let interactionId = await this.getInteractionId();
    let response = await Desktop.agentContact.vteamTransfer({
      interactionId,
      data: {
        vteamId: entryPtId, // replace with your onw EP
        vteamType: "inboundentrypoint"
      }
    });

    logger.info("transferToEndpoint" + JSON.stringify(response));
  }

  // Transfer to DN ie Blind-Transfer
  async transferToDN(phoneDN) {
    let interactionId = await this.getInteractionId();
    let response = await Desktop.agentContact.blindTransfer({
      interactionId,
      data: {
        destAgentId: phoneDN,
        mediaType: "telephony",
        destinationType: "DN"
      }
    });

    logger.info("transferToDN" + JSON.stringify(response));
  }

  // Consult to Agent
  async consultToAgent(conAgentId, conDestAgentId) {
    let interactionId = await this.getInteractionId();
    let response = await Desktop.agentContact.consult({
      interactionId,

      data: {
        agentId: conAgentId, // replace with your onw Agent
        destAgentId: conDestAgentId, // replace with your onw Dest Agent
        mediaType: "telephony",
        destinationType: "Agent"
      }
    });

    logger.info("consultToAgent" + JSON.stringify(response));
  }

  // Consult to DN
  async consultToDN(consultDNId) {
    let interactionId = await this.getInteractionId();
    let response = await Desktop.agentContact.consult({
      interactionId,

      data: {
        agentId: "dff61993-b9a3-4e74-8f57-32f92529ccd7", // replace with your onw Agent
        destAgentId: consultDNId, // replace with your onw Dest Agent
        mediaType: "telephony",
        destinationType: "DN"
      }
    });

    logger.info("consultToDN" + JSON.stringify(response));
  }

  // Hold
  async holdCall() {
    let interactionId = await this.getInteractionId();
    await Desktop.agentContact.hold({
      interactionId,
      data: {
        mediaResourceId: interactionId
      }
    });
    logger.info("holdMyCall" + JSON.stringify(response));
  }

  // unHold
  async unHoldCall() {
    let interactionId = await this.getInteractionId();
    await Desktop.agentContact.unHold({
      interactionId,
      data: {
        mediaResourceId: interactionId
      }
    });
    logger.info("unHoldMyCall" + JSON.stringify(response));
  }

  // Pause Recording
  async pauseRecord() {
    let interactionId = await this.getInteractionId();
    await Desktop.agentContact.pauseRecording({
      interactionId
    });
  }
}

customElements.define("sa-ds-voice-sdk", myDesktopSDK);
