import { getCars } from "./api";
import { Car } from "./car";
import { CarType } from "./types";

export class Garage {
  carCollection: Car[];
  car: Car;
  constructor() {
    this.carCollection = [];
  }

  printGarage(main: HTMLElement, header: HTMLElement) {
    getCars().then((cars) => {
      main.innerHTML += `<h3 class="page-number">page ${cars.pageNumber}</h3>`;
      main.innerHTML += `<div class="race-result"></div>`;
      header.innerHTML += `<h2 class="cars-count">garage(${cars.count})</h2>`;
      if (cars.items.length > 0) {
        this.car = new Car(cars.items[1]);
        this.car.initListener(this);
        cars.items.forEach((car: CarType) => {
          const carItem = new Car(car);
          this.carCollection.push(carItem);
          carItem.renderCar();
        });
      }
    });
  }

  updateGarage() {
    document.querySelector(".container").innerHTML = "";
    getCars().then((cars) => {
      document.querySelector(".page-number").innerHTML = `page ${cars.pageNumber}`;
      document.querySelector(".cars-count").innerHTML = `garage(${cars.count})`;
      this.carCollection = [];
      if (cars.items.length > 0) {
        cars.items.forEach((car: CarType) => {
          const carItem = new Car(car);
          this.carCollection.push(carItem);
          carItem.renderCar();
        });
      }
    });
  }
}
