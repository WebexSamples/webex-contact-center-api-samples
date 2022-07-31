// This is a plain vanilla JS form designed to be added into any javascript injector, in order to render it on a web browser / HTML.
// Injector used for the demo is a Chrome Extension called scripty.

document.onload(ewt());

function ewt() {
  //variables
  const ewtParameters = {
    dataCenter: "add your data Center, ie us1",
    queueId: "add your queueId",
    lookbackMinutes: "60",
    maxCV: "1",
    minValidSamples: "1",
    orgId: "add your org Id"
  };
  const modifiers = {
    formTitle: "Help Center",
    formTitleColor: "black",
    formTitleMargin: "0px",
    formColor: "#A30204",
    borderColor: "white",
    submitButtonWidth: "38vh",
    fieldSetHeight: "50vh",
    reasons: [" ", "Billing", "Orders", "Support", "Other"],
    address: "123 Main St",
    city: "San Jose",
    state: "CA",
    zip: "91234",
    phone: "1-860-277-8456",
    contactUSButtonColor: "#A30204",
    contactUSTextColor: "#fff",
    buttonTextPadding: "10px",
    buttonPositionTop: "50%",
    buttonPositionRight: "-70px",
    modalPosition: "40%",
    modalWidth: "300px",
    modalHeight: "420px"
  };

  let btn = document.createElement("BUTTON");
  btn.textContent = "CONTACT US";
  btn.setAttribute("style", `color: ${modifiers.contactUSTextColor}; transform:rotate(-90deg); position:fixed; font-family: inherit; top:${modifiers.buttonPositionTop}; right:${modifiers.buttonPositionRight}; margin-right: 0px; padding-top: ${modifiers.buttonTextPadding}; width: 180px; height: 50px; background: ${modifiers.contactUSButtonColor}; border-radius: 5px; cursor: pointer; z-index:99999999;transition: all .4s ease;overflow:hidden; font-size: 1.0em; border: 0px;`);
  document.body.append(btn);

  //demo container
  let demoContainer = document.createElement("div");
  document.body.append(demoContainer);

  //Event Listeners
  btn.addEventListener("click", function () {
    let backdrop = document.createElement("div");
    backdrop.style.position = "fixed";
    backdrop.style.width = "100%";
    backdrop.style.height = "100%";
    backdrop.style.top = 0;
    backdrop.style.left = 0;
    backdrop.style.background = "rgb(0,0,0, 0.2)";
    backdrop.style.zIndex = "100";
    document.body.insertBefore(backdrop, demoContainer);
    backdrop.addEventListener("click", closeModal);

    //create Modal
    let modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.zIndex = "200";
    modal.style.top = "10%";
    modal.style.left = `${modifiers.modalPosition}`;
    modal.style.width = `${modifiers.modalWidth}`;
    modal.style.height = `${modifiers.modalHeight}`;
    modal.style.marginBottom = "0px";
    modal.style.background = "white";
    modal.style.boxShadow = "1px 1px 6px rgb(0,0,0,0.4)";
    modal.style.padding = "1rem";
    modal.style.borderRadius = "10px";

    // message area
    let modalMessage = document.createElement("div");
    modalMessage.style.position = "relative";
    modalMessage.style.marginTop = "0px";
    modal.appendChild(modalMessage);

    // modal Heading
    let modalHeading = document.createElement("h1");
    modalHeading.textContent = `${modifiers.formTitle}`;
    modalHeading.style.textAlign = "center";
    modalHeading.style.fontFamily = "inherit";
    modalHeading.style.color = `${modifiers.formTitleColor}`;
    modalHeading.style.marginTop = "30px";
    modalHeading.style.marginBottom = `${modifiers.formTitleMargin}`;
    modalHeading.style.marginLeft = "20%";
    modalHeading.style.fontSize = "1.4rem";
    modalHeading.style.borderBottom = "1px solid";
    modalHeading.style.width = "60%";
    modal.appendChild(modalHeading);

    //Used for EWT to convert milliseconds.....
    function padTo2Digits(num) {
      return num.toString().padStart(2, "0");
    }

    function convertMsToHM(milliseconds) {
      let seconds = Math.floor(milliseconds / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);

      seconds = seconds % 60;
      minutes = seconds >= 30 ? minutes + 1 : minutes;
      minutes = minutes % 60;
      hours = hours % 24;

      return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
    }

    //Container for the Cards
    let inputFieldContainer = document.createElement("div");
    inputFieldContainer.setAttribute(
      "style",
      `
				font-family: inherit; 
				display: grid;
				grid-template-columns: repeat(1, 1fr);
				grid-column-gap: 10px;
      `
    );
    modal.appendChild(inputFieldContainer);

    //create forms
    const createForm = (type, id) => {
      const form = document.createElement(type);
      form.id = id;
      form.setAttribute("style", `position:relative;`);
      return form;
    };

    //create fieldSets
    const createFieldSets = (type, height) => {
      const fieldset = document.createElement(type);
      fieldset.setAttribute("style", `border: 2px solid ${modifiers.borderColor};; border-radius:10px; border-bottom-right-radius:0; border-bottom-left-radius:0; min-height:${height};`);
      return fieldset;
    };

    //create legends
    const createLegends = (type, icon, fontSize) => {
      const legend = document.createElement(type);
      legend.textContent = icon;
      legend.setAttribute("style", `font-size: ${fontSize}; margin-left: 40%; color:${modifiers.formColor}; `);
      return legend;
    };

    // build call us form
    let formCallUs = createForm("form", "formCallUs");
    inputFieldContainer.appendChild(formCallUs);

    // build call us fieldSet
    let fieldSetCallUs = createFieldSets("fieldset", `${modifiers.fieldSetHeight}`);
    let call_Legend = createLegends("legend", "✆", "35px");
    formCallUs.append(fieldSetCallUs);
    fieldSetCallUs.append(call_Legend);

    // create titles
    const createTitles = (type, content, marginTop) => {
      const title = document.createElement(type);
      title.textContent = content;
      title.setAttribute("style", `margin-top:${marginTop}; padding-bottom: 3px; margin-top: 5px; margin-bottom: 30px; border:solid 2px ${modifiers.formColor}; border-right:none; border-top:none; border-left:none; text-align: center; box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24); `);
      return title;
    };

    // build Call Us title
    let callUsTitle = createTitles("div", "CALL US", "8px");
    fieldSetCallUs.append(callUsTitle);

    // create Footers
    const createFooter = element => {
      let footer = document.createElement(element);
      footer.setAttribute("style", `position: absolute; bottom: 0;`);
      return footer;
    };

    // create Submit buttons
    const createSubmit = (element, id, content) => {
      let submit = document.createElement(element);
      submit.id = id;
      submit.textContent = content;
      submit.setAttribute("style", `width:${modifiers.submitButtonWidth}; font-size: 12px; text-align: center; padding: 8px; border: none; background: ${modifiers.formColor}; color: white;  border-radius: 5px;  font-weight: bold; text-transform: uppercase; box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19); border: none; cursor: pointer;`);
      return submit;
    };

    // create Success message
    const createSuccessMsg = (element, content) => {
      let msg = document.createElement(element);
      msg.textContent = content;
      msg.setAttribute("style", ` text-align: left; font-size: 1.0rem; padding-bottom: 35px;  padding-top: 25px; border-width: 2px; border-top:0; border-left: 0; border-right: 0; border-radius: 5px; color: black; width: auto; background: white; position: absolute; z-index:999 `);
      return msg;
    };

    // create Success message
    const createSuccessTime = (element, content) => {
      let msg = document.createElement(element);
      msg.textContent = content;
      msg.setAttribute("style", ` text-align: center; font-size: 1.0rem; margin-top: 30px;padding: 2px; border-width: 2px; border-top:0; border-left: 0; border-right: 0; border-radius: 5px; color: white; width: 100%; background: black; position: absolute; z-index:999 `);
      return msg;
    };

    // create failed message
    const createFailedMsg = (element, content) => {
      let msg = document.createElement(element);
      msg.textContent = content;
      msg.setAttribute("style", ` text-align: center; margin-left: 250px; font-size: 1.0rem; padding: 2px; border-width: 2px; border-top:0; border-left: 0; border-right: 0; border-radius: 5px; color: white; width: 500px; background: tomato; position: absolute; z-index:999 `);
      return msg;
    };

    // create button render
    let buttonRender = btnName => {
      btnName.addEventListener("mouseleave", event => {
        event.target.style.opacity = "1";
        event.target.style.boxShadow = "0 12px 16px 0 rgba(0, 0, 0, 0.24)";
      });
      btnName.addEventListener("mouseenter", event => {
        event.target.style.opacity = ".6";
        event.target.style.transition = "1s";
        event.target.style.boxShadow = "none";
      });
    };

    // Call Us inputs
    let callUsField = document.createElement("div");
    callUsField.setAttribute("style", `opacity: .8; color:gray; font-family: inherit; white-space: pre; font-size: 18px; border-width: 1px; text-align: left;  margin-bottom: 15px; border-top:0; border-left: 0; border-right: 0; `);
    callUsField.textContent = "Pharmacy\r\n";
    callUsField.textContent += "\r\n";
    callUsField.innerHTML += `Address: ${modifiers.address}\r\n`;
    callUsField.textContent += `City: ${modifiers.city}\r\n`;
    callUsField.textContent += `State: ${modifiers.state}\r\n`;
    callUsField.textContent += `Zip Code: ${modifiers.zip}\r\n`;
    callUsField.textContent += "\r\n";
    callUsField.textContent += `Phone: ${modifiers.phone}\r\n`;

    fieldSetCallUs.append(callUsField);

    //build footer call us
    let footerCallUs = createFooter("footer");
    fieldSetCallUs.append(footerCallUs);

    //Submit Button Call Us
    let confirmButtonCallUs = createSubmit("button", "confirmButtonCallUs", "Check Wait Time");
    footerCallUs.append(confirmButtonCallUs);

    // callback submit Event
    buttonRender(confirmButtonCallUs);
    confirmButtonCallUs.addEventListener("click", async function validate(e) {
      e.preventDefault();

      try {
        let result = await fetch(`https://api.wxcc-${ewtParameters.dataCenter}.cisco.com/v1/ewt?queueId=${ewtParameters.queueId}&lookbackMinutes=${ewtParameters.lookbackMinutes}&maxCV=${ewtParameters.maxCV}&minValidSamples=${ewtParameters.minValidSamples}&orgId=${ewtParameters.orgId}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer eyJhbGciOiJSUzI1NiJ9.eyJjbHVzdGVyIjoiUEY4NCIsInByaXZhdGUiOiJleUpqZEhraU9pSktWMVFpTENKbGJtTWlPaUpCTVRJNFEwSkRMVWhUTWpVMklpd2lZV3huSWpvaVpHbHlJbjAuLnpFWmstY1ByOF9RbXg5QXBvSHdRYmcuV2R3RWd0bjhZUDZYSVI0d0VLLU9KYnR2S09KLU9DTXppd0tSc0tId2ZKX1RmTl9HaDFLLVF6cUMwempiRzQ3MEhKbXBwMUNHTlYtc1p5RzNpeVE0VWUyME9NR1d3RG1mbmx0TmVPNlppRjk0ejRCeUxydXd2MHlaMVRwa1Zkb0t4bG15TktOVGZheDhSTDNscTd3YUJPRExJYUFNSHp5RUp2Z1RLWEZfVVhHa0VybHRQcGFnczAyWlNPU2NfdHpZNUZOTFU4ZGxDY2ZzSjFiYkRrWkVhMlZPeXFXT2ZldEtDZlUwczE1Y2RFSnNkeUNrZ1ZNUnZFOWRvTGpScDNJWDF4VjN6cGVnT2RYLXpWNjZrc1E3ZU9iMGVQUXQ1eU9XNUdYY251R1BHYUdwUGpFaGRsaUUwTDlmLUNCeFBaZ1VoNm1jcURwcWZtUDVKSTNYZk9DZDdubGtMdmVYLTk3U2pTelNlNHVrd0dZZlVWZVg5b3VjV2pmc3lXeWhfQlRqNnBsc1BlN0tvMUhHUkg1b1dmTnNaMUFkVkRMeW56OUpyZDUxaHdkNUlaMnpuazNyVUdCQURwZ2F0SkV3ZFRZYnVCV25aejlOMlZ6bDFFb0pqZmVrUzhoMVViWUN2ODdKbGVZdHI5YXppZkdoZzdyT05DMVJtVGdwVnJPelRjYkNMeWo0RDBJNmhhMVNQWFVrbjVVUDFxd3hvZWd0Z1RXRjctZDMtMTQwWlZYRDJvTTcxUUh1Q0ZvRnFQOXIzdmc2VHd6YV9OYW9JSFphOWtKSVY1bTIybnhoU0xmbTMtZFViWGRNUTVCTGNnc0JKX2FXNmktUlpReE1MRzlrWGlIelNMZUNXdzR3c2pEM2FnRi1NcHA4dWoxNXlLU3FORVJzT284V1dTN3U4NWFZbE1FVjhaUmNTNkkzejlYd2xzUm9fNFBITjEtVVJOc1FpUnJIS0JlMVFBLi0wb3Y0M3RWeVpEMHVacy1qSXhSRFEiLCJ1c2VyX3R5cGUiOiJ1c2VyIiwidG9rZW5faWQiOiJBYVozcjBOelF4WkdJeE9USXRNR1V6WlMwME9XTm1MV0prTWpjdE9UUTJNems0WVRGbU9UTXdOR014WkRCbE5HSXRNbU15IiwicmVmZXJlbmNlX2lkIjoiNTk4MzU0N2EtNGMzMy00NDcyLTg0MTMtNGQ4YjUxYjllYTNiIiwiaXNzIjoiaHR0cHM6XC9cL2lkYnJva2VyLndlYmV4LmNvbVwvaWRiIiwidXNlcl9tb2RpZnlfdGltZXN0YW1wIjoiMjAyMjA3MjIwMDI1MzcuMTk4WiIsInJlYWxtIjoiZDRkMDZiNjgtMTc5YS00NDgwLTljMzgtNDVkNDBiYjg5NWRiIiwiY2lzX3V1aWQiOiJkZmY2MTk5My1iOWEzLTRlNzQtOGY1Ny0zMmY5MjUyOWNjZDciLCJ0b2tlbl90eXBlIjoiQmVhcmVyIiwiZXhwaXJ5X3RpbWUiOjE2NTkyNTYxNDIxNDAsImNsaWVudF9pZCI6IkM1ODI1NGYzOGNlMDBlYzdhZmQxYjYwNjZmOTdlM2MyNjgwZjgxOWZhZWZlNjhhOTY1MjE5N2EzYTllMTg4N2M0In0.YUEQmsFBDda7oWN45XxTegPtbc8RlFq5aGyxe7KDq3w475cXkuML2HodvHTigRNCQM2LmAdLRedshIGpjm9OYaPGx_EG1W-UEfEnb70RP0RupkZhK_ZJR_jNGwNelMVjS7VR3aok6J2gp2Z5F5iheuhb4NZicAcrsz5tc5ldwP6C6P5rGONQLG0jSOcDm8yUTqkdSKQLpq_r8AfiiOzXaSA5aqQCbLFDLSroT15beRKGUO9H4cLRMeVV_g19aCAjtzl9FyDdKGJW7ZIguv2dHETqcYsMtSGHKLdakkuFziW8GENxs8tF6iwNVS5NoairEr37M1OxM72Nv6ONeQLmuw"
          },
          referrerPolicy: "no-referrer"
        });
        let ewt = await result.text();
        console.log(ewt);
        if (ewt.length >= 1) {
          let convert = JSON.parse(ewt);
          ewt = convert.estimatedWaitTime;
        } else {
          ewt = 0;
        }
        //add message
        let successMsg = createSuccessMsg("div", `Thank you for contacting us. Looks like your estimated wait time is approximately: `);
        let time = createSuccessTime("div", `${convertMsToHM(ewt)} minute(s)`);

        modalMessage.append(successMsg);
        successMsg.append(time);

        setTimeout(() => {
          successMsg.remove();
        }, 10000);
      } catch (error) {
        let failMsg = createFailedMsg("span", "Something went wrong");
        console.log(error);
        setTimeout(() => {
          failMsg.remove();
        }, 4000);
      }
    });

    //close Modal
    function closeModal() {
      if (backdrop) {
        backdrop.remove();
      }
      if (modal) {
        modal.remove();
      }
    }

    document.body.insertBefore(modal, demoContainer);
  });
}
