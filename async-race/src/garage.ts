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

  pageNumber: HTMLHeadingElement;
  count: HTMLHeadingElement;

  constructor(currentPage: Page) {
    this.car = new CarModel({ name: "TEST", color: "#000000", id: 5000 });
    this.car.initListener(this);
    this.currentPage = currentPage;
    this.controlPanel = new ControlPanel(this, currentPage);
  }

  async printGarage(main: HTMLElement, header: HTMLElement) {
    document.querySelector(".to-garage").classList.add("disabled");
    header.innerHTML += `${this.controlPanel.printControlPanel()}`;
    const raceSettings = this.currentPage.getRaceSettings();
    const cars = await apiService.getCars(raceSettings.activeGaragePage, raceSettings.garageLimit);

    this.pageNumber = document.createElement("h3");
    this.pageNumber.className = "page-number";
    this.pageNumber.textContent = `page ${cars.pageNumber}`;
    main.append(this.pageNumber);

    this.count = document.createElement("h2");
    this.count.className = "cars-count";
    this.count.textContent = `garage(${cars.count})`;
    header.append(this.count);

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

    this.pageNumber.textContent = `page ${cars.pageNumber}`;
    this.count.textContent = `garage(${cars.count})`;

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
