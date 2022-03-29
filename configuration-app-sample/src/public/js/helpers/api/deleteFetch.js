import { select } from "../../sa-lib/select.js"; // use this in place DOM
import { fetchApi } from "./fetchApi.js";

export function findItemId() {
  const selectDeleteItem = select(".deleteItem");
  const deleteItem = Array.from(selectDeleteItem);
  deleteItem.map(item => {
    item.addEventListener("click", function (e) {
      // const result = confirm("Want to delete?");
      // if (result) {
      const item = e.target.parentElement.parentElement.parentElement;
      const id = Array.from(e.target.previousElementSibling.children)[1].getAttribute("data-id");
      const endpoint = e.target.previousElementSibling.previousElementSibling.innerText;
      const name = e.target.previousElementSibling.children[0].innerText;
      const yes = e.target.nextElementSibling.children[1];
      const no = e.target.nextElementSibling.children[2];
      const confirm = e.target.nextElementSibling;
      confirm.show();
      no.addEventListener("click", function (e) {
        confirm.close();
      });
      yes.addEventListener("click", function (e) {
        item.remove();
        deleteFetch(id, endpoint, name);
        confirm.close();
      });
    });
  });
}

async function deleteFetch(id, endpoint, name) {
  const url = `https://api.wxcc-us1.cisco.com/organization/${org.value}/${endpoint}/${id}`;
  const method = "DELETE";
  const response = await fetchApi(url, method);
  if (response !== 409) {
    console.log("Successful");
  } else {
    console.log("something went wrong");
  }
}
