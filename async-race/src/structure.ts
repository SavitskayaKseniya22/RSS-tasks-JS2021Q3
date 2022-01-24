import { Page } from "./page";

export class Structure {
  currentPage: Page;
  constructor(currentPage: Page) {
    this.currentPage = currentPage;
    this.initListener();
  }

  initListener() {
    window.addEventListener("hashchange", () => {
      this.currentPage.printPage(window.location.hash);
    });
  }

  printStructure() {
    return `<header class="header">
    <h1>Async race</h1>
    <ul class="navigation">
      <a href="/#garage" id="to-garage" class="to-garage button">to garage</a>
      <a href="/#winners" id="to-winners" class="to-winners button" >to winners</a>
    </ul>
  </header>
  <main class="main">
    <div class="container"></div>
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
