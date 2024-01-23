import {html, css, LitElement} from 'lit';

export class RSSWidget extends LitElement {
  static get styles() {
    return css`
      .rss-widget {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-width: 100px;
        height: 60px;
        overflow: hidden;
        border: 1px solid #ccc;
        background-color: var(--background-color, white);
        color: var(--text-color, black);
        --link-color: blue;
        --link-color-dark: lightblue;
      }
      .title {
        flex: 1;
        margin: 0 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
        animation: scroll 10s linear infinite;
      }
      .title-container {
        overflow: hidden;
      }
      .feed-title {
        text-align: center;
      }
      .feed-items {
        display: flex;
      }
      button {
        margin: 0 5px;
      }
      @keyframes scroll {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
      }

      /* Dark mode styles */
      .rss-widget.dark {
        background-color: black;
        color: white;
        --link-color: var(--link-color-dark);
      }

      a {
        color: var(--link-color);
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }
    `;
  }

  static get properties() {
    return {
      rss: { attribute: "rss", type: String},
      currentItemIndex: { type: Number },
      items: { type: Array },
      dark: { attribute: "dark", type: Boolean }
    }
  };

  constructor() {
    super();
    this.dark = false;
    this.rss = 'https://developer.webex.com/api/content/blog/feed';
    this.items = [];
    this.currentItemIndex = 0;
    this.feed = {};
  }

  // This method will be called whenever the rssFeed property changes.
  async updated(changedProperties) {
    if (changedProperties.has('rss')) {
      const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(this.rss)}`);
      const data = await response.json();
      this.items = data.items;
      this.feed = data.feed;
    }
  }

  nextItem() {
    this.currentItemIndex = (this.currentItemIndex + 1) % this.items.length;
  }

  previousItem() {
    this.currentItemIndex = (this.currentItemIndex - 1 + this.items.length) % this.items.length;
  }

  render() {
    const currentItem = this.items[this.currentItemIndex] || {};
    return html`
      <div class="rss-widget ${this.dark && "dark"}">
        <div class="feed-title">${this.feed.title}: ${this.items.length} items</div>
        <div class="feed-items">
          <div>
            <button 
              @click="${this.previousItem}"
              ?disabled="${this.currentItemIndex === 0}"
            >
              &lt;
            </button>
          </div>
          <div>
            <div class="title-container">
              <a class="title" href="${currentItem.link}">${currentItem.title}</a>
            </div>
          </div>
          <div>
            <button 
              @click="${this.nextItem}"
              ?disabled="${this.currentItemIndex === this.items.length - 1}"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('rss-widget', RSSWidget);
