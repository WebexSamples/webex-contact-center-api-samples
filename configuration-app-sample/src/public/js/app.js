// import { port } from "../../../index.js";
import { buildForm } from "./helpers/buildForm.js";
import { formError } from "./helpers/formError.js";
import { getBearerToken } from "./helpers/getBearerToken.js";
// use this in place DOM "getElementById", etc...
import { select } from "./sa-lib/select.js";

//build form
buildForm();

//get Access token
const token = getBearerToken();

//get Bearer
getBearerToken();

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
    formError();
  });

  //form values
  const formValues = Array.from(select("#form").childNodes).reduce((options, input) => ({ ...options, [input.id]: input.value }), {});

  //makes sure form is filled out
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
    formError();
  }

  async function fetchApi() {
    const url = `https://api.wxcc-us1.cisco.com/organization/${formValues.org}/${formValues.endpoint}?page=${formValues.page}&pageSize=${formValues.pageSize}`;
    try {
      let response1 = await fetch(url, {
        method: `${formValues.selectMethod}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      let response2 = await response1.json();
      let results = response2.map(el => {
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
    } catch (error) {
      console.log(error);
      //     location.href = `${host}/index.html`;
    }
  }
  fetchApi();
}
