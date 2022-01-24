import { apiService } from "./api";
import { CarModel } from "./car";
import { Car } from "./types";
import { isDiff } from "./utils";
import { ControlPanel } from "./controlPanel";
import { Page } from "./page";

export class Garage {
  carCollection: CarModel[];
  carCollectionNew: CarModel[];
  car: CarModel;
  controlPanel: ControlPanel;
  currentPage: Page;

  constructor(currentPage: Page) {
    this.car = new CarModel({ name: "TEST", color: "#000000", id: 5000 });
    this.car.initListener(this);
    this.currentPage = currentPage;
    this.controlPanel = new ControlPanel(this, currentPage);
  }

  async printGarage(main: HTMLElement, header: HTMLElement) {
    const raceSettings = this.currentPage.getRaceSettings();
    const cars = await apiService.getCars(raceSettings.activeGaragePage, raceSettings.garageLimit);
    document.querySelector(".to-garage").setAttribute("disabled", "disabled");
    main.innerHTML += `<h3 class="page-number">page ${cars.pageNumber}</h3>`;
    main.innerHTML += `<div class="race-result"></div>`;
    header.innerHTML += `<h2 class="cars-count">garage(${cars.count})</h2>`;
    header.innerHTML += this.controlPanel.printControlPanel();
    this.carCollection = [];

    if (cars.items.length > 0) {
      cars.items.forEach((car: Car) => {
        const carItem = new CarModel(car);
        this.carCollection.push(carItem);
        carItem.renderCar();
      });
    }
  }

  async updateGarage() {
    const raceSettings = this.currentPage.getRaceSettings();
    const cars = await apiService.getCars(raceSettings.activeGaragePage, raceSettings.garageLimit);
    document.querySelector(".page-number").innerHTML = `page ${cars.pageNumber}`;
    document.querySelector(".cars-count").innerHTML = `garage(${cars.count})`;
    this.carCollectionNew = [];
    cars.items.forEach((car: Car) => {
      const carItem = new CarModel(car);
      this.carCollectionNew.push(carItem);
    });
    if (isDiff(this.carCollection, this.carCollectionNew)) {
      document.querySelector(".container").innerHTML = "";
      this.carCollection = this.carCollectionNew;
      this.carCollection.forEach((car: Car) => {
        const carItem = new CarModel(car);
        carItem.renderCar();
      });
    }
  }
}
