import { Page } from "./page";
import { getCars } from "./api";
import { Car, CarType } from "./car";

export class Pagination {
  carContainer: HTMLUListElement;
  constructor(container: HTMLElement) {
    this.carContainer = document.querySelector(".cars-container");
    container.innerHTML += this.printCarPage();
    document.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).className === "prev-page" && +window.localStorage.getItem("activeCarPage") > 1) {
        document.querySelector(".cars-container").innerHTML = "";
        const count = window.localStorage.getItem("activeCarPage");
        window.localStorage.setItem("activeCarPage", String(+count - 1));
        getCars(+count - 1).then((cars) => {
          cars.items.forEach((car: CarType) => {
            new Car(car);
          });
        });
      } else if ((e.target as HTMLElement).className === "next-page") {
        document.querySelector(".cars-container").innerHTML = "";
        const count = window.localStorage.getItem("activeCarPage");
        window.localStorage.setItem("activeCarPage", String(+count + 1));
        getCars(+count + 1).then((cars) => {
          cars.items.forEach((car: CarType) => {
            new Car(car);
          });
        });
      }
    });
  }
  printCarPage() {
    return `<ul class="buttons-container">
    <li><button class="prev-page">Prev</button></li>
    <li><button class="next-page">Next</button></li>
    
  </ul>`;
  }
}
