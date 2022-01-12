import { Page } from "./page";
const activePage = window.localStorage.getItem("activePage");
activePage ? new Page(activePage) : new Page();
