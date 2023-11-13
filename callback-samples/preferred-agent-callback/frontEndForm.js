// This is a plain vanilla JS form designed to be added into any javascript injector, in order to render it on a web browser / HTML.
// Injector used for the demo is a Chrome Extension called scripty.

document.onload(primaryCallback());

function primaryCallback() {
  //variables
  const modifiers = {
    url: "add your public server address",
    formTitle: "Webex Contact Center",
    formTitleColor: "black",
    formTitleMargin: "30px",
    formColor: "#00A0D9",
    borderColor: "darkgray",
    agents: ["", "Agent1", "Agent2", "Agent3", "Agent4"],
    contactUSButtonColor: "#00A0D9",
    contactUSTextColor: "#ffffff !important",
    buttonTextPadding: "0px",
    buttonPositionTop: "50%",
    buttonPositionRight: "-70px",
    modalWidth: "800px",
    modalHeight: "550px"
  };

  const googleFont = document.createElement("link");
  googleFont.setAttribute("rel", "stylesheet");
  googleFont.setAttribute("type", "text/css");
  googleFont.setAttribute("href", "https://fonts.googleapis.com/css2?family=Raleway:wght@200&display=swap");
  document.getElementsByTagName("head")[0].append(googleFont);

  let btn = document.createElement("BUTTON");
  // btn.innerHTML = "<p>CONTACT&nbsp;&nbsp;US </p>";
  btn.innerText = "CONTACT US";
  btn.setAttribute("style", `transform:rotate(-90deg); position:fixed; top:${modifiers.buttonPositionTop}; right:${modifiers.buttonPositionRight}; margin-right: 0px; padding-top: ${modifiers.buttonTextPadding}; width: 180px; height: 50px; background: ${modifiers.contactUSButtonColor}; border-radius: 5px; color: ${modifiers.contactUSTextColor}; cursor: pointer; z-index:99999999;transition: all .4s ease;overflow:hidden; font-size: 1.0em; border: 0px;`);
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
    modal.style.position = "absolute";
    modal.style.zIndex = "200";
    modal.style.top = "45%";
    modal.style.left = "25%";
    modal.style.width = `${modifiers.modalWidth}`;
    modal.style.height = `${modifiers.modalHeight}`;
    modal.style.marginBottom = "0px";
    modal.style.background = "url(https://wxccdemo.s3.us-west-1.amazonaws.com/Scripty/background.jpeg)";
    modal.style.boxShadow = "1px 1px 6px rgb(0,0,0,0.4)";
    modal.style.padding = "1.2rem";
    modal.style.borderRadius = "10px";
    modal.style.overflow = "scroll";

    // message area
    let modalMessage = document.createElement("div");
    modalMessage.style.position = "relative";
    modalMessage.style.marginTop = "20px";
    modal.appendChild(modalMessage);

    // modal Heading
    let modalHeading = document.createElement("h1");
    modalHeading.textContent = `${modifiers.formTitle}`;
    modalHeading.style.textAlign = "center";
    modalHeading.style.color = `${modifiers.formTitleColor}`;
    modalHeading.style.marginTop = "10px";
    modalHeading.style.marginBottom = `${modifiers.formTitleMargin}`;
    modalHeading.style.marginLeft = "20%";
    modalHeading.style.fontSize = "2.0rem";
    modalHeading.style.letterSpacing = "5px";
    modalHeading.style.fontFamily = ["Raleway", "sans-serif"];
    // modalHeading.style.borderBottom = "1px solid lightgray";
    modalHeading.style.width = "60%";
    modal.appendChild(modalHeading);

    // create flexbox
    let inputFieldFlexBox = document.createElement("div");
    inputFieldFlexBox.setAttribute(
      "style",
      `
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              align-items: center;
              align-content: center;
              flex-direction: row;
              width: 750px;
              overflow: auto;  
              gap:20px;
          
           
      
      `
    );
    modal.appendChild(inputFieldFlexBox);

    //create fieldSets
    const createFieldSets = type => {
      const fieldset = document.createElement(type);
      fieldset.setAttribute(
        "style",
        `border: 1px solid ${modifiers.borderColor}; border-radius:10px; padding: 0px 20px; box-shadow: 7px 7px 12px 0px rgba(122,110,110,0.84); width: 250px; height: 410px; margin-bottom: 15px; background: rgb(166,166,171);
      background: linear-gradient(180deg, rgba(166,166,171,1) 0%, rgba(255,255,255,1) 30%); `
      );
      return fieldset;
    };

    //create Image
    const createImage = type => {
      const fieldsetImage = document.createElement(type);
      fieldsetImage.setAttribute("style", ` margin-top: 5px; margin-left: 35%; border-radius: 50%; width: 60px; height:60px;  box-shadow: 7px 7px 12px 0px rgba(122,110,110,0.84); `);
      return fieldsetImage;
    };

    //create forms
    const createForm = (type, id) => {
      const form = document.createElement(type);
      form.id = id;
      form.setAttribute("style", `position:relative;`);
      return form;
    };

    // create titles
    const createTitles = (type, content, marginTop) => {
      const title = document.createElement(type);
      title.textContent = content;
      title.setAttribute("style", `margin-top:${marginTop}; padding-bottom: 3px; margin-top: 5px; margin-bottom: 30px; border:solid 1px ${modifiers.formColor}; border-right:none; border-top:none; border-left:none; text-align: center; letter-spacing: 2px;`);
      return title;
    };

    // create Input
    const createInputs = (element, type, name, id, placeholder) => {
      const input = document.createElement(element);
      input.type = type;
      input.name = name;
      input.id = id;
      input.placeholder = placeholder;
      input.setAttribute("style", ` outline: none !important; font-size: 12px; border-width: 1px; text-align: left;  margin-bottom: 15px; border-top:0; border-left: 0; border-right: 0; width: 100%; box-shadow: inset 0 0 0px 9999px white; letter-spacing: 1px;`);
      return input;
    };

    // create labels
    const createLabels = (element, myClass, content) => {
      const labels = document.createElement(element);
      labels.setAttribute("for", "requestType");
      labels.classList.add(myClass);
      labels.textContent = content;
      labels.setAttribute("style", `outline: none !important; opacity: .6; display:block; color: #5C5B5B; font-size: 13px; border-width: 1px; text-align: left; margin-bottom: 5px; border-top:0; border-left: 0; border-right: 0; width: 100%;`);
      return labels;
    };

    // create Selects
    const createSelects = (element, name, id, required) => {
      const selects = document.createElement(element);
      selects.name = name;
      selects.id = id;
      selects.required = required;
      selects.setAttribute("style", ` outline: none !important; display: inline; font-size: 12px; border-width: 1px; text-align: left;  margin-bottom: 5px; margin-top: 0px; border-top:0; border-left: 0; border-right: 0; width: 100%; font-weight: bold; letter-spacing: 1px; `);
      return selects;
    };

    // create Submit buttons
    const createSubmit = (element, id, content, marginTop) => {
      let submit = document.createElement(element);
      submit.id = id;
      submit.textContent = content;
      submit.setAttribute("style", ` opacity:0.6; font-size: 12px; text-align: center; padding: 8px; border: none; background: ${modifiers.formColor}; color: white;  border-radius: 5px;  font-weight: bold; text-transform: uppercase; box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19); border: none; cursor: pointer; width:200px; margin-top: ${marginTop}`);
      return submit;
    };

    // create Success message
    const createSuccessMsg = (element, content) => {
      let msg = document.createElement(element);
      msg.textContent = content;
      msg.setAttribute("style", ` text-align: center; font-size: 1.0rem; padding: 10px; border-width: 2px; border-top:0; border-left: 0; border-right: 0; border-radius: 5px; color: white; width: 300px; background: #11691b; float: right; margin-top: 5px; margin-right: 5px; z-index:999 `);
      return msg;
    };

    // create failed message
    const createFailedMsg = (element, content) => {
      let msg = document.createElement(element);
      msg.textContent = content;
      msg.setAttribute("style", ` text-align: center; font-size: 1.0rem; padding: 10px; border-width: 2px; border-top:0; border-left: 0; border-right: 0; border-radius: 5px; color: white; width: 300px; background: tomato; float: right; margin-top: 5px; margin-right: 5px; z-index:999 `);
      return msg;
    };

    // create button render
    let buttonRender = btnName => {
      btnName.addEventListener("mouseleave", event => {
        event.target.style.opacity = ".6";
        event.target.style.boxShadow = "none";
      });
      btnName.addEventListener("mouseenter", event => {
        event.target.style.opacity = "1";
        event.target.style.transition = "1s";
        event.target.style.boxShadow = "0 12px 16px 0 rgba(0, 0, 0, 0.24)";
      });
    };

    // build preferred Agent fieldSet
    let fieldSetPreferredAgent = createFieldSets("div");
    let PreferCallbackImage = createImage("img");
    PreferCallbackImage.src = "https://wxccdemo.s3.us-west-1.amazonaws.com/Scripty/call-us.jpg";
    fieldSetPreferredAgent.append(PreferCallbackImage);
    inputFieldFlexBox.append(fieldSetPreferredAgent);

    // build Preferred Agent title
    let PreferredTitle = createTitles("div", "PREFERRED AGENT CALLBACK", "8px");
    fieldSetPreferredAgent.append(PreferredTitle);

    //build  a form for preferred Agent
    let preferredAgentForm = createForm("form", "preferredAgentForm");
    fieldSetPreferredAgent.append(preferredAgentForm);

    //  build Preferred Agent inputs
    let preferredCallbackFN = createInputs("input", "text", "preferredCallbackFN", "preferredCallbackFN", "FIRSTNAME");
    preferredAgentForm.append(preferredCallbackFN);
    let preferredCallBackLN = createInputs("input", "text", "preferredCallBackLN", "preferredCallBackLN", "LASTNAME");
    preferredAgentForm.append(preferredCallBackLN);
    let preferredCallBackPhone = createInputs("input", "text", "preferredCallBackPhone", "preferredCallBackPhone", "YOUR PHONE");
    preferredAgentForm.append(preferredCallBackPhone);

    let callBackAgent = createLabels("LABEL", "startApp", "Preferred Agent");
    preferredAgentForm.append(callBackAgent);

    let preferredCallbackSelect = createSelects("select", "preferredCallbackSelect", "preferredCallbackSelect", true);
    preferredCallbackSelect.addEventListener("change", function () {
      editedQuote = preferredCallbackSelect.value;
    });
    callBackAgent.append(preferredCallbackSelect);

    // callback Create and append the options
    for (const element of modifiers.agents) {
      let option = document.createElement("option");
      option.value = element;
      option.text = element;
      preferredCallbackSelect.appendChild(option);
    }

    //Submit Button Preferred Agent
    let confirmButtonPreferred = createSubmit("button", "confirmButtonPreferred", "Submit", "39px");
    fieldSetPreferredAgent.append(confirmButtonPreferred);

    // Preferred Agent callback submit Event
    buttonRender(confirmButtonPreferred);
    confirmButtonPreferred.addEventListener("click", async function validate(e) {
      e.preventDefault();
      let callBackData = document.forms.preferredAgentForm;
      let formData = new FormData(callBackData);
      let firstName = formData.get("preferredCallbackFN");
      let lastName = formData.get("preferredCallBackLN");
      let phone = formData.get("preferredCallBackPhone");
      let requestType = formData.get("preferredCallbackSelect");

      let form = {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        requestType: requestType
      };
      try {
        // Post data using the Fetch API
        let response = await fetch(`${modifiers.url}/preferred`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Bypass-Tunnel-Reminder": "true"
          },
          referrerPolicy: "no-referrer",
          body: JSON.stringify(form)
        });
        let data = await response.json();
        let obj = data.msg;
        console.log(obj);

        if (obj == "success") {
          //add message
          let successMsg = createSuccessMsg("span", `Successfully scheduled a callback to ${phone} with your preferred representative ${requestType}`);

          backdrop.append(successMsg);

          setTimeout(() => {
            preferredAgentForm.reset();
            successMsg.remove();
          }, 10000);
        } else {
          let failMsg = createFailedMsg("span", "Something went wrong, could be expired token");
          backdrop.append(failMsg);
          setTimeout(() => {
            preferredAgentForm.reset();
            failMsg.remove();
          }, 4000);
        }
      } catch (error) {
        let failMsg = createFailedMsg("span", "Something went wrong");
        setTimeout(() => {
          preferredAgentForm.reset();
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
