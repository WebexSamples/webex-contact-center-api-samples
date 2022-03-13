import { select } from "../sa-lib/select.js";

export function formError() {
  let selectMethod = select("#selectMethod");
  selectMethod.style.borderColor = "#ccc";
  let org = select("#org");
  org.style.borderColor = "#ccc";
  let endpoint = select("#endpoint");
  endpoint.style.borderColor = "#ccc";
  let footer = select("#pageFooter");
  footer.innerHTML = "";
}
