import { select } from "../sa-lib/select.js";

export function addFormError() {
  let areaMessage = select("#pageFooter");
  areaMessage.addEventListener("click", e => {
    let arr = areaMessage.childNodes;
    let newArr = Array.from(arr);
    newArr[1].remove();
    fixFormError();
  });
}

export function fixFormError() {
  let color = select("#form").childNodes;
  color.forEach(element => {
    if (element.classList.contains("mandatory")) {
      element.style.borderColor = "#ccc";
    }
    let footer = select("#pageFooter");
    footer.innerHTML = "";
  });
}

export function checkForm(formValues) {
  //Check to Make sure mandatory fields are filled out
  if (formValues.selectMethod === "" || formValues.org === "" || formValues.endpoint === "") {
    let color = select("#form").childNodes;
    color.forEach(element => {
      if (element.classList.contains("mandatory")) {
        element.style.borderColor = "red";
      }
    });

    let formError = select("#pageFooter");
    formError.innerHTML = `
    <h2 id="message" class="message"> Please fill required Fields </h2>
  `;
  } else {
    fixFormError();
  }
}
