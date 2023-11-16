import { buildForm } from "./helpers/buildForm.js";
import { addFormError, checkForm } from "./helpers/formError.js";
import { getFetch } from "./helpers/api/getFetch.js";
import { select } from "./sa-lib/select.js"; // use this in place DOM "getElementById", etc...

// Build out the form
buildForm();

// Get results from the Submit Action
const getResults = select("#submit");
getResults.addEventListener("click", submitForm);

// Submit Action
export function submitForm(e) {
  e.preventDefault();

  //Get form values
  const formValues = Array.from(select("#form").childNodes).reduce((options, input) => ({ ...options, [input.id]: input.value }), {});
  method = `${formValues.selectMethod}`;

  // Check for Errors
  checkForm(formValues);

  // Add error down at Footer if fields are not complete
  addFormError();

  // Get results and render on page
  getFetch(formValues);
}
