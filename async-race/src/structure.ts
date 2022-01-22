import { currentPage } from "./index";

export class Structure {
  constructor() {
    this.initListener();
  }
  initListener() {
    document.addEventListener("click", function (e) {
      const target = e.target as HTMLButtonElement;
      if (target.className === "to-garage") {
        currentPage.updateRaceSettings("activePage", "garage");
        currentPage.printPage();
        document.querySelector(".to-garage").setAttribute("disabled", "disabled");
      } else if (target.className === "to-winners") {
        currentPage.updateRaceSettings("activePage", "winners");
        currentPage.printPage();
        document.querySelector(".to-winners").setAttribute("disabled", "disabled");
      }
    });
  }
  printStructure() {
    return `<header class="header">
    <h1>Async race</h1>
    <ul class="navigation">
      <li>
        <input type="radio" id="to-garage" name="navigation" value="garage" class="to-garage"  />
        <label for="to-garage">to garage</label>
      </li>
      <li>
        <input type="radio" id="to-winners" name="navigation" value="winners" class="to-winners" />
        <label for="to-winners">to winners</label>
      </li>
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
