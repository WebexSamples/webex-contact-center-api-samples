##########################################################################################
# documentation
##########################################################################################
SDK
#
https://developer.webex-cx.com/documentation/guides/desktop

layout
https://help.webex.com/en-us/article/n5595zd/Webex-Contact-Center-Setup-and-Administration-Guide#topic_8230815F4023699032326F948C3F1495

##########################################################################################
# install development packages
##########################################################################################
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
nvm install 18

##########################################################################################
# verify development packages
##########################################################################################
node -v 
v18.20.4
npm -v
10.7.0

##########################################################################################
# create project
##########################################################################################
npm init vite
my-custom-component


##########################################################################################
# add dependancies
##########################################################################################
npm install @wxcc-desktop/sdk

  "dependencies": {
    "@wxcc-desktop/sdk": "^2.0.1",

  "devDependencies": {
    "@wxcc-desktop/sdk-types": "^1.0.2",


##########################################################################################
# verify
##########################################################################################
npm run build;npm run dev


##########################################################################################
# web component code
##########################################################################################
import { LitElement, html, css } from 'lit';
import { Desktop } from "@wxcc-desktop/sdk";

const logger = Desktop.logger.createLogger("my-custom-component");
 
export class MyCustomComponet extends LitElement {

  static styles = css`
  .wrapper {
      padding: 10px;
      background-color: #f0f0f0;
      border: 1px solid #ccc;
      border-radius: 4px;
      text-align: center;
  }
  span {
      color: #333;
      font-size: 16px;
  }
`;

    static properties = {
        agentDnNumber: { type: String },
        agent: { type: String },
        agentContact: { type: String },
    };

    constructor() {
      super();
      logger.info("constructor: :");
      this.attachShadow({ mode: 'open' });
  }


  async connectedCallback() {
    super.connectedCallback();
    logger.info("connectedCallback:START");
    this.init('my-custom-component', 'YOUR_COMPANY_NAME')
    logger.info("connectedCallback:agentDnNumber", this.agentDnNumber);
    logger.info("connectedCallback:this.agent:", this.agent);
    logger.info("connectedCallback:this.agentContact:", this.agentContact);
    logger.info("connectedCallback:DONE");
}

async init(widgetName, widgetProvider) {
  logger.info("init: Start:widgetName:widgetProvider:", widgetName, widgetProvider);
  await Desktop.config.init(widgetName, widgetProvider);
  logger.info("init: DONE:widgetName:widgetProvider:", widgetName, widgetProvider);
  this.registerAgentContactListeners();
}

registerAgentContactListeners() {
  logger.info("registerAgentContactListeners:START");
  Desktop.agentContact.addEventListener("eAgentblindTransferred", (msg) => {logger.info(":eAgentblindTransferred::",msg)});
  Desktop.agentContact.addEventListener("eAgentConsultConferenced", (msg) => {logger.info(":eAgentConsultConferenced::",msg)});
  Desktop.agentContact.addEventListener("eAgentConsultConferenceEnded", (msg) => {logger.info(":eAgentConsultConferenceEnded::",msg)});
  Desktop.agentContact.addEventListener("eAgentConsultConferenceEndFailed", (msg) => {logger.info(":::",msg)});
  Desktop.agentContact.addEventListener("eAgentConsultCreated", (msg) => {logger.info(":eAgentConsultCreated::",msg)});
  Desktop.agentContact.addEventListener("eAgentConsultEnded", (msg) => {logger.info(":eAgentConsultEnded::",msg)});
  Desktop.agentContact.addEventListener("eAgentConsultEndFailed", (msg) => {logger.info(":eAgentConsultEndFailed::",msg)});
  Desktop.agentContact.addEventListener("eAgentConsultFailed", (msg) => {logger.info(":eAgentConsultFailed::",msg)});
  Desktop.agentContact.addEventListener("eAgentConsulting", (msg) => {logger.info(":eAgentConsulting::",msg)});
  Desktop.agentContact.addEventListener("eAgentContact", (msg) => {logger.info(":eAgentContact::",msg)});
  Desktop.agentContact.addEventListener("eAgentContactAssigned", (msg) => {logger.info(":eAgentContactAssigned::",msg)});
  Desktop.agentContact.addEventListener("eAgentContactAssignFailed", (msg) => {logger.info(":eAgentContactAssignFailed::",msg)});
  Desktop.agentContact.addEventListener("eAgentContactEnded", (msg) => {logger.info(":eAgentContactEnded::",msg)});
  Desktop.agentContact.addEventListener("eAgentContactHeld", (msg) => {logger.info(":eAgentContactHeld::",msg)});
  Desktop.agentContact.addEventListener("eAgentContactUnHeld", (msg) => {logger.info(":eAgentContactUnHeld::",msg)});
  Desktop.agentContact.addEventListener("eAgentContactWrappedUp", (msg) => {logger.info(":eAgentContactWrappedUp::",msg)});
  Desktop.agentContact.addEventListener("eAgentCtqCancelFailed", (msg) => {logger.info(":eAgentCtqCancelFailed::",msg)});
  Desktop.agentContact.addEventListener("eAgentCtqCancelled", (msg) => {logger.info(":eAgentCtqCancelled::",msg)});
  Desktop.agentContact.addEventListener("eAgentCtqFailed", (msg) => {logger.info(":eAgentCtqFailed::",msg)});
  Desktop.agentContact.addEventListener("eAgentMonitoringEnded", (msg) => {logger.info(":eAgentMonitoringEnded::",msg)});
  Desktop.agentContact.addEventListener("eAgentMonitorStateChanged", (msg) => {logger.info(":eAgentMonitorStateChanged::",msg)});
  Desktop.agentContact.addEventListener("eAgentOfferConsult", (msg) => {logger.info(":eAgentOfferConsult::",msg)});
  Desktop.agentContact.addEventListener("eAgentOfferContact", (msg) => {logger.info(":eAgentOfferContact::",msg)});
  Desktop.agentContact.addEventListener("eAgentOfferContactRona", (msg) => {logger.info(":eAgentOfferContactRona::",msg)});
  Desktop.agentContact.addEventListener("eAgentvteamTransfer", (msg) => {logger.info(":eAgentvteamTransfer::",msg)});
  Desktop.agentContact.addEventListener("eAgentWrapup", (msg) => {logger.info(":eAgentWrapup::",msg)});
  Desktop.agentContact.addEventListener("eCallRecordingStarted", (msg) => {logger.info(":eCallRecordingStarted::",msg)});
  Desktop.agentContact.addEventListener("eConsultTransfer", (msg) => {logger.info(":eConsultTransfer::",msg)});
  Desktop.agentContact.addEventListener("ePauseRecording", (msg) => {logger.info(":ePauseRecording::",msg)});
  Desktop.agentContact.addEventListener("eResumeRecording", (msg) => {logger.info(":eResumeRecording::",msg)});
  logger.info("registerAgentContactListeners:DONE");
}

disconnectedCallback() {
  logger.info("disconnectedCallback");
  Desktop.agentContact.removeAllEventListeners();
}


render() {
  logger.info("render ");
  return html`
      <div class="wrapper">
          <span>Hello, Web Component!</span>
      </div>
  `;
} 
 
}

window.customElements.define('my-custom-component', MyCustomComponet)
