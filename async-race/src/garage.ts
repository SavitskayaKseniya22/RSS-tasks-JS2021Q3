import { getCars } from "./api";
import { Car } from "./car";
import { CarType } from "./types";

export class Garage {
  constructor() {}

  printGarage(main: HTMLElement, header: HTMLElement) {
    getCars().then((cars) => {
      main.innerHTML += `<h3 class="page-number">page ${cars.pageNumber}</h3>`;
      main.innerHTML += `<div class="race-result"></div>`;
      header.innerHTML += `<h2 class="cars-count">garage(${cars.count})</h2>`;
      cars.items.forEach((car: CarType) => {
        new Car(car);
      });
    });
  }
}

export function updateCarContainer() {
  document.querySelector(".container").innerHTML = "";
  getCars().then((cars) => {
    document.querySelector(".page-number").innerHTML = `page ${cars.pageNumber}`;
    document.querySelector(".cars-count").innerHTML = `garage(${cars.count})`;
    cars.items.forEach((car: CarType) => {
      new Car(car);
    });
  });
}
