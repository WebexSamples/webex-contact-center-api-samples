import { Desktop } from "@wxcc-desktop/sdk";
import styleSCSS from "../giftCard.scss";
// import { imageBase64 } from "../images/imageBase64.js";
import { sendWebHook } from "./webHooks/sendWebHook.js";
import { giftCodeDB } from "./giftDB/giftCodeDB.js";
import { sendOrderFromWeGift } from "./weGift/sendOrderFromWeGift.js";
import { notifications } from "./helpers/notifications.js";

const style = document.createElement("style");
style.appendChild(document.createTextNode(styleSCSS));

const template = document.createElement("template");

export default class saGiftCard extends HTMLElement {
  constructor() {
    super();

    const fontAwesome = document.createElement("link");
    fontAwesome.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css";
    fontAwesome.rel = "stylesheet";
    document.head.appendChild(fontAwesome);

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(style);

    // global vars
    this.code = this.getGiftCode();
    // sonarqube cleanup
    // this.selectedText;
    // // customize from JSON layout
    // this.giftCardLogo1;
    // this.giftCardLogo2;
    // this.giftCardLogo3;
    // this.giftCardLogo4;
    // this.smsWebHook;
    // this.emailWebHook;
  }

  async connectedCallback() {
    this.init();
    this.ani = this.getANI();
    this.email = this.getEmail();
    this.fullName = this.getName();

    this.render();
    this.mainEvent();
  }

  getGiftMessage() {
    let messageSelect = this.shadowRoot.querySelector(".options");
    messageSelect.addEventListener("change", () => {
      this.selectedText = messageSelect.options[messageSelect.selectedIndex].text;
    });
  }

  async sendGiftMessage() {
    return this.selectedText;
  }

  async init() {
    Desktop.config.init();
    this.applyGiftCardInfoEvent();
  }

  async applyGiftCardInfoEvent() {
    const giftCardButtons = this.shadowRoot.querySelectorAll(".giftCard");
    giftCardButtons.forEach(button => {
      button.addEventListener("mouseover", async () => {
        let giftName, giftEmail, giftANI;
        giftName = this.shadowRoot.querySelectorAll(".fullName");
        giftName.forEach(async name => {
          name.textContent = await this.fullName;
        });
        giftEmail = this.shadowRoot.querySelectorAll(".email");
        giftEmail.forEach(async email => {
          email.textContent = await this.email;
        });
        giftANI = this.shadowRoot.querySelectorAll(".ani");
        giftANI.forEach(async ani => {
          ani.textContent = await this.ani;
        });
      });
      this.getGiftMessage();
    });
  }

  async getANI() {
    const currentTaskMap = await Desktop.actions.getTaskMap();
    for (const iterator of currentTaskMap) {
      const ani = iterator[1].interaction.callAssociatedDetails.ani;
      return ani;
    }
  }

  async getEmail() {
    const currentTaskMap = await Desktop.actions.getTaskMap();
    for (const iterator of currentTaskMap) {
      const email = iterator[1].interaction.callAssociatedData.Email.value;
      return email;
    }
  }

  async getName() {
    const currentTaskMap = await Desktop.actions.getTaskMap();
    for (const iterator of currentTaskMap) {
      const fullName = iterator[1].interaction.callAssociatedData.Name.value;
      return fullName;
    }
  }

  async mainEvent() {
    const sendButton = this.shadowRoot.querySelectorAll(".button.secondary");
    sendButton.forEach(async sms => {
      sms.addEventListener("click", async e => {
        e.preventDefault();
        this.emailSendEvent();
        this.domNotificationResults();
        this.sendOrderFromWeGiftEvent();
      });
    });
  }

