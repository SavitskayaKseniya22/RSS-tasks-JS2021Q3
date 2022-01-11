const header = document.querySelector("header");

export class Navigation {
  constructor() {}
  printNav() {
    return `<ul class="navigation">
    <li>
    <button class="to-garage">to Garage</button>
    </li>
    <li>
    <button class="to-winners">to Winners</button>
    </li>
  </ul>`;
  }
}
header.innerHTML += new Navigation().printNav();
