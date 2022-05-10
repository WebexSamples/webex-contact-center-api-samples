/* Adding shadowDOM to a Web Component
			Step 1: attachShadow
			Step 2: create a const template
			Step 3: attach template to innerHTML
			Step 4: attach to document
*/

export default class InfoCard extends HTMLElement {
  constructor() {
    super();
    // **STEP (1)** //
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  // Using $Store key to iterate over object and get a specific CAD value
  myFunc() {
    let info = this.cad;
    for (const iterator of info) {
      // change variable change_Me to your own from your Tenant/Flow editor... ie myVar
      try {
        return iterator[1].interaction.callAssociatedData.change_Me.value;
      } catch (error) {
        return "change me to your own var from Flow Editor...";
      }
    }
  }

  // Using $Store key to iterate over the media object from the TaskMap Map/Object
  mediaInfo() {
    const info = this.cad;
    for (const iterator of info) {
      const media = iterator[1].interaction.media;
      const response = Object.keys(media).map(info => {
        return media[info];
      });
      return response;
    }
  }

  // Using $Store key to iterate over the media object and grab the participants
  activeParticipants() {
    // pull out your specific objects
    const info = this.cad;
    for (const iterator of info) {
      const media = iterator[1].interaction.media;
      const response = Object.keys(media).map(info => {
        const { participants } = media[info];
        return participants;
      });
      return response;
    }
  }

  //Render on the DOM
  render() {
    // **STEP (2)** //
    const template = document.createElement("template");

    // **STEP (3)** //
    template.innerHTML = `
		<style>
				.container {
					overflow: var(--flow, scroll);
					background: var(--back, inherit)
				}
				.cards {
					display: grid;
					grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
					grid-auto-rows: auto;
					grid-gap: 1rem;
				}
					h1 {
					text-align: center;
					width: 100%;
					}
					/* User Card */
					.card {
						border: 2px solid #BEBEBE;
						border-radius: 10px;
						padding: .5rem;
						min-height: 150px;
						max-height: 300px;
						overflow: scroll;
					}
					img {
						margin-top: 15px;
						border-radius: 10px;
						display: block;
					}		
					.hide {
						display: none;
					}
					.show {
						font-size: large;
						padding-left:0;
						display: block;
					}
					.btn {
						border: none;
						height: 36px;
						width: 140px;
						padding: 6px 18px;
						border-radius: 20px;
						background: #007AA3;
						color: white;
						cursor: pointer;
						transition: 0.3s;
					}
					.btn:hover{
						background: #005E7D;
						opacity: 1;
					}
					.italic{
						font-style: oblique;
						text-decoration: underline #FF3028;
					}
		</style>
					
					
		
					<div class="container">
						<div class="cards">
								<div class="card">
									<button class="btn">Customer Phone</button>
									<p class="hide"> ${this.ani}</p>
								</div>

								<div class="card">
									<button class="btn">Cad</button>
									<p class="hide"> value: ${this.myFunc()}</p>
								</div>

								<div class="card">
									<button class="btn">Details</button>
									<p class="hide"> ${JSON.stringify(this.details)}</p>
								</div>
							
								<div class="card">
									<button class="btn">Wrap</button>
									<p class="hide"> ${JSON.stringify(this.wrap)}</p>
								</div>

								<div class="card">
									<button class="btn">External API</button>
									<img src=${this.avatar} class="hide" alt="image">
								</div>

								<div class="card">
									<button class="btn">From Layout</button>
									<h3 class="hide"> ${this.name}</h3>
								</div>

								<div class="card">
									<button id="hold" class="btn">Media Info</button>
									<p class="hide"> ${JSON.stringify(this.mediaInfo())}</p>
								</div>

								<div class="card">
									<button class="btn">Participants</button>
									<p class="hide"> ${this.activeParticipants()}</p>
								</div>

								<div class="card">
									<button class="btn">Access Token</button>
									<p class="hide"><span class="italic">Auth Token for SSO:</span> \n${this.token}</p>
								</div>
						
								<div class="card">
									<button class="btn">More</button>
									<p class="hide"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet expedita beatae totam, soluta mollitia fuga architecto maiores modi obcaecati nam, nemo, culpa sequi. Doloremque optio, minima tempora pariatur nulla provident
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet expedita beatae totam, soluta mollitia fuga architecto maiores modi obcaecati nam, nemo, culpa sequi. Doloremque optio, minima tempora pariatur nulla provident
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet expedita beatae totam, soluta mollitia fuga architecto maiores modi obcaecati nam, nemo, culpa sequi. Doloremque optio, minima tempora pariatur nulla provident
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet expedita beatae totam, soluta mollitia fuga architecto maiores modi obcaecati nam, nemo, culpa sequi. Doloremque optio, minima tempora pariatur nulla provident
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet expedita beatae totam, soluta mollitia fuga architecto maiores modi obcaecati nam, nemo, culpa sequi. Doloremque optio, minima tempora pariatur nulla provident
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet expedita beatae totam, soluta mollitia fuga architecto maiores modi obcaecati nam, nemo, culpa sequi. Doloremque optio, minima tempora pariatur nulla provident
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet expedita beatae totam, soluta mollitia fuga architecto maiores modi obcaecati nam, nemo, culpa sequi. Doloremque optio, minima tempora pariatur nulla provident
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet expedita beatae totam, soluta mollitia fuga architecto maiores modi obcaecati nam, nemo, culpa sequi. Doloremque optio, minima tempora pariatur nulla provident
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet expedita beatae totam, soluta mollitia fuga architecto maiores modi obcaecati nam, nemo, culpa sequi. Doloremque optio, minima tempora pariatur nulla provident
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet expedita beatae totam, soluta mollitia fuga architecto maiores modi obcaecati nam, nemo, culpa sequi. Doloremque optio, minima tempora pariatur nulla provident
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet expedita beatae totam, soluta mollitia fuga architecto maiores modi obcaecati nam, nemo, culpa sequi. Doloremque optio, minima tempora pariatur nulla provident
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet expedita beatae totam, soluta mollitia fuga architecto maiores modi obcaecati nam, nemo, culpa sequi. Doloremque optio, minima tempora pariatur nulla provident
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet expedita beatae totam, soluta mollitia fuga architecto maiores modi obcaecati nam, nemo, culpa sequi. Doloremque optio, minima tempora pariatur nulla provident
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet expedita beatae totam, soluta mollitia fuga architecto maiores modi obcaecati nam, nemo, culpa sequi. Doloremque optio, minima tempora pariatur nulla provident
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet expedita beatae totam, soluta mollitia fuga architecto maiores modi obcaecati nam, nemo, culpa sequi. Doloremque optio, minima tempora pariatur nulla provident
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet expedita beatae totam, soluta mollitia fuga architecto maiores modi obcaecati nam, nemo, culpa sequi. Doloremque optio, minima tempora pariatur nulla provident
									</p>
								</div>
						</div>
					</div>
		`;

    // **STEP (4)** //
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // toggle
    Array.from(this.shadowRoot.querySelectorAll("div.card")).forEach(e => {
      e.addEventListener("click", function (e) {
        let target = e.target.nextSibling.nextSibling;
        target.classList.toggle("hide");
      });
    });
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === "name") {
      Array.from(this.shadowRoot.querySelectorAll("h3")).forEach(e => {
        e.innerText = this.getAttribute("name");
      });
    } else if (attrName === "avatar") {
      Array.from(this.shadowRoot.querySelectorAll("img")).forEach(e => {
        e.href = this.getAttribute("avatar");
      });
    } else if (attrName === "darkmode") {
      const darkMode = this.getAttribute("darkmode");
      if (darkMode === "true") {
        Array.from(this.shadowRoot.querySelectorAll(".card")).forEach(e => {
          e.style.background = "#000";
          e.style.color = "#fff";
        });
      } else {
        Array.from(this.shadowRoot.querySelectorAll(".card")).forEach(e => {
          e.style.background = "#fff";
          e.style.color = "#000";
        });
      }
    }
  }
  static get observedAttributes() {
    return ["name", "darkmode", "avatar"];
  }
}
window.customElements.define("info-card", InfoCard);
