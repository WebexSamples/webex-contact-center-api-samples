import { buildForm } from "./helpers/buildForm.js";
import { fixFormError } from "./helpers/fixFormError.js";
import { fetchApi } from "./helpers/fetchApi.js";
import { select } from "./sa-lib/select.js"; // use this in place DOM "getElementById", etc...

buildForm();

let getResults = select("#submit");
getResults.addEventListener("click", submitForm);

function submitForm(e) {
  e.preventDefault();

  // add error down at Footer if fields are not complete
  let areaMessage = select("#pageFooter");
  areaMessage.addEventListener("click", e => {
    let arr = areaMessage.childNodes;
    let newArr = Array.from(arr);
    newArr[1].remove();
    fixFormError();
  });

  //Get form values
  const formValues = Array.from(select("#form").childNodes).reduce((options, input) => ({ ...options, [input.id]: input.value }), {});

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
    return;
  } else {
    fixFormError();
  }

  //
  const url = `https://api.wxcc-us1.cisco.com/organization/${formValues.org}/${formValues.endpoint}?page=${formValues.page}&pageSize=${formValues.pageSize}`;

  const method = `${formValues.selectMethod}`;

  async function useFetch() {
    let response = await fetchApi(url, method);
    let results = response.map(el => {
      let email = el.email;
      let getElements = el.name;
      if (formValues.endpoint === "team" || formValues.endpoint === "skill-profile" || formValues.endpoint === "contact-service-queue" || formValues.endpoint === "entry-point") {
        return `
    					<option>${getElements}</option>
    					`;
      } else if (formValues.endpoint === "user") {
        return `
    					<option>${email}</option>
    					`;
      }
    });
    const apiResult = select("#mainArticle");
    apiResult.innerHTML += `
    				<div class="card">
    					<select>
    						<option>${formValues.endpoint} list</option>
    						${results}
    					</select>
    				</div>
    			`;
  }
  useFetch();
}
