import { getCars } from "./api";
import { Car, CarType } from "./car";

export class Pagination {
  constructor() {
    document.addEventListener("click", (e) => {
      if (window.localStorage.getItem("activePage") === "garage") {
        if (
          (e.target as HTMLElement).className === "prev-page" &&
          +window.localStorage.getItem("activeGaragePage") > 1
        ) {
          this.updateCarPage("decrease");
        } else if ((e.target as HTMLElement).className === "next-page") {
          this.updateCarPage("increase");
        }
      } else {
        if (
          (e.target as HTMLElement).className === "prev-page" &&
          +window.localStorage.getItem("activeWinnersPage") > 1
        ) {
          this.updateWinnersPage("decrease");
        } else if ((e.target as HTMLElement).className === "next-page") {
          this.updateWinnersPage("increase");
        }
      }
    });
  }
  printPagination() {
    return `<ul class="buttons-container">
    <li><button class="prev-page">Prev</button></li>
    <li><button class="next-page">Next</button></li>
    
  </ul>`;
  }
  updateCarPage(operation: string) {
    document.querySelector(".container").innerHTML = "";
    const count = this.updateCount(operation);
    getCars(count).then((cars) => {
      cars.items.forEach((car: CarType) => {
        new Car(car);
      });
    });
    document.querySelector(".page-number").innerHTML = `page ${count}`;
  }
  updateCount(operation: string) {
    const savedCount = window.localStorage.getItem("activegaragePage");
    let count: number;
    operation === "decrease" ? (count = +savedCount - 1) : (count = +savedCount + 1);
    window.localStorage.setItem("activegaragePage", String(count));
    return count;
  }
  updateWinnersPage(operation: string) {
    const count = this.updateCount(operation);
  }
}
