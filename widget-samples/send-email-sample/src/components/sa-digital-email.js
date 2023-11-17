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
    // this.subject;
    // this.email;
    // this.fullName;

    // data from JSON layout
    // this.logo;
    // this.emailWebHook;
  }

  async connectedCallback() {
    this.render();
    Desktop.config.init();
    this.getEmail();
    this.getFullName();
    this.getSubject();
    this.getMessage();
    this.mainEvent();
  }

  getEmail() {
    let messageSelect = this.shadowRoot.querySelector(".email");
    messageSelect.addEventListener("input", event => {
      this.email = event.target.value;
    });
  }

  async sendEmail() {
    return this.email;
  }

  getFullName() {
    let messageSelect = this.shadowRoot.querySelector(".fullName");
    messageSelect.addEventListener("input", event => {
      this.fullName = event.target.value;
    });
  }

  async sendFullName() {
    return this.fullName;
  }

  getSubject() {
    let messageSelect = this.shadowRoot.querySelector(".subject");
    messageSelect.addEventListener("input", event => {
      this.subject = event.target.value;
    });
  }

  async sendSubject() {
    return this.subject;
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

  async mainEvent() {
    const sendButton = this.shadowRoot.querySelectorAll(".button.secondary");
    sendButton.forEach(async res => {
      res.addEventListener("click", async e => {
        e.preventDefault();
        // this.emailSendEvent();
        await this.domNotificationResults();
      });
    });
  }

  async emailSendEvent() {
    // Objects that are sent to the webhook - so you webhook needs these variables
    let raw = JSON.stringify({
      email: await this.sendEmail(),
      reason: await this.sendMessage(),
      subject: await this.sendSubject(),
      name: await this.sendFullName(),
      code: null
    });
    let status = await sendWebHook("POST", raw, this.emailWebHook);
    return await status.response;
  }

  async domNotificationResults() {
    let usePostResults = await this.emailSendEvent();
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
              <label for="fullName">Name:</label>
                <input type="text" class="fullName result" id="fullName" name="fullName">
            </div>
            <div class="form-group">
              <label for="email">To:</label>
                <input type="email" class="email result" id="email" name="email">
            </div>
            <div class="form-group">
              <label for="subject">Subject:</label>
                <input type="text" class="subject result " id="subject" name="subject">
            </div>
            <div class="space"></div>
            <h3 class="code message"> Message: <textarea  class="options" name="options" rows="15" cols="50">  </textarea>  </h3>
          </div>
          <footer class="mainCard-footer">
            <div class="mainCard-text">
              <h1>Digital Channels</h1>
              <h2>Send Email</h2>
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