  async smsSendEvent() {
    let raw = JSON.stringify({
      phone: await this.ani,
      reason: await this.sendGiftMessage(),
      code: await this.code,
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
        notifications(successStatus, "Success", "green");

        let imitationGiftCode = this.shadowRoot.querySelectorAll(".dbId");
        notifications(imitationGiftCode, this.code);
        break;
      default:
        let failedStatus = this.shadowRoot.querySelectorAll(".status");
        notifications(failedStatus, "Failed", "tomato");
        break;
    }
  }

  async emailSendEvent() {
    let raw = JSON.stringify({
      email: await this.email,
      reason: await this.sendGiftMessage(),
      code: await this.code,
      name: await this.fullName
    });
    let status = await sendWebHook("POST", raw, this.emailWebHook);
    await status.response;
  }

  async getGiftCode() {
    this.code = await giftCodeDB();
  }

  async sendOrderFromWeGiftEvent() {
    let raw = JSON.stringify({
      product_code: "SBUX-US",
      currency_code: "USD",
      amount: "5.00",
      description: await this.sendGiftMessage(),
      delivery_method: "email",
      delivery_format: "url-instant",
      delivery_email: await this.getEmail()
    });
    await sendOrderFromWeGift(raw);
  }

  async render() {
    template.innerHTML = `
      
      <div class="container" ">
          <section class="giftCard">
          <section class="giftCard-cover one ">
          <img src=${this.giftCardLogo1} class="logo" />
          </section>
          <div class="giftCard-content">
            <h2>Gift Card will be sent to:  <span class="status"></span></h2>
            <address>
              <h3> Name: <span class ="fullName">Name</span></h3>    
              <p> Email: <span class ="email">Email</span> </p> 
              <p> Phone Number: <span class ="ani">Phone Number</span></p>  
            </address>
            <div class="subtext">Available within: 1 business day. </div>  
            <h3 class="code"> Code: <span class="dbId"></span>  </h3>   
          </div>
          <footer class="giftCard-footer">
            <div class="giftCard-text">
              <h1>Gift Card</h1>
              <h2>$5.00</h2>
            </div>
            <div class="ribbon">
              <div class="giftwrap">
                <a href="#buy" class="button">Details</a>
              </div>
              <div class="bow">
                <i class="fa fa-bookmark"></i>
                <i class="fa fa-bookmark"></i>
              </div>
            </div>
            <div class="giftCard-info reason">
            <select class="options" name="options">
              <option value="">Select One …</option>
              <option value="thankYou">Thank you for being a valuable customer.</option>
              <option value="sorry">Sorry for the inconvenience. Here is a small token to make it up.</option>
              <option value="birthday">Happy Birthday</option>
              <option value="anniversary">Happy Anniversary</option>
            </select>
              <div>
                <a href="#" id="sendGift" class="button secondary">Send</a>
              </div>
            </div>
          </footer>
        </section>

        <section class="giftCard">
          <section class="giftCard-cover two">
          <img src=${this.giftCardLogo2} class="logo" />
          </section>
          <div class="giftCard-content">
            <h2>Gift Card will be sent to: <span class="status"></span> </h2>
            <address>
              <h3> Name: <span class ="fullName">Name</span></h3>    
              <p> Email: <span class ="email">Email</span> </p> 
              <p> Phone Number: <span class ="ani">Phone Number</span></p>  
            </address>
            <div class="subtext">Available within: 1 business day. </div>  
            <h3 class="code"> Code: <span class="dbId"></span>  </h3>   
          </div>
          <footer class="giftCard-footer">
            <div class="giftCard-text">
              <h1>Gift Card</h1>
              <h2>$10.00</h2>
            </div>
            <div class="ribbon">
              <div class="giftwrap">
                <a href="#buy" class="button">Details</a>
              </div>
              <div class="bow">
                <i class="fa fa-bookmark"></i>
                <i class="fa fa-bookmark"></i>
              </div>
            </div>
            <div class="giftCard-info">
              <div>
                <input type="text" class="giftMessage" name="giftMessage" id="giftMessage" placeholder="Enter a gift message" />
              </div>
              <div>
                <a href="#" id="sendGift" class="button secondary">Send</a>
              </div>
            </div>
          </footer>
        </section>
     

        <section class="giftCard">
          <section class="giftCard-cover three">
          <img src=${this.giftCardLogo3} class="logo" />
          </section>
          <div class="giftCard-content">
            <h2>Gift Card will be sent to: <span class="status"></span> </h2>
            <address>
              <h3> Name: <span class ="fullName">Name</span></h3>    
              <p> Email: <span class ="email">Email</span> </p> 
              <p> Phone Number: <span class ="ani">Phone Number</span></p>  
            </address>
            <div class="subtext">Available within: 1 business day. </div>  
            <h3 class="code"> Code: <span class="dbId"></span>  </h3>   
          </div>
          <footer class="giftCard-footer">
            <div class="giftCard-text">
              <h1>Gift Card</h1>
              <h2>$15.00</h2>
            </div>
            <div class="ribbon">
              <div class="giftwrap">
                <a href="#buy" class="button">Details</a>
              </div>
              <div class="bow">
                <i class="fa fa-bookmark"></i>
                <i class="fa fa-bookmark"></i>
              </div>
            </div>
            <div class="giftCard-info">
              <div>
                <input type="text" class="giftMessage" name="giftMessage" id="giftMessage" placeholder="Enter a gift message" />
              </div>
              <div>
                <a href="#" id="sendGift" class="button secondary">Send</a>
              </div>
            </div>
          </footer>
        </section>

        <section class="giftCard">
          <section class="giftCard-cover four">
          <img src=${this.giftCardLogo4} class="logo" />
          </section>
          <div class="giftCard-content">
            <h2>Gift Card will be sent to: <span class="status"></span> </h2>
            <address>
              <h3> Name: <span class ="fullName">Name</span></h3>    
              <p> Email: <span class ="email">Email</span> </p> 
              <p> Phone Number: <span class ="ani">Phone Number</span></p>  
            </address>
            <div class="subtext">Available within: 1 business day. </div>  
            <h3 class="code"> Code: <span class="dbId"></span>  </h3>   
          </div>
          <footer class="giftCard-footer">
            <div class="giftCard-text">
              <h1>Gift Card</h1>
              <h2>$20.00</h2>
            </div>
            <div class="ribbon">
              <div class="giftwrap">
                <a href="#buy" class="button">Details</a>
              </div>
              <div class="bow">
                <i class="fa fa-bookmark"></i>
                <i class="fa fa-bookmark"></i>
              </div>
            </div>
            <div class="giftCard-info">
              <div>
                <input type="text" class="giftMessage" name="giftMessage" id="giftMessage" placeholder="Enter a gift message" />
              </div>
              <div>
                <a href="#" id="sendGift" class="button secondary">Send</a>
              </div>
            </div>
          </footer>
        </section>
      </div>
        `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
