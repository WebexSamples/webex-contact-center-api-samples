import { select } from "../js/sa-lib/select.js"; // use this in place DOM
import { search } from "../js/helpers/search.js";

//search
search();

// Render on Screen
export const renderHTML = (endpoint, results) => {
  const apiResult = select("#mainArticle");
  const titleResult = select(".titleResult");
  titleResult.style.display = "none";

  const htmlString = results
    .map(result => {
      return `
			<div class="column">
				<div class="row">
    			<div class="box green">
      			<p>${endpoint}:</p>
      			<h2>${result}</h2>
    			</div>
    		</div>
    	</div>
  `;
    })
    .join("");

  apiResult.innerHTML += htmlString;
};

{
  /* <div class="column">
				<div class="row">
    			<div class="card">
      			<div class="title">${endpoint}:</div>
      			<p class="result">${result}</p>
    			</div>
    		</div>
    	</div> */
}
