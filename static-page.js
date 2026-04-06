import { APP_VERSION, recordPageVisit } from "./app-data.js";

const pageVersionLabel = document.querySelector(".page-version");
const pageName = document.body.dataset.pageName;

if (pageName) {
  recordPageVisit(pageName);
}

if (pageVersionLabel) {
  pageVersionLabel.textContent = `Versão atual da interface: ${APP_VERSION}`;
}
