import { getCars } from "./api";
import { Car, CarType } from "./car";

export class Pagination {
  constructor() {
    document.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).className === "prev-page" && +window.localStorage.getItem("activeCarPage") > 1) {
        this.updateCarPage("decrease");
      } else if ((e.target as HTMLElement).className === "next-page") {
        this.updateCarPage("increase");
      }
    });
  }
  printCarPage() {
    return `<ul class="buttons-container">
    <li><button class="prev-page">Prev</button></li>
    <li><button class="next-page">Next</button></li>
    
  </ul>`;
  }
  updateCarPage(operation: string) {
    document.querySelector(".cars-container").innerHTML = "";
    const savedCount = window.localStorage.getItem("activeCarPage");
    let count: number;
    operation === "decrease" ? (count = +savedCount - 1) : (count = +savedCount + 1);
    window.localStorage.setItem("activeCarPage", String(count));
    getCars(count).then((cars) => {
      cars.items.forEach((car: CarType) => {
        new Car(car);
      });
    });
    document.querySelector(".page-number").innerHTML = `page ${count}`;
  }
}
