import { select } from "../js/sa-lib/select.js"; // use this in place DOM
import { search } from "../js/helpers/search.js";
import { findItemId } from "../js/helpers/api/deleteFetch.js";

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
    			<div class="box blue">
      			<p>${endpoint}</p>
      			<h2>${result}</h2>
						<img class="deleteItem" src="../img/delete_24.png" alt="delete">
						<dialog>
  						<p>Are you sure you want to delete?</p>
							<button id="yes">Yes</button>
							<button id="no">No</button>
						</dialog>
    			</div>
    		</div>
    	</div>
  `;
    })
    .join("");

  apiResult.innerHTML += htmlString;

  //delete Items
  findItemId();
};
