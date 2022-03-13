import { select } from "../sa-lib/select.js";

export function formError() {
  let color = select("#form").childNodes;
  color.forEach(element => {
    if (element.classList.contains("mandatory")) {
      element.style.borderColor = "#ccc";
    }
    let footer = select("#pageFooter");
    footer.innerHTML = "";
  });
}
