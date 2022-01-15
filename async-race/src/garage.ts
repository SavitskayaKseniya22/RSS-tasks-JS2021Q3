import { getCars } from "./api";
import { Car } from "./car";
import { CarType } from "./types";

export class Garage {
  activeGaragePage: string;

  constructor(activeGaragePage = "1") {
    this.activeGaragePage = activeGaragePage;
    window.localStorage.getItem("activeGaragePage")
      ? (this.activeGaragePage = window.localStorage.getItem("activeGaragePage"))
      : window.localStorage.setItem("activeGaragePage", this.activeGaragePage);
  }
  printGarage(main: HTMLElement, header: HTMLElement) {
    main.innerHTML += `<h3 class="page-number">page ${this.activeGaragePage}</h3>`;
    main.innerHTML += `<div class="race-result"></div>`;
    getCars().then((cars) => {
      header.innerHTML += `<h2 class="cars-count">garage(${cars.count})</h2>`;
      cars.items.forEach((car: CarType) => {
        new Car(car);
      });
    });
  }
}

export function updateCarContainer(count?: number) {
  document.querySelector(".container").innerHTML = "";
  const num = count || +window.localStorage.getItem("activeGaragePage");
  getCars(num).then((cars) => {
    document.querySelector(".page-number").innerHTML = `page ${num}`;
    document.querySelector(".cars-count").innerHTML = `garage(${cars.count})`;
    cars.items.forEach((car: CarType) => {
      new Car(car);
    });
  });
}
