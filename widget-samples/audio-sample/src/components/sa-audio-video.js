import { getWaveBlob } from "webm-to-wav-converter";
import download from "js-file-download";
import bufferToWav from "audiobuffer-to-wav";
import { accessToken, orgId, dataCenter } from "./access-token.js";
import { notification } from "./helpers/notifications.js";
import { theDOMElementFactory } from "./helpers/factoryElements.js";
import styleSCSS from "../style.scss";

const template = document.createElement("template");

export default class saAudioVideo extends HTMLElement {
  constructor() {
    super();

    const fontAwesome = document.createElement("link");
    fontAwesome.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
    fontAwesome.rel = "stylesheet";
    document.head.append(fontAwesome);

    const style = document.createElement("style");
    style.appendChild(document.createTextNode(styleSCSS));

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(style);
  }

  async connectedCallback() {
    this.render();
    this.getPlay();
    this.testCameraAndMic();
    this.renderCardData();
    this.search();
    this.carousel();
  }
  async disconnectedCallback() {}

  async carousel() {
    const mainCarousel = this.shadowRoot.querySelectorAll(".carousel");
    mainCarousel.forEach(carousel => {
      const items = carousel.querySelectorAll(".carousel__item");
      const buttonsHtml = Array.from(items, () => {
        return `<span class="carousel__button"></span>`;
      });

      carousel.insertAdjacentHTML(
        "beforeend",
        `
		<div class="carousel__nav">
			${buttonsHtml.join("")}
		</div>
	`
      );

      const buttons = carousel.querySelectorAll(".carousel__button");

      buttons.forEach((button, i) => {
        button.addEventListener("click", () => {
          // un-select all the items
          items.forEach(item => item.classList.remove("carousel__item--selected"));
          buttons.forEach(button => button.classList.remove("carousel__button--selected"));

          items[i].classList.add("carousel__item--selected");
          button.classList.add("carousel__button--selected");
        });
      });

      // Select the first item on page load
      items[0].classList.add("carousel__item--selected");
      buttons[0].classList.add("carousel__button--selected");
    });
  }

