import { getCars } from "./api";
import { Car } from "./car";
import { CarType, RaceSettingsTypes } from "./types";

export class Garage {
  raceSettings: RaceSettingsTypes;

  constructor() {}

  printGarage(main: HTMLElement, header: HTMLElement) {
    this.raceSettings = JSON.parse(window.localStorage.getItem("raceSettings"));
    main.innerHTML += `<h3 class="page-number">page ${this.raceSettings.activeGaragePage}</h3>`;
    main.innerHTML += `<div class="race-result"></div>`;
    getCars().then((cars) => {
      header.innerHTML += `<h2 class="cars-count">garage(${cars.count})</h2>`;
      cars.items.forEach((car: CarType) => {
        new Car(car);
      });
    });
  }
}

export function updateCarContainer() {
  document.querySelector(".container").innerHTML = "";
  const raceSettings = JSON.parse(window.localStorage.getItem("raceSettings"));
  getCars().then((cars) => {
    document.querySelector(".page-number").innerHTML = `page ${raceSettings.activeGaragePage}`;
    document.querySelector(".cars-count").innerHTML = `garage(${cars.count})`;
    cars.items.forEach((car: CarType) => {
      new Car(car);
    });
  });
}
