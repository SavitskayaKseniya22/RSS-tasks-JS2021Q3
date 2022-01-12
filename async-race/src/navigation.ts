import { Page } from "./page";
export class Navigation {
  constructor(container: HTMLElement) {
    container.innerHTML += this.printNav();
    document.addEventListener("click", function (e) {
      if ((e.target as HTMLElement).className === "to-garage") {
        window.localStorage.setItem("activePage", "garage");
        new Page("garage");
      } else if ((e.target as HTMLElement).className === "to-winners") {
        window.localStorage.setItem("activePage", "winners");
        new Page("winners");
      }
    });
  }
  printNav() {
    return `<ul class="navigation">

    <li>
    <input type="radio" id="to-garage" name="navigation" value="garage" class="to-garage" />
    <label for="to-garage">to Garage</label>
    </li>

    <li>
    <input type="radio" id="to-winners" name="navigation" value="winners" class="to-winners" />
    <label for="to-winners">to Winners</label>
    </li>

  </ul>`;
  }
}
