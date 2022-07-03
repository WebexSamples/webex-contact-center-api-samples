import { Desktop } from "@wxcc-desktop/sdk";

customElements.define(
  "sa-address-book",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      const font = document.createElement("link");
      font.href = "https://fonts.googleapis.com/css2?family=Cutive+Mono&family=Darker+Grotesque:wght@300&family=Poppins:wght@200;400&display=swap";
      font.rel = "stylesheet";
      document.head.appendChild(font);
    }

    // Function for making outDial call
    async makeCall(destination) {
      // the phone number from the contact cards
      console.log(destination);
      try {
        const outDial = await Desktop.dialer.startOutdial({
          data: {
            // your outDial entrypoint
            entryPointId: "AXZtgp2smb-tZiANor5u",
            destination,
            direction: "OUTBOUND",
            // your outDial Number
            origin: "+19782738550",
            attributes: {},
            mediaType: "telephony",
            outboundType: "OUTDIAL"
          }
        });
      } catch (error) {
        console.log(error);
      }
    }

    static get observedAttributes() {
      return ["loading"];
    }
    get loading() {
      return JSON.parse(this.getAttribute("loading"));
    }
    set loading(v) {
      this.setAttribute("loading", JSON.stringify(v));
    }

    // using free API
    async fetchAPI(url) {
      this.loading = true;
      const response = await fetch(url);
      const json = await response.json();
      this.users = json;
      console.log(json);
      this.loading = false;
    }
    // Free APi with pulling down 100 users
    async connectedCallback() {
      Desktop.config.init();
      await this.fetchAPI("https://randomuser.me/api/?results=100");
      await this.click2call();
      await this.click2callRealNum();
      await this.searchInput();
    }

    disconnectedCallback() {}

    attributeChangedCallback(attrName, oldVal, newVal) {
      this.render();
    }

    // Listen for click on the phone number used to call your working number...
    async click2callRealNum() {
      this.shadowRoot.querySelector(".phone").addEventListener("click", e => {
        let phone = e.target.textContent;
        let destination = phone.replace(/[\W_]/g, "");
        console.log(destination);
        this.makeCall(destination);
      });
    }

    // Listen for click on the phone number event
    async click2call() {
      let mainCard = this.shadowRoot.querySelector("[data-user-cards-container]");
      mainCard.addEventListener("click", e => {
        const selectPhone = e.target.classList.contains("phone");
        if (!selectPhone) {
          return;
        } else {
          let phone = e.target.textContent;
          let destination = phone.replace(/[\W_]/g, "");
          console.log(destination);
          this.makeCall(destination);
        }
      });
    }

    // Search Bar
    async searchInput() {
      const userCardTemplate = this.shadowRoot.querySelector("[data-user-template]");
      const userCardContainer = this.shadowRoot.querySelector("[data-user-cards-container]");
      const searchInput = this.shadowRoot.querySelector("[data-search]");
      let users = this.users.results.map(user => {
        const card = userCardTemplate.content.cloneNode(true).children[0];
        const header = card.querySelector("[data-header]");
        const email = card.querySelector("[data-email]");
        const phone = card.querySelector("[data-phone]");
        header.textContent = user.name.first;
        email.textContent = user.email;
        phone.textContent = user.phone;
        userCardContainer.append(card);
        return { name: user.name.first, email: user.email, phone: user.phone, element: card };
      });
      searchInput.addEventListener("input", function (e) {
        const value = e.target.value.toLowerCase();
        users.forEach(user => {
          const isVisible = user.name.toLowerCase().includes(value) || user.email.toLowerCase().includes(value);
          user.element.classList.toggle("hide", !isVisible);
        });
      });
    }

    // Render contacts on webpage
    render() {
      if (this.loading) {
        this.shadowRoot.innerHTML = `Loading...`;
      } else {
        this.shadowRoot.innerHTML = `
        <style>
        .container{
          overflow: var(--flow, scroll);
          font-family: 'Poppins', sans-serif;
        }
       
        .search-wrapper {
          width:30%;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          margin-top: 60px
        }

        h3{
          display: flex;
          flex-direction: column;
          background: red;
        }
        
        input {
          font-size: 1rem;
          margin-bottom: 2rem;
          padding: .5rem;
          border-radius: 20px;
          border:1px solid 
        }
        
        .user-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 0.95rem;
          margin-top: 1rem;
        }
        
        .card {
          border: 1px solid black;
          background-color: white;
          padding: 0.5rem;
          border-radius: 8px;
          border-right: 10px solid #A12512;
          box-shadow: 10px 10px 5px 0px rgba(158,158,158,1);
          overflow: scroll;
        }
        
        .card > .header {
          margin-bottom: 0.25rem;
          font-weight: bold;
        }
        
        .card > .email {
          font-size: 0.8rem;
          color: #777;
          margin-bottom: 0.25rem;
        }
        .card > .phone {
          color: #005e7d;
          cursor: pointer;
        }

        ::placeholder{
          text-indent: 8px;
          color: gray;
          font-family: 'Darker Grotesque', sans-serif;
        }

        input:focus {
          outline: none !important;
          border:1px solid #005e7d;
          box-shadow: 10px 10px 5px 0px rgba(158,158,158,1);
          opacity: .8;
        }
        .navbar {
          background-color: #064157;
          color: white;
          text-align: center;
          width: 100%;
          padding: 5px 0;
          font-family: 'Cutive Mono', monospace;
          font-size: 30px;
        }
       
        span.title {
          font-size: .9rem;
        }
        .search {
          margin-left: 14px;
        }
        
        .hide {
          display: none;
        }
        </style>

       <div class="container">
              <div class="navbar"><slot name="title">Address Book</slot>
              <span class="title"><p>Bringing in Contacts from an API... Click phone number to Call</p></span>
              </div>

              <div class="search-wrapper">
                <label class="search" for="search">SEARCH CONTACTS</label>
                <input type="search" id="search" placeholder="TYPE NAME OR EMAIL" data-search />
              </div>

            <div class="user-cards" data-user-cards-container>
            <div class="card">
              <div class="header">Niko</div>
              <div class="email">email@gmail.com</div>
              <div class="phone">1-222-333-4444</div>
            </div>
              
                ${this.users.results
                  .map(user => {
                    return `
                        <template data-user-template>
                          <div class="card">
                            <div class="header" data-header>${user.name}</div>
                            <div class="email" data-email>${user.email}</div>
                            <div class="phone" data-phone>${user.phone}</div>
                          </div>
                        </template>    
                      `;
                  })
                  .join("")}
          </div>
                   `;
      }
    }
  }
);
