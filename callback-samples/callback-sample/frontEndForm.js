// This is a plain vanilla JS form designed to be added into any javascript injector, in order to render it on a web browser / HTML.
// Injector used for the demo is a Chrome Extension called scripty.

document.onload(primaryCallback());

function primaryCallback() {
    //variables
    const modifiers = {
        url: "http://localhost:5000", // Localtunnel URL or your public Server
        formTitle: "Partner summit",
        formSubTitle: "Details for Call-Back",
        formButtonColor: "#FD832F",
        reasons: ["select", "Billing", "Orders", "Support", "Other"],
        buttonColor: "#ccc", // ie "#002D72" or "red"
        secondColor: "#444444",
        bannerColor: "#C8CBCE",
        buttonTextColor: "#000000",
        buttonPositionTop: "50%",
        buttonPositionRight: "-70px",
        modalWidth: "700px",
        modalHeight: "550px"
    };

    // create bottom of page banner
    // let btnBackground = document.createElement("BUTTON");
    // btnBackground.setAttribute("style", `position:fixed; font-family: inherit; bottom: 0px; left: 0px; width: 100%; height: 100px; background: ${modifiers.bannerColor}; color: ${modifiers.buttonTextColor}; cursor: pointer; z-index:99999999;transition: all .4s ease;overflow:hidden; font-size: 1.1em; border: 0px;`);
    // document.body.append(btnBackground);

    // create button on bottom left
    // let btn = document.createElement("BUTTON");
    // btn.textContent = " 📞 Call Me Back";
    // btn.setAttribute("style", `position:fixed; font-family: inherit; bottom: 10px; left: 10px; width: max-content; height: 30px; background: ${modifiers.buttonColor};border-radius: 5px; ;color: ${modifiers.buttonTextColor}; cursor: pointer; z-index:99999999;transition: all .4s ease;overflow:hidden; font-size: 1.1em; border: 0px; box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19); margin-left: 15px;margin-bottom:15px;`);
    // document.body.append(btn);

    let btn = document.createElement("BUTTON");
    btn.textContent = String.fromCodePoint(0x1f4de) + " " + "CALL ME BACK";
    btn.setAttribute("style", `transform:rotate(-90deg); position:fixed; font-family: inherit; top:${modifiers.buttonPositionTop}; right:${modifiers.buttonPositionRight}; margin-right: 0px; width: 180px; height: 50px; background: ${modifiers.buttonColor}; border-radius: 5px; ;color: ${modifiers.buttonTextColor}; cursor: pointer; z-index:99999999;transition: all .4s ease;overflow:hidden; font-size: 1.1em; border: 0px;`);
    document.body.append(btn);

    //demo container
    let demoContainer = document.createElement("div");
    document.body.append(demoContainer);

    //Event Listeners
    btn.addEventListener("click", function() {
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
        modal.style.left = "28%";
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
        modalHeading.style.color = "#521751";
        modalHeading.style.marginTop = "40px";
        modalHeading.style.fontSize = "2.0rem";
        modal.appendChild(modalHeading);

        // modal sub Heading
        let modalSubHeading = document.createElement("h4");
        modalSubHeading.textContent = `${modifiers.formSubTitle}`;
        modalSubHeading.classList.add("modalSubHeading");
        modalSubHeading.style.textAlign = "center";
        modalSubHeading.style.fontFamily = "inherit";
        modalSubHeading.style.color = "#521751";
        modalSubHeading.style.marginBottom = "20px";
        modalSubHeading.style.marginTop = "0px";
        modalSubHeading.style.fontSize = "1.2rem";
        modal.appendChild(modalSubHeading);

        //Input fields of the Form
        let inputFieldContainer = document.createElement("div");
        inputFieldContainer.setAttribute(
            "style",
            ` margin-right: 20px; margin-left: 20px;
      `
        );
        modal.appendChild(inputFieldContainer);

        //create a form
        let startForm = document.createElement("form");
        startForm.id = "callBackForm";
        startForm.setAttribute(
            "style",
            `
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px; 
      `
        );
        inputFieldContainer.appendChild(startForm);

        // form field 1
        let startFN = document.createElement("input");
        startFN.type = "text";
        startFN.name = "firstName";
        startFN.id = "firstName";
        startFN.placeholder = "FIRSTNAME";
        startFN.setAttribute("style", ` font-size: 12px; border-width: 2px; text-align: left;  margin-bottom: 0px;border-top:0; border-left: 0; border-right: 0; `);
        startFN.addEventListener("input", function() {
            editedQuote = startFN.value;
        });
        startForm.append(startFN);

        // form field 2
        let startLN = document.createElement("input");
        startLN.type = "text";
        startLN.name = "lastName";
        startLN.id = "lastName";
        startLN.placeholder = "LASTNAME";
        startLN.setAttribute("style", `font-size: 12px; border-width: 2px; text-align: left;  left; margin-bottom: 0px;border-top:0; border-left: 0; border-right: 0;`);
        startLN.addEventListener("input", function() {
            editedQuote = startLN.value;
        });
        startForm.append(startLN);

        //form field 3
        let startE = document.createElement("input");
        startE.type = "text";
        startE.name = "email";
        startE.id = "email";
        startE.placeholder = "EMAIL";
        startE.setAttribute("style", `font-size: 12px; border-width: 2px;  text-align: left;  margin-bottom: 0px;border-top:0; border-left: 0; border-right: 0;`);
        startE.addEventListener("input", function() {
            editedQuote = startE.value;
        });
        startForm.append(startE);

        //form field 4
        let startP = document.createElement("input");
        startP.type = "text";
        startP.name = "phone";
        startP.id = "phone";
        startP.placeholder = "PHONE";
        startP.required = true;
        startP.setAttribute("style", `font-size: 12px; border-width: 2px;  text-align: left;  margin-bottom: 0px; border-top:0; border-left: 0; border-right: 0; `);
        startP.addEventListener("input", function() {
            editedQuote = startP.value;
        });
        startForm.append(startP);

        // form field 5
        let startApp = document.createElement("LABEL");
        startApp.setAttribute("for", "requestType");
        startApp.classList.add("startApp");
        startApp.innerHTML = "SELECT REASON";
        startApp.setAttribute("style", `margin-bottom: 0px; font-size: 12px; border-width: 2px; text-align: center; border-top:0; border-left: 0; border-right: 0; border-bottom: 0; grid-column: 1 / 3;`);
        startForm.append(startApp);

        //form field 6
        let requestType = document.createElement("select");
        requestType.type = "text";
        requestType.name = "requestType";
        requestType.id = "requestType";
        requestType.required = true;
        requestType.setAttribute("style", `font-size: 12px; border-width: 2px; text-align: center; margin-bottom: 0px; margin-top: 0px; border-top:0; border-left: 0; border-right: 0; grid-column: 1 / 3;`);
        requestType.addEventListener("change", function() {
            editedQuote = requestType.value;
        });
        startForm.append(requestType);

        //Create and append the options
        for (const element of modifiers.reasons) {
            let option = document.createElement("option");
            option.value = element;
            option.text = element;
            requestType.appendChild(option);
        }

        // create div for checkbox
        let checkboxDiv = document.createElement("div");
        checkboxDiv.setAttribute("style", ` margin-left: 25%; margin-top: 0px; grid-column: 1 / 3;`);
        startForm.append(checkboxDiv);

        //form field 7
        let startCheck = document.createElement("input");
        startCheck.type = "checkbox";
        startCheck.name = "checkboxId";
        startCheck.id = "checkboxId";
        startCheck.setAttribute("style", "position: relative; transform: scale(0.8); margin-left: 20px; margin-right: 5px; font-size: 10px;");
        startCheck.addEventListener("input", function() {
            editedQuote = startCheck.value;
        });
        checkboxDiv.append(startCheck);

        let checkBoxLabel = document.createElement("Label");
        checkBoxLabel.setAttribute("for", "checkboxId");
        checkBoxLabel.innerHTML = "I agree to the Use and Terms and Privacy Policy";
        checkBoxLabel.setAttribute("style", " display: inline; font-size: 12px; margin-left: 4px; ");
        checkboxDiv.append(checkBoxLabel);

        //Send Button
        let confirmButton = document.createElement("Button");
        confirmButton.id = "confirmButton";
        confirmButton.textContent = "Submit";
        //styles
        confirmButton.setAttribute("style", `font-size: 12px; text-align: center; margin-top: 0px; margin-bottom: 0px; margin-left: 15px; margin-right: 15px; padding: 8px; border: none; background: ${modifiers.formButtonColor}; color: white;  border-radius: 5px; width: 600px; font-weight: bold; text-transform: uppercase; box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19); border: none; cursor: pointer; grid-column: 1 / 3; margin-bottom: 20px;`);
        confirmButton.setAttribute("type", "button");
        startForm.append(confirmButton);

        confirmButton.addEventListener("click", async function validate(e) {
            let callBack = document.forms.callBackForm;
            let formData = new FormData(callBack);
            let firstName = formData.get("firstName");
            let lastName = formData.get("lastName");
            let email = formData.get("email");
            let phone = formData.get("phone");
            let locations = formData.get("locations");
            let requestType = formData.get("requestType");
            let appointmentType = formData.get("appointmentType");

            let form = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                locations: locations,
                requestType: requestType,
                appointmentType: appointmentType
            };
            try {
                // Post data using the Fetch API
                let response = await fetch(`${modifiers.url}/api/callback`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        //Specific for localtunnel
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
                    let successMsg = document.createElement("span");
                    successMsg.textContent = `Successfully scheduled a callback to ${phone}`;
                    successMsg.setAttribute("style", ` text-align: center; margin-left: 100px; font-size: 1.0rem; padding: 2px; border-width: 2px; border-top:0; border-left: 0; border-right: 0; border-radius: 5px; color: white; width: 500px; background: #22bb33; position: absolute; z-index:999 `);
                    modalMessage.append(successMsg);

                    setTimeout(() => {
                        startForm.reset();
                        successMsg.remove();
                    }, 8000);
                } else {
                    let failMsg = document.createElement("span");
                    failMsg.textContent = "Something went wrong";
                    failMsg.setAttribute("style", ` text-align: center; margin-left: 100px; font-size: 1.0rem; padding: 2px; border-width: 2px; border-top:0; border-left: 0; border-right: 0; border-radius: 5px; color: white; width: 500px; background: tomato; position: absolute; z-index:999 `);
                    modalMessage.append(failMsg);
                    setTimeout(() => {
                        startForm.reset();
                        failMsg.remove();
                    }, 8000);
                }

                startForm.reset();
                // Prevent the default form submit
                e.preventDefault();
            } catch (error) {
                let failMsg = document.createElement("span");
                failMsg.textContent = "Something went wrong";
                failMsg.setAttribute("style", ` text-align: center; margin-left: 100px; font-size: 1.0rem; padding: 2px; border-width: 2px; border-top:0; border-left: 0; border-right: 0; border-radius: 5px; color: white; width: 500px; background: tomato; position: absolute; z-index:999 `);
                modalMessage.append(failMsg);
                setTimeout(() => {
                    startForm.reset();
                    failMsg.remove();
                }, 8000);
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