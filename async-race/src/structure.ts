import { Page } from "./page";
import { Pagination } from "./pagination";
import { ControlPanel } from "./controlPanel";
import { Garage } from "./garage";
import { Winners } from "./winners";

export class Structure {
  currentPage: Page;
  pagination: Pagination;
  controlPanel: ControlPanel;

  constructor(currentPage: Page) {
    this.currentPage = currentPage;
    this.pagination = new Pagination(currentPage.garage, currentPage.winners, currentPage);
    this.controlPanel = new ControlPanel(currentPage.garage, currentPage);
    this.initListener();
  }

  initListener() {
    window.addEventListener("hashchange", () => {
      this.currentPage.printPage(window.location.hash);
    });
  }

  printStructure(object: Garage | Winners) {
    const panel = object instanceof Garage ? this.controlPanel.printControlPanel() : "";
    return `<header class="header">
    <h1>Async race</h1>
    <ul class="navigation">
      <a href="./#garage" id="to-garage" class="to-garage button">to garage</a>
      <a href="./#winners" id="to-winners" class="to-winners button" >to winners</a>
    </ul>
    ${panel}
    <h2 class="count">${object.title}</h2>
  </header>
  <main class="main">
    <div class="container">${object.carsHTML}</div>
    ${this.pagination.printPagination()}
    <h3 class="page-number">${object.pageNumberTitle}</h3>
  </main>
  <footer class="footer">
    <div>
      <a href="https://rs.school/js/" target="_blank">
        <img src="./images/rs-school-js.svg" alt="link" width="100" />
      </a>
    </div>
    <div>
      <a href="https://github.com/SavitskayaKseniya22" target="_blank"> made by Kseniya Savitskaya </a>
    </div>
    <div>© 2021</div>
  </footer>`;
  }
}
