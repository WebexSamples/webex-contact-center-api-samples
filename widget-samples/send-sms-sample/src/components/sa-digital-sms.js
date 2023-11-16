import { Desktop } from "@wxcc-desktop/sdk";
import styleSCSS from "../main.scss";
import { sendWebHook } from "./webHooks/sendWebHook.js";
import { notifications } from "./helpers/notifications.js";

const style = document.createElement("style");
style.appendChild(document.createTextNode(styleSCSS));

const template = document.createElement("template");

export default class saDigitalCard extends HTMLElement {
  constructor() {
    super();

    const font = document.createElement("link");
    font.href = "https://fonts.googleapis.com/css2?family=Cutive+Mono&family=Darker+Grotesque:wght@300&family=Poppins:wght@200;400&display=swap";
    font.rel = "stylesheet";
    document.head.appendChild(font);

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(style);

    // global vars
    this.code = "12345";
    // this.selectedText;
    // this.fullName;

    // data from JSON layout
    // this.logo;
    // this.smsWebHook;
  }

  async connectedCallback() {
    this.render();
    Desktop.config.init();
    this.ani = this.getANI();
    this.applyCardInfoEvent();
    this.mainEvent();
  }

  getMessage() {
    let messageSelect = this.shadowRoot.querySelector(".options");
    messageSelect.addEventListener("input", event => {
      this.selectedText = event.target.value;
    });
  }

  async sendMessage() {
    return this.selectedText;
  }

  async init() {
    this.applyCardInfoEvent();
  }

  async applyCardInfoEvent() {
    const cardButtons = this.shadowRoot.querySelectorAll(".mainCard");
    cardButtons.forEach(button => {
      button.addEventListener("mouseover", async () => {
        let cardANI;
        cardANI = this.shadowRoot.querySelectorAll(".ani");
        cardANI.forEach(async ani => {
          ani.textContent = await this.ani;
        });
      });
      this.getMessage();
    });
  }

  async getANI() {
    const currentTaskMap = await Desktop.actions.getTaskMap();
    for (const iterator of currentTaskMap) {
      const ani = iterator[1].interaction.callAssociatedDetails.ani;
      return ani;
    }
  }

  async mainEvent() {
    const sendButton = this.shadowRoot.querySelectorAll(".button.secondary");
    sendButton.forEach(async res => {
      res.addEventListener("click", async e => {
        e.preventDefault();
        await this.domNotificationResults();
      });
    });
  }

  async smsSendEvent() {
    // Objects that are sent to the webhook - so you webhook needs these variables
    let raw = JSON.stringify({
      phone: await this.ani,
      reason: await this.sendMessage(),
      code: this.code,
      name: await this.fullName
    });
    let status = await sendWebHook("POST", raw, this.smsWebHook);
    let postResults = await status.response;
    return postResults;
  }

  async domNotificationResults() {
    let usePostResults = await this.smsSendEvent();
    switch (usePostResults[0].code) {
      case "1002":
        let successStatus = this.shadowRoot.querySelectorAll(".status");
        notifications(successStatus, "Successfully Send", "#befade");

        let imitationGiftCode = this.shadowRoot.querySelectorAll(".dbId");
        notifications(imitationGiftCode, this.code);
        break;
      default:
        let failedStatus = this.shadowRoot.querySelectorAll(".status");
        notifications(failedStatus, "Failed", "tomato");
        break;
    }
  }

  async render() {
    template.innerHTML = `
      <div class="container" ">
          <section class="mainCard">
          <section class="mainCard-cover one ">
          <img src=${this.logo} class="logo" />
          </section>
          <div class="mainCard-content">
            <div class="form-group">
              <label for="mobile">Mobile:</label>
              <p class="underline">  <span class ="ani result">Phone Number</span></p>
            </div>
            <div class="space"></div>
            <h3 class="code message"> Message: <textarea  class="options" name="options" rows="15" cols="50">  </textarea>  </h3>
          </div>
          <footer class="mainCard-footer">
            <div class="mainCard-text">
              <h1>Digital Channels</h1>
              <h2>Send SMS</h2>
            </div>
            <div class="ribbon">
              <div class="mainWrap">
                <button class="button">Details</button>
              </div>
            </div>
            <div class="mainCard-info reason">
              <div>
                <a href="#" id="sendGift" class="button secondary">Send</a>
              </div>
            </div>
          </footer>
        </section>
      </div>
      <div class="status"></div>
        `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
