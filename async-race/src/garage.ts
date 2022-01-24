import { apiService } from "./api";
import { CarModel } from "./car";
import { Car } from "./types";
import { isDiff } from "./utils";
import { Page } from "./page";

export class Garage {
  carCollection: CarModel[];
  carCollectionNew: CarModel[];
  car: CarModel;
  currentPage: Page;
  pageNumber: HTMLHeadingElement;
  count: HTMLHeadingElement;
  carsHTML: string;
  title: string;
  pageNumberTitle: string;

  constructor(currentPage: Page) {
    this.car = new CarModel({ name: "TEST", color: "#000000", id: 5000 });
    this.car.initListener(this);
    this.currentPage = currentPage;
  }

  async makeGarage() {
    const raceSettings = this.currentPage.getRaceSettings();
    const cars = await apiService.getCars(raceSettings.activeGaragePage, raceSettings.garageLimit);

    this.pageNumberTitle = `page ${cars.pageNumber}`;
    this.title = `garage(${cars.count})`;

    this.carCollection = [];
    this.carsHTML = "";

    if (cars.items.length > 0) {
      cars.items.forEach((car: Car) => {
        const carItem = new CarModel(car);
        this.carCollection.push(carItem);
        this.carsHTML += carItem.makeCar();
      });
    }
  }

  async updateGarage() {
    const raceSettings = this.currentPage.getRaceSettings();
    const cars = await apiService.getCars(raceSettings.activeGaragePage, raceSettings.garageLimit);

    this.carCollectionNew = [];

    this.pageNumberTitle = `page ${cars.pageNumber}`;
    this.title = `garage(${cars.count})`;
    document.querySelector(".page-number").innerHTML = this.pageNumberTitle;
    document.querySelector(".count").innerHTML = this.title;

    this.carsHTML = "";
    cars.items.forEach((car: Car) => {
      const carItem = new CarModel(car);
      this.carCollectionNew.push(carItem);
    });

    if (isDiff(this.carCollection, this.carCollectionNew)) {
      this.carCollection = this.carCollectionNew;
      this.carCollection.forEach((car: Car) => {
        const carItem = new CarModel(car);
        this.carsHTML += carItem.makeCar();
      });
      document.querySelector(".container").innerHTML = this.carsHTML;
    }
  }
}