  async getFile() {
    try {
      const send = await fetch(`https://api.wxcc-${dataCenter}.cisco.com/organization/${orgId}/v2/audio-file`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "*/*"
        }
      });
      const response = await send.json();
      console.groupCollapsed("All Wav Files");
      console.log(response);
      console.groupEnd();
      const wavFilesResult = await response.data;
      return wavFilesResult;
    } catch (error) {
      console.log(error);
    }
  }

  async renderCardData() {
    const submitButton = this.shadowRoot.querySelector("#getAudioSubmit");
    submitButton.addEventListener("click", async e => {
      e.preventDefault();
      const wavFilesResult = await this.getFile();
      const loadIntoTable = this.shadowRoot.querySelector(".results");

      // Populate the headers
      for (const wav of wavFilesResult) {
        const headerField = theDOMElementFactory("div", { class: "table" });
        const nameLabel = theDOMElementFactory("label", { class: "formLabel" });
        nameLabel.textContent = "Name:";
        const name = theDOMElementFactory("div", { class: "formData nameColor" });
        const idLabel = theDOMElementFactory("label", { class: "formLabel" });
        idLabel.textContent = "id \u25BC";
        const id = theDOMElementFactory("div", { class: "formData hide " });
        idLabel.addEventListener("click", e => {
          id.classList.toggle("hide");
        });
        const blobIdLabel = theDOMElementFactory("label", { class: "formLabel" });
        blobIdLabel.textContent = "blobId \u25BC";
        const blobId = theDOMElementFactory("div", { class: "formData hide" });
        blobId.textContent = wav.blobId;
        blobIdLabel.addEventListener("click", e => {
          blobId.classList.toggle("hide");
        });
        const chooseFile = theDOMElementFactory("input", { class: "chooseFile" });
        chooseFile.type = "file";
        const convertBtn = theDOMElementFactory("button", { class: "rounded-action-button upload convertBtn" }, theDOMElementFactory("span", { title: "Convert" }));
        convertBtn.textContent = "\uf066";
        convertBtn.addEventListener("click", async e => {
          e.preventDefault();
          const bt = e.target;
          const wavFileUpdate = bt.closest("div").querySelector("input").files[0];
          console.log(wavFileUpdate);
          let wavF = await wavFileUpdate.arrayBuffer();
          let audioCtx = new AudioContext({ sampleRate: 8000 });
          let decodedData = await audioCtx.decodeAudioData(wavF);
          var wav = bufferToWav(decodedData);
          download(wav, wavFileUpdate.name);
        });
        const editBtn = theDOMElementFactory("button", { class: " rounded-action-button upload editBtn" });
        editBtn.textContent = "\uf093";
        editBtn.setAttribute("title", "Update");
        editBtn.addEventListener("click", async e => {
          e.preventDefault();
          const bt = e.target;
          const wavFileUpdate = bt.closest("div").querySelector("input").files[0];
          const name = bt.closest("div").querySelector("div").textContent;
          const id = bt.closest("div").querySelector("div").nextElementSibling.nextElementSibling.textContent;
          const blobId = bt.closest("div").querySelector("div").nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent;

          // PUT: Update the wav file on Flow
          this.updateFileFromCard(wavFileUpdate, name, blobId, id);
        });

        name.textContent = wav.name;
        id.textContent = wav.id;

        headerField.append(nameLabel, name, idLabel, id, blobIdLabel, blobId, chooseFile, convertBtn, editBtn);
        loadIntoTable.append(headerField);
      }
    });
  }

  async updateFileFromCard(wavFileUpdate, name, blobId, id) {
    try {
      const formData = new FormData();
      formData.append("audioFile", wavFileUpdate);
      formData.append(
        "audioFileInfo",
        new Blob(
          [
            JSON.stringify({
              name,
              organizationId: "",
              url: "",
              lastUpdatedTime: 0,
              contentType: "AUDIO_WAV",
              createdTime: 0,
              version: 0,
              blobId,
              id
            })
          ],
          {
            type: "application/json"
          }
        )
      );

      const send = await fetch(`https://api.wxcc-${dataCenter}.cisco.com/organization/${orgId}/audio-file/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "*/*"
        },
        body: formData
      });
      const response = await send.json();
      console.log(response);
      const notify = this.shadowRoot.querySelector(".notifications");
      notification(notify, `Successfully updated: <div class="success">${response.name}</div> Version: <div class="success"> ${response.version} </div>`, "#03612C");
    } catch (error) {
      notification(notify, `Something went wrong... ${error}`, "#D4371C");
    }
  }

  async search() {
    const searchInput = this.shadowRoot.querySelector("#search");
    searchInput.addEventListener("input", e => {
      const userInput = e.target.value.toLowerCase();
      const card = Array.from(this.shadowRoot.querySelectorAll(".table"));
      card.map(name => {
        const wavCard = name.closest("div");
        const wavName = name.closest("div").querySelector("div").textContent.toLocaleLowerCase().includes(userInput);
        wavCard.classList.toggle("hide", !wavName);
      });
    });
  }

  async testCameraAndMic() {
    // prettier-ignore
    navigator.permissions.query({name: 'microphone'})
      .then((permissionObj) => {
        console.groupCollapsed("microphone")
        console.log(`microphone ${permissionObj.state}`);
        console.groupEnd()
      })
      .catch((error) => {
        console.groupCollapsed("Error Microphone")
        console.log('Got error :', error);
        console.groupEnd()
        
      })
    navigator.permissions
      .query({ name: "camera" })
      .then(permissionObj => {
        console.groupCollapsed("camera");
        console.log(`camera ${permissionObj.state}`);
        console.groupEnd();
      })
      .catch(error => {
        console.groupCollapsed("Error Camera");
        console.log("Got error :", error);
        console.groupEnd();
      });
  }

  async getPlay() {
    let constraintObj = {
      audio: true,
      video: {
        facingMode: "user",
        width: { min: 320, ideal: 320, max: 320 },
        height: { min: 320, ideal: 320, max: 320 }
      }
    };

    let mediaStreamObj = await navigator.mediaDevices.getUserMedia(constraintObj);

    let video = this.shadowRoot.querySelector("video");
    video.srcObject;

    video.onloadedmetadata = function (ev) {
      //show in the video element what is being captured by the webcam
      video.play();
    };

    //add listeners for saving video/audio
    let startAndStop = this.shadowRoot.querySelector("#recordBTNCard");
    let vidSave = this.shadowRoot.querySelector("#vid2");
    let mediaRecorder = new MediaRecorder(mediaStreamObj);
    let chunks = [];

    const startRecordBtn = async e => {
      e.preventDefault();
      mediaRecorder.start();
      console.log(mediaRecorder.state);
      let startRecord = this.shadowRoot.querySelector(".recordingState");
      startAndStop.removeEventListener("click", startRecordBtn);
      startAndStop.addEventListener("click", stopRecordBtn);
      theDOMElementFactory("span", { class: "start" });
      startAndStop.textContent = "\uf131";
      startRecord.textContent = mediaRecorder.state;
      startRecord.style.color = "#D4371C";
    };
    const stopRecordBtn = e => {
      e.preventDefault();
      mediaRecorder.stop();
      console.log(mediaRecorder.state);
      let stopRecord = this.shadowRoot.querySelector(".recordingState");
      stopRecord.textContent = mediaRecorder.state;
      startAndStop.removeEventListener("click", stopRecordBtn);
      startAndStop.addEventListener("click", startRecordBtn);
      theDOMElementFactory("span", { class: "stop" });
      startAndStop.textContent = "\uf130";
      stopRecord.textContent = "Off";
      stopRecord.style.color = "black";
    };

    startAndStop.addEventListener("click", startRecordBtn);

    mediaRecorder.ondataavailable = function (ev) {
      chunks.push(ev.data);
    };

    mediaRecorder.onstop = async ev => {
      const blob = new Blob(chunks);
      const videoURL = window.URL.createObjectURL(blob);
      vidSave.src = videoURL;

      let wav1 = await getWaveBlob(blob, false);
      download(wav1, `${new Date()}.wav`);
    };
  }

  render() {
    template.innerHTML = `
    <div class="container">
      <div class="item ">
        <div class="header">Audio/Video<br>Recording</div>
        <fieldset class="formFieldset">
          <legend class=" bk on-air">On AIR:</legend>
          <div class="recordingState off">Off</div>
        </fieldset>
        <div class="notifications"></div>
      </div>
    <div class="item">
      <div class="center">
        <div>
        </div>
      </div>
      <div class="center">
        <div class="carousel">
          <div class="carousel__item">
            <form class="form">
              <div class="form-header cardHeader">Record <span>
                  <div title="record audio/video" style="font-family: 'FontAwesome'" id="recordBTNCard"
                    class="rounded-action-button mic">&#xf130</div>
                </span> </div>
              <div class="form-body">
                <div class="form-inputs">
                  <div> <button id="getAudioSubmit" class="btn">Get Audio Files</button> </div>
                  <div> <input style="font-family: FontAwesome " id="search" type="text"
                      placeholder=" &#xf002;  Search Audio Files..." /> </div>
                  <div class="results"></div>
                </div>
              </div>
            </form>
          </div>
          <div class="item-inside">
            <div class="carousel__item">
              <form class="form player">
                <div style="padding: 27px" class="form-header cardHeader">Video Player</div>
                <video id="vid2" controls></video>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
