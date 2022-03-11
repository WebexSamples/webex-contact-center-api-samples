// import { port } from "../../../index.js";
import { buildForm } from "./helpers/buildForm.js";
import { formError } from "./helpers/formError.js";
// console.log(port);

//build form
buildForm();

// console.log(port);

//get Access token
const token = getBearerToken();

function getBearerToken() {
  try {
    const query = decodeURI(window.location.search.substring(1));
    const accessToken = query.split("access_token=")[1];
    console.log(accessToken);
    localStorage.setItem("token", accessToken);
    return JSON.parse(accessToken);
  } catch (error) {
    //link for token

    const link = "http://localhost:5000/index.html";

    let noTokenMessage = document.getElementById("mainArticle");
    noTokenMessage.innerHTML = `
      <h2 id="message" class="noToken"> Oops... <br> Looks like we dont have an access token.<br> Let's get one... <a class="noToken" href="${link}">oAuth</a></h2>
    `;
    return;
  }
}

let getResults = document.getElementById("submit");
getResults.addEventListener("click", submitForm);

function submitForm(e) {
  e.preventDefault();

  // add error down at Footer if fields are not complete
  let areaMessage = document.getElementById("pageFooter");
  areaMessage.addEventListener("click", e => {
    let arr = areaMessage.childNodes;
    let newArr = Array.from(arr);
    newArr[1].remove();
    formError();
  });

  //form values
  let selectMethod = document.getElementById("selectMethod").value;
  let org = document.getElementById("org").value;
  let endpoint = document.getElementById("endpoint").value;
  let page = document.getElementById("page").value;
  let pageSize = document.getElementById("pagesize").value;
  let body = document.getElementById("body").value;

  //makes sure form is filled out
  if (selectMethod === "" || org === "" || endpoint === "") {
    let selectMethod = document.getElementById("selectMethod");
    selectMethod.style.borderColor = "red";
    let org = document.getElementById("org");
    org.style.borderColor = "red";
    let endpoint = document.getElementById("endpoint");
    endpoint.style.borderColor = "red";
    let formError = document.getElementById("pageFooter");
    formError.innerHTML = `
      <h2 id="message" class="message"> Please fill required Fields </h2>
    `;
    return;
  } else {
    formError();
  }

  const url = `https://api.wxcc-us1.cisco.com/organization/${org}/${endpoint}?page=${page}&pageSize=${pageSize}`;

  fetch(url, {
    method: `${selectMethod}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(result => {
      // console.log(result);
      let res = result;
      let results = res.map(el => {
        let email = el.email;
        let getElements = el.name;
        if (endpoint === "team" || endpoint === "skill-profile" || endpoint === "contact-service-queue" || endpoint === "entry-point") {
          return `
  					<option>${getElements}</option>
  					`;
        } else if (endpoint === "user") {
          return `
  					<option>${email}</option>
  					`;
        }
      });
      const apiResult = document.getElementById("mainArticle");
      apiResult.innerHTML += `
  				<div class="card">
  					<select>
  						<option>${endpoint} list</option>
  						${results}
  					</select>
  				</div>
  			`;
    })
    .catch(function (error) {
      console.log(error);
      // location.href = "https://oauth-webex.herokuapp.com/index.html";
      location.href = "http://localhost:5000/index.html";
    });

  {
  }
}
