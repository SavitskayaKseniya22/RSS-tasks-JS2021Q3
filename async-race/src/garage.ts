import { apiService } from "./api";
import { Car } from "./car";
import { CarType } from "./types";
import { isDiff } from "./utils";
import { ControlPanel } from "./controlPanel";
import { currentPage } from "./index";

export class Garage {
  carCollection: Car[];
  carCollectionNew: Car[];
  car: Car;
  controlPanel: ControlPanel;

  constructor() {
    this.car = new Car({ name: "TEST", color: "#000000", id: 5000 });
    this.car.initListener(this);
    this.controlPanel = new ControlPanel(this);
  }

  async printGarage(main: HTMLElement, header: HTMLElement) {
    const raceSettings = currentPage.getRaceSettings();
    const cars = await apiService.getCars(raceSettings.activeGaragePage, raceSettings.garageLimit);
    document.querySelector(".to-garage").setAttribute("disabled", "disabled");
    main.innerHTML += `<h3 class="page-number">page ${cars.pageNumber}</h3>`;
    main.innerHTML += `<div class="race-result"></div>`;
    header.innerHTML += `<h2 class="cars-count">garage(${cars.count})</h2>`;
    header.innerHTML += this.controlPanel.printControlPanel();
    this.carCollection = [];

    if (cars.items.length > 0) {
      cars.items.forEach((car: CarType) => {
        const carItem = new Car(car);
        this.carCollection.push(carItem);
        carItem.renderCar();
      });
    }
  }

  async updateGarage() {
    const raceSettings = currentPage.getRaceSettings();
    const cars = await apiService.getCars(raceSettings.activeGaragePage, raceSettings.garageLimit);
    document.querySelector(".page-number").innerHTML = `page ${cars.pageNumber}`;
    document.querySelector(".cars-count").innerHTML = `garage(${cars.count})`;
    this.carCollectionNew = [];
    cars.items.forEach((car: CarType) => {
      const carItem = new Car(car);
      this.carCollectionNew.push(carItem);
    });
    if (isDiff(this.carCollection, this.carCollectionNew)) {
      document.querySelector(".container").innerHTML = "";
      this.carCollection = this.carCollectionNew;
      this.carCollection.forEach((car: CarType) => {
        const carItem = new Car(car);
        carItem.renderCar();
      });
    }
  }
}
