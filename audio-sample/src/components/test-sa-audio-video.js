export default class saAudioVideo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.startRecord();
  }

  async record() {
    try {
      var device = navigator.mediaDevices.getUserMedia({
        audio: true
      });
    } catch (error) {
      console.log(error);
    }
    var items = [];
    device.then(stream => {
      var recorder = new MediaRecorder(stream);
      recorder.ondataavailable = e => {
        items.push(e.data);
        if (recorder.state == "inactive") {
          var blob = new Blob(items, { type: "audio/webm" });
          var audio = this.shadowRoot.querySelector("#audio");
          var mainAudio = document.createElement("audio");
          mainAudio.setAttribute("controls", "controls");
          audio.append(mainAudio);
          mainAudio.innerHTML = '<source src="' + URL.createObjectURL(blob) + '"type="video/webm"/>';
        }
      };
      recorder.start(100);
      setTimeout(() => {
        recorder.stop();
      }, 10000);
    });
  }

  async startRecord() {
    const btn = this.shadowRoot.querySelector(".start");
    btn.addEventListener("click", e => {
      this.record();
    });
  }

  // new render method to set styles and html elments to be displayed inside the shodow DOM
  render() {
    this.shadowRoot.innerHTML = `
        <style>
        :host{
          display: block;
          font-size: 14px;
          font-weight: bold;
          color: red;
          text-align: center;
        }
        </style>
        <div class="start">Start</div>
        <div id="audio"></div>
      `;
  }
}
