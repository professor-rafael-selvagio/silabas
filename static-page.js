import { APP_VERSION, recordPageVisit } from "./app-data.js";
import { initNavMenus } from "./nav-menu.js";

const pageVersionLabel = document.querySelector(".page-version");
const pageName = document.body.dataset.pageName;

initNavMenus();

if (pageName) {
  recordPageVisit(pageName);
}

if (pageVersionLabel) {
  pageVersionLabel.textContent = `Versão atual da interface: ${APP_VERSION}`;
}
