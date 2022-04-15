import { select } from "../sa-lib/select.js"; // use this in place DOM

//search *
export function search() {
  const search = select("#pageSearch");
  search.addEventListener("input", function (e) {
    const input = e.target.value.toLowerCase();
    const options = select("div.fs");
    Array.from(options).filter(item => {
      const names = item.innerText.toLowerCase();
      if (names.includes(input)) {
        item.parentElement.parentElement.parentElement.parentElement.classList.remove("hide");
      } else {
        item.parentElement.parentElement.parentElement.parentElement.classList.add("hide");
      }
    });
  });
}
