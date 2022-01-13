import { Page } from "./page";
export class Structure {
  structure: string;

  constructor(container: HTMLElement) {
    container.innerHTML = this.printStructure();
  }
  printStructure() {
    return `<header class="header">
    <h1>Async race</h1>
    <ul class="navigation">
      <li>
        <input type="radio" id="to-garage" name="navigation" value="garage" class="to-garage" checked  />
        <label for="to-garage">to Garage</label>
      </li>
      <li>
        <input type="radio" id="to-winners" name="navigation" value="winners" class="to-winners" />
        <label for="to-winners">to Winners</label>
      </li>
    </ul>
  </header>
  <main class="main">
    <ul class="cars-container"></ul>
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

document.addEventListener("click", function (e) {
  if ((e.target as HTMLElement).className === "to-garage") {
    window.localStorage.setItem("activePage", "garage");
    new Page();
  } else if ((e.target as HTMLElement).className === "to-winners") {
    window.localStorage.setItem("activePage", "winners");
    new Page();
  }
});
